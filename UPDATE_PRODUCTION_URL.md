# 🔧 Quick Guide: Update Production URL

## What You Need

Your deployed website URL. For example:
- `https://sarawak-food-court.netlify.app`
- `https://your-username.github.io/sarawak-food-court`
- `https://your-domain.com`

---

## Files to Update

### 1️⃣ Update QR Code Manager

**File:** `js/qr-code-manager.js`

**Find (around line 10):**
```javascript
const QR_CONFIG = {
    PRODUCTION_URL: 'http://localhost:5500', // ⚠️ CHANGE THIS
    USE_AUTO_DETECT: true
};
```

**Change to:**
```javascript
const QR_CONFIG = {
    PRODUCTION_URL: 'https://YOUR-ACTUAL-URL-HERE.netlify.app', // ✅ Your URL
    USE_AUTO_DETECT: true
};
```

---

### 2️⃣ Update QR Generator Default

**File:** `qr-generator.html`

**Find (around line 236):**
```html
<input type="text" id="baseUrl" value="http://localhost:5500">
```

**Change to:**
```html
<input type="text" id="baseUrl" value="https://YOUR-ACTUAL-URL-HERE.netlify.app">
```

---

## After Updating

### Option A: Re-deploy to Netlify

If using Netlify with drag-and-drop:
1. Save your changes
2. Create a new ZIP of your project
3. Drag to Netlify (it will update your site)

If using Netlify with GitHub:
1. Commit changes: `git add . && git commit -m "Update production URL"`
2. Push: `git push`
3. Netlify auto-deploys!

### Option B: Regenerate QR Codes

1. Go to your admin panel: `https://YOUR-SITE/admin/food-courts.html`
2. For each table, click **"Reset QR Code"** button
3. New QR codes will use the production URL
4. Download and print

---

## Testing

### Test QR Code URL

Generate a QR code and check the URL it contains:
1. Go to admin panel
2. Generate QR for Table 1
3. Right-click QR image → "Copy image address"
4. It should look like:
   ```
   https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fyour-site.netlify.app%2Fcustomer%2Fhome.html%3Ffoodcourt%3Dabc123%26table%3D1
   ```

5. Decode the `data=` parameter - it should contain your production URL, not `localhost`

### Test on Phone

1. Open QR code on computer screen
2. Scan with phone camera
3. Should open your production site (not error)
4. Should show "Table X" in the header
5. Should load food stalls

---

## ✅ Verification Checklist

- [ ] Updated `PRODUCTION_URL` in `js/qr-code-manager.js`
- [ ] Updated default URL in `qr-generator.html`
- [ ] Saved all changes
- [ ] Re-deployed website (if needed)
- [ ] Generated test QR code
- [ ] Scanned with phone - works!
- [ ] Verified URL doesn't contain "localhost"
- [ ] Full order flow tested

---

## Example: Complete Setup

Let's say you deployed to Netlify and got: `https://sarawak-food-court.netlify.app`

**File 1: `js/qr-code-manager.js`**
```javascript
const QR_CONFIG = {
    PRODUCTION_URL: 'https://sarawak-food-court.netlify.app',
    USE_AUTO_DETECT: true
};
```

**File 2: `qr-generator.html`**
```html
<input type="text" id="baseUrl" value="https://sarawak-food-court.netlify.app">
```

**Result:** All QR codes will point to your public site! 🎉

---

## Common Issues

### Issue 1: Still showing localhost

**Cause:** Browser cached old version

**Fix:**
1. Hard refresh: `Ctrl+Shift+R` (Linux/Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Regenerate QR codes

### Issue 2: 404 Not Found

**Cause:** Wrong path in URL

**Fix:**
1. Check your site structure on hosting
2. Verify path is `/customer/home.html` not `/home.html`
3. Test direct URL in browser first

### Issue 3: Database Error

**Cause:** Supabase not configured for production domain

**Fix:**
1. Go to Supabase dashboard
2. Settings → API
3. Check if site URL is allowed
4. Add your production domain if needed

---

Need help? Check the full **DEPLOYMENT_GUIDE.md** for detailed instructions!
