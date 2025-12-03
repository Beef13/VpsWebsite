# Google Analytics 4 Setup Guide

## Overview

The website is configured to track form submissions as conversion events in Google Analytics 4 (GA4). When a customer successfully submits a form, a success overlay appears and automatically sends tracking data to GA4.

---

## ✅ What's Already Implemented

### Success Overlay
- **Animated green checkmark** appears on successful form submission
- **"Request Received!" message** confirms submission
- **Dark blurred background** for visual focus
- **Auto-dismisses** after 2 seconds
- **Fully responsive** (mobile & desktop)

### Analytics Tracking
When a form is submitted successfully, the following data is sent to Google Analytics:

1. **Virtual Pageview:**
   - Page Path: `/form-success`
   - Page Title: `Form Success - [form-type]`
   - Page Location: Current URL + `/form-success`

2. **Form Submit Event:**
   - Event Name: `form_submit`
   - Event Category: `Form`
   - Event Label: Form type (e.g., "contact", "quote", "hero")
   - Value: 1

---

## 🚀 How to Set Up Google Analytics 4

### Step 1: Create a GA4 Property

1. Go to [Google Analytics](https://analytics.google.com)
2. Click **Admin** (gear icon, bottom left)
3. Under "Property" column, click **Create Property**
4. Enter property details:
   - **Property name:** Victorian Pallet Supply
   - **Reporting time zone:** Australia/Melbourne
   - **Currency:** Australian Dollar (AUD)
5. Click **Next**
6. Fill in business details and click **Create**
7. Accept Terms of Service

### Step 2: Set Up Data Stream

1. After creating property, you'll be prompted to set up a data stream
2. Select **Web**
3. Enter your website details:
   - **Website URL:** `https://www.victorianpalletsupply.com.au`
   - **Stream name:** Victorian Pallet Supply Website
4. Click **Create stream**
5. You'll see your **Measurement ID** (format: `G-XXXXXXXXXX`)
6. **Copy this Measurement ID** - you'll need it next

### Step 3: Add Tracking Code to Your Website

Add the following code to the `<head>` section of **all HTML pages** (before the closing `</head>` tag):

**Files to update:**
- `index.html`
- `src/pages/products.html`
- `src/pages/services.html`
- `src/pages/gallery.html`

**Code to add:**

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**⚠️ Replace `G-XXXXXXXXXX` with your actual Measurement ID!**

**Where to place it:**
Add after the meta tags and before the preload assets. Example placement in `index.html`:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="...">
    
    <!-- SEO Meta Tags -->
    ...
    
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    </script>
    
    <!-- Preload Critical Assets -->
    ...
</head>
```

### Step 4: Push Changes to GitHub

After adding the tracking code to all pages:

```bash
git add -A
git commit -m "Add Google Analytics 4 tracking code"
git push origin main
```

Wait 5-10 minutes for GitHub Pages to deploy.

---

## 📊 Tracking Form Conversions in GA4

### View Form Submissions in Real-Time

1. In GA4, go to **Reports** → **Realtime**
2. Submit a test form on your website
3. You should see:
   - Event name: `form_submit`
   - Page path: `/form-success`

### Set Up Conversion Goals

1. Go to **Admin** → **Events** (under Property column)
2. Find `form_submit` event in the list
3. Toggle **Mark as conversion** to ON
4. This will now track as a conversion in reports

### Create Custom Reports

1. Go to **Explore** in left menu
2. Click **Blank** to create a new exploration
3. Add dimensions:
   - Event name
   - Page path
   - Event label (to see which form type)
4. Add metrics:
   - Event count
   - Total users
5. Drag items to rows/columns to build your report

---

## 🎯 What You Can Track

Once set up, you'll be able to see:

- **Total form submissions** (conversions)
- **Which forms are most popular** (contact vs. quote vs. hero)
- **Conversion rate** (visitors who submit forms)
- **User journey** (pages visited before submitting form)
- **Traffic sources** (where form submitters came from)
- **Geographic data** (where your leads are located)
- **Device data** (mobile vs. desktop submissions)

---

## 🧪 Testing the Setup

### 1. Test Overlay
1. Go to your website
2. Fill out and submit the contact form
3. You should see:
   - ✅ Green animated checkmark
   - ✅ "Request Received!" message
   - ✅ Overlay auto-dismisses after 2 seconds

### 2. Test Analytics Tracking
1. Open your website in a new incognito/private browser window
2. In GA4, go to **Reports** → **Realtime**
3. Submit a form on your website
4. Within 30 seconds, you should see:
   - **Event:** `form_submit`
   - **Page:** `/form-success`
   - **Active users** increase by 1

### 3. Use Google Tag Assistant (Chrome Extension)
1. Install [Tag Assistant Legacy](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Go to your website
3. Click the Tag Assistant icon
4. Click **Enable** and refresh page
5. Submit a form
6. Tag Assistant should show:
   - ✅ GA4 tag firing correctly
   - ✅ Events being sent

---

## 📝 Virtual Pageview URL for Conversion Tracking

The form success creates a **virtual pageview** with this URL structure:

```
Current page URL + /form-success
```

**Examples:**
- Homepage form: `https://www.victorianpalletsupply.com.au/form-success`
- Products page quote: `https://www.victorianpalletsupply.com.au/src/pages/products.html/form-success`

You can use this URL pattern to:
- Set up **Goals** in GA4
- Create **Funnel reports** (page view → form success)
- Track **conversion paths**
- Set up **remarketing audiences** for form submitters

---

## 🔧 Advanced Configuration (Optional)

### Enhanced Conversion Tracking

Add additional data points to the `showSuccessOverlay()` function in `src/javascript/form-handler.js`:

```javascript
gtag('event', 'form_submit', {
    event_category: 'Form',
    event_label: formType,
    value: 1,
    product_interest: 'Australian Standard Pallets', // Add dynamically
    contact_method: 'web_form',
    lead_quality: 'hot'
});
```

### E-commerce Tracking (Future)

If you add a shopping cart later, you can track purchases:

```javascript
gtag('event', 'purchase', {
    transaction_id: 'T12345',
    value: 250.00,
    currency: 'AUD',
    items: [{
        item_id: 'pallet-aus-heavy',
        item_name: 'Australian Standard Pallet - Heavy',
        quantity: 10
    }]
});
```

---

## 🆘 Troubleshooting

### Forms Submit But No Data in GA4

**Causes:**
1. GA4 tracking code not added to pages
2. Measurement ID incorrect
3. Ad blocker blocking analytics
4. Still in deployment (wait 10 minutes)

**Solutions:**
1. Verify tracking code in page source (View → Developer → View Source)
2. Check Measurement ID format: `G-XXXXXXXXXX`
3. Test in incognito mode
4. Check browser console for errors

### Overlay Not Appearing

**Causes:**
1. CSS file not imported
2. JavaScript error preventing execution
3. Form missing `data-form-type` attribute

**Solutions:**
1. Verify `success-overlay.css` imported in `main.css`
2. Check browser console for JavaScript errors
3. Add `data-form-type="contact"` to form element

### Multiple Overlays Appearing

**Cause:** `createSuccessOverlay()` called multiple times

**Solution:** Function already checks for existing overlay. If issue persists, check that `form-handler.js` is only loaded once.

---

## 📚 Resources

- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- [GA4 Event Tracking](https://support.google.com/analytics/answer/9267735)
- [GA4 Conversions](https://support.google.com/analytics/answer/9267568)
- [GA4 vs Universal Analytics](https://support.google.com/analytics/answer/11583528)

---

## 🎉 You're All Set!

Once you add the GA4 tracking code and push to GitHub, you'll have:
- ✅ Beautiful form success overlay
- ✅ Automatic conversion tracking
- ✅ Data-driven insights into customer behavior
- ✅ Ability to optimize marketing spend based on form submission sources

**Next Steps:**
1. Add GA4 tracking code to all 4 HTML pages
2. Push to GitHub
3. Submit test form and verify in GA4 Realtime
4. Mark `form_submit` as a conversion
5. Start analyzing your data!

---

**Questions?** Check the [GA4 Help Center](https://support.google.com/analytics/) or contact support.

