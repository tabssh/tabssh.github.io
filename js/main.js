// TabSSH Website JavaScript
(function() {
  'use strict';
  
  // Theme toggle functionality
  function initThemeToggle() {
    const button = document.querySelector('.theme-toggle');
    const icon = document.querySelector('.theme-icon');
    
    if (!button || !icon) {
      console.warn('Theme toggle elements not found');
      return;
    }
    
    function updateButton() {
      const isDark = document.documentElement.classList.contains('dark');
      icon.textContent = isDark ? '☀️' : '🌙';
      button.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    }
    
    function toggleTheme() {
      const isDark = document.documentElement.classList.contains('dark');
      
      if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        console.log('Switched to light theme');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        console.log('Switched to dark theme');
      }
      
      updateButton();
    }
    
    button.addEventListener('click', toggleTheme);
    updateButton();
    
    console.log('Theme toggle initialized');
  }
  
  // Download detection
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
  
  // Initialize everything
  function init() {
    initThemeToggle();
    initDownloadDetection();
    initSmoothScrolling();
    
    console.log('TabSSH website loaded successfully');
  }
  
  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();