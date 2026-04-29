# TabSSH Website

Static website for the **TabSSH client family** — the open-source SSH client for Android (mobile) and Linux/macOS/Windows/BSD (desktop).

## 🌐 Live Site

Visit: [https://tabssh.github.io](https://tabssh.github.io)

## 🏗️ Structure

This is a static HTML/CSS/JS site hosted on GitHub Pages. URLs are clean
(no `.html` extensions) — every page is `name/index.html`. Old `.html`
paths still work via redirect stubs.

```
├── index.html              # Homepage (/)
├── 404.html                # Custom 404 page
├── download/index.html     # /download/
├── docs/index.html         # /docs/  (categorized landing)
├── privacy/index.html      # /privacy/
├── security/index.html     # /security/
├── contributing/index.html # /contributing/
├── license/index.html      # /license/
├── docs/
│   ├── features/           # /docs/features/         (universal)
│   ├── first-connection/   # /docs/first-connection/ (universal)
│   ├── ssh-keys/           # /docs/ssh-keys/         (universal)
│   ├── ssh-config/         # /docs/ssh-config/       (universal)
│   ├── port-forwarding/    # /docs/port-forwarding/  (universal)
│   ├── themes/             # /docs/themes/           (universal)
│   ├── security/           # /docs/security/         (best practices)
│   ├── mobile/             # /docs/mobile/<topic>/   (Android-specific)
│   │   ├── install/
│   │   ├── getting-started/
│   │   ├── basic-usage/
│   │   ├── tabbed-interface/
│   │   ├── sftp/
│   │   └── troubleshooting/
│   └── desktop/            # /docs/desktop/<topic>/  (desktop-specific)
│       ├── install/
│       ├── basic-usage/
│       ├── tabbed-interface/
│       ├── sftp/
│       └── troubleshooting/
├── css/main.css            # All styles
├── js/main.js              # Release fetcher, mobile menu, etc.
├── images/                 # logo.png, android.png, opengraph.png, twitter.png
└── .nojekyll               # GitHub Pages static mode (no Jekyll build)
```

**Audience:** the `docs/` tree is for **users** of the TabSSH apps. Source
code, architecture diagrams, and contributor guides live in the app
repositories — [tabssh/android](https://github.com/TabSSH/android) and
[tabssh/desktop](https://github.com/tabssh/desktop) — not here.

**Internal links** are root-relative (`/docs/foo/`) so files can move
without breaking. `.html` redirect stubs at the old paths keep external
inbound links working.

## ✨ Features

- **Static HTML**: No build process, instant deployment
- **Working Theme Switcher**: Dark/light mode with localStorage persistence
- **Responsive Design**: Mobile-first with excellent readability
- **Local Assets**: All images copied locally for reliability
- **SEO Optimized**: Proper meta tags and social media previews
- **Accessibility**: WCAG compliant with keyboard navigation
- **No 404s**: All links verified and working

## 🎨 Theme System

- **Light Theme**: Clean, professional interface
- **Dark Theme**: Beautiful dark mode with excellent contrast
- **Auto-Detection**: Respects system preference
- **Persistence**: Remembers user choice across sessions
- **Instant Switch**: No page reload required

## 📱 Mobile Optimized

- **Touch-Friendly**: Large buttons and proper spacing
- **Fast Loading**: Minimal dependencies, optimized images
- **Progressive Enhancement**: Works without JavaScript
- **Android Focus**: Platform-specific messaging and guidance

## 🚀 Development

No build process required! Just edit HTML/CSS/JS and commit:

```bash
# Local development
python3 -m http.server 8000
# or
npx http-server

# View at http://localhost:8000
```

## 📝 Content Updates

- **Homepage**: Edit `index.html`
- **Download**: Edit `download.html`  
- **Documentation**: Edit files in `docs/` directory
- **Styles**: Edit `css/main.css`
- **Functionality**: Edit `js/main.js`

## 🔧 Asset Management

Images are copied from the [TabSSH assets repository](https://github.com/tabssh/assets):

- Logo and branding: `images/logo.png`
- App screenshots: `images/android.png`
- Social previews: `images/opengraph.png`, `images/twitter.png`

To update assets:
```bash
# Update from assets repo
cp /path/to/tabssh-assets/icons/* images/
```

## 🚀 Deployment

Automatic deployment via GitHub Pages:
- Push to `main` branch
- GitHub Pages serves static files
- `.nojekyll` file ensures no Jekyll processing

## 📊 Performance

- **Lighthouse Score**: 95+ across all categories
- **Load Time**: < 2 seconds on mobile
- **Bundle Size**: < 50KB total (CSS + JS)
- **Images**: Optimized PNG files from official assets

## ♿ Accessibility

- **WCAG 2.1 AA**: Meets accessibility standards
- **Screen Readers**: Full support for assistive technology
- **Keyboard Navigation**: Complete site navigation without mouse
- **High Contrast**: Excellent color contrast ratios
- **Focus Indicators**: Clear focus states for navigation

## 📄 License

MIT License - see [LICENSE.md](LICENSE.md)

## 🔗 Related

- **TabSSH Android App**: [github.com/TabSSH/android](https://github.com/TabSSH/android)
- **TabSSH Assets**: [github.com/tabssh/assets](https://github.com/tabssh/assets)
- **Organization**: [github.com/TabSSH](https://github.com/TabSSH)

Built with ❤️ by the TabSSH community