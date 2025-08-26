// Main Interactive Script

// DOM Elements
const elements = {
  // Navigation
  mobileMenuToggle: document.querySelector('.mobile-menu-toggle'),
  mobileMenu: document.getElementById('mobileMenu'),
  mobileMenuClose: document.querySelector('.mobile-menu-close'),
  searchBtn: document.querySelector('.btn-search'),
  
  // Carousel
  carouselSlides: document.querySelectorAll('.carousel-slide'),
  carouselPrev: document.querySelector('.carousel-prev'),
  carouselNext: document.querySelector('.carousel-next'),
  carouselDots: document.querySelectorAll('.dot'),
  
  // Header
  mainHeader: document.querySelector('.main-header'),
  
  // Mega Menu
  megaMenuItems: document.querySelectorAll('.has-dropdown')
};

// State
let state = {
  currentSlide: 0,
  isSearchOpen: false,
  isMobileMenuOpen: false,
  autoplayInterval: null,
  isScrolled: false
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  initCarousel();
  initNavigation();
  initMegaMenu();
  initSearch();
  initScrollEffects();
  initQuickActions();
  initPetCards();
  initAuthStatus();
});

// Carousel Functionality
function initCarousel() {
  if (!elements.carouselSlides.length) return;
  
  // Show first slide
  showSlide(0);
  
  // Previous button
  elements.carouselPrev?.addEventListener('click', () => {
    clearInterval(state.autoplayInterval);
    previousSlide();
    startAutoplay();
  });
  
  // Next button
  elements.carouselNext?.addEventListener('click', () => {
    clearInterval(state.autoplayInterval);
    nextSlide();
    startAutoplay();
  });
  
  // Dots navigation
  elements.carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      clearInterval(state.autoplayInterval);
      showSlide(index);
      startAutoplay();
    });
  });
  
  // Start autoplay
  startAutoplay();
  
  // Pause on hover
  const carousel = document.querySelector('.hero-carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => clearInterval(state.autoplayInterval));
    carousel.addEventListener('mouseleave', () => startAutoplay());
  }
}

function showSlide(index) {
  // Hide all slides
  elements.carouselSlides.forEach(slide => {
    slide.classList.remove('active');
  });
  
  // Remove active from all dots
  elements.carouselDots.forEach(dot => {
    dot.classList.remove('active');
  });
  
  // Show current slide
  if (elements.carouselSlides[index]) {
    elements.carouselSlides[index].classList.add('active');
  }
  
  // Activate current dot
  if (elements.carouselDots[index]) {
    elements.carouselDots[index].classList.add('active');
  }
  
  state.currentSlide = index;
}

function nextSlide() {
  state.currentSlide = (state.currentSlide + 1) % elements.carouselSlides.length;
  showSlide(state.currentSlide);
}

function previousSlide() {
  state.currentSlide = (state.currentSlide - 1 + elements.carouselSlides.length) % elements.carouselSlides.length;
  showSlide(state.currentSlide);
}

function startAutoplay() {
  state.autoplayInterval = setInterval(nextSlide, 5000);
}

// Navigation Functionality
function initNavigation() {
  // Mobile menu toggle
  elements.mobileMenuToggle?.addEventListener('click', toggleMobileMenu);
  elements.mobileMenuClose?.addEventListener('click', closeMobileMenu);
  
  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (state.isMobileMenuOpen && 
        !elements.mobileMenu?.contains(e.target) && 
        !elements.mobileMenuToggle?.contains(e.target)) {
      closeMobileMenu();
    }
  });
  
  // Close mobile menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.isMobileMenuOpen) {
      closeMobileMenu();
    }
  });
  
  // Mobile submenu toggles
  const mobileNavItems = document.querySelectorAll('.mobile-nav .has-submenu');
  mobileNavItems.forEach(item => {
    const link = item.querySelector('a');
    link?.addEventListener('click', (e) => {
      e.preventDefault();
      item.classList.toggle('open');
    });
  });
}

