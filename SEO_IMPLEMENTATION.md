# Technical SEO Implementation Guide

## Overview

This document outlines the technical SEO optimizations to implement for Victorian Pallet Supply to improve Google search rankings for local pallet searches in Victoria, Australia.

---

## Prerequisites (Information Needed)

Before implementation, gather the following:

1. **Live website URL** (e.g., `victorianpalletsupply.com.au`)
2. **Full business address** (street, suburb, postcode)
3. **Business hours** (e.g., Mon-Fri 7am-5pm)
4. **Business email** (for schema markup)

---

## 1. Meta Tags (All Pages)

Add these tags to the `<head>` section of each HTML page.

### index.html (Home Page)

```html
<!-- SEO Meta Tags -->
<meta name="description" content="Victorian Pallet Supply - Quality new and recycled pallets in Melbourne and Victoria. Wooden pallets, plastic pallets, pallet recycling, and custom pallet solutions. Call 0414 987 492.">
<meta name="keywords" content="pallets Victoria, pallet supply Melbourne, wooden pallets Melbourne, plastic pallets Victoria, pallet recycling Melbourne, buy pallets Victoria, cheap pallets Melbourne, industrial pallets Australia">
<meta name="author" content="Victorian Pallet Supply">
<meta name="geo.region" content="AU-VIC">
<meta name="geo.placename" content="Melbourne, Victoria">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://YOUR-DOMAIN.com/">
<meta property="og:title" content="Victorian Pallet Supply | Quality Pallets Melbourne & Victoria">
<meta property="og:description" content="Quality new and recycled pallets in Melbourne and Victoria. Wooden pallets, plastic pallets, pallet recycling, and custom solutions.">
<meta property="og:image" content="https://YOUR-DOMAIN.com/src/assets/images/general-site/FORKMAN_FINAL2.png">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Victorian Pallet Supply | Quality Pallets Melbourne">
<meta name="twitter:description" content="Quality new and recycled pallets in Melbourne and Victoria.">

<!-- Canonical URL -->
<link rel="canonical" href="https://YOUR-DOMAIN.com/">
```

### products.html

```html
<meta name="description" content="Browse our range of quality pallets - wooden pallets, plastic pallets, export pallets, and custom sizes. Competitive prices across Melbourne and Victoria.">
<meta name="keywords" content="buy pallets Melbourne, wooden pallets Victoria, plastic pallets Australia, export pallets Melbourne, pallet sizes, cheap pallets">
<meta name="author" content="Victorian Pallet Supply">
<meta name="geo.region" content="AU-VIC">

<meta property="og:type" content="website">
<meta property="og:url" content="https://YOUR-DOMAIN.com/src/pages/products.html">
<meta property="og:title" content="Pallet Products | Victorian Pallet Supply">
<meta property="og:description" content="Browse our range of quality pallets - wooden, plastic, export pallets and custom sizes.">

<link rel="canonical" href="https://YOUR-DOMAIN.com/src/pages/products.html">
```

### services.html

```html
<meta name="description" content="Pallet services in Melbourne and Victoria - pallet recycling, custom pallet manufacturing, pallet repairs, and bulk supply. Contact us for a quote.">
<meta name="keywords" content="pallet recycling Melbourne, pallet repairs Victoria, custom pallets Melbourne, pallet manufacturing Australia, bulk pallets Victoria">
<meta name="author" content="Victorian Pallet Supply">
<meta name="geo.region" content="AU-VIC">

<meta property="og:type" content="website">
<meta property="og:url" content="https://YOUR-DOMAIN.com/src/pages/services.html">
<meta property="og:title" content="Pallet Services | Victorian Pallet Supply">
<meta property="og:description" content="Pallet recycling, custom manufacturing, repairs, and bulk supply across Melbourne and Victoria.">

<link rel="canonical" href="https://YOUR-DOMAIN.com/src/pages/services.html">
```

### gallery.html

```html
<meta name="description" content="View our pallet gallery - see examples of wooden pallets, plastic pallets, custom pallets, and pallet projects across Melbourne and Victoria.">
<meta name="keywords" content="pallet gallery, pallet photos Melbourne, wooden pallet examples, custom pallet projects Victoria">
<meta name="author" content="Victorian Pallet Supply">
<meta name="geo.region" content="AU-VIC">

<meta property="og:type" content="website">
<meta property="og:url" content="https://YOUR-DOMAIN.com/src/pages/gallery.html">
<meta property="og:title" content="Gallery | Victorian Pallet Supply">
<meta property="og:description" content="View examples of our pallets and projects across Melbourne and Victoria.">

<link rel="canonical" href="https://YOUR-DOMAIN.com/src/pages/gallery.html">
```

---

## 2. LocalBusiness Schema (index.html)

