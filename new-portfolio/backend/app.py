"""
Arinda Joseph Portfolio - Flask Backend
=======================================
A Python Flask backend for the portfolio website with:
- Contact form handling with SMTP email
- SQLite database for messages and analytics
- REST API endpoints
- Newsletter subscription
"""

import os
import re
import sqlite3
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from functools import wraps

from flask import Flask, request, jsonify, render_template, redirect, url_for, session, flash
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__, 
            template_folder='templates',
            static_folder='../static')

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-change-in-production')
app.config['DATABASE'] = 'portfolio.db'

# Email Configuration (Gmail SMTP)
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
SMTP_USERNAME = os.environ.get('SMTP_USERNAME', '')
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD', '')
RECIPIENT_EMAIL = 'arindajoseph256@gmail.com'

# Admin credentials
ADMIN_USERNAME = os.environ.get('ADMIN_USERNAME', 'admin')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'change-this-password')

# Database helper
def get_db():
    """Get database connection with row factory."""
    db = sqlite3.connect(app.config['DATABASE'])
    db.row_factory = sqlite3.Row
    return db

def init_db():
    """Initialize the database with required tables."""
    db = get_db()
    cursor = db.cursor()
    
    # Messages table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            ip_address TEXT,
            user_agent TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_read INTEGER DEFAULT 0
        )
    ''')
    
    # Newsletter subscribers
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS subscribers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            ip_address TEXT,
            subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_active INTEGER DEFAULT 1
        )
    ''')
    
    # Page views for analytics
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS page_views (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            path TEXT NOT NULL,
            ip_address TEXT,
            user_agent TEXT,
            viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Download tracking
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS downloads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT NOT NULL,
            ip_address TEXT,
            downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    db.commit()
    db.close()
    print("Database initialized successfully!")

# Initialize database on startup
init_db()

# =====================
# Utility Functions
# =====================

def validate_email(email):
    """Validate email format."""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def send_email(subject, body, to_email):
    """Send email via SMTP."""
    if not SMTP_USERNAME or not SMTP_PASSWORD:
        print("Warning: SMTP credentials not configured")
        return False
    
    try:
        msg = MIMEMultipart()
        msg['From'] = SMTP_USERNAME
        msg['To'] = to_email
        msg['Subject'] = subject
        
        msg.attach(MIMEText(body, 'html'))
        
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.send_message(msg)
        server.quit()
        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False

def log_visitor():
    """Log page view for analytics."""
    if request.path.startswith('/api'):
        return
    
    db = get_db()
    db.execute('''
        INSERT INTO page_views (path, ip_address, user_agent)
        VALUES (?, ?, ?)
    ''', (request.path, request.remote_addr, request.user_agent.string))
    db.commit()
    db.close()

def is_admin():
    """Check if current session is admin."""
    return session.get('admin_logged_in', False)

def admin_required(f):
    """Decorator to require admin authentication."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not is_admin():
            return redirect(url_for('admin_login'))
        return f(*args, **kwargs)
    return decorated_function

# =====================
# Main Routes
# =====================

@app.route('/')
def home():
    """Serve the home page."""
    log_visitor()
    return app.send_static_file('../index.html')

@app.route('/pages/<page>')
def serve_page(page):
    """Serve HTML pages from the pages directory."""
    log_visitor()
    try:
        return app.send_static_file(f'../pages/{page}.html')
    except:
        return app.send_static_file('../pages/404.html')

@app.route('/css/<style>')
def serve_css(style):
    """Serve CSS files."""
    return app.send_static_file(f'../css/{style}')

@app.route('/js/<script>')
def serve_js(script):
    """Serve JavaScript files."""
    return app.send_static_file(f'../js/{script}')

@app.route('/images/<image>')
def serve_image(image):
    """Serve image files."""
    return app.send_static_file(f'../images/{image}')

# =====================
# API Routes
# =====================

@app.route('/api/contact', methods=['POST'])
def api_contact():
    """
    Handle contact form submission.
    
    Expected JSON:
    {
        "name": "John Doe",
        "email": "john@example.com",
        "subject": "Project Inquiry",
        "message": "Hello, I'd like to discuss..."
    }
    """
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    # Extract fields
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    subject = data.get('subject', '').strip()
    message = data.get('message', '').strip()
    
    # Honeypot check (spam protection)
    if data.get('website'):
        # Silently accept to fool bots
        return jsonify({'success': True, 'message': 'Message sent successfully!'})
    
    # Server-side validation
    if not name or len(name) < 2:
        return jsonify({'error': 'Name must be at least 2 characters'}), 400
    
    if not email or not validate_email(email):
        return jsonify({'error': 'Please provide a valid email address'}), 400
    
    if not subject or len(subject) < 3:
        return jsonify({'error': 'Subject must be at least 3 characters'}), 400
    
    if not message or len(message) < 10:
        return jsonify({'error': 'Message must be at least 10 characters'}), 400
    
    # Rate limiting check (simple - in production use Redis)
    # Check for duplicate submissions within 60 seconds
    db = get_db()
    existing = db.execute('''
        SELECT id FROM messages 
        WHERE email = ? AND created_at > datetime('now', '-60 seconds')
    ''', (email,)).fetchone()
    
    if existing:
        db.close()
        return jsonify({'error': 'Please wait before sending another message'}), 429
    
    # Save to database
    db.execute('''
        INSERT INTO messages (name, email, subject, message, ip_address, user_agent)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (name, email, subject, message, request.remote_addr, request.user_agent.string))
    db.commit()
    db.close()
    
    # Send email notification
    email_body = f"""
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> {name}</p>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Subject:</strong> {subject}</p>
    <p><strong>Message:</strong></p>
    <p>{message.replace(chr(10), '<br>')}</p>
    <hr>
    <p><small>Sent from your portfolio website | IP: {request.remote_addr}</small></p>
    """
    
    email_sent = send_email(f"Portfolio Contact: {subject}", email_body, RECIPIENT_EMAIL)
    
    if not email_sent:
        print(f"Warning: Email notification failed for message from {email}")
    
    return jsonify({
        'success': True, 
        'message': 'Message sent successfully! I\'ll get back to you soon.'
    })

@app.route('/api/newsletter', methods=['POST'])
def api_newsletter():
    """
    Handle newsletter subscription.
    
    Expected JSON:
    {
        "email": "subscriber@example.com"
    }
    """
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    email = data.get('email', '').strip()
    
    if not email or not validate_email(email):
        return jsonify({'error': 'Please provide a valid email address'}), 400
    
    db = get_db()
    
    # Check if already subscribed
    existing = db.execute('SELECT id, is_active FROM subscribers WHERE email = ?', (email,)).fetchone()
    
    if existing:
        if existing['is_active']:
            db.close()
            return jsonify({'error': 'This email is already subscribed!'}), 400
        else:
            # Reactivate inactive subscription
            db.execute('UPDATE subscribers SET is_active = 1, subscribed_at = CURRENT_TIMESTAMP WHERE email = ?', (email,))
            db.commit()
            db.close()
            return jsonify({'success': True, 'message': 'Welcome back! Your subscription has been reactivated.'})
    
    # Add new subscriber
    db.execute('''
        INSERT INTO subscribers (email, ip_address)
        VALUES (?, ?)
    ''', (email, request.remote_addr))
    db.commit()
    db.close()
    
    # Send welcome email
    welcome_body = """
    <h2>Welcome to Arinda Joseph's Newsletter!</h2>
    <p>Thank you for subscribing! You'll receive updates about:</p>
    <ul>
        <li>New projects and portfolio updates</li>
        <li>Blog posts on web development and AI</li>
        <li>Tech insights and tutorials</li>
        <li>Exclusive content and resources</li>
    </ul>
    <p>Stay tuned for amazing content!</p>
    <hr>
    <p><small>You can unsubscribe at any time by contacting me.</small></p>
    """
    
    send_email("Welcome to My Newsletter!", welcome_body, email)
    
    return jsonify({
        'success': True, 
        'message': 'Subscribed successfully! Welcome aboard!'
    })

@app.route('/api/analytics', methods=['GET'])
def api_analytics():
    """Get basic analytics data (public)."""
    db = get_db()
    
    total_views = db.execute('SELECT COUNT(*) as count FROM page_views').fetchone()['count']
    total_messages = db.execute('SELECT COUNT(*) as count FROM messages').fetchone()['count']
    total_subscribers = db.execute('SELECT COUNT(*) as count FROM subscribers WHERE is_active = 1').fetchone()['count']
    unread_messages = db.execute('SELECT COUNT(*) as count FROM messages WHERE is_read = 0').fetchone()['count']
    
    # Popular pages
    popular_pages = db.execute('''
        SELECT path, COUNT(*) as count 
        FROM page_views 
        GROUP BY path 
        ORDER BY count DESC 
        LIMIT 5
    ''').fetchall()
    
    db.close()
    
    return jsonify({
        'total_views': total_views,
        'total_messages': total_messages,
        'total_subscribers': total_subscribers,
        'unread_messages': unread_messages,
        'popular_pages': [dict(row) for row in popular_pages]
    })

@app.route('/api/download/<filename:path>', methods=['POST'])
def track_download(filename):
    """Track file downloads."""
    allowed_files = ['Arinda_Joseph_CV.pdf']
    
    if filename not in allowed_files:
        return jsonify({'error': 'File not allowed'}), 403
    
    db = get_db()
    db.execute('''
        INSERT INTO downloads (filename, ip_address)
        VALUES (?, ?)
    ''', (filename, request.remote_addr))
    db.commit()
    db.close()
    
    return jsonify({'success': True})

# =====================
# Admin Routes
# =====================

@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    """Admin login page."""
    if request.method == 'POST':
        username = request.form.get('username', '')
        password = request.form.get('password', '')
        
        if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
            session['admin_logged_in'] = True
            return redirect(url_for('admin_dashboard'))
        else:
            flash('Invalid credentials', 'error')
    
    return '''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Admin Login | Arinda Joseph Portfolio</title>
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #f1f5f9;
            }
            .login-card {
                background: rgba(30, 30, 50, 0.8);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 1rem;
                padding: 2rem;
                width: 100%;
                max-width: 400px;
            }
            h1 { margin-bottom: 1.5rem; text-align: center; }
            .form-group { margin-bottom: 1rem; }
            label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
            input {
                width: 100%;
                padding: 0.75rem 1rem;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 0.5rem;
                color: #f1f5f9;
                font-size: 1rem;
            }
            input:focus {
                outline: none;
                border-color: #6366f1;
                box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
            }
            button {
                width: 100%;
                padding: 0.875rem;
                background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                border: none;
                border-radius: 0.5rem;
                color: white;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.2s;
            }
            button:hover { transform: translateY(-2px); }
            .alert {
                padding: 0.75rem 1rem;
                background: rgba(239, 68, 68, 0.2);
                border: 1px solid #ef4444;
                border-radius: 0.5rem;
                margin-bottom: 1rem;
                color: #ef4444;
            }
            .back-link {
                display: block;
                text-align: center;
                margin-top: 1rem;
                color: #94a3b8;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="login-card">
            <h1>Admin Login</h1>
            {% with messages = get_flashed_messages() %}
                {% if messages %}
                    {% for message in messages %}
                        <div class="alert">{{ message }}</div>
                    {% endfor %}
                {% endif %}
            {% endwith %}
            <form method="POST">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit">Login</button>
            </form>
            <a href="/" class="back-link">← Back to Portfolio</a>
        </div>
    </body>
    </html>
    '''

@app.route('/admin/logout')
def admin_logout():
    """Admin logout."""
    session.pop('admin_logged_in', None)
    return redirect(url_for('admin_login'))

@app.route('/admin/dashboard')
@admin_required
def admin_dashboard():
    """Admin dashboard showing messages and analytics."""
    db = get_db()
    
    # Get messages
    messages = db.execute('''
        SELECT * FROM messages ORDER BY created_at DESC LIMIT 50
    ''').fetchall()
    
    # Get statistics
    stats = {
        'total_messages': db.execute('SELECT COUNT(*) FROM messages').fetchone()[0],
        'unread_messages': db.execute('SELECT COUNT(*) FROM messages WHERE is_read = 0').fetchone()[0],
        'total_subscribers': db.execute('SELECT COUNT(*) FROM subscribers WHERE is_active = 1').fetchone()[0],
        'total_views': db.execute('SELECT COUNT(*) FROM page_views').fetchone()[0],
        'total_downloads': db.execute('SELECT COUNT(*) FROM downloads').fetchone()[0]
    }
    
    db.close()
    
    return f'''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Admin Dashboard | Arinda Joseph Portfolio</title>
        <style>
            * {{ box-sizing: border-box; margin: 0; padding: 0; }}
            body {{
                font-family: 'Inter', -apple-system, sans-serif;
                background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%);
                color: #f1f5f9;
                min-height: 100vh;
            }}
            .header {{
                background: rgba(30, 30, 50, 0.8);
                backdrop-filter: blur(20px);
                padding: 1rem 2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }}
            .header h1 {{ font-size: 1.5rem; }}
            .logout {{ color: #ef4444; text-decoration: none; }}
            .container {{ padding: 2rem; max-width: 1400px; margin: 0 auto; }}
            .stats {{
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                margin-bottom: 2rem;
            }}
            .stat-card {{
                background: rgba(30, 30, 50, 0.7);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 1rem;
                padding: 1.5rem;
                text-align: center;
            }}
            .stat-value {{
                font-size: 2.5rem;
                font-weight: 700;
                background: linear-gradient(135deg, #6366f1, #8b5cf6);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }}
            .stat-label {{ color: #94a3b8; margin-top: 0.5rem; }}
            .section-title {{ margin-bottom: 1rem; font-size: 1.25rem; }}
            table {{
                width: 100%;
                background: rgba(30, 30, 50, 0.7);
                border-collapse: collapse;
                border-radius: 1rem;
                overflow: hidden;
            }}
            th, td {{
                padding: 1rem;
                text-align: left;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }}
            th {{
                background: rgba(99, 102, 241, 0.2);
                font-weight: 600;
            }}
            tr:hover {{ background: rgba(255, 255, 255, 0.05); }}
            .unread {{ background: rgba(99, 102, 241, 0.1); }}
            .badge {{
                padding: 0.25rem 0.75rem;
                border-radius: 9999px;
                font-size: 0.75rem;
                font-weight: 600;
            }}
            .badge-unread {{ background: #6366f1; color: white; }}
            .badge-read {{ background: rgba(255, 255, 255, 0.1); color: #94a3b8; }}
            .btn {{
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                text-decoration: none;
                font-size: 0.875rem;
                cursor: pointer;
                border: none;
            }}
            .btn-primary {{
                background: #6366f1;
                color: white;
            }}
            .empty-state {{
                text-align: center;
                padding: 3rem;
                color: #94a3b8;
            }}
        </style>
    </head>
    <body>
        <div class="header">
            <h1>Admin Dashboard</h1>
            <a href="/admin/logout" class="logout">Logout</a>
        </div>
        <div class="container">
            <div class="stats">
                <div class="stat-card">
                    <div class="stat-value">{stats['total_messages']}</div>
                    <div class="stat-label">Total Messages</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">{stats['unread_messages']}</div>
                    <div class="stat-label">Unread Messages</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">{stats['total_subscribers']}</div>
                    <div class="stat-label">Subscribers</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">{stats['total_views']}</div>
                    <div class="stat-label">Page Views</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">{stats['total_downloads']}</div>
                    <div class="stat-label">Downloads</div>
                </div>
            </div>
            
            <h2 class="section-title">Recent Messages</h2>
            <table>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {' '.join(f'''
                    <tr class="{"unread" if not msg['is_read'] else ""}">
                        <td><span class="badge {"badge-unread" if not msg['is_read'] else "badge-read"}">
                            {"Unread" if not msg['is_read'] else "Read"}
                        </span></td>
                        <td>{msg['name']}</td>
                        <td><a href="mailto:{msg['email']}" style="color: #6366f1;">{msg['email']}</a></td>
                        <td>{msg['subject']}</td>
                        <td>{msg['created_at']}</td>
                        <td>
                            <a href="/admin/message/{msg['id']}" class="btn btn-primary">View</a>
                        </td>
                    </tr>
                    ''' for msg in messages) if messages else '''
                    <tr>
                        <td colspan="6" class="empty-state">No messages yet</td>
                    </tr>
                    '''}
                </tbody>
            </table>
        </div>
    </body>
    </html>
    '''

@app.route('/admin/message/<int:message_id>')
@admin_required
def admin_message(message_id):
    """View a specific message."""
    db = get_db()
    
    # Mark as read
    db.execute('UPDATE messages SET is_read = 1 WHERE id = ?', (message_id,))
    db.commit()
    
    message = db.execute('SELECT * FROM messages WHERE id = ?', (message_id,)).fetchone()
    db.close()
    
    if not message:
        return "Message not found", 404
    
    return f'''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Message from {message['name']} | Admin</title>
        <style>
            * {{ box-sizing: border-box; margin: 0; padding: 0; }}
            body {{
                font-family: 'Inter', -apple-system, sans-serif;
                background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%);
                color: #f1f5f9;
                min-height: 100vh;
                padding: 2rem;
            }}
            .container {{ max-width: 800px; margin: 0 auto; }}
            .card {{
                background: rgba(30, 30, 50, 0.8);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 1rem;
                padding: 2rem;
            }}
            .header {{ margin-bottom: 2rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 1rem; }}
            .meta {{ display: flex; gap: 2rem; margin-top: 1rem; color: #94a3b8; font-size: 0.875rem; }}
            .meta span {{ display: flex; align-items: center; gap: 0.5rem; }}
            .message-content {{ line-height: 1.8; white-space: pre-wrap; }}
            .actions {{ margin-top: 2rem; display: flex; gap: 1rem; }}
            .btn {{
                padding: 0.75rem 1.5rem;
                border-radius: 0.5rem;
                text-decoration: none;
                font-weight: 600;
                cursor: pointer;
                border: none;
            }}
            .btn-primary {{ background: #6366f1; color: white; }}
            .btn-secondary {{ background: rgba(255, 255, 255, 0.1); color: #f1f5f9; }}
            a {{ color: #6366f1; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="card">
                <div class="header">
                    <h1>{message['subject']}</h1>
                    <div class="meta">
                        <span>From: <strong>{message['name']}</strong></span>
                        <span>Email: <a href="mailto:{message['email']}">{message['email']}</a></span>
                        <span>Date: {message['created_at']}</span>
                    </div>
                </div>
                <div class="message-content">{message['message']}</div>
                <div class="actions">
                    <a href="mailto:{message['email']}?subject=Re: {message['subject']}" class="btn btn-primary">Reply</a>
                    <a href="/admin/dashboard" class="btn btn-secondary">← Back</a>
                </div>
            </div>
        </div>
    </body>
    </html>
    '''

# =====================
# Error Handlers
# =====================

@app.errorhandler(404)
def not_found(e):
    """Handle 404 errors."""
    return app.send_static_file('../pages/404.html'), 404

@app.errorhandler(500)
def server_error(e):
    """Handle 500 errors."""
    return jsonify({'error': 'Internal server error'}), 500

# =====================
# Main Entry Point
# =====================

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') == 'development'
    app.run(host='0.0.0.0', port=port, debug=debug)
