# Reset QR Code Feature - User Guide

## 🔄 What is Reset QR Code?

The **Reset QR Code** button allows you to delete an existing QR code and generate a completely new one. This is useful when:

- ❌ QR code failed to generate properly
- 🔗 QR code URL is broken or not working
- 📱 QR code doesn't scan correctly
- 🔄 You need to regenerate due to system changes
- 🆕 You want a fresh QR code for any reason

## 🎯 When to Use Each Button

### "Generate QR Code" Button (Green)
Use this for:
- ✅ First time generating a QR code
- ✅ Retrieving an existing QR code from database
- ✅ Normal QR code operations

**What it does:**
1. Checks database for existing QR code
2. If found → Returns existing QR code (fast, no regeneration)
3. If not found → Creates new QR code and saves to database

### "Reset QR Code" Button (Orange)
Use this for:
- ⚠️ QR code is broken or not working
- ⚠️ Need to force regeneration
- ⚠️ QR code failed previously
- ⚠️ URL structure changed

**What it does:**
1. ⚠️ Asks for confirmation
2. 🗑️ Deletes existing QR code from database
3. ⚡ Generates completely new QR code
4. 💾 Saves new QR code to database
5. ✅ Shows success message

## 📋 Step-by-Step Usage

### Scenario 1: Normal QR Code Generation

```
1. Click "QR Code" button on food court
2. Enter table number (e.g., 5)
3. Click "Generate QR Code" (Green button)
4. ✅ QR code appears
5. Download or print
```

### Scenario 2: QR Code Failed or Not Working

```
1. Click "QR Code" button on food court
2. Enter table number (e.g., 5)
3. Click "Reset QR Code" (Orange button)
4. ⚠️ Confirm the reset action
5. 🗑️ System deletes old QR code
6. ⚡ System generates new QR code
7. ✅ New QR code appears
8. Download or print
```

## 🔍 Detailed Reset Process

### Step 1: Open QR Code Modal
```
Food Courts Management → Select Food Court → Click "QR Code" button
```

### Step 2: Enter Table Number
```
Enter the table number that needs to be reset (e.g., Table 5)
```

### Step 3: Click Reset Button
```
Click "Reset QR Code" (Orange button on the right)
```

### Step 4: Confirm Action
```
⚠️ Reset QR Code?

This will DELETE the existing QR code for Table 5 
and generate a completely new one.

Are you sure you want to continue?

[Cancel] [OK]
```

### Step 5: Wait for Process
```
Button shows: "🔄 Resetting..."
System performs:
  1. Delete old QR code from database
  2. Generate new QR code via API
  3. Save new QR code to database
```

### Step 6: Success!
```
✅ QR Code Reset Complete!

Old QR code deleted and new one generated successfully.

Status: "✅ QR Code RESET successfully! New QR code generated and saved"
```

## 💡 Example Use Cases

### Use Case 1: QR Code Not Scanning

**Problem:**
- Customer scans QR code but nothing happens
- QR code appears corrupted

**Solution:**
```
1. Go to Food Courts Management
2. Click "QR Code" for that food court
3. Enter the problematic table number
4. Click "Reset QR Code"
5. Confirm reset
6. Download and print new QR code
7. Replace the old QR code on the table
```

### Use Case 2: Multiple Tables Need Reset

**Problem:**
- Several tables have problematic QR codes
- Need to regenerate Tables 1, 3, 5

**Solution:**
```
For each table:
1. Enter table number (1)
2. Click "Reset QR Code"
3. Confirm and wait
4. Download new QR code
5. Repeat for table 3
6. Repeat for table 5
```

### Use Case 3: URL Structure Changed

**Problem:**
- You updated your domain or URL structure
- All QR codes point to old URLs

**Solution:**
```
For each table that needs updating:
1. Enter table number
2. Click "Reset QR Code"
3. New QR code will have updated URL
4. Replace old printed QR codes
```

## 🔐 Safety Features

### Confirmation Required
- ⚠️ System always asks for confirmation before reset
- Prevents accidental deletions
- Shows exactly what will happen

### Error Handling
- If reset fails, old QR code may be deleted
- Solution: Use "Generate QR Code" to create new one
- Error messages show what went wrong

### Database Protection
- Only deletes QR code for specified table
- Other tables remain unaffected
- Uses unique constraint (food_court_id + table_number)

## 📊 Visual Indicators

### Generate Button (Green)
```css
Background: Green gradient
Icon: 🔍 QR Code symbol
Text: "Generate QR Code"
```

### Reset Button (Orange)
```css
Background: Orange gradient
Icon: 🔄 Sync symbol
Text: "Reset QR Code"
```

### Status Messages

**New QR Code:**
```
✨ New QR Code generated and saved to database
Color: Orange
```

**Retrieved from Database:**
```
🗄️ QR Code retrieved from database (no regeneration needed)
Color: Green
```

**After Reset:**
```
✅ QR Code RESET successfully! New QR code generated and saved
Color: Green
```

## ⚡ Quick Reference

| Action | Button | When to Use | What Happens |
|--------|--------|-------------|--------------|
| **Generate** | Green | Normal use | Gets existing or creates new |
| **Reset** | Orange | QR failed/broken | Deletes old, creates new |

## 🐛 Troubleshooting

### Issue: "Error resetting QR code"

**Possible causes:**
- Database connection issue
- Network problem
- QR code doesn't exist

**Solutions:**
1. Check internet connection
2. Refresh the page
3. Try "Generate QR Code" instead
4. Check browser console for errors

### Issue: Reset button disabled

**Cause:**
- Button is processing

**Solution:**
- Wait for current operation to complete
- Don't click multiple times

### Issue: QR code still not working after reset

**Possible causes:**
- Printed QR code is damaged
- Wrong URL in system
- Camera/scanner issue

**Solutions:**
1. Test QR code with multiple devices
2. Check if URL opens in browser
3. Reprint QR code on better material
4. Clean/replace physical QR code sticker

## 📝 Best Practices

### ✅ DO:
- Use "Generate" for normal operations
- Use "Reset" only when needed
- Test QR code after reset
- Replace physical QR codes after reset
- Keep backup of working QR codes

### ❌ DON'T:
- Reset unnecessarily
- Click reset multiple times
- Skip confirmation dialogs
- Forget to replace physical QR codes
- Reset all tables without testing

## 🎯 Summary

```
NORMAL WORKFLOW:
Generate → Test → Print → Done ✅

PROBLEM WORKFLOW:
Problem detected → Reset → New QR → Test → Reprint → Done ✅
```

---

**Feature Added**: October 31, 2025  
**Location**: `admin/food-courts.html` → QR Code Modal  
**Status**: ✅ Active and ready to use
