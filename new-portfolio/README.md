# Arinda Joseph Portfolio

A premium, production-ready personal portfolio website built with HTML5, CSS3, JavaScript, and Python Flask.

## 🌟 Features

### Frontend
- **Modern Design**: Glassmorphism, soft shadows, rounded cards
- **Dark/Light Mode**: Theme toggle with localStorage persistence
- **Responsive**: Mobile-first design with smooth animations
- **Accessibility**: ARIA labels, keyboard navigation, semantic HTML
- **SEO Optimized**: robots.txt, sitemap.xml, Open Graph, Schema.org

### Backend (Python Flask)
- **REST API**: Contact form, newsletter subscription, analytics
- **SQLite Database**: Messages, subscribers, page views
- **SMTP Email**: Contact form notifications via Gmail
- **Admin Dashboard**: View messages, track analytics
- **Spam Protection**: Honeypot fields, rate limiting

### Pages
- Home
- About
- Projects (with search & filter)
- Skills
- Experience
- Services
- Certifications
- Blog
- Contact
- 404 Error Page

## 🚀 Quick Start

### Frontend Only (Static)

Simply open `index.html` in a browser or serve with any static file server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

### Full Stack (With Backend)

1. **Install dependencies**:
```bash
cd backend
pip install -r requirements.txt
```

2. **Set environment variables**:
```bash
# Create .env file
cp .env.example .env
```

Edit `.env` with your settings:
```env
SECRET_KEY=your-secret-key
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-admin-password
```

3. **Run the server**:
```bash
python app.py
```

4. Visit `http://localhost:5000`

## 📁 Project Structure

```
new-portfolio/
├── index.html              # Home page
├── pages/                  # HTML pages
│   ├── about.html
│   ├── projects.html
│   ├── skills.html
│   ├── experience.html
│   ├── services.html
│   ├── certifications.html
│   ├── blog.html
│   ├── contact.html
│   └── 404.html
├── css/
│   └── main.css            # Complete stylesheet
├── js/
│   └── main.js             # JavaScript modules
├── images/
│   └── favicon.svg
├── seo/
│   ├── robots.txt
│   └── sitemap.xml
└── backend/
    ├── app.py               # Flask application
    ├── requirements.txt
    └── portfolio.db         # SQLite database (created on first run)
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SECRET_KEY` | Flask secret key | `your-secret-key` |
| `SMTP_USERNAME` | Gmail for sending emails | - |
| `SMTP_PASSWORD` | Gmail app password | - |
| `ADMIN_USERNAME` | Admin login username | `admin` |
| `ADMIN_PASSWORD` | Admin login password | `change-this-password` |
| `PORT` | Server port | `5000` |

### Gmail SMTP Setup

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password: Google Account → Security → App passwords
3. Use the app password as `SMTP_PASSWORD`

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/contact` | POST | Submit contact form |
| `/api/newsletter` | POST | Subscribe to newsletter |
| `/api/analytics` | GET | Get public analytics |

### Contact Form
```json
POST /api/contact
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I'd like to discuss..."
}
```

### Newsletter
```json
POST /api/newsletter
{
  "email": "subscriber@example.com"
}
```

## 🔐 Admin Panel

Access at `/admin/login` after setting credentials.

Features:
- View all contact messages
- Mark messages as read
- Reply to messages
- View analytics dashboard
- Track newsletter subscribers

## 🎨 Customization

### Colors
Edit CSS variables in `css/main.css`:
```css
:root {
  --primary: #6366f1;
  --primary-light: #818cf8;
  --primary-dark: #4f46e5;
  /* ... more variables */
}
```

### Content
Update the HTML content in each page file with your personal information.

### Skills & Projects
Edit the respective data arrays in the HTML files or connect to a backend API.

## 🚀 Deployment

### Vercel/Netlify (Frontend Only)
1. Push to GitHub
2. Connect repository to Vercel/Netlify
3. Deploy

### Railway/Render/Railway (Full Stack)
1. Push to GitHub
2. Connect repository
3. Set environment variables
4. Deploy

### Docker
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "backend/app.py"]
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📄 License

© 2024 Arinda Joseph. All rights reserved.

## 🙏 Credits

- Design inspired by modern glassmorphism trends
- Built with vanilla HTML, CSS, and JavaScript
- Backend powered by Python Flask
