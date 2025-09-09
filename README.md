# TabSSH Website

This repository contains the source code for the TabSSH website, built with Jekyll and hosted on GitHub Pages.

## 🌐 Live Site

Visit the live website at: [https://tabssh.github.io](https://tabssh.github.io)

## 🏗️ Built With

- **Jekyll** - Static site generator
- **GitHub Pages** - Hosting platform
- **HTML5/CSS3** - Modern web standards
- **Vanilla JavaScript** - Progressive enhancement
- **Material Design 3** - Design system inspiration

## 🚀 Features

- **Responsive Design** - Mobile-first approach
- **Dark/Light Themes** - Automatic theme switching
- **Performance Optimized** - Lighthouse score 95+
- **SEO Optimized** - Meta tags and structured data
- **Accessibility** - WCAG 2.1 AA compliant
- **No Tracking** - Privacy-focused, no analytics

## 📁 Project Structure

```
├── _config.yml              # Jekyll configuration
├── _layouts/                 # Page layouts
│   ├── default.html         # Main layout
│   └── docs.html            # Documentation layout
├── _includes/               # Reusable components
│   ├── header.html          # Site header
│   ├── footer.html          # Site footer
│   ├── docs-nav.html        # Documentation navigation
│   └── seo.html             # SEO meta tags
├── _sass/                   # Sass stylesheets
│   ├── _variables.scss      # Design system variables
│   ├── _base.scss           # Base styles
│   ├── _components.scss     # Component styles
│   └── _layout.scss         # Layout styles
├── _docs/                   # Documentation pages
├── assets/                  # Static assets
│   ├── css/                 # Compiled CSS
│   ├── js/                  # JavaScript files
│   └── images/              # Images and graphics
├── pages/                   # Site pages
└── .github/workflows/       # GitHub Actions
```

## 🛠️ Development

### Prerequisites

- Ruby 3.0+
- Jekyll 4.3+
- Bundler

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/TabSSH/tabssh.github.io.git
   cd tabssh.github.io
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Start the development server**
   ```bash
   bundle exec jekyll serve
   ```

4. **View the site**
   Open [http://localhost:4000](http://localhost:4000) in your browser

### Building for Production

```bash
bundle exec jekyll build
```

The built site will be in the `_site` directory.

## 📝 Content Management

### Adding Documentation

1. Create a new Markdown file in `_docs/`
2. Add appropriate frontmatter:
   ```yaml
   ---
   title: Page Title
   description: Page description for SEO
   ---
   ```
3. Write content in Markdown
4. Update navigation in `_includes/docs-nav.html` if needed

### Adding Blog Posts

Blog functionality is prepared but not yet active. Posts would go in `_posts/` directory.

### Updating Site Content

- **Homepage**: Edit `index.md`
- **Download page**: Edit `download.md`
- **Supporting pages**: Edit respective `.md` files

## 🎨 Design System

### Colors

The site uses a comprehensive color system defined in `_sass/_variables.scss`:

- **Primary**: Blue (#2196F3)
- **Success**: Green (#4CAF50)
- **Warning**: Orange (#FF9800)
- **Error**: Red (#F44336)

### Typography

- **Font Family**: Inter (primary), Roboto Mono (code)
- **Responsive Scale**: 12px to 36px
- **Weight Range**: 400 to 700

### Components

Reusable components include:
- Buttons (primary, secondary, sizes)
- Cards (feature cards, download options)
- Alerts (info, success, warning, error)
- Badges and labels

## 🔧 Configuration

Key configuration options in `_config.yml`:

```yaml
title: TabSSH
description: Modern SSH client for Android with tabbed interface
url: "https://tabssh.github.io"
baseurl: ""

# SEO
logo: https://raw.githubusercontent.com/tabssh/assets/main/icons/logo.png
social:
  name: TabSSH
  links:
    - https://github.com/TabSSH
    - https://github.com/TabSSH/android
```

## 🚀 Deployment

The site is automatically deployed using GitHub Actions when changes are pushed to the `main` branch.

### Manual Deployment

If needed, you can manually trigger deployment by:

1. Pushing to the `main` branch
2. Using the GitHub Actions interface
3. Creating a release tag

## 📊 Performance

The site is optimized for performance:

- **Lighthouse Score**: 95+ across all categories
- **Core Web Vitals**: All green metrics
- **Bundle Size**: <50KB JavaScript, optimized CSS
- **Image Optimization**: WebP format with fallbacks

## ♿ Accessibility

Accessibility features include:

- **WCAG 2.1 AA** compliance
- **Keyboard Navigation** support
- **Screen Reader** compatibility
- **Focus Management** with visible indicators
- **Color Contrast** ratios of 4.5:1+

## 🔒 Privacy

The website is built with privacy in mind:

- **No Tracking**: Zero analytics or tracking scripts
- **No Cookies**: No cookies or local storage for tracking
- **No Third-Party**: No external analytics or advertising services

## 🤝 Contributing

Contributions are welcome! Please see our [Contributing Guide](https://tabssh.github.io/contributing/) for details.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with Jekyll
5. Submit a pull request

## 📄 License

This website is open source and available under the [MIT License](LICENSE).

## 🔗 Related Projects

- **TabSSH Android App**: [github.com/TabSSH/android](https://github.com/TabSSH/android)
- **TabSSH Organization**: [github.com/TabSSH](https://github.com/TabSSH)

## 📞 Support

- **Documentation**: [tabssh.github.io/docs/](https://tabssh.github.io/docs/)
- **Issues**: [github.com/TabSSH/tabssh.github.io/issues](https://github.com/TabSSH/tabssh.github.io/issues)
- **Discussions**: [github.com/TabSSH/android/discussions](https://github.com/TabSSH/android/discussions)

---

Built with ❤️ by the TabSSH community