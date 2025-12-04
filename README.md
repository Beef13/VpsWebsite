# 🏭 Victorian Pallet Supply Website

Professional website for Victorian Pallet Supply - Melbourne's trusted pallet supplier with 30+ years of experience.

---

## 🌐 Live Website
**https://www.victorianpalletsupply.com.au**

---

## 📋 Table of Contents
- [Features](#features)
- [Performance](#performance)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [Tech Stack](#tech-stack)
- [Site Structure](#site-structure)
- [Deployment](#deployment)

---

## ✨ Features

### Business Features
- 🏠 **Home Page** - Hero section with quick quote form
- 📦 **Products Page** - Dynamic product catalog with filtering
- 🛠️ **Services Page** - Company services and capabilities
- 🖼️ **Gallery** - Photo gallery with 29 images
- 📞 **Contact Forms** - Multiple form options for quotes/inquiries
- 🌨️ **Seasonal Effects** - Animated snowflakes (desktop only)

### Technical Features
- ⚡ **Service Worker** - PWA with offline support
- 🚀 **Performance Optimized** - Lighthouse score 85-95
- 📱 **Fully Responsive** - Mobile, tablet, desktop
- ♿ **Accessible** - WCAG compliant
- 🔍 **SEO Optimized** - Schema markup, meta tags
- 🎨 **Modern UI** - Glassmorphism, smooth animations
- 📊 **Analytics Ready** - Google Analytics integration
- 🔒 **Secure Forms** - Web3Forms integration

---

## 🚀 Performance

### Current Status
| Metric | Score | Status |
|--------|-------|--------|
| **Lighthouse Performance** | 85-95 | ✅ Excellent |
| **First Load** | 2-3s | ✅ Fast |
| **Repeat Visit** | 0.5-1s | ✅ Instant |
| **LCP** | 1.5-2.5s | ✅ Good |
| **CLS** | < 0.1 | ✅ Stable |
| **Page Weight** | ~10MB | ⚠️ With image optimization |

### Optimizations Applied
- ✅ Resource hints (preconnect, prefetch, preload)
- ✅ Lazy loading (images, background images)
- ✅ Font optimization (async loading)
- ✅ Deferred JavaScript
- ✅ Browser caching headers (.htaccess)
- ✅ GZIP/Brotli compression
- ✅ Direct CSS loading (eliminated FOUC)
- ⚠️ Image optimization (see docs)

**📖 Full details**: See [PERFORMANCE_OPTIMIZATIONS.md](docs/PERFORMANCE_OPTIMIZATIONS.md)

---

## 🏃 Quick Start

### Prerequisites
- Any modern web server (Python, Node.js, Apache, nginx)
- Modern web browser
- (Optional) ImageMagick for image optimization

### Local Development

```bash
# Clone the repository
git clone https://github.com/Beef13/tiptracker-demo.git vps-site-04-2025
cd vps-site-04-2025

# Start local server (Python 3)
python3 -m http.server 8000

# Or use Node.js
npx http-server -p 8000

# Visit in browser
open http://localhost:8000/home/
```

### Testing Service Worker

```bash
# 1. Start local server (must be localhost or HTTPS)
python3 -m http.server 8000

# 2. Open browser
open http://localhost:8000/home/

# 3. Open DevTools (F12)
# - Application > Service Workers
# - Should show "Status: Active"

# 4. Test caching
# - Reload page
# - Network tab should show "(from Service Worker)"
```

### Performance Monitoring

```bash
# Enable debug mode
open http://localhost:8000/home/?debug=performance

# Check browser console for:
# - Core Web Vitals (LCP, FID, CLS)
# - Resource loading times
# - Performance recommendations
```

---

## 📚 Documentation

### Essential Reading
1. **[QUICK_START.md](docs/QUICK_START.md)** - Start here! Quick overview
2. **[IMAGE_OPTIMIZATION.md](docs/IMAGE_OPTIMIZATION.md)** - ⚠️ CRITICAL - Optimize images
3. **[PERFORMANCE_OPTIMIZATIONS.md](docs/PERFORMANCE_OPTIMIZATIONS.md)** - Technical details

### Additional Docs
- `docs/PERFORMANCE.md` - Original performance guide (legacy)
- `docs/SEO_ACTION_PLAN.md` - SEO strategy
- `docs/SEO_IMPLEMENTATION.md` - SEO implementation details
- `docs/ANALYTICS_SETUP.md` - Analytics configuration
- `docs/ANCHOR_POSITIONING.md` - Smooth scroll anchors

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **JavaScript (Vanilla)** - No frameworks, pure JS
- **Service Worker API** - PWA functionality

### External Services
- **Google Fonts** - Inter font family
- **Web3Forms** - Form submissions
- **Google Maps** - Embedded location map
- **Google Analytics** - Website analytics (optional)

### Hosting
- **GitHub Pages** - Static site hosting
- **Custom Domain** - victorianpalletsupply.com.au

---

## 📁 Site Structure

```
vps-site-04-2025/
├── 📄 index.html              # Root redirect to /home/
├── 🔧 sw.js                   # Service worker
├── 📋 .htaccess               # Caching headers (Apache)
├── 🗺️ sitemap.xml             # SEO sitemap
├── 🤖 robots.txt              # Search engine rules
│
├── 📂 home/
│   └── index.html             # Main homepage
├── 📂 products/
│   └── index.html             # Products catalog page
├── 📂 services/
│   └── index.html             # Services page
├── 📂 gallery/
│   └── index.html             # Photo gallery page
│
├── 📂 src/
│   ├── 📂 css/                # Stylesheets
│   │   ├── main.css           # CSS entry point (imports)
│   │   ├── style.css          # Main styles (3330 lines)
│   │   ├── header.css         # Header/navigation
│   │   ├── footer.css         # Footer
│   │   ├── cards-forms.css    # Cards & forms
│   │   ├── variables.css      # CSS custom properties
│   │   ├── reset.css          # CSS reset
│   │   ├── snowflakes.css     # Snow animation
│   │   ├── success-overlay.css # Form success overlay
│   │   └── anchors.css        # Anchor positioning
│   │
│   ├── 📂 javascript/         # Scripts
│   │   ├── sw-register.js     # Service worker registration
│   │   ├── include.js         # Component loader
│   │   ├── form-handler.js    # Form submissions
│   │   ├── products-loader.js # Product cards (home)
│   │   ├── products-page-loader.js # Products page
│   │   ├── gallery-loader.js  # Gallery images
│   │   ├── snowflakes.js      # Snow animation
│   │   └── performance-monitor.js # Performance tracking
│   │
│   ├── 📂 data/               # JSON data
│   │   ├── products.json      # Product catalog
│   │   └── gallery.json       # Gallery images
│   │
│   ├── 📂 assets/             # Static assets
│   │   ├── 📂 icons/          # SVG icons
│   │   ├── 📂 images/         # Images
│   │   │   ├── general-site/  # Logos, backgrounds
│   │   │   ├── about us/      # About section images
│   │   │   └── gallery-photos/ # Gallery images (29 photos)
│   │   └── 📂 Pallet_Thumbnails/ # Product thumbnails
│   │
│   └── 📂 components/         # HTML components (legacy)
│
└── 📂 docs/                   # Documentation
    ├── QUICK_START.md           # Quick start guide
    ├── IMAGE_OPTIMIZATION.md    # Image optimization
    ├── PERFORMANCE_OPTIMIZATIONS.md # Performance details
    ├── OPTIMIZATION_SUMMARY.md  # Complete summary
    ├── ANALYTICS_SETUP.md       # Analytics guide
    ├── SEO_ACTION_PLAN.md       # SEO strategy
    └── ... (more docs)
```

---

## 🚢 Deployment

### GitHub Pages (Current)

```bash
# Push to main branch
git add .
git commit -m "Your commit message"
git push origin main

# GitHub Pages auto-deploys from main branch
# Live in ~1-2 minutes
```

### Custom Domain
- Domain: `victorianpalletsupply.com.au`
- DNS: CNAME points to GitHub Pages
- HTTPS: Auto-enabled by GitHub
- File: `CNAME` (in root)

### Alternative Hosting (Apache/nginx)

**Apache:**
```bash
# Copy files to web root
cp -r * /var/www/html/

# .htaccess is included and configured
# Restart Apache
sudo systemctl restart apache2
```

**nginx:**
```bash
# Copy files to web root
cp -r * /usr/share/nginx/html/

# Use nginx.conf instead of .htaccess
# See PERFORMANCE_OPTIMIZATIONS.md for nginx config
```

---

## 🔧 Maintenance

### Adding New Images
```bash
# 1. Optimize first (< 500KB)
# Use: https://squoosh.app/

# 2. Add to appropriate folder
cp new-image.jpg src/assets/images/gallery-photos/

# 3. Update gallery.json (if gallery image)
# Edit: src/data/gallery.json

# 4. Deploy
git add . && git commit -m "Add new image" && git push
```

### Adding New Products
```bash
# 1. Add product thumbnail
cp thumbnail.png src/assets/Pallet_Thumbnails/

# 2. Update products.json
# Edit: src/data/products.json

# 3. Deploy
git add . && git commit -m "Add new product" && git push
```

### Updating Styles
```bash
# Edit CSS files in src/css/
nano src/css/style.css

# Test locally
python3 -m http.server 8000

# Deploy
git add . && git commit -m "Update styles" && git push
```

---

## 📊 Performance Monitoring

### Tools
- **Google PageSpeed Insights**: https://pagespeed.web.dev/
- **WebPageTest**: https://www.webpagetest.org/
- **Chrome DevTools Lighthouse**: Built-in (F12 → Lighthouse)
- **GTmetrix**: https://gtmetrix.com/

### Regular Checks
- Monthly Lighthouse audit
- Monitor Core Web Vitals in Google Search Console
- Check page load times in Analytics
- Test on slow connections (DevTools Network throttling)

---

## 🐛 Troubleshooting

### Service Worker Not Working
```javascript
// Browser console:
navigator.serviceWorker.getRegistrations().then(regs => {
  console.log(regs);
});

// Solutions:
// 1. Hard refresh: Cmd+Shift+R / Ctrl+Shift+R
// 2. Clear cache: DevTools > Application > Clear storage
// 3. Check HTTPS is enabled (or using localhost)
```

### Images Not Loading
```bash
# Check file paths are correct
# Paths are relative: ../src/assets/images/...

# Check file names match (case-sensitive)
ls src/assets/images/gallery-photos/
```

### Slow Performance
```bash
# 1. Run Lighthouse audit
# 2. Enable debug mode: ?debug=performance
# 3. Check image sizes (should be < 500KB)
ls -lh src/assets/images/gallery-photos/*.jpg

# Most common issue: Unoptimized images
# Solution: See IMAGE_OPTIMIZATION.md
```

---

## 📞 Contact

**Victorian Pallet Supply**
- 📞 Phone: 0414 987 492
- 📧 Email: victorianpalletsupply@gmail.com
- 📍 Address: 14 Yannis Court, Springvale VIC 3171
- 🌐 Website: https://www.victorianpalletsupply.com.au

**Website Developer**
- GitHub: [@savcurcio](https://github.com/savcurcio)
- Built with ❤️ and ☕

---

## 📄 License

Copyright © 2024 Victorian Pallet Supply Pty Ltd.
All rights reserved.

---

## 🎯 Future Enhancements

Potential improvements (not required):
- [ ] Convert all images to WebP format
- [ ] Consolidate CSS (remove @import)
- [ ] Add CSS/JS minification to build process
- [ ] Implement image CDN
- [ ] Add A/B testing for forms
- [ ] Progressive image loading (blur-up technique)
- [ ] Add more structured data (FAQ, Review schemas)

---

## 📈 Performance Goals

### Current (After Optimization)
- ✅ Lighthouse: 85-95
- ✅ LCP: 1.5-2.5s
- ✅ CLS: < 0.1
- ✅ FID: < 100ms

### Target (With Image Optimization)
- 🎯 Lighthouse: 90-98
- 🎯 LCP: < 2.0s
- 🎯 CLS: < 0.05
- 🎯 Page Weight: < 5MB

---

## 🙏 Acknowledgments

- **Inter Font** - Beautiful typography by Rasmus Andersson
- **Web3Forms** - Reliable form handling
- **Google** - Fonts, Maps, Analytics
- **GitHub** - Free hosting and version control

---

**Last Updated**: December 2024

Made with 💚 for Victorian Pallet Supply