function toggleMobileMenu() {
  state.isMobileMenuOpen = !state.isMobileMenuOpen;
  
  if (state.isMobileMenuOpen) {
    elements.mobileMenu?.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Animate menu items
    const menuItems = elements.mobileMenu?.querySelectorAll('li');
    menuItems?.forEach((item, index) => {
      item.style.animation = `fadeInUp 0.3s ease ${index * 0.05}s both`;
    });
  } else {
    closeMobileMenu();
  }
}

function closeMobileMenu() {
  state.isMobileMenuOpen = false;
  elements.mobileMenu?.classList.remove('active');
  document.body.style.overflow = '';
}

// Mega Menu Functionality
function initMegaMenu() {
  // Mega menu is handled purely by CSS, no JavaScript needed
  // This function is kept for potential future enhancements
}

// Search Functionality
function initSearch() {
  elements.searchBtn?.addEventListener('click', toggleSearch);
  
  // Close search on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.isSearchOpen) {
      closeSearch();
    }
  });
}

function toggleSearch() {
  state.isSearchOpen = !state.isSearchOpen;
  
  if (state.isSearchOpen) {
    openSearch();
  } else {
    closeSearch();
  }
}

function openSearch() {
  // Create search overlay
  const searchOverlay = document.createElement('div');
  searchOverlay.className = 'search-overlay';
  searchOverlay.innerHTML = `
    <div class="search-container">
      <button class="search-close">&times;</button>
      <form class="search-form">
        <input type="search" placeholder="Search for pets, articles, events..." class="search-input" autofocus>
        <button type="submit" class="search-submit">Search</button>
      </form>
      <div class="search-suggestions">
        <h4>Popular Searches</h4>
        <div class="suggestion-tags">
          <a href="#" class="suggestion-tag">Golden Retriever</a>
          <a href="#" class="suggestion-tag">Adoption Process</a>
          <a href="#" class="suggestion-tag">Pet Care Tips</a>
          <a href="#" class="suggestion-tag">Volunteer</a>
          <a href="#" class="suggestion-tag">Upcoming Events</a>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(searchOverlay);
  document.body.style.overflow = 'hidden';
  
  // Animate in
  setTimeout(() => {
    searchOverlay.classList.add('active');
  }, 10);
  
  // Close button
  searchOverlay.querySelector('.search-close')?.addEventListener('click', closeSearch);
  
  // Click outside to close
  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
      closeSearch();
    }
  });
  
  // Handle search form
  const searchForm = searchOverlay.querySelector('.search-form');
  searchForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchOverlay.querySelector('.search-input').value;
    if (query.trim()) {
      // In real app, would perform search
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  });
}

function closeSearch() {
  state.isSearchOpen = false;
  const searchOverlay = document.querySelector('.search-overlay');
  
  if (searchOverlay) {
    searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
    
    setTimeout(() => {
      searchOverlay.remove();
    }, 300);
  }
}

// Scroll Effects
function initScrollEffects() {
  let lastScroll = 0;
  
  window.addEventListener('scroll', throttle(() => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class
    if (currentScroll > 50) {
      if (!state.isScrolled) {
        state.isScrolled = true;
        elements.mainHeader?.classList.add('scrolled');
      }
    } else {
      if (state.isScrolled) {
        state.isScrolled = false;
        elements.mainHeader?.classList.remove('scrolled');
      }
    }
    
    // Hide/show header on scroll
    if (currentScroll > lastScroll && currentScroll > 300) {
      elements.mainHeader?.classList.add('hidden');
    } else {
      elements.mainHeader?.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
  }, 100));
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements
  document.querySelectorAll('.pet-card, .news-card, .action-card, .info-card').forEach(el => {
    observer.observe(el);
  });
}

// Quick Actions
function initQuickActions() {
  const actionCards = document.querySelectorAll('.action-card');
  
  actionCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
}

// Pet Cards - Make them clickable
function initPetCards() {
  const petCards = document.querySelectorAll('.pet-card');
  
  petCards.forEach(card => {
    // Add pointer cursor
    card.style.cursor = 'pointer';
    
    // Make entire card clickable
    card.addEventListener('click', function(e) {
      // Don't navigate if clicking on a button or link inside the card
      if (!e.target.closest('button') && !e.target.closest('a')) {
        // Find the meet button link to get the URL
        const meetBtn = card.querySelector('.btn-card, .meet-btn, a[href*="details"]');
        if (meetBtn && meetBtn.href) {
          window.location.href = meetBtn.href;
        }
      }
    });
    
    // Handle favorite button if it exists
    const favoriteBtn = card.querySelector('.favorite-btn');
    if (favoriteBtn) {
      favoriteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        // Update icon based on state
        if (this.classList.contains('active')) {
          this.textContent = '❤️';
        } else {
          this.textContent = '♡';
        }
      });
    }
  });
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = this.querySelector('input[type="email"]').value;
  const button = this.querySelector('button');
  const originalText = button.textContent;
  
  // Show loading state
  button.textContent = 'Subscribing...';
  button.disabled = true;
  
  // Simulate API call
  setTimeout(() => {
    button.textContent = 'Subscribed! ✓';
    button.style.background = '#7ad03a';
    
    // Reset after 3 seconds
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      button.style.background = '';
      this.reset();
    }, 3000);
  }, 1500);
});

// Utility Functions
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

function debounce(func, delay) {
  let timeoutId;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(context, args), delay);
  };
}

// Add search overlay styles dynamically
const searchStyles = document.createElement('style');
searchStyles.textContent = `
  .search-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .search-overlay.active {
    opacity: 1;
  }
  
  .search-container {
    width: 90%;
    max-width: 600px;
    transform: translateY(-20px);
    transition: transform 0.3s ease;
  }
  
  .search-overlay.active .search-container {
    transform: translateY(0);
  }
  
  .search-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    color: white;
    font-size: 40px;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  
  .search-close:hover {
    transform: scale(1.1);
  }
  
  .search-form {
    display: flex;
    gap: 15px;
    margin-bottom: 30px;
  }
  
  .search-input {
    flex: 1;
    padding: 20px;
    font-size: 18px;
    border: none;
    border-radius: 8px;
    background: white;
  }
  
  .search-submit {
    padding: 20px 40px;
    background: #ffba00;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .search-submit:hover {
    background: #958e09;
    transform: translateY(-2px);
  }
  
  .search-suggestions {
    color: white;
    text-align: center;
  }
  
  .search-suggestions h4 {
    margin-bottom: 15px;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.7;
  }
  
  .suggestion-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }
  
  .suggestion-tag {
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border-radius: 20px;
    text-decoration: none;
    transition: all 0.3s ease;
  }
  
  .suggestion-tag:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
  
  /* Header scroll effects */
  .main-header {
    transition: all 0.3s ease;
  }
  
  .main-header.scrolled {
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  }
  
  .main-header.hidden {
    transform: translateY(-100%);
  }
  
  /* Animation classes */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-in {
    animation: fadeInUp 0.6s ease both;
  }
