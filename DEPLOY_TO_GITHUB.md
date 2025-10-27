# 🚀 Deploy to GitHub Pages - Complete Guide

## 📋 Prerequisites

- GitHub account (create free at https://github.com/signup)
- Git installed on your computer
- Your Sarawak Food Court project

---

## 🎯 Quick Deployment (5 Steps)

### Step 1: Install Git (if not installed)

**Check if Git is installed:**
```powershell
git --version
```

**If not installed, download from:**
https://git-scm.com/download/win

---

### Step 2: Create GitHub Repository

1. **Go to GitHub:** https://github.com
2. **Click** the `+` icon (top right) → "New repository"
3. **Repository name:** `sarawak-food-court`
4. **Description:** "Digital food court ordering system with QR codes"
5. **Public** repository (free hosting)
6. **DO NOT** check "Add README" (we already have files)
7. **Click** "Create repository"

---

### Step 3: Initialize Git in Your Project

**Open PowerShell in your project folder:**
```powershell
cd "c:\UTS_SYLLABUS\Year 2 sem 3\digital_innivation\Asigment\Sarawak_Hub_Centrel"
```

**Initialize Git:**
```powershell
git init
```

**Add all files:**
```powershell
git add .
```

**Commit files:**
```powershell
git commit -m "Initial commit - Sarawak Food Court ordering system"
```

---

### Step 4: Push to GitHub

**Add remote repository** (replace `YOUR_USERNAME` with your GitHub username):
```powershell
git remote add origin https://github.com/YOUR_USERNAME/sarawak-food-court.git
```

**Rename branch to main:**
```powershell
git branch -M main
```

**Push to GitHub:**
```powershell
git push -u origin main
```

**Enter your GitHub credentials when prompted**

---

### Step 5: Enable GitHub Pages

1. **Go to your repository** on GitHub
2. **Click** "Settings" tab
3. **Scroll down** to "Pages" (left sidebar)
4. **Under "Source":**
   - Select: `main` branch
   - Folder: `/ (root)`
5. **Click** "Save"
6. **Wait 1-2 minutes** for deployment

**Your site will be live at:**
```
https://YOUR_USERNAME.github.io/sarawak-food-court/
```

---

## 🎉 You're Live!

### Your URLs:

**Main Site:**
```
https://YOUR_USERNAME.github.io/sarawak-food-court/
```

**Customer Portal:**
```
https://YOUR_USERNAME.github.io/sarawak-food-court/customer/home.html
```

**Hawker Login:**
```
https://YOUR_USERNAME.github.io/sarawak-food-court/hawker/login.html
```

**QR Generator:**
```
https://YOUR_USERNAME.github.io/sarawak-food-court/qr-generator.html
```

---

## 🔄 Update Your QR Codes for Production

### Step 1: Generate Production QR Codes

1. **Open** `qr-generator.html` on your deployed site:
   ```
   https://YOUR_USERNAME.github.io/sarawak-food-court/qr-generator.html
   ```

2. **Change the URL field** to:
   ```
   https://YOUR_USERNAME.github.io/sarawak-food-court
   ```

3. **Click** "Generate QR Codes"

4. **Download or print** all 20 QR codes

5. **These QR codes now work anywhere!** (Not just on your WiFi)

---

## 📱 Share with Anyone

### Your project is now accessible worldwide!

**Share these links:**

**For customers:**
```
https://YOUR_USERNAME.github.io/sarawak-food-court/
```

**For testing specific tables:**
```
https://YOUR_USERNAME.github.io/sarawak-food-court/index.html?table=1
https://YOUR_USERNAME.github.io/sarawak-food-court/index.html?table=2
...and so on
```

**For your lecturer:**
- Send the main URL
- They can test from their phone
- No need to be on same WiFi!

---

## 🔄 How to Update Your Site

### When you make changes:

1. **Save your changes** in VS Code

2. **Add changes:**
   ```powershell
   git add .
   ```

3. **Commit changes:**
   ```powershell
   git commit -m "Description of what you changed"
   ```

4. **Push to GitHub:**
   ```powershell
   git push
   ```

5. **Wait 1-2 minutes** for GitHub Pages to update

6. **Refresh browser** to see changes

---

## 🎓 For Your Assignment Submission

### Include These Links:

**Live Demo:**
```
https://YOUR_USERNAME.github.io/sarawak-food-court/
```

**Source Code:**
```
https://github.com/YOUR_USERNAME/sarawak-food-court
```

**Documentation:**
- README.md: Project overview
- GETTING_STARTED.md: Setup guide
- TABLE_QR_CODES.md: QR code system
- MOBILE_ACCESS.md: Mobile usage guide

---

## 🐛 Troubleshooting

### Issue: "Git not recognized"
**Solution:** Install Git from https://git-scm.com/download/win

### Issue: "Permission denied"
**Solution:** 
- Use HTTPS URL (not SSH)
- Or generate Personal Access Token on GitHub

### Issue: "Site not loading"
**Solution:**
- Wait 2-5 minutes after enabling Pages
- Check GitHub Actions tab for deployment status
- Clear browser cache

### Issue: "404 error on pages"
**Solution:**
- Ensure all links use relative paths
- Check file names match exactly (case-sensitive)

### Issue: "Changes not showing"
**Solution:**
- Wait 1-2 minutes after push
- Hard refresh: `Ctrl + Shift + R`
- Clear browser cache

---

## 💡 Alternative: Deploy to Netlify (Even Easier!)

### If you prefer drag-and-drop:

1. **Go to:** https://app.netlify.com/drop

2. **Drag your project folder** onto the page

3. **Done!** You get a URL like:
   ```
   https://sarawak-food-court.netlify.app
   ```

4. **Advantages:**
   - Instant deployment (no Git needed)
   - Custom domain support
   - Faster than GitHub Pages
   - Automatic HTTPS

---

## 📊 GitHub Pages vs Netlify

| Feature | GitHub Pages | Netlify |
|---------|--------------|---------|
| **Setup** | Git commands | Drag & drop |
| **Speed** | 1-2 min deploy | Instant |
| **Updates** | Git push | Re-upload or Git |
| **Cost** | Free | Free |
| **Custom Domain** | Yes | Yes (easier) |
| **Best For** | Learning Git | Quick demos |

---

## 🎯 Recommended for Assignment

### Use GitHub Pages Because:

✅ **Shows Git skills** - Impressive on resume
✅ **Professional workflow** - Industry standard
✅ **Version control** - Track all changes
✅ **Easy updates** - Just `git push`
✅ **Free forever** - Unlimited hosting

---

## 📝 What to Include in Assignment Report

### Technical Details:

**Hosting Platform:** GitHub Pages
**Repository:** https://github.com/YOUR_USERNAME/sarawak-food-court
**Live Demo:** https://YOUR_USERNAME.github.io/sarawak-food-court/

**Technologies Used:**
- Frontend: HTML5, CSS3, JavaScript
- Version Control: Git/GitHub
- Hosting: GitHub Pages
- CI/CD: GitHub Actions (automatic)

**Deployment Process:**
1. Initialized Git repository
2. Committed all project files
3. Pushed to GitHub
4. Enabled GitHub Pages
5. Generated production QR codes

---

## 🌟 Pro Tips

### 1. **Custom Domain** (Optional)
   - Buy domain (e.g., sarawakfoodcourt.com)
   - Add CNAME file to repository
   - Configure DNS settings
   - Professional touch!

### 2. **README Badge**
   Add to your README.md:
   ```markdown
   ![Status](https://img.shields.io/badge/status-live-brightgreen)
   ![Platform](https://img.shields.io/badge/platform-GitHub%20Pages-blue)
   ```

### 3. **Analytics** (Optional)
   - Add Google Analytics
   - Track visitors
   - Show usage statistics in report

### 4. **Progressive Web App** (Future)
   - Add manifest.json
   - Add service worker
   - Install as mobile app!

---

## ✅ Deployment Checklist

Before sharing your link:

- [ ] All pages load correctly
- [ ] QR codes work with production URL
- [ ] Mobile responsive (test on phone)
- [ ] Images load properly
- [ ] Forms work as expected
- [ ] Cart functionality works
- [ ] Order tracking works
- [ ] Hawker login works (stall1/demo123)
- [ ] Navigation links all work
- [ ] No console errors (press F12)

---

## 🎉 Success!

### Your project is now:

✅ **Deployed globally** - Anyone can access it
✅ **Mobile-ready** - Works on all phones
✅ **Professional** - Production-ready URL
✅ **Shareable** - Send link to anyone
✅ **Portfolio-worthy** - Add to your resume!

---

## 📞 Quick Commands Reference

```powershell
# Check Git status
git status

# Add all changes
git add .

# Commit with message
git commit -m "Your message here"

# Push to GitHub
git push

# Pull latest changes
git pull

# View commit history
git log

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main
```

---

## 🔗 Useful Links

- **GitHub Pages Docs:** https://pages.github.com/
- **Git Documentation:** https://git-scm.com/doc
- **Netlify:** https://www.netlify.com/
- **Custom Domain Guide:** https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

---

**Happy Deploying! 🚀**

Your Sarawak Food Court is about to go live!
