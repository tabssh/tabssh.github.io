// TabSSH Website JavaScript
(function() {
  'use strict';
  
  // Download detection for better UX
  function initDownloadDetection() {
    const userAgent = navigator.userAgent;
    const isAndroid = /Android/i.test(userAgent);
    
    if (isAndroid) {
      console.log('🎉 Android device detected!');
      
      // Add Android-specific messaging
      const downloadOptions = document.querySelectorAll('.download-option');
      downloadOptions.forEach(option => {
        const title = option.querySelector('h3');
        if (title && title.textContent.includes('Latest Release')) {
          const badge = document.createElement('span');
          badge.className = 'badge';
          badge.style.cssText = 'background-color: var(--success); color: white; margin-left: var(--space-2);';
          badge.textContent = 'Perfect for your device!';
          title.appendChild(badge);
        }
      });
    }
  }
  
  // Smooth scrolling for anchor links
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
  
  // Accessibility improvements
  function initAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });
    
    document.addEventListener('mousedown', function() {
      document.body.classList.remove('keyboard-navigation');
    });
    
    // Add focus styles for keyboard navigation
    const style = document.createElement('style');
    style.textContent = `
      .keyboard-navigation *:focus {
        outline: 3px solid var(--primary-500) !important;
        outline-offset: 2px !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Mobile menu functionality
  function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.mobile-nav');
    
    if (!toggle || !menu) {
      return; // No mobile menu on this page
    }
    
    function toggleMenu() {
      const isActive = menu.classList.contains('active');
      if (isActive) {
        menu.classList.remove('active');
        toggle.setAttribute('aria-label', 'Open mobile menu');
        toggle.textContent = '☰';
      } else {
        menu.classList.add('active');
        toggle.setAttribute('aria-label', 'Close mobile menu');
        toggle.textContent = '✕';
      }
    }
    
    function closeMenu() {
      menu.classList.remove('active');
      toggle.setAttribute('aria-label', 'Open mobile menu');
      toggle.textContent = '☰';
    }
    
    toggle.addEventListener('click', toggleMenu);
    
    // Close menu when clicking a link
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        closeMenu();
      }
    });
    
    console.log('Mobile menu initialized');
  }
  
  // Fetch latest release version from GitHub API
  function initVersionFetching() {
    const API_URL = 'https://api.github.com/repos/TabSSH/android/releases/latest';
    
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        const version = data.tag_name || 'v1.0.0';
        const releaseDate = new Date(data.published_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long', 
          day: 'numeric'
        });
        
        console.log('Latest version:', version);
        console.log('Release date:', releaseDate);
        
        // Update all version badges
        document.querySelectorAll('.version-badge').forEach(badge => {
          badge.textContent = version;
        });
        
        // Update download links with correct version
        const downloadLinks = document.querySelectorAll('a[href*="releases/download"]');
        downloadLinks.forEach(link => {
          const href = link.getAttribute('href');
          // Replace version in download URLs
          const newHref = href.replace(/\/v[\d.]+\//, `/${version}/`);
          link.setAttribute('href', newHref);
        });
        
        // Update release date displays
        document.querySelectorAll('.release-date').forEach(dateElement => {
          dateElement.textContent = `Released: ${releaseDate}`;
        });
        
        // Update "Latest Version" text
        document.querySelectorAll('.latest-version').forEach(element => {
          element.innerHTML = `<strong>Latest Version:</strong> <span class="badge version-badge">${version}</span>`;
        });
        
      })
      .catch(error => {
        console.warn('Could not fetch latest version:', error);
        console.log('Using fallback version v1.0.0');
      });
  }
  
  // Initialize everything
  function init() {
    initMobileMenu();
    initDownloadDetection();
    initSmoothScrolling();
    initAccessibility();
    initVersionFetching();
    
    console.log('TabSSH website loaded successfully');
  }
  
  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();