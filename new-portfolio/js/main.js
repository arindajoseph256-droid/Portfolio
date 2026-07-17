/* ============================================
   ARINDA JOSEPH PORTFOLIO - MAIN JAVASCRIPT
   Modular Vanilla JS Implementation
   ============================================ */

// Main Application Module
const Portfolio = {
  // Initialize the application
  init() {
    this.loadTheme();
    this.initNavigation();
    this.initScrollEffects();
    this.initAnimations();
    this.initBackToTop();
    this.initSmoothScroll();
    this.initFormHandler();
    this.initSearch();
    this.initFilter();
    console.log('Portfolio initialized successfully');
  },

  // Theme Management
  loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  },

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  },

  // Navigation
  initNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const themeToggle = document.querySelector('.theme-toggle');

    // Scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    });

    // Mobile menu toggle
    mobileMenuBtn?.addEventListener('click', () => {
      mobileNav?.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu on link click
    mobileNav?.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileMenuBtn?.classList.remove('active');
      });
    });

    // Theme toggle
    themeToggle?.addEventListener('click', () => this.toggleTheme());

    // Active link highlighting
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      }
    });
  },

  // Scroll Effects
  initScrollEffects() {
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      if (scrollProgress) {
        scrollProgress.style.width = `${progress}%`;
      }
    });
  },

  // Intersection Observer for animations
  initAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate], [data-stagger]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));

    // Animate skill bars when visible
    const skillBars = document.querySelectorAll('.skill-level-bar');
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute('data-width');
          bar.style.width = `${width}%`;
        }
      });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));
  },

  // Back to Top Button
  initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop?.classList.add('visible');
      } else {
        backToTop?.classList.remove('visible');
      }
    });

    backToTop?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },

  // Smooth scroll for anchor links
  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  },

  // Contact Form Handler
  async initFormHandler() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Disable button and show loading
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
      
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Object.fromEntries(formData)),
        });

        const result = await response.json();

        if (response.ok) {
          Toast.show('Message sent successfully! I\'ll get back to you soon.', 'success');
          contactForm.reset();
        } else {
          Toast.show(result.error || 'Failed to send message. Please try again.', 'error');
        }
      } catch (error) {
        Toast.show('Network error. Please check your connection and try again.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  },

  // Search Functionality
  initSearch() {
    const searchInput = document.querySelector('.search-input');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      
      projectCards.forEach(card => {
        const title = card.querySelector('.project-title')?.textContent.toLowerCase() || '';
        const desc = card.querySelector('.project-description')?.textContent.toLowerCase() || '';
        const tags = card.querySelectorAll('.badge');
        const tagsText = Array.from(tags).map(t => t.textContent.toLowerCase()).join(' ');
        
        const matches = title.includes(query) || desc.includes(query) || tagsText.includes(query);
        
        card.style.display = matches ? 'block' : 'none';
      });
    });
  },

  // Filter Functionality
  initFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter projects
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
};

// Toast Notification Module
const Toast = {
  container: null,

  init() {
    this.container = document.createElement('div');
    this.container.className = 'toast-container';
    document.body.appendChild(this.container);
  },

  show(message, type = 'info') {
    if (!this.container) this.init();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
      success: '✓',
      error: '✕',
      info: 'ℹ'
    };

    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || icons.info}</span>
      <span class="toast-message">${message}</span>
    `;

    this.container.appendChild(toast);

    // Auto remove after 5 seconds
    setTimeout(() => {
      toast.style.animation = 'slideInRight 0.3s ease reverse';
      setTimeout(() => toast.remove(), 300);
    }, 5000);

    // Click to dismiss
    toast.addEventListener('click', () => {
      toast.remove();
    });
  }
};

// Newsletter Form Handler
const Newsletter = {
  init() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = form.querySelector('input[type="email"]').value;
      const submitBtn = form.querySelector('button');
      
      try {
        const response = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        const result = await response.json();
        
        if (response.ok) {
          Toast.show('Subscribed successfully!', 'success');
          form.reset();
        } else {
          Toast.show(result.error || 'Failed to subscribe', 'error');
        }
      } catch (error) {
        Toast.show('Network error. Please try again.', 'error');
      }
    });
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  Portfolio.init();
  Newsletter.init();
});

// Export for potential module usage
export { Portfolio, Toast, Newsletter };
