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

  // Unified asset naming schema: tabssh-{platform}-{arch}[-dev][.ext]
  //
  // Android arch tags (matching the desktop simplification):
  //   arm64 / arm / amd64 / x86 / universal
  // (canonically: arm64-v8a → arm64, armeabi-v7a → arm, x86_64 → amd64.)
  //
  // No version suffix in the filename — the GitHub release tag carries
  // the version, and the asset URL is uniquely scoped per release.
  //
  // Built-by-workflow filename forms:
  //   • Stable (release.yml):       tabssh-android-{arch}.apk
  //   • Development (dev workflow): tabssh-android-{arch}-dev.apk
  //
  // F-Droid distribution: F-Droid clones the source and builds on its
  // own infra. We don't upload our F-Droid-flavored APK to GH releases.
  // The `-fdroid` filter in `isApp` below is defensive — historical
  // releases (pre-2026-04) included `tabssh-android-{arch}-fdroid.apk`
  // assets and we skip those.
  //
  // Older releases (pre-2026-04 unification) also used
  // `tabssh-{arch}-dev.apk`, `tabssh-{arch}.apk`, and
  // `tabssh-android-{arch}-{version}.apk` — all three are still accepted
  // by the regex below so historical releases on the page still resolve.
  const ANDROID_ARCH_ALIASES = {
    'universal': ['universal'],
    'arm64':     ['arm64', 'arm64-v8a'],         // legacy alias accepted
    'arm':       ['arm', 'armeabi-v7a'],         // legacy alias accepted
    'amd64':     ['amd64', 'x86_64'],            // legacy alias accepted
    'x86':       ['x86'],
  };

  // Each platform has its own GitHub repo and asset-naming convention.
  // We fetch both, classify into stable/dev, and populate the matching
  // [data-release-section="..."] containers in download.html. Adding a third
  // platform later is just another entry in this array — no other JS edits.
  const PLATFORMS = [
    {
      // Android APKs from TabSSH/android. F-Droid variants are filtered out
      // here so they don't double-up the per-arch buttons (F-Droid has its
      // own distribution channel — see download.html "Coming Soon").
      repo: 'TabSSH/android',
      sectionPrefix: 'mobile',
      isApp: (asset) =>
        /\.apk$/i.test(asset.name) && !/-fdroid/i.test(asset.name),
      assetRegex: (arch) => {
        const aliases = ANDROID_ARCH_ALIASES[arch] || [arch];
        const aliasGroup = aliases.map(escapeRegex).join('|');
        // Matches both unified and legacy forms:
        //   tabssh-android-{alias}-dev.apk                (current dev)
        //   tabssh-android-{alias}-{version}.apk          (current stable, with version)
        //   tabssh-{alias}-dev.apk                        (legacy dev pre-2026-04)
        //   tabssh-{alias}.apk                            (legacy local-build pre-2026-04)
        // Anchored so e.g. arm doesn't accidentally match arm64.
        return new RegExp(
          `^tabssh-(android-)?(${aliasGroup})(-dev|-[\\d].*)?\\.apk$`,
          'i'
        );
      },
    },
    {
      // Desktop binaries from tabssh/desktop. Filename convention mirrors
      // the Android dev workflow — no version suffix in the filename, the
      // version lives in the release tag/title:
      //   • Stable (release.yml):     tabssh-{platform}-{arch}[.exe]
      //   • Development (dev.yml):    tabssh-{platform}-{arch}-dev[.exe]
      // The app-asset predicate pins to the supported OS list so unrelated
      // artifacts (source tarball, checksum file) don't count as an "app
      // release".
      repo: 'tabssh/desktop',
      sectionPrefix: 'desktop',
      isApp: (asset) =>
        /^tabssh-(linux|macos|windows|freebsd|openbsd|netbsd)-(amd64|arm64)(-dev)?(\.exe)?$/i.test(
          asset.name
        ),
      assetRegex: (arch) =>
        new RegExp(`^tabssh-${escapeRegex(arch)}(-dev)?(\\.exe)?$`, 'i'),
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

    console.log('TabSSH website loaded successfully');
  }

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
