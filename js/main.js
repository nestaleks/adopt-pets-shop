// Main JavaScript File - Core Functionality

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCards();
    initializeForms();
    initializeModals();
    initializeAnimations();
});

// Navigation
function initializeNavigation() {
    const mobileToggle = document.querySelector('.navbar-mobile-toggle');
    const navbar = document.querySelector('.navbar');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navbar.classList.toggle('mobile-open');
            this.classList.toggle('active');
            
            // Animate hamburger
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Active link highlighting
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
    
    // Sticky navigation
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show on scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });
}

// Cards
function initializeCards() {
    // Favorite buttons
    const favoriteButtons = document.querySelectorAll('.card-favorite');
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('active');
            
            // Update favorites count
            const badge = document.querySelector('.navbar-actions .badge');
            if (badge) {
                let count = parseInt(badge.textContent) || 0;
                count = this.classList.contains('active') ? count + 1 : count - 1;
                badge.textContent = Math.max(0, count);
            }
            
            // Show notification
            showNotification(this.classList.contains('active') ? 
                'Added to favorites!' : 'Removed from favorites');
        });
    });
    
    // Make pet cards clickable
    const petCards = document.querySelectorAll('.pet-card');
    petCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('button') && !e.target.closest('a')) {
                window.location.href = 'pets/details.html';
            }
        });
    });
}

// Forms
function initializeForms() {
    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    });
    
    // Input focus effects
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value) {
                this.parentElement.classList.add('has-value');
            } else {
                this.parentElement.classList.remove('has-value');
            }
        });
    });
}

// Form Validation
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('is-invalid');
            showFieldError(field, 'This field is required');
        } else {
            field.classList.remove('is-invalid');
            clearFieldError(field);
        }
        
        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                field.classList.add('is-invalid');
                showFieldError(field, 'Please enter a valid email address');
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(field.value)) {
                isValid = false;
                field.classList.add('is-invalid');
                showFieldError(field, 'Please enter a valid phone number');
            }
        }
    });
    
    return isValid;
}

function showFieldError(field, message) {
    let errorElement = field.parentElement.querySelector('.form-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        field.parentElement.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearFieldError(field) {
    const errorElement = field.parentElement.querySelector('.form-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Modals
function initializeModals() {
    // Open modal
    document.addEventListener('click', function(e) {
        if (e.target.hasAttribute('data-modal')) {
            e.preventDefault();
            const modalId = e.target.getAttribute('data-modal');
            openModal(modalId);
        }
    });
    
    // Close modal
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-backdrop') || 
            e.target.classList.contains('modal-close')) {
            closeModal();
        }
    });
    
    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const activeModal = document.querySelector('.modal.active');
    if (activeModal) {
        activeModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Animations
function initializeAnimations() {
    // Intersection Observer for animations
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animation = entry.target.getAttribute('data-animate');
                    entry.target.classList.add('animated', animation);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => observer.observe(el));
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        background: type === 'success' ? '#054731' : '#D95E16',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '9999',
        animation: 'slideIn 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Local Storage Helpers
const storage = {
    get: (key) => {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch {
            return null;
        }
    },
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            console.error('Failed to save to localStorage');
        }
    },
    remove: (key) => {
        localStorage.removeItem(key);
    }
};

// API Helpers (for future backend integration)
const api = {
    baseURL: '/api',
    
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };
        
        try {
            const response = await fetch(url, config);
            if (!response.ok) throw new Error('Request failed');
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },
    
    get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    },
    
    post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },
    
    put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },
    
    delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
};

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        openModal,
        closeModal,
        storage,
        api,
        debounce,
        throttle
    };
}