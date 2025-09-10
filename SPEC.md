# TabSSH Website Specification for Claude Code

## Project Overview
Create a modern, responsive website for TabSSH - an open-source SSH client for Android. The site should be professional, developer-focused, and showcase the app's key features.

## Technical Requirements

### Platform & Hosting
- **Static Site Generator**: Jekyll (GitHub Pages compatible)
- **Hosting**: GitHub Pages (`tabssh.github.io`)
- **Domain**: Custom domain support ready
- **SSL**: Automatic via GitHub Pages

### Technology Stack
```yaml
Frontend:
  - HTML5 semantic markup
  - CSS3 with Flexbox/Grid
  - Vanilla JavaScript (minimal, progressive enhancement)
  - Jekyll for static generation
  - Liquid templating

Styling:
  - Modern CSS (no framework dependency)
  - CSS custom properties (variables)
  - Mobile-first responsive design
  - Dark/light theme support
  - Material Design 3 inspired

Performance:
  - Lighthouse score: 95+ all categories
  - Core Web Vitals: All green
  - Minimal JavaScript
  - Optimized images (WebP with fallbacks)
  - Lazy loading for images
```

## Site Structure

### Pages Required
```
/                     # Homepage
/download             # Download page with all options
/docs/                # Documentation hub
/docs/getting-started # User guide
/docs/features        # Feature documentation
/docs/api             # Developer documentation
/privacy              # Privacy policy
/security             # Security information
/contributing         # Contribution guidelines
/blog/                # Blog/news (future)
/404                  # Custom 404 page
```

### Jekyll Configuration
```yaml
# _config.yml
title: TabSSH
description: Modern SSH client for Android with tabbed interface
url: "https://tabssh.github.io"
baseurl: ""

# Build settings
markdown: kramdown
highlighter: rouge
theme: minima
plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag

# Navigation
header_pages:
  - docs/index.md
  - download.md
  - contributing.md

# SEO
logo: /assets/images/logo/tabssh-logo.png
social:
  name: TabSSH
  links:
    - https://github.com/TabSSH
    - https://github.com/TabSSH/android

# Collections
collections:
  docs:
    output: true
    permalink: /:collection/:name/
```

## Design System

### Color Palette
```css
:root {
  /* Primary Colors */
  --primary-50: #E3F2FD;
  --primary-100: #BBDEFB;
  --primary-500: #2196F3;
  --primary-700: #1976D2;
  --primary-900: #0D47A1;
  
  /* Semantic Colors */
  --success: #4CAF50;
  --warning: #FF9800;
  --error: #F44336;
  --info: #2196F3;
  
  /* Neutral Colors */
  --gray-50: #FAFAFA;
  --gray-100: #F5F5F5;
  --gray-500: #9E9E9E;
  --gray-700: #616161;
  --gray-900: #212121;
  
  /* Theme Colors */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F5F5F5;
  --text-primary: #212121;
  --text-secondary: #616161;
  --border: #E0E0E0;
}

/* Dark Theme */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #121212;
    --bg-secondary: #1E1E1E;
    --text-primary: #FFFFFF;
    --text-secondary: #AAAAAA;
    --border: #333333;
  }
}
```

### Typography
```css
/* Typography Scale */
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

### Layout System
```css
/* Spacing Scale */
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

/* Container Widths */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

.container-sm { max-width: 640px; }
.container-md { max-width: 768px; }
.container-lg { max-width: 1024px; }
.container-xl { max-width: 1200px; }
```

## Component Specifications

### Header/Navigation
```html
<header class="site-header">
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <img src="/assets/images/logo/tabssh-logo.svg" alt="TabSSH" class="logo">
        <span class="brand-text">TabSSH</span>
      </div>
      <ul class="navbar-nav">
        <li><a href="/docs/">Docs</a></li>
        <li><a href="/download/">Download</a></li>
        <li><a href="https://github.com/TabSSH/android">GitHub</a></li>
      </ul>
      <button class="theme-toggle" aria-label="Toggle theme">
        <span class="sr-only">Toggle dark mode</span>
      </button>
    </div>
  </nav>
</header>
```

### Hero Section
```html
<section class="hero">
  <div class="container">
    <div class="hero-content">
      <h1 class="hero-title">Modern SSH Client for Android</h1>
      <p class="hero-subtitle">
        Open-source, secure, and beautiful. TabSSH brings desktop-class SSH 
        functionality to your Android device with a true tabbed interface.
      </p>
      <div class="hero-actions">
        <a href="/download/" class="btn btn-primary">Download Now</a>
        <a href="https://github.com/TabSSH/android" class="btn btn-secondary">
          View on GitHub
        </a>
      </div>
    </div>
    <div class="hero-image">
      <img src="/assets/images/hero-phone.png" alt="TabSSH on Android" 
           loading="lazy" width="400" height="600">
    </div>
  </div>
</section>
```

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

### Download Section
```html
<section class="download">
  <div class="container">
    <h2 class="section-title">Download TabSSH</h2>
    <div class="download-grid">
      <div class="download-option">
        <h3>F-Droid</h3>
        <p>Recommended • Open-source app store</p>
        <a href="https://f-droid.org/packages/io.github.tabssh" class="download-btn">
          <img src="/assets/images/badges/get-it-on-fdroid.png" 
               alt="Get it on F-Droid" width="180" height="60">
        </a>
      </div>
      <div class="download-option">
        <h3>Direct Download</h3>
        <p>Latest stable release</p>
        <a href="/download/" class="btn btn-primary">Download APK</a>
      </div>
      <div class="download-option">
        <h3>GitHub Releases</h3>
        <p>All versions and pre-releases</p>
        <a href="https://github.com/TabSSH/android/releases" class="btn btn-secondary">
          View Releases
        </a>
      </div>
    </div>
  </div>
</section>
```

## Page Templates

### Default Layout
```html
<!-- _layouts/default.html -->
<!DOCTYPE html>
<html lang="{{ site.lang | default: 'en' }}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{% if page.title %}{{ page.title }} | {% endif %}{{ site.title }}</title>
  
  <!-- SEO -->
  {% seo %}
  
  <!-- Stylesheets -->
  <link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">
  
  <!-- Favicons -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  
  <!-- Theme Detection -->
  <script>
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  </script>
</head>
<body>
  {% include header.html %}
  
  <main>
    {{ content }}
  </main>
  
  {% include footer.html %}
  
  <!-- JavaScript -->
  <script src="{{ '/assets/js/main.js' | relative_url }}"></script>
</body>
</html>
```

### Documentation Layout
```html
<!-- _layouts/docs.html -->
---
layout: default
---
<div class="docs-layout">
  <aside class="docs-sidebar">
    {% include docs-nav.html %}
  </aside>
  <article class="docs-content">
    <header class="docs-header">
      <h1>{{ page.title }}</h1>
      {% if page.description %}
        <p class="docs-description">{{ page.description }}</p>
      {% endif %}
    </header>
    <div class="prose">
      {{ content }}
    </div>
    <footer class="docs-footer">
      <div class="docs-edit">
        <a href="https://github.com/TabSSH/tabssh.github.io/edit/main/{{ page.path }}">
          Edit this page on GitHub
        </a>
      </div>
    </footer>
  </article>
</div>
```

## Interactive Components

### Theme Toggle
```javascript
// Theme switching functionality
class ThemeToggle {
  constructor() {
    this.button = document.querySelector('.theme-toggle');
    this.init();
  }
  
  init() {
    this.button?.addEventListener('click', () => this.toggle());
    this.updateButton();
  }
  
  toggle() {
    const isDark = document.documentElement.classList.contains('dark');
    
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
    
    this.updateButton();
  }
  
  updateButton() {
    const isDark = document.documentElement.classList.contains('dark');
    this.button.innerHTML = isDark ? '☀️' : '🌙';
  }
}

new ThemeToggle();
```

### Download Detection
```javascript
// Detect user's platform and show appropriate download
class DownloadDetector {
  constructor() {
    this.init();
  }
  
  init() {
    const userAgent = navigator.userAgent;
    const isAndroid = /Android/i.test(userAgent);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
    
    if (isAndroid) {
      this.showAndroidDownload();
    } else if (isMobile) {
      this.showMobileMessage();
    } else {
      this.showDesktopMessage();
    }
  }
  
  showAndroidDownload() {
    const downloadSection = document.querySelector('.download-primary');
    if (downloadSection) {
      downloadSection.innerHTML = `
        <h3>Perfect! You're on Android</h3>
        <p>TabSSH is designed for your device</p>
        <a href="/download/" class="btn btn-primary btn-lg">Download TabSSH</a>
      `;
    }
  }
}

new DownloadDetector();
```

## Performance Requirements

### Core Web Vitals Targets
```yaml
Largest Contentful Paint (LCP): < 2.5s
First Input Delay (FID): < 100ms
Cumulative Layout Shift (CLS): < 0.1
First Contentful Paint (FCP): < 1.8s
Time to Interactive (TTI): < 3.8s
```

### Optimization Techniques
```yaml
Images:
  - WebP format with PNG/JPG fallbacks
  - Responsive images with srcset
  - Lazy loading for below-fold content
  - Optimized file sizes (<500KB for hero images)

CSS:
  - Critical CSS inlined
  - Non-critical CSS deferred
  - CSS custom properties for theming
  - Minimal external dependencies

JavaScript:
  - Vanilla JS (no frameworks)
  - Progressive enhancement
  - Defer non-critical scripts
  - Total JS bundle <50KB gzipped

Fonts:
  - font-display: swap
  - Preload critical fonts
  - System font fallbacks
```

## SEO & Accessibility

### SEO Requirements
```html
<!-- Meta tags -->
<meta name="description" content="TabSSH - Modern SSH client for Android with tabbed interface. Open-source, secure, and privacy-focused.">
<meta name="keywords" content="SSH, Android, terminal, open source, mobile, secure">

<!-- Open Graph -->
<meta property="og:title" content="TabSSH - Modern SSH Client for Android">
<meta property="og:description" content="Open-source SSH client with tabbed interface, SFTP support, and modern UI">
<meta property="og:image" content="https://tabssh.github.io/assets/images/og/og-image.png">
<meta property="og:url" content="https://tabssh.github.io">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="TabSSH - Modern SSH Client for Android">
<meta name="twitter:description" content="Open-source SSH client with tabbed interface">
<meta name="twitter:image" content="https://tabssh.github.io/assets/images/og/twitter-card.png">

<!-- Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "TabSSH",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Android",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
</script>
```

### Accessibility Standards
```yaml
WCAG 2.1 AA Compliance:
  - Color contrast ratios: 4.5:1 minimum
  - Keyboard navigation support
  - Screen reader compatibility
  - Focus indicators visible
  - Alt text for all images
  - Semantic HTML structure
  - Skip links for navigation
  - Proper heading hierarchy
```

## Content Strategy

### Homepage Content
```markdown
# Sections Required
1. Hero - Value proposition and main CTA
2. Features - Key differentiators (6-8 features)
3. Screenshots - App in action
4. Download - Multiple download options
5. Open Source - Community and transparency
6. Security - Trust and privacy
7. Footer - Links and contact info

# Tone of Voice
- Professional but approachable
- Developer-focused
- Emphasis on security and privacy
- Clear, concise explanations
- Technical accuracy
```

### Documentation Structure
```markdown
# Getting Started
- Installation guide
- First connection
- Basic usage

# Features
- SSH connections
- Tabbed interface
- SFTP file transfer
- Port forwarding
- Key management
- Themes and customization

# Advanced
- SSH config import
- Security best practices
- Troubleshooting
- API documentation (future)
```

## Deployment & CI/CD

### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Ruby
      uses: ruby/setup-ruby@v1
      with:
        ruby-version: '3.0'
        bundler-cache: true
        
    - name: Build site
      run: bundle exec jekyll build
      
    - name: Test site
      run: |
        bundle exec htmlproofer ./_site --disable-external
        
    - name: Deploy to GitHub Pages
      if: github.ref == 'refs/heads/main'
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./_site
```

This specification provides everything needed to create a professional, performant, and accessible website for TabSSH. The site will effectively showcase the app while maintaining the high standards expected for an open-source developer tool.

