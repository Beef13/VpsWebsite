# 🔄 Clear Cache Instructions

## Problem
Changes not showing on live site due to browser/service worker cache.

---

## Solution: Clear All Caches

### Method 1: Quick Fix (Recommended)

1. **Visit your website**: https://www.victorianpalletsupply.com.au/home/

2. **Open Browser Console** (F12 or right-click → Inspect)

3. **Paste this code** and press Enter:
```javascript
// Unregister all service workers
navigator.serviceWorker.getRegistrations().then(function(registrations) {
  for(let registration of registrations) {
    registration.unregister();
    console.log('Service Worker unregistered');
  }
});

// Clear all caches
caches.keys().then(function(names) {
  for(let name of names) {
    caches.delete(name);
    console.log('Cache deleted:', name);
  }
});

// Reload after 1 second
setTimeout(function() {
  console.log('Reloading...');
  window.location.reload(true);
}, 1000);
```

4. **Wait** - Page will auto-reload in 1 second

5. **Verify** - Check if product info is now correct

---

### Method 2: Manual Cache Clear

#### Step 1: Unregister Service Worker
1. Open DevTools (F12)
2. Go to **Application** tab
3. Click **Service Workers** (left sidebar)
4. Find your service worker
5. Click **Unregister**

#### Step 2: Clear Storage
1. Still in **Application** tab
2. Click **Storage** (left sidebar)
3. Check all boxes:
   - Local storage
   - Session storage
   - IndexedDB
   - Web SQL
   - Cookies
   - Cache storage
4. Click **Clear site data**

#### Step 3: Hard Refresh
- **Mac**: Cmd + Shift + R
- **Windows/Linux**: Ctrl + Shift + F5
- **Or**: Hold Shift and click Reload button

---

### Method 3: Incognito/Private Window

1. Open **Incognito/Private window**:
   - Chrome: Cmd/Ctrl + Shift + N
   - Safari: Cmd + Shift + N
   - Firefox: Cmd/Ctrl + Shift + P

2. Visit: https://www.victorianpalletsupply.com.au/home/

3. Check if changes are visible

If changes show in incognito but not in regular window, it's definitely a cache issue - use Method 1 or 2.

---

## Verification

### Check Product Info Should Show:
- **Block Pallet (Used)**
  - Size: **1200x1000mm** ✅ (not 1200x100mm)
  - Weight: **1000kg** ✅ (not 100kg)

### Check Service Worker
1. DevTools (F12) → Application → Service Workers
2. Should show **empty** or **new active worker** after clearing

### Check Network Tab
1. DevTools (F12) → Network tab
2. Reload page
3. Find `products.json` request
4. Should show "200 OK" (not "from Service Worker" or "from cache")

---

## Why This Happened

The Service Worker we implemented caches files for faster performance. However, it was caching the OLD version of `products.json` before we made the fixes.

After clearing cache:
- ✅ New data loads from server
- ✅ Service Worker re-caches the NEW version
- ✅ Future visits will show correct data

---

## Prevention

To prevent this in the future, we can:

1. **Update Service Worker version** when data changes
2. **Add cache busting** for JSON files
3. **Shorter cache duration** for data files

Would you like me to implement any of these solutions?

---

## Still Not Working?

If changes still don't show after clearing cache:

### 1. Verify GitHub Pages Deployment
Visit: https://github.com/Beef13/VpsWebsite/deployments

### 2. Check Raw File on GitHub
Visit: https://github.com/Beef13/VpsWebsite/blob/main/src/data/products.json
Look for line ~88 - should show "1200x1000mm" and "1000kg"

### 3. Try Different Browser
Open site in different browser (Chrome, Safari, Firefox)

### 4. Wait 5 Minutes
Sometimes GitHub Pages CDN needs time to propagate

---

## Need Help?

If none of these methods work:
1. Let me know which method you tried
2. Tell me what error messages you see (if any)
3. Check the browser console for errors (F12 → Console tab)

---

**Last Updated**: December 4, 2025

