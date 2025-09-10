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
        
        // Build download URLs dynamically with new naming scheme: tabssh-{os}-{arch}-{version}
        const downloadLinks = document.querySelectorAll('.download-link[data-arch]');
        downloadLinks.forEach(link => {
          const arch = link.getAttribute('data-arch');
          if (arch) {
            const downloadUrl = `https://github.com/TabSSH/android/releases/download/${version}/tabssh-android-${arch}-${version}.apk`;
            link.setAttribute('href', downloadUrl);
            console.log(`Updated ${arch} download link:`, downloadUrl);
          }
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
  
  // Check Google Play Store availability
  function initPlayStoreCheck() {
    // Google Play Store doesn't have a direct API, but we can check if the app page exists
    const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=io.github.tabssh';
    
    // Use a proxy service or check method that works with CORS
    fetch(PLAY_STORE_URL, { 
      method: 'HEAD', 
      mode: 'no-cors' 
    })
      .then(() => {
        console.log('TabSSH appears to be available on Google Play Store!');
        
        // Update "Coming Soon" sections for Play Store
        document.querySelectorAll('.playstore-coming-soon').forEach(element => {
          element.innerHTML = `
            <h4>🤖 Google Play Store <span class="badge" style="background-color: var(--success); color: white;">Available!</span></h4>
            <p style="font-size: var(--font-size-sm);">
              Now available on Google Play Store for easy installation and automatic updates.
            </p>
            <div style="margin-top: var(--space-4);">
              <a href="${PLAY_STORE_URL}" class="btn btn-primary">
                Get on Google Play
              </a>
            </div>
          `;
        });
      })
      .catch(error => {
        console.log('Google Play Store not yet available');
        // Keep "Coming Soon" status
      });
  }
  
  // Alternative Play Store check using a different approach
  function checkPlayStoreAvailability() {
    // Create a hidden iframe to test if the Play Store page exists
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = 'https://play.google.com/store/apps/details?id=io.github.tabssh';
    
    iframe.onload = function() {
      console.log('Play Store page loaded - app may be available');
      // Enable Play Store download
      document.querySelectorAll('.playstore-coming-soon').forEach(element => {
        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.style.cssText = 'background-color: var(--success); color: white; margin-left: var(--space-2);';
        badge.textContent = 'Available!';
        
        const heading = element.querySelector('h4');
        if (heading) {
          heading.appendChild(badge);
        }
      });
    };
    
    iframe.onerror = function() {
      console.log('Play Store page not found - app not yet available');
    };
    
    document.body.appendChild(iframe);
    
    // Remove the test iframe after a short delay
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 3000);
  }
  
  // Check F-Droid availability
  function initFDroidCheck() {
    const FDROID_API = 'https://f-droid.org/api/v1/packages/io.github.tabssh';
    
    fetch(FDROID_API)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Not available on F-Droid yet');
      })
      .then(data => {
        console.log('TabSSH is available on F-Droid!');
        
        // Enable F-Droid links and update "Coming Soon" sections
        document.querySelectorAll('.fdroid-coming-soon').forEach(element => {
          element.innerHTML = `
            <h4>🏪 F-Droid <span class="badge" style="background-color: var(--success); color: white;">Available!</span></h4>
            <p style="font-size: var(--font-size-sm);">
              Now available on F-Droid for automatic updates and verified open-source builds.
            </p>
            <div style="margin-top: var(--space-4);">
              <a href="https://f-droid.org/packages/io.github.tabssh" class="btn btn-primary">
                Get on F-Droid
              </a>
            </div>
          `;
        });
        
        // Update download instructions to mention F-Droid as preferred
        const downloadInstructions = document.querySelector('.download-instructions');
        if (downloadInstructions) {
          downloadInstructions.innerHTML = `
            <div class="alert alert-success">
              <strong>Now Available!</strong> TabSSH is now available on F-Droid as the recommended installation method.
            </div>
          ` + downloadInstructions.innerHTML;
        }
      })
      .catch(error => {
        console.log('F-Droid not yet available:', error.message);
        // Keep "Coming Soon" status
      });
  }
  
  // Initialize everything
  function init() {
    initMobileMenu();
    initDownloadDetection();
    initSmoothScrolling();
    initAccessibility();
    initVersionFetching();
    initFDroidCheck();
    initPlayStoreCheck();
    
    console.log('TabSSH website loaded successfully');
  }
  
  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();