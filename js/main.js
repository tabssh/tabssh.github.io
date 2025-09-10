// TabSSH Website JavaScript
(function() {
  'use strict';
  
  // Theme toggle functionality
  function initThemeToggle() {
    const button = document.querySelector('.theme-toggle');
    const icon = document.querySelector('.theme-icon');
    
    console.log('Looking for theme toggle elements...');
    console.log('Button found:', !!button);
    console.log('Icon found:', !!icon);
    
    if (!button || !icon) {
      console.error('Theme toggle elements not found!');
      console.log('Available buttons:', document.querySelectorAll('button'));
      console.log('Available .theme-icon:', document.querySelectorAll('.theme-icon'));
      return;
    }
    
    function updateButton() {
      const isDark = document.documentElement.classList.contains('dark');
      console.log('Updating button, isDark:', isDark);
      icon.textContent = isDark ? '☀️' : '🌙';
      button.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    }
    
    function toggleTheme() {
      const isDark = document.documentElement.classList.contains('dark');
      console.log('Toggle clicked! Current state:', isDark ? 'dark' : 'light');
      console.log('HTML element:', document.documentElement);
      console.log('Current classes before toggle:', document.documentElement.className);
      
      if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        console.log('Removed dark class, set storage to light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        console.log('Added dark class, set storage to dark');
      }
      
      console.log('Classes after toggle:', document.documentElement.className);
      updateButton();
    }
    
    button.addEventListener('click', toggleTheme);
    updateButton();
    
    console.log('Theme toggle fully initialized');
    console.log('Current localStorage theme:', localStorage.getItem('theme'));
    console.log('Current HTML classes:', document.documentElement.className);
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