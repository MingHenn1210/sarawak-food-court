# 🚀 QUICK START: Deploy & Make QR Codes Public

## ⏱️ 15-Minute Setup

Follow these steps to make your QR codes work for everyone!

---

## 📋 Prerequisites

- ✅ Your project is ready in: `/home/yew/Desktop/DIE Assignment/sarawak-food-court/`
- ✅ You have a GitHub account (free)
- ✅ You have a Netlify account (free - create at netlify.com)

---

## 🎯 Step 1: Deploy to Netlify (5 minutes)

### Option A: Drag & Drop (Easiest)

1. **Open Terminal:**
   ```bash
   cd /home/yew/Desktop/DIE\ Assignment/
   ```

2. **Create ZIP file:**
   ```bash
   zip -r sarawak-food-court.zip sarawak-food-court/ -x "*/node_modules/*" "*/.git/*"
   ```

3. **Go to Netlify:**
   - Open https://app.netlify.com/
   - Login or create account
   - Click **"Add new site"** → **"Deploy manually"**

4. **Drag & Drop:**
   - Drag your `sarawak-food-court` folder to Netlify
   - Wait 30-60 seconds for deployment

5. **Get Your URL:**
   - You'll get a URL like: `https://amazing-curie-123456.netlify.app`
   - Click **"Site settings"** → **"Change site name"** to customize
   - Example: `https://sarawak-food-court.netlify.app`

✅ **Your site is now live!**

---

## 🔧 Step 2: Update Configuration (3 minutes)

### Update File 1: QR Code Manager

1. **Open:** `js/qr-code-manager.js`

2. **Find line 15:**
   ```javascript
   PRODUCTION_URL: 'http://localhost:5500', // ⚠️ CHANGE THIS
   ```

3. **Change to your Netlify URL:**
   ```javascript
   PRODUCTION_URL: 'https://sarawak-food-court.netlify.app', // ✅ Your URL
   ```

### Update File 2: QR Generator (Optional but Recommended)

1. **Open:** `qr-generator.html`

2. **Find line 236:**
   ```html
   <input type="text" id="baseUrl" value="http://localhost:5500">
   ```

3. **Change to:**
   ```html
   <input type="text" id="baseUrl" value="https://sarawak-food-court.netlify.app">
   ```

### Save Files

```bash
# No need to commit if using drag & drop
# Just save the files
```

---

## 🔄 Step 3: Re-Deploy Updated Files (2 minutes)

### If using Drag & Drop:

1. **Create new ZIP with updated files:**
   ```bash
   cd /home/yew/Desktop/DIE\ Assignment/
   zip -r sarawak-food-court.zip sarawak-food-court/ -x "*/node_modules/*" "*/.git/*"
   ```

2. **Go to Netlify:**
   - Open your site in Netlify dashboard
   - Click **"Deploys"** tab
   - Drag the folder again (or use **"Deploy manually"**)
   - Wait for deployment

✅ **Updated site is now live!**

---

## 🎨 Step 4: Generate QR Codes (3 minutes)

### Method A: Using Admin Panel

1. **Open your deployed admin panel:**
   ```
   https://your-site.netlify.app/admin/login.html
   ```

2. **Login** with your admin credentials

3. **Go to "Food Courts"** management

4. **For each food court:**
   - Click **"Generate QR Code"** button
   - Enter table number (e.g., 1, 2, 3...)
   - Click **"Generate QR Code"** (green button)
   - Right-click QR image → **"Save image as..."**
   - Save to your computer

5. **Repeat** for all tables you need

### Method B: Using QR Generator Tool (For Multiple Tables)

1. **Open:**
   ```
   https://your-site.netlify.app/qr-generator.html
   ```

2. **Enter:**
   - Website URL: `https://your-site.netlify.app`
   - Number of tables: `20` (or however many you have)

3. **Click "Generate QR Codes"**

4. **Download each QR code** or **Print** the entire page

---

## ✅ Step 5: Test QR Codes (2 minutes)

### Test on Your Phone:

1. **Open a QR code** on your computer screen

2. **Use your phone camera** to scan it

3. **Expected result:**
   - Opens: `https://your-site.netlify.app/customer/home.html?table=X`
   - Shows "Table X" in header
   - Displays list of food stalls
   - You can browse and add items to cart

4. **If it works:** ✅ Ready to deploy!

5. **If it doesn't work:** Check troubleshooting below 👇