Add this JSON-LD script just before the closing `</head>` tag in `index.html`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Victorian Pallet Supply",
  "description": "Quality pallet supply, recycling, and custom pallet solutions in Melbourne and Victoria, Australia",
  "url": "https://YOUR-DOMAIN.com",
  "telephone": "+61414987492",
  "email": "victorianpalletsupply@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "YOUR STREET ADDRESS",
    "addressLocality": "YOUR SUBURB",
    "addressRegion": "VIC",
    "postalCode": "YOUR POSTCODE",
    "addressCountry": "AU"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "YOUR_LATITUDE",
    "longitude": "YOUR_LONGITUDE"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "07:00",
      "closes": "17:00"
    }
  ],
  "priceRange": "$$",
  "areaServed": [
    {
      "@type": "State",
      "name": "Victoria"
    },
    {
      "@type": "City",
      "name": "Melbourne"
    }
  ],
  "serviceType": ["Pallet Supply", "Pallet Recycling", "Custom Pallets", "Pallet Repairs"],
  "image": "https://YOUR-DOMAIN.com/src/assets/images/general-site/FORKMAN_FINAL2.png",
  "logo": "https://YOUR-DOMAIN.com/src/assets/images/general-site/FORKMAN_FINAL2.png",
  "sameAs": []
}
</script>
```

---

## 3. Product Schema (products.html)

Add product schema for rich search results. Place before `</head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Pallet Products",
  "description": "Quality pallets available from Victorian Pallet Supply",
  "itemListElement": [
    {
      "@type": "Product",
      "name": "Standard Wooden Pallet",
      "description": "1165x1165mm standard wooden pallet, ideal for general warehouse use",
      "brand": {
        "@type": "Brand",
        "name": "Victorian Pallet Supply"
      },
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "areaServed": "Victoria, Australia"
      }
    },
    {
      "@type": "Product",
      "name": "Export Pallet",
      "description": "ISPM-15 compliant export pallets for international shipping",
      "brand": {
        "@type": "Brand",
        "name": "Victorian Pallet Supply"
      }
    },
    {
      "@type": "Product",
      "name": "Plastic Pallet",
      "description": "Durable plastic pallets for food and pharmaceutical industries",
      "brand": {
        "@type": "Brand",
        "name": "Victorian Pallet Supply"
      }
    }
  ]
}
</script>
```

---

## 4. sitemap.xml (Root Directory)

Create `sitemap.xml` in the project root:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://YOUR-DOMAIN.com/</loc>
    <lastmod>2025-12-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://YOUR-DOMAIN.com/src/pages/products.html</loc>
    <lastmod>2025-12-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://YOUR-DOMAIN.com/src/pages/services.html</loc>
    <lastmod>2025-12-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://YOUR-DOMAIN.com/src/pages/gallery.html</loc>
    <lastmod>2025-12-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

---

## 5. robots.txt (Root Directory)

Create `robots.txt` in the project root:

```txt
# Victorian Pallet Supply - robots.txt

User-agent: *
Allow: /

# Sitemap location
Sitemap: https://YOUR-DOMAIN.com/sitemap.xml

# Disallow admin/debug files
Disallow: /debug.html
Disallow: /cache-bust.html
```

---

## 6. Image Alt Text Updates

Update all images with descriptive, keyword-rich alt text:

| Image | Current Alt | Recommended Alt |
|-------|-------------|-----------------|
| Logo | "Logo" | "Victorian Pallet Supply - Pallets Melbourne" |
| About Us images | (check current) | "Pallet warehouse Victoria" / "Quality wooden pallets Melbourne" |
| Product images | (varies) | Include pallet type + location keywords |

---

## 7. Title Tag Updates

Update `<title>` tags for better SEO:

| Page | Current | Recommended |
|------|---------|-------------|
| Home | `VPS \| Home` | `Victorian Pallet Supply \| Pallets Melbourne & Victoria` |
| Products | `VPS \| Products` | `Pallet Products \| Wooden & Plastic Pallets Melbourne` |
| Services | `VPS \| Services` | `Pallet Services \| Recycling & Custom Pallets Victoria` |
| Gallery | `VPS \| Gallery` | `Pallet Gallery \| Victorian Pallet Supply` |

---

## Post-Implementation Steps

After implementing these changes:

1. **Submit sitemap to Google Search Console**
   - Go to https://search.google.com/search-console
   - Add and verify your property
   - Submit `sitemap.xml` under "Sitemaps"

2. **Create Google Business Profile**
   - Go to https://business.google.com
   - Create/claim the business listing
   - Add photos, hours, services
   - Link to your website

3. **Test Schema Markup**
   - Use https://search.google.com/test/rich-results
   - Paste your URLs to verify schema is valid

4. **Monitor Rankings**
   - Use Google Search Console to track performance
   - Check rankings for target keywords after 2-4 weeks

---

## Target Keywords

Primary keywords to rank for:

- pallets Victoria
- pallet supply Melbourne
- wooden pallets Melbourne
- buy pallets Victoria
- pallet recycling Melbourne
- cheap pallets Melbourne
- industrial pallets Victoria
- export pallets Melbourne
- plastic pallets Victoria

---

## Notes

- Replace `YOUR-DOMAIN.com` with actual domain throughout
- Replace `YOUR STREET ADDRESS`, `YOUR SUBURB`, `YOUR POSTCODE` with actual business address
- Replace latitude/longitude with actual coordinates (get from Google Maps)
- Update business hours if different from Mon-Fri 7am-5pm

