# 📱 Table QR Code System

## Overview

Each table in the food court has a **unique QR code** that customers scan to start ordering. This ensures:
- ✅ Accurate order delivery to correct table
- ✅ No confusion with other customers
- ✅ Easy table tracking for hawkers
- ✅ Professional food court experience

---

## 🎯 How It Works

### Customer Flow:
1. **Customer sits at a table** (e.g., Table 5)
2. **Scans the QR code** on the table using phone camera
3. **System automatically detects**: "You are at Table 5"
4. **Browses and orders** from any food stall
5. **Order is linked to Table 5** for delivery

### Hawker Flow:
1. **Receives order** with table number displayed
2. **Prepares the food**
3. **Delivers to the correct table** (Table 5)
4. **Customer receives notification** when order is ready

---

## 🔗 QR Code URLs

Each table's QR code should link to:

```
https://your-domain.com/index.html?table=X
```

Where `X` is the table number (1-20).

### For Local Testing:
```
http://localhost:5500/index.html?table=1
http://localhost:5500/index.html?table=2
http://localhost:5500/index.html?table=3
...and so on
```

### For Production (after deployment):
```
https://sarawak-food-court.netlify.app/index.html?table=1
https://sarawak-food-court.netlify.app/index.html?table=2
https://sarawak-food-court.netlify.app/index.html?table=3
...and so on
```

---

## 🖨️ How to Generate QR Codes

### Method 1: Using Online QR Generator (Easiest)

1. **Go to a QR code generator:**
   - https://www.qr-code-generator.com/
   - https://www.the-qrcode-generator.com/
   - https://qr.io/

2. **For each table, create a QR code with the URL:**
   ```
   https://your-deployed-site.com/index.html?table=1
   ```

3. **Download each QR code** as PNG or SVG

4. **Name the files:**
   - `table-01-qr.png`
   - `table-02-qr.png`
   - etc.

### Method 2: Bulk Generate with API

Use the QR Server API to generate all at once:

```javascript
// Generate QR codes for tables 1-20
for (let i = 1; i <= 20; i++) {
    const url = `https://your-domain.com/index.html?table=${i}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(url)}`;
    console.log(`Table ${i}: ${qrUrl}`);
}
```

### Method 3: Using Python Script

Create `generate_qr_codes.py`:

```python
import qrcode
import os

# Create output directory
os.makedirs('table_qr_codes', exist_ok=True)

# Your deployed URL (change this!)
base_url = "https://your-domain.com/index.html?table="

# Generate QR codes for 20 tables
for table_num in range(1, 21):
    url = f"{base_url}{table_num}"
    
    # Create QR code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)
    
    # Create image
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Save
    filename = f"table_qr_codes/table-{table_num:02d}-qr.png"
    img.save(filename)
    print(f"✅ Generated: {filename}")

print("\n🎉 All QR codes generated in 'table_qr_codes' folder!")
```

Run with:
```bash
pip install qrcode[pil]
python generate_qr_codes.py
```

---

## 🎨 QR Code Design Template

### Recommended Design:

```
┌─────────────────────────┐
│                         │
│     [QR CODE HERE]      │
│      (500x500px)        │
│                         │
│      TABLE  05          │
│   Scan to Order         │
│                         │
└─────────────────────────┘
```

### Specifications:
- **QR Code Size**: 500x500 pixels minimum
- **Print Size**: 10cm x 10cm (recommended)
- **Paper**: Laminated cardstock or acrylic stand
- **Colors**: Black QR on white background (best scanning)
- **Font**: Large, bold numbers for table identification

---

## 🖨️ Printing Instructions

### For Testing (Home/Lab):
1. **Generate QR codes** using Method 1 or 2
2. **Open in image editor** (Paint, Photoshop, Canva)
3. **Add text** with table number
4. **Print on regular paper** (A4/Letter)
5. **Optionally laminate** for durability

### For Production (Professional):
1. **Generate high-resolution QR codes** (1000x1000px)
2. **Create template in Canva/Photoshop:**
   - A5 size (148 x 210 mm)
   - QR code centered
   - Large table number above/below
   - "Scan to Order" text
3. **Print at local print shop:**
   - Material: PVC, Acrylic, or Laminated Cardstock
   - Finishing: Glossy or Matte lamination
   - Mounting: Table stand or adhesive backing

---

## 📦 Ready-to-Use QR Codes

### For Quick Demo:

I've pre-generated QR code URLs for testing:

| Table | QR Code URL (for localhost:5500) |
|-------|-----------------------------------|
| Table 1 | `http://localhost:5500/index.html?table=1` |
| Table 2 | `http://localhost:5500/index.html?table=2` |
| Table 3 | `http://localhost:5500/index.html?table=3` |
| Table 4 | `http://localhost:5500/index.html?table=4` |
| Table 5 | `http://localhost:5500/index.html?table=5` |

**To generate actual QR image:**
Visit: `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=http://localhost:5500/index.html?table=1`

Change the `table=X` number for each table.

---

## 🧪 Testing the System

### Test Scenario: Multiple Tables

1. **Open 3 browser tabs:**
   - Tab 1: Scan Table 1 QR → Order from Nasi Lemak
   - Tab 2: Scan Table 5 QR → Order from Laksa
   - Tab 3: Scan Table 10 QR → Order from Western Grill

2. **Login as hawker** in another tab

3. **Check orders show different table numbers:**
   - Order #1 → Table 1
   - Order #2 → Table 5
   - Order #3 → Table 10

4. **Verify orders stay separate** per table

---

## 📋 Table Layout Example

### Food Court Floor Plan (20 Tables):

```
┌─────────────────────────────────────┐
│         Sarawak Food Court          │
├─────────────────────────────────────┤
│                                     │
│  [T1]  [T2]  [T3]  [T4]  [T5]     │
│                                     │
│  [T6]  [T7]  [T8]  [T9]  [T10]    │
│                                     │
│                                     │
│  [T11] [T12] [T13] [T14] [T15]    │
│                                     │
│  [T16] [T17] [T18] [T19] [T20]    │
│                                     │
│                                     │
│  [Stall 1] [Stall 2] [Stall 3]    │
│  [Stall 4] [Stall 5] [Stall 6]    │
│                                     │
└─────────────────────────────────────┘
```

Each `[TX]` has a unique QR code on the table.

---

## 🔧 Technical Implementation

### How the System Stores Table Info:

When customer scans QR code:

```javascript
// URL: https://domain.com/index.html?table=5
const urlParams = new URLSearchParams(window.location.search);
const tableNumber = urlParams.get('table'); // "5"

// Store in localStorage
localStorage.setItem('tableNumber', tableNumber);
localStorage.setItem('sessionStart', new Date().toISOString());
```

### How Orders Use Table Number:

```javascript
// When placing order
const order = {
    orderId: generateOrderId(),
    tableNumber: localStorage.getItem('tableNumber'), // "5"
    items: [...],
    status: 'pending',
    timestamp: new Date()
};
```

### Hawker Dashboard Shows:

```
Order #1234
Table: 5          ← Displayed prominently
Status: Preparing
Items: Nasi Lemak Special x1
```

---

## 💡 Pro Tips

### 1. **Weatherproof QR Codes**
   - Laminate or use acrylic stands
   - QR codes get damaged by spills/moisture

### 2. **Backup Table Identification**
   - Print large table numbers in addition to QR
   - Elderly customers may not use QR codes

### 3. **Test Scanning Distance**
   - QR should be scannable from 20-30cm away
   - Don't make them too small

### 4. **Color Contrast**
   - Always use black QR on white background
   - Best scanning success rate

### 5. **Error Correction**
   - Use high error correction level
   - QR works even if partially damaged

---

## 🚀 Deployment Checklist

Before printing QR codes:

- [ ] Deploy website to permanent URL (Netlify/GitHub Pages)
- [ ] Test QR codes work from phone camera
- [ ] Verify table numbers display correctly
- [ ] Test order placement from different tables
- [ ] Confirm hawkers see table numbers in orders
- [ ] Print test batch (5 codes) before full production
- [ ] Laminate for durability
- [ ] Number tables physically to match QR codes

---

## 🎓 For Your Assignment Demo

### Show Your Lecturer:

1. **Print 3-5 QR codes** for demo
2. **Place on different tables** in classroom/lab
3. **Demonstrate:**
   - Scan Table 1 QR → Order placed
   - Scan Table 3 QR → Different order
   - Show hawker dashboard displays correct tables
   - Prove orders stay separate per table

### Impressive Points:
✅ Real-world food court simulation
✅ Each table has unique QR code (professional)
✅ No manual table number entry needed
✅ Scalable to 50+ tables easily
✅ Industry-standard approach

---

## 📞 Need Help?

### Common Issues:

**QR code doesn't scan:**
- Ensure good lighting
- Hold phone 20-30cm away
- Use high-contrast QR (black on white)

**Wrong table number:**
- Check QR code URL is correct
- Verify ?table=X parameter

**Table number not showing:**
- Check browser localStorage
- Console log: `localStorage.getItem('tableNumber')`

---

## 📚 Additional Resources

- **QR Code Best Practices**: https://www.qr-code-generator.com/qr-code-marketing/qr-codes-basics/
- **QR Code Generator API**: https://goqr.me/api/
- **Python QR Library**: https://pypi.org/project/qrcode/
- **Table Stand Templates**: Search "acrylic table number stand" on AliExpress

---

**🎉 Your food court now has a professional table QR code system!**

Each customer's order is automatically linked to their table number for seamless delivery. Perfect for your Digital Innovation assignment demonstration! 📱✨
