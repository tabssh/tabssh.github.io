// TabSSH Website JavaScript
(function () {
  'use strict';

  // Download detection for better UX
  function initDownloadDetection() {
    const userAgent = navigator.userAgent;
    const isAndroid = /Android/i.test(userAgent);

    if (isAndroid) {
      console.log('🎉 Android device detected!');

      // Add Android-specific messaging
      const downloadOptions = document.querySelectorAll('.download-option');
      downloadOptions.forEach((option) => {
        const title = option.querySelector('h3');
        if (title && title.textContent.includes('Latest Release')) {
          const badge = document.createElement('span');
          badge.className = 'badge';
          badge.style.cssText =
            'background-color: var(--success); color: white; margin-left: var(--space-2);';
          badge.textContent = 'Perfect for your device!';
          title.appendChild(badge);
        }
      });
    }
  }

  // Smooth scrolling for anchor links
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  }

  // Accessibility improvements
  function initAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', function () {
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
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        closeMenu();
      }
    });

    console.log('Mobile menu initialized');
  }

  // Each platform has its own GitHub repo and asset-naming convention.
  // We fetch both, classify into stable/dev, and populate the matching
  // [data-release-section="..."] containers in download.html. Adding a third
  // platform later is just another entry in this array — no other JS edits.
  const PLATFORMS = [
    {
      // Android APKs from TabSSH/android. Excludes the monthly mosh-1.4.0
      // releases (those have no tabssh-*.apk assets, so they fail isApp).
      repo: 'TabSSH/android',
      sectionPrefix: 'mobile',
      isApp: (asset) => /^tabssh-.*\.apk$/i.test(asset.name),
      assetRegex: (arch) =>
        new RegExp(`^tabssh-${escapeRegex(arch)}(-dev)?\\.apk$`, 'i'),
    },
    {
      // Desktop binaries from tabssh/desktop. Asset names are
      // tabssh-{os}-{arch} with optional .exe on Windows. The app-asset
      // regex pins to the supported OS list so unrelated artifacts (a
      // signed source tarball, a checksum file) don't accidentally count
      // a release as an "app release".
      repo: 'tabssh/desktop',
      sectionPrefix: 'desktop',
      isApp: (asset) =>
        /^tabssh-(linux|macos|windows|freebsd|openbsd|netbsd)-(amd64|arm64)(\.exe)?$/i.test(
          asset.name
        ),
      assetRegex: (arch) =>
        new RegExp(`^tabssh-${escapeRegex(arch)}(\\.exe)?$`, 'i'),
    },
  ];

  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Fetch every configured platform's releases and populate stable + dev
  // sections for each. Each download URL comes straight from the API's
  // `browser_download_url`, so we never construct URLs from a hardcoded
  // version or asset name — promoting a build from prerelease to stable
  // just lights up the page on the next load with no code changes.
  function initVersionFetching() {
    PLATFORMS.forEach(fetchPlatformReleases);
  }

  function fetchPlatformReleases(platform) {
    const apiUrl = `https://api.github.com/repos/${platform.repo}/releases`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((releases) => {
        if (!Array.isArray(releases)) {
          console.warn(
            `Releases API for ${platform.repo} did not return an array:`,
            releases
          );
          return;
        }

        const appReleases = releases.filter(
          (r) =>
            r &&
            Array.isArray(r.assets) &&
            r.assets.some(platform.isApp)
        );

        const latestStable = appReleases.find((r) => !r.prerelease) || null;
        const latestDev = appReleases.find((r) => r.prerelease) || null;

        console.log(
          `[${platform.sectionPrefix}] stable:`,
          latestStable && latestStable.tag_name,
          `dev:`,
          latestDev && latestDev.tag_name
        );

        populateReleaseSection(
          `${platform.sectionPrefix}-stable`,
          latestStable,
          platform
        );
        populateReleaseSection(
          `${platform.sectionPrefix}-dev`,
          latestDev,
          platform
        );
      })
      .catch((error) => {
        console.warn(`Could not fetch ${platform.repo} releases:`, error);
      });
  }

  // Populate one release section with data from a GitHub release object.
  // If `release` is null, the section keeps its default state (empty-state
  // visible, real-content hidden) — see download.html
  // `[data-release-section]` containers.
  function populateReleaseSection(sectionName, release, platform) {
    const root = document.querySelector(
      `[data-release-section="${sectionName}"]`
    );
    if (!root) return;

    if (!release) {
      // Keep default state: empty-state visible, real-content hidden.
      return;
    }

    const emptyState = root.querySelector('[data-empty-state]');
    const realContent = root.querySelector('[data-real-content]');
    if (emptyState) emptyState.setAttribute('hidden', '');
    if (realContent) realContent.removeAttribute('hidden');

    // Version badge — show release name if it's distinct from the tag,
    // otherwise just the tag. Dev releases often have tag="development"
    // and name="1.0.0-8d267f6", so prefer the name when it's set + different.
    const versionLabel =
      release.name && release.name !== release.tag_name
        ? release.name
        : release.tag_name;
    root.querySelectorAll('.version-badge').forEach((badge) => {
      badge.textContent = versionLabel;
    });

    // Release date
    if (release.published_at) {
      const releaseDate = new Date(release.published_at).toLocaleDateString(
        'en-US',
        { year: 'numeric', month: 'long', day: 'numeric' }
      );
      root.querySelectorAll('.release-date').forEach((el) => {
        el.textContent = `Released: ${releaseDate}`;
      });
    }

    // Download buttons — match each [data-arch] to a real asset by name.
    // Asset-naming rules differ per platform (.apk for Android,
    // tabssh-{os}-{arch}[.exe] for Desktop), so the regex factory comes
    // from the platform config.
    root.querySelectorAll('a[data-arch]').forEach((link) => {
      const arch = link.getAttribute('data-arch');
      if (!arch) return;
      const re = platform.assetRegex(arch);
      const asset = release.assets.find((a) => re.test(a.name));
      if (asset && asset.browser_download_url) {
        link.setAttribute('href', asset.browser_download_url);
        link.removeAttribute('hidden');
      } else {
        // Hide buttons whose architecture isn't shipped in this release.
        link.setAttribute('hidden', '');
      }
    });
  }

  // Check Google Play Store availability with proper error detection
  function initPlayStoreCheck() {
    const PLAY_STORE_URL =
      'https://play.google.com/store/apps/details?id=io.github.tabssh';

    // Use a CORS proxy service that can actually fetch the content
    const PROXY_URL = `https://api.allorigins.win/get?url=${encodeURIComponent(
      PLAY_STORE_URL
    )}`;

    fetch(PROXY_URL)
      .then((response) => response.json())
      .then((data) => {
        const content = data.contents;

        // Check for specific error indicators in the HTML content
        const notFoundIndicators = [
          "We're sorry, the requested URL was not found",
          'Item not found',
          'This app is unavailable',
          'Not found',
          'Error 404',
        ];

        const hasError = notFoundIndicators.some((indicator) =>
          content.toLowerCase().includes(indicator.toLowerCase())
        );

        // Check for positive indicators that the app exists
        const appIndicators = [
          '"TabSSH"',
          'id="io.github.tabssh"',
          'application-name',
          'Install',
          'Download',
        ];

        const hasApp = appIndicators.some((indicator) =>
          content.toLowerCase().includes(indicator.toLowerCase())
        );

        if (hasError || !hasApp) {
          console.log('Play Store: App not found (404 or error page detected)');
          throw new Error('App not available on Play Store');
        }

        console.log('TabSSH is available on Google Play Store!');

        // Update "Coming Soon" sections for Play Store
        document
          .querySelectorAll('.playstore-coming-soon')
          .forEach((element) => {
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
      .catch((error) => {
        console.log('Google Play Store not yet available:', error.message);
        // Keep "Coming Soon" status

        // Add a note that it's actively being worked on
        document
          .querySelectorAll('.playstore-coming-soon')
          .forEach((element) => {
            const note = document.createElement('p');
            note.style.cssText =
              'font-size: var(--font-size-xs); color: var(--text-secondary); margin-top: var(--space-2); font-style: italic;';
            note.textContent =
              'Status checked automatically - will update when published';
            element.appendChild(note);
          });
      });
  }

  // Check F-Droid availability
  function initFDroidCheck() {
    const FDROID_API = 'https://f-droid.org/api/v1/packages/io.github.tabssh';

    fetch(FDROID_API)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Not available on F-Droid yet');
      })
      .then((data) => {
        console.log('TabSSH is available on F-Droid!');

        // Enable F-Droid links and update "Coming Soon" sections
        document.querySelectorAll('.fdroid-coming-soon').forEach((element) => {
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
        const downloadInstructions = document.querySelector(
          '.download-instructions'
        );
        if (downloadInstructions) {
          downloadInstructions.innerHTML =
            `
            <div class="alert alert-success">
              <strong>Now Available!</strong> TabSSH is now available on F-Droid as the recommended installation method.
            </div>
          ` + downloadInstructions.innerHTML;
        }
      })
      .catch((error) => {
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