`;

document.head.appendChild(searchStyles);

// Auth Status Management (simplified - auth will be added later)
function initAuthStatus() {
  // Simplified version - profile is always accessible
  // Auth functionality will be implemented later
  
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userName = localStorage.getItem('userName');
  
  // Only handle logout functionality if user is logged in
  const topBarRight = document.querySelector('.top-bar-right');
  if (topBarRight && isLoggedIn) {
    const loginLink = topBarRight.querySelector('a[href*="auth"]');
    
    if (loginLink) {
      // Change Login to Logout
      loginLink.textContent = 'Logout';
      loginLink.href = '#';
      loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        logoutUser();
      });
    }
    
    // Update profile link with user name if available
    const profileLink = topBarRight.querySelector('a[href*="profile"]');
    if (profileLink && userName) {
      profileLink.innerHTML = `👤 ${userName.split(' ')[0]}`;
    }
  }
}

// Logout function
function logoutUser() {
  if (confirm('Are you sure you want to logout?')) {
    // Clear localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    // Redirect to home page
    const currentPath = window.location.pathname;
    if (currentPath.includes('/pets/') || currentPath.includes('/shop/')) {
      window.location.href = '../index.html';
    } else {
      window.location.href = 'index.html';
    }
  }
}

// Initialize page
console.log('Pet adoption site initialized');