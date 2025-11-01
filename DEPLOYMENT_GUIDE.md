# 🚀 Deployment Guide: Making QR Codes Work for Public Users

## The Problem

Currently, your QR codes point to `http://localhost:5500`, which only works on your development computer. Users scanning these QR codes on their phones will get an error because `localhost` refers to **their** device, not your server.

## The Solution

Deploy your website to a **public hosting service** and update the QR code configuration to use that public URL.

---

## 📋 Step-by-Step Deployment Process

### Step 1: Choose a Hosting Platform

Here are the best **FREE** options for hosting your static website:

| Platform | Best For | Custom Domain | Setup Difficulty |
|----------|----------|---------------|------------------|
| **Netlify** | Beginners | ✅ Yes | ⭐ Easy |
| **Vercel** | Modern apps | ✅ Yes | ⭐ Easy |
| **GitHub Pages** | Open source | ✅ Yes | ⭐⭐ Medium |
| **Cloudflare Pages** | Performance | ✅ Yes | ⭐⭐ Medium |

**Recommendation**: Use **Netlify** - it's the easiest and most beginner-friendly.

---

## 🌐 Option 1: Deploy to Netlify (Recommended)

### A. Setup Netlify Account

1. Go to https://www.netlify.com/
2. Click **"Sign up"**
3. Sign up with GitHub (recommended) or email
4. Verify your email

### B. Deploy Your Site

#### Method 1: Drag & Drop (Easiest)

1. **Prepare your files:**
   - Open your project folder: `/home/yew/Desktop/DIE Assignment/sarawak-food-court/`
   - Make sure all files are there

2. **Create a ZIP file:**
   ```bash
   cd /home/yew/Desktop/DIE\ Assignment/
   zip -r sarawak-food-court.zip sarawak-food-court/
   ```

3. **Upload to Netlify:**
   - Log into Netlify
   - Click **"Add new site"** → **"Deploy manually"**
   - Drag and drop your project folder (or the ZIP file)
   - Wait for deployment (30-60 seconds)

4. **Get your URL:**
   - Netlify will give you a URL like: `https://random-name-12345.netlify.app`
   - You can customize it: Click **"Site settings"** → **"Change site name"**
   - Example: `https://sarawak-food-court.netlify.app`

#### Method 2: Connect GitHub (Better for Updates)

1. Push your project to GitHub first
2. In Netlify: **"Add new site"** → **"Import from Git"**
3. Connect to GitHub and select your repository
4. Click **"Deploy site"**
5. Every time you push to GitHub, Netlify auto-updates!

---

## ⚙️ Step 2: Update QR Code Configuration

Once deployed, you need to update the configuration so QR codes use your public URL.

### Update 1: QR Code Manager (`js/qr-code-manager.js`)

Open `/home/yew/Desktop/DIE Assignment/sarawak-food-court/js/qr-code-manager.js`

Find this section at the top:

```javascript
const QR_CONFIG = {
    PRODUCTION_URL: 'http://localhost:5500', // ⚠️ CHANGE THIS
    USE_AUTO_DETECT: true
};
```

**Replace** `http://localhost:5500` with your Netlify URL:

```javascript
const QR_CONFIG = {
    PRODUCTION_URL: 'https://sarawak-food-court.netlify.app', // ✅ Your actual URL
    USE_AUTO_DETECT: true
};
```

### Update 2: QR Generator (`qr-generator.html`)

Open `/home/yew/Desktop/DIE Assignment/sarawak-food-court/qr-generator.html`

Find the input field (around line 236):

```html
<input type="text" id="baseUrl" value="http://localhost:5500">
```

**Change to:**

```html
<input type="text" id="baseUrl" value="https://sarawak-food-court.netlify.app">
```

---

## 🔄 Step 3: Regenerate QR Codes

After updating the configuration:

### Method A: Using Admin Panel (Recommended)

1. Open your deployed site: `https://your-site.netlify.app/admin/login.html`
2. Log in with your admin credentials
3. Go to **"Food Courts"** management
4. For each food court:
   - Click **"Generate QR Code"**
   - Select table number
   - Click **"Reset QR Code"** (orange button) to regenerate existing ones
   - The new QR codes will use the production URL

### Method B: Using QR Generator Tool

1. Open: `https://your-site.netlify.app/qr-generator.html`
2. Enter your production URL
3. Set number of tables
4. Click **"Generate QR Codes"**
5. Download and print them

---

## ✅ Step 4: Test the QR Codes

### Test 1: From Your Phone

1. Open the QR code image on your computer
2. Use your phone camera to scan it
3. You should be redirected to: `https://your-site.netlify.app/customer/home.html?table=X`
4. Try ordering food!

### Test 2: Share with Others

1. Send a QR code to a friend
2. Ask them to scan it with their phone
3. They should be able to access the menu and order

---

## 🎯 Complete Example

Let's say your Netlify URL is: `https://sarawak-food-court.netlify.app`

**After configuration**, your QR codes will generate URLs like:
```
https://sarawak-food-court.netlify.app/customer/home.html?foodcourt=abc123&table=5
```

Anyone scanning this QR code will:
1. ✅ Open the website (publicly accessible)
2. ✅ See they're at Table 5
3. ✅ Browse all food stalls
4. ✅ Add items to cart and order

---

## 🔧 Alternative Hosting Options

### Option 2: GitHub Pages

1. **Push to GitHub:**
   ```bash
   cd /home/yew/Desktop/DIE\ Assignment/sarawak-food-court/
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/sarawak-food-court.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repository **Settings**
   - Scroll to **"Pages"**
   - Source: Deploy from **main** branch
   - Click **Save**

3. **Your URL will be:**
   ```
   https://YOUR_USERNAME.github.io/sarawak-food-court/
   ```

4. **Update configuration** to use this URL

### Option 3: Vercel

1. Go to https://vercel.com/
2. Sign up with GitHub
3. Click **"Add New Project"**
4. Import your GitHub repository
5. Click **"Deploy"**
6. Get URL: `https://sarawak-food-court.vercel.app`

---

## 🚨 Important Notes

### Database Configuration

Your Supabase configuration should already work in production since it uses environment variables. Just make sure:

1. **Supabase URL is set** in `config/supabase.js`
2. **API keys are valid** and not expired
3. **Database is accessible** from any domain (check Supabase settings)

### HTTPS is Required

- ✅ All hosting platforms provide **free HTTPS**
- ✅ QR codes will use `https://` (secure)
- ✅ Camera scanning works (requires HTTPS)

### Testing Before Printing

Before printing physical QR codes:
1. ✅ Test on multiple devices (Android, iOS)
2. ✅ Test different browsers (Chrome, Safari)
3. ✅ Verify the full ordering process works
4. ✅ Check payment QR codes display correctly

---

## 📝 Quick Checklist

- [ ] Choose hosting platform (Netlify recommended)
- [ ] Deploy website to hosting platform
- [ ] Copy your production URL
- [ ] Update `QR_CONFIG.PRODUCTION_URL` in `js/qr-code-manager.js`
- [ ] Update default URL in `qr-generator.html`
- [ ] Regenerate all QR codes using admin panel
- [ ] Test QR codes on mobile devices
- [ ] Print and place QR codes on tables
- [ ] 🎉 Users can now scan and order!

---

## 🆘 Troubleshooting

### QR Code Points to Localhost

**Problem:** QR code still shows `localhost` URL

**Solution:**
1. Clear browser cache
2. Regenerate QR codes after updating config
3. Check `QR_CONFIG.PRODUCTION_URL` is set correctly

### Database Connection Error

**Problem:** "Failed to fetch" or Supabase errors

**Solution:**
1. Check Supabase URL in `config/supabase.js`
2. Verify API key is correct
3. Check Supabase project is active

### Camera Not Working

**Problem:** QR scanner won't access camera

**Solution:**
1. Must use HTTPS (not HTTP)
2. Check browser permissions
3. Test on different browser

---

## 📞 Need Help?

If you encounter issues:
1. Check browser console for errors (F12)
2. Verify network requests in Network tab
3. Test with a simple URL first
4. Ask for help with specific error messages

---

## 🎓 Summary

**Before:** QR codes → `http://localhost:5500` → Only works on your computer ❌

**After:** QR codes → `https://your-site.netlify.app` → Works for everyone! ✅

The key changes:
1. **Deploy to public hosting** (Netlify, Vercel, GitHub Pages)
2. **Update QR configuration** with production URL
3. **Regenerate QR codes** with new URL
4. **Test and deploy** physical QR codes

Now anyone can scan your QR codes and order food! 🎉
