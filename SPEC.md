# TabSSH Website Specification for Claude Code

## Project Overview
The TabSSH website (`tabssh.github.io`) is a modern, responsive site for TabSSH — an
open-source SSH client family spanning **Android**, **Desktop** (Linux/macOS/Windows/BSD),
and **Web** (self-hosted). The site is professional, developer-focused, and showcases each
platform's capabilities.

## Technical Requirements

### Platform & Hosting
- **Static Site Generator**: none — plain static HTML/CSS/JS, no build step
- **Hosting**: GitHub Pages (`tabssh.github.io`), `.nojekyll` present to disable Jekyll processing
- **Domain**: `tabssh.github.io` (no custom domain configured)
- **SSL**: Automatic via GitHub Pages

### Technology Stack
```yaml
Frontend:
  - HTML5 semantic markup, hand-authored per page (no templating engine)
  - CSS3 with Flexbox/Grid
  - Vanilla JavaScript (js/main.js) — GitHub Releases API fetch for Android/Desktop
    download links, mobile nav toggle, no framework

Styling:
  - Modern CSS (no framework dependency), single stylesheet: css/main.css
  - CSS custom properties (variables)
  - Mobile-first responsive design
  - Dark theme only (no light mode, no theme toggle)
  - Tokyonight-inspired color palette

Performance:
  - Minimal JavaScript
  - No image optimization pipeline (images served as-is from images/)
```

## Site Structure

### Pages (actual)
```
/                       # Homepage
/download/              # Download page — Android, Desktop, Web
/docs/                  # Documentation hub
/docs/features/         # Android feature deep-dive
/docs/mobile/           # Android docs (install, usage, ssh-keys, ssh-config,
                         #   port-forwarding, themes, first-connection subpages)
/docs/desktop/          # Desktop docs
/docs/web/install/      # Web self-hosted deploy + admin guide
/privacy/               # Privacy policy
/security/              # Security information (per-platform threat model)
/contributing/          # Contribution guidelines
/404.html               # Custom 404 page
```
Exact subpage inventory under `/docs/mobile/` and `/docs/desktop/` should be verified with
`find docs/ -name index.html` before relying on this list — it is a summary, not a guarantee
every subpage exists.

### Build & Deploy
No CI/CD workflow exists in this repo (`.github/workflows/` is absent). GitHub Pages serves
the repository content directly from the default branch; there is no build step to configure.

## Design System

### Color Palette (actual, from css/main.css `:root`)
```css
:root {
  /* Primary Colors */
  --primary-50: #E3F2FD;
  --primary-100: #BBDEFB;
  --primary-500: #7aa2f7;
  --primary-700: #bb9af7;
  --primary-900: #0D47A1;

  /* Semantic Colors */
  --success: #9ece6a;
  --warning: #e0af68;
  --error: #f7768e;
  --info: #7aa2f7;

  /* Theme Colors (dark-only, no light-mode override) */
  --bg-primary: #1a1b26;
  --bg-secondary: #24283b;
  --text-primary: #c0caf5;
  --text-secondary: #a9b1d6;
  --border: #414868;
  --shadow: rgba(0, 0, 0, 0.6);
}
/* Dark theme is the default and only theme — no @media (prefers-color-scheme)
   override and no theme-toggle button/script exist. */
```

Platform-pill badges layer on top of the semantic colors:
```css
.platform-pill.mobile-only  { /* success-tinted */ }
.platform-pill.desktop-only { /* info-tinted */ }
.platform-pill.web-only     { background: rgba(224, 175, 104, 0.15);
                                color: var(--warning);
                                border: 1px solid rgba(224, 175, 104, 0.35); }
```

### Typography
```css
:root {
  --font-family-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-family-mono: 'Roboto Mono', 'SF Mono', Monaco, Consolas, monospace;

  --font-size-xs: 0.75rem;   /* 12px */
  --font-size-sm: 0.875rem;  /* 14px */
  --font-size-base: 1rem;    /* 16px */
  --font-size-lg: 1.125rem;  /* 18px */
  --font-size-xl: 1.25rem;   /* 20px */
  --font-size-2xl: 1.5rem;   /* 24px */
  --font-size-3xl: 1.875rem; /* 30px */
  --font-size-4xl: 2.25rem;  /* 36px */

  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```
Fonts loaded via Google Fonts `<link>` tags per page (`Inter` + `Roboto Mono`), not
self-hosted.

### Layout System
```css
:root {
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.25rem;  /* 20px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-10: 2.5rem;  /* 40px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
  --space-20: 5rem;    /* 80px */
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 var(--space-4); }
.container-sm { max-width: 640px; }
.container-md { max-width: 768px; }
.container-lg { max-width: 1024px; }
.container-xl { max-width: 1200px; }
```

## Component Specifications

### Header/Navigation (actual pattern used on every page)
```html
<header class="site-header">
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <a href="/">
          <img src="/images/logo.png" alt="TabSSH" class="logo">
          <span class="brand-text">TabSSH</span>
        </a>
      </div>
      <ul class="navbar-nav">
        <li><a href="/docs/">Docs</a></li>
        <li><a href="/download/">Download</a></li>
        <li><a href="https://github.com/tabssh" target="_blank" rel="noopener">GitHub</a></li>
      </ul>
      <button class="mobile-menu-toggle" aria-label="Open mobile menu">☰</button>
      <nav class="mobile-nav">
        <ul>
          <li><a href="/docs/">Docs</a></li>
          <li><a href="/download/">Download</a></li>
          <li><a href="https://github.com/tabssh" target="_blank" rel="noopener">GitHub</a></li>
        </ul>
      </nav>
    </div>
  </nav>
  <div class="site-tagline">
    <div class="container">
      <p>Modern SSH client family for Android, Linux, macOS, Windows, BSD, and the web.
         Open-source and privacy-focused.</p>
    </div>
  </div>
</header>
```
There is no theme-toggle button — the site is dark-only. Theme class is still applied via
an inline `<script>` in `<head>` that reads `localStorage`/`prefers-color-scheme` and adds
`.dark` to `<html>`, kept for forward-compatibility but currently has no visual effect since
`:root` values are already dark.

### Feature Grid
```html
<section class="features">
  <div class="container">
    <h2 class="section-title">Why Choose TabSSH?</h2>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">🗂️</div>
        <h3>True Tabbed Interface</h3>
        <p>Browser-style tabs for multiple SSH sessions. Switch between connections instantly.</p>
      </div>
      <!-- More feature cards... -->
    </div>
  </div>
</section>
```

### Download Section (three platforms)
```html
<section class="download">
  <div class="container">
    <h2 class="section-title">Download TabSSH</h2>
    <div class="download-grid">
      <div class="download-option">
        <h3>Android</h3>
        <p>APK, GitHub Releases (auto-fetched via js/main.js)</p>
        <a href="/download/#android" class="btn btn-primary">Download for Android</a>
      </div>
      <div class="download-option">
        <h3>Desktop</h3>
        <p>Linux, macOS, Windows, BSD binaries (auto-fetched via js/main.js)</p>
        <a href="/download/#desktop" class="btn btn-primary">Download for Desktop</a>
      </div>
      <div class="download-option">
        <h3>Web (Self-Hosted)</h3>
        <p>Docker image or standalone binary — you run the server</p>
        <a href="/download/#web" class="btn btn-primary">Get Web</a>
      </div>
    </div>
  </div>
</section>
```
`js/main.js` drives a `PLATFORMS` array that fetches the GitHub Releases API for the
`tabssh/android` and `tabssh/desktop` repos and matches asset names per-platform via regex.
Web is deliberately excluded from this dynamic fetch — its download section uses static
Docker run/compose instructions plus a generic link to
`https://github.com/tabssh/web/releases`, because the Web repo's release asset naming
convention has not been confirmed. Do not add Web to `PLATFORMS` without first confirming
the actual asset names published by that repo's releases.

## Page Templates

Every page is a standalone `.html` file — there is no shared layout include, header, or
footer file. Each page repeats the header/footer markup inline (see Header/Navigation above
and Footer below). When editing shared chrome (tagline, footer links, nav), the change must
be applied to every page individually — there is no single template to edit once.

### Footer (actual pattern used on every page)
```html
<footer class="site-footer">
  <div class="container">
    <hr>
    <div class="footer-content">
      <div class="footer-section">
        <h4>Product</h4>
        <ul>
          <li><a href="/download/">Download</a></li>
          <li><a href="/docs/">Documentation</a></li>
          <li><a href="/docs/features/">Features</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Community</h4>
        <ul>
          <li><a href="https://github.com/tabssh">GitHub Org</a></li>
          <li><a href="https://github.com/tabssh/android">Android Repo</a></li>
          <li><a href="https://github.com/tabssh/desktop">Desktop Repo</a></li>
          <li><a href="https://github.com/tabssh/web">Web Repo</a></li>
          <li><a href="/contributing/">Contributing</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Legal</h4>
        <ul>
          <li><a href="/privacy/">Privacy Policy</a></li>
          <li><a href="/security/">Security</a></li>
          <li><a href="/license/">License</a></li>
        </ul>
      </div>
    </div>
    <hr>
    <div class="footer-bottom">
      <p>&copy; 2024-2026 <a href="https://github.com/tabssh">TabSSH</a>,
         <a href="https://github.com/casjaysdev">CasjaysDev</a>, and
         <a href="https://github.com/casjay">Jason M. Hempstead</a>.</p>
    </div>
  </div>
</footer>
```

### Head boilerplate (actual pattern used on every page)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title - TabSSH</title>
  <meta name="description" content="...">
  <link rel="icon" type="image/png" href="/images/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/main.css">
  <script>
    (function() {
      const isDarkStored = localStorage.getItem('theme') === 'dark';
      const isDarkSystem = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldUseDark = isDarkStored || (!localStorage.getItem('theme') && isDarkSystem);
      if (shouldUseDark) { document.documentElement.classList.add('dark'); }
    })();
  </script>
</head>
<body>
  <!-- header, main, footer -->
  <script src="/js/main.js"></script>
</body>
</html>
```

## Interactive Components

### Download Auto-Fetch (js/main.js, actual)
```javascript
// Fetches the GitHub Releases API for Android and Desktop repos and rewrites
// download buttons/links based on a per-platform asset-name regex.
const PLATFORMS = [
  { repo: 'tabssh/android', /* asset match rules for .apk */ },
  { repo: 'tabssh/desktop', /* asset match rules for tabssh-{os}-{arch} */ },
  // Web intentionally omitted — see Download Section notes above.
];
```
There is no client-side theme toggle (`ThemeToggle` class does not exist) and no
`DownloadDetector` platform-sniffing class — download options are presented statically per
section, not swapped based on `navigator.userAgent`.

## SEO & Accessibility

### SEO (actual pattern, adjust per page)
```html
<meta name="description" content="TabSSH - Modern SSH client family for Android, desktop, and web. Open-source, secure, and privacy-focused.">
<meta name="keywords" content="SSH, Android, desktop, web, terminal, open source, self-hosted, secure">

<meta property="og:title" content="TabSSH - SSH Client for Android, Desktop, and Web">
<meta property="og:description" content="Open-source SSH client family with tabbed interface, SFTP support, and modern UI">
<meta property="og:image" content="https://tabssh.github.io/images/og-image.png">
<meta property="og:url" content="https://tabssh.github.io">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="TabSSH - SSH Client for Android, Desktop, and Web">
<meta name="twitter:description" content="Open-source SSH client with tabbed interface">
<meta name="twitter:image" content="https://tabssh.github.io/images/twitter-card.png">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "TabSSH",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Android, Linux, macOS, Windows, BSD, Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
}
</script>
```
Verify actual `<meta>`/OG/JSON-LD content per page against the live HTML before editing —
the values above are the current intended pattern, not a guarantee every page matches it
exactly.

### Accessibility Standards
```yaml
WCAG 2.1 AA Compliance:
  - Color contrast ratios: 4.5:1 minimum
  - Keyboard navigation support
  - Screen reader compatibility
  - Focus indicators visible
  - Alt text for all images
  - Semantic HTML structure
  - Proper heading hierarchy
```

## Content Strategy

### Homepage Content
```markdown
# Sections (actual)
1. Hero - Value proposition, "Three Clients" framing, main CTA
2. Features - Key differentiators, including Web-specific cards
3. Download - Android / Desktop / Web options
4. Technical Specs - per-platform subsections including Web
5. Footer - Links and contact info
```

### Documentation Structure (actual)
```markdown
# docs/
- docs/index.html — hub with Get Started / Connect & Use / Troubleshoot sections,
  cards for Android, Desktop, and Web
- docs/features/ — Android feature deep-dive (title and content explicitly scoped
  to Android; links out to Desktop and Web docs for those platforms)
- docs/mobile/* — Android install/usage guides
- docs/desktop/* — Desktop install/usage guides
- docs/web/install/ — Web deploy (Docker/binary), admin panel, orgs, troubleshooting
```

## Notes for Future Edits
- Keep all three platforms represented together in shared/marketing copy (hero, tagline,
  footer, download page) — avoid reintroducing Android-only framing on pages meant to be
  platform-neutral.
- Platform-specific docs pages (like `docs/features/`) are allowed to stay scoped to one
  platform, but the page title/intro must say so explicitly rather than implying parity.
- Before adding Web to the `js/main.js` `PLATFORMS` auto-fetch array, confirm the actual
  GitHub release asset naming convention published by `tabssh/web` — do not guess.
- This file is not a build spec (there is no build); treat it as a living reference for the
  site's actual structure, design tokens, and conventions so future edits stay consistent.