---

## 🖨️ Step 6: Print & Deploy Physical QR Codes

### Printing:

1. **Option A: Individual QR codes**
   - Open each saved QR code image
   - Print at 5cm x 5cm or larger
   - Label with table number

2. **Option B: Print from qr-generator.html**
   - Open `https://your-site.netlify.app/qr-generator.html`
   - Click **"Print All QR Codes"**
   - Use print preview to adjust layout
   - Print on A4 paper

### Deploy on Tables:

1. **Laminate** QR codes (recommended for durability)
2. **Place** on tables with clear visibility
3. **Add instructions** (optional):
   ```
   📱 Scan to Order Food
   Point your camera at this QR code
   ```

---

## 🎉 Done!

Your QR codes now work for **anyone, anywhere**!

### What Happens Now:

```
Customer walks to table
    ↓
Scans QR code with phone
    ↓
Opens your website: https://your-site.netlify.app
    ↓
Sees they're at Table X
    ↓
Browses food stalls
    ↓
Orders food
    ↓
Hawker receives order in real-time
    ↓
Customer gets food! 🍜
```

---

## 🐛 Troubleshooting

### Issue: "QR code opens but shows error"

**Check:**
```bash
# Test URL directly
curl https://your-site.netlify.app/customer/home.html
```

**Fix:** Make sure site is deployed and accessible

---

### Issue: "QR code still shows localhost"

**Check:**
1. Did you update `PRODUCTION_URL` in `js/qr-code-manager.js`?
2. Did you re-deploy after updating?
3. Did you regenerate the QR codes?

**Fix:**
```bash
# 1. Verify file content
cat js/qr-code-manager.js | grep PRODUCTION_URL

# 2. Should show your Netlify URL, not localhost
# 3. If still localhost, update and re-deploy
```

---

### Issue: "Database connection error"

**Check Supabase:**
1. Open `config/supabase.js`
2. Verify Supabase URL is correct
3. Verify API key is valid
4. Check Supabase project is active

---

### Issue: "Camera not working when scanning"

**Requirements:**
- ✅ Must use HTTPS (Netlify provides this automatically)
- ✅ Phone must grant camera permission
- ✅ Use phone's native camera app (not a third-party app)

---

## 📊 Verification Checklist

Before calling it done:

- [ ] Website deployed to Netlify
- [ ] Can access: `https://your-site.netlify.app/`
- [ ] Updated `PRODUCTION_URL` in code
- [ ] Re-deployed with updated code
- [ ] Generated QR codes via admin panel
- [ ] Scanned QR with phone - works!
- [ ] URL does NOT contain "localhost"
- [ ] Can browse food stalls
- [ ] Can add items to cart
- [ ] Can place order
- [ ] Order appears in hawker dashboard
- [ ] Printed QR codes
- [ ] Placed QR codes on tables
- [ ] 🎉 System is live!

---

## 📞 Next Steps

### For Testing:
- Share QR code with friends/family
- Ask them to scan and test ordering
- Gather feedback

### For Production:
- Monitor orders through hawker dashboard
- Check for any errors in browser console
- Keep backup of QR code images

### For Updates:
- Update code → Re-deploy to Netlify
- If QR URLs change → Regenerate QR codes
- If adding tables → Generate new QR codes

---

## 🆘 Need More Help?

**Detailed Guides:**
- `DEPLOYMENT_GUIDE.md` - Complete deployment walkthrough
- `UPDATE_PRODUCTION_URL.md` - Quick reference for URL updates
- `CHANGES_SUMMARY.md` - What changed and why

**Quick Reference:**
```bash
# View files
ls -la /home/yew/Desktop/DIE\ Assignment/sarawak-food-court/

# Check configuration
grep -n "PRODUCTION_URL" js/qr-code-manager.js

# Create new deployment ZIP
zip -r sarawak-food-court.zip sarawak-food-court/
```

---

## 🎓 Summary

**What You Did:**
1. ✅ Deployed website to public URL (Netlify)
2. ✅ Updated configuration with production URL
3. ✅ Re-deployed updated code
4. ✅ Generated QR codes with public URL
5. ✅ Tested on mobile device
6. ✅ Printed and deployed QR codes

**Result:**
🎊 **Anyone can now scan QR codes and order food!**

---

**Time taken:** ~15 minutes  
**Cost:** $0 (everything is free!)  
**Result:** Professional food court ordering system! 🚀
