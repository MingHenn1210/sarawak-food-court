# QR Code Storage System - Setup Guide

## Overview

The QR code storage system ensures that QR codes are generated **once** and stored in the database. Subsequent requests for the same table QR code will retrieve it from the database instead of regenerating it.

## 🎯 Benefits

- **No Regeneration**: QR codes are generated only once per table
- **Database Storage**: All QR codes stored permanently in Supabase
- **Faster Performance**: Retrieval from database is faster than regeneration
- **Consistency**: Same QR code URL every time for each table
- **Cost Efficient**: Reduces API calls to QR code generation service

## 📦 Files Added/Modified

### New Files:
1. **`sql/create_qr_codes_table.sql`** - Database migration script
2. **`js/qr-code-manager.js`** - QR code management class with methods

### Modified Files:
1. **`admin/food-courts.html`** - Updated to use QR code storage system

## 🗄️ Database Setup

### Step 1: Run the SQL Migration

You need to create the `qr_codes` table in your Supabase database.

#### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Navigate to your project: **SHC**
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the entire content from `sql/create_qr_codes_table.sql`
6. Paste it into the query editor
7. Click **Run** or press `Ctrl+Enter`

#### Option B: Using Supabase CLI

```bash
# If you have Supabase CLI installed
supabase db push sql/create_qr_codes_table.sql
```

### Step 2: Verify Table Creation

Run this query in the SQL Editor to verify:

```sql
SELECT * FROM qr_codes LIMIT 10;
```

You should see an empty table with these columns:
- `id` (UUID)
- `food_court_id` (UUID)
- `table_number` (INTEGER)
- `qr_code_url` (TEXT)
- `qr_code_data` (TEXT)
- `menu_url` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## 🚀 How It Works

### First Time (New QR Code)

1. Admin enters table number and clicks "Generate QR Code"
2. System checks database for existing QR code
3. **Not found** → Generates new QR code via API
4. Saves QR code URL and menu URL to database
5. Displays QR code with status: "✨ New QR Code generated and saved to database"

### Subsequent Times (Existing QR Code)

1. Admin enters same table number and clicks "Generate QR Code"
2. System checks database for existing QR code
3. **Found** → Retrieves from database (no API call)
4. Displays QR code with status: "🗄️ QR Code retrieved from database (no regeneration needed)"

## 📖 Usage Examples

### Basic Usage (Admin Interface)

1. Open `admin/food-courts.html`
2. Click on a food court's **QR Code** button
3. Enter a table number (e.g., 5)
4. Click **Generate QR Code**
5. The system will:
   - Check if QR code exists in database
   - Generate new one if needed
   - Display the QR code
   - Show status message

### Using QR Code Manager (JavaScript)

```javascript
// Initialize Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Initialize QR Code Manager
const qrManager = new QRCodeManager(supabase);

// Get or create a QR code
const result = await qrManager.getOrCreateQRCode(foodCourtId, tableNumber);

if (result.isNew) {
    console.log('New QR code generated!');
} else {
    console.log('QR code retrieved from database!');
}

// Display the QR code
document.getElementById('qrImage').src = result.qr_code_url;
```

## 🔧 Advanced Features

### Batch Generate QR Codes

Generate QR codes for multiple tables at once:

```javascript
// Generate QR codes for tables 1-20
const result = await qrManager.batchGenerateQRCodes(foodCourtId, 1, 20);

console.log(`Created ${result.newCount} new QR codes`);
console.log(`Found ${result.existingCount} existing QR codes`);
```

### Get All QR Codes for a Food Court

```javascript
const qrCodes = await qrManager.getQRCodesByFoodCourt(foodCourtId);
console.log(`Food court has ${qrCodes.length} QR codes`);
```

### Update a QR Code

If you need to regenerate a QR code (e.g., URL structure changed):

```javascript
const updatedQR = await qrManager.updateQRCode(foodCourtId, tableNumber);
console.log('QR code updated:', updatedQR);
```

### Delete QR Codes

```javascript
// Delete specific table QR code
await qrManager.deleteQRCode(foodCourtId, tableNumber);

// Delete all QR codes for a food court
await qrManager.deleteAllQRCodes(foodCourtId);
```

## 📊 Database Schema

```sql
qr_codes (
    id                UUID PRIMARY KEY,
    food_court_id     UUID REFERENCES food_courts(id) ON DELETE CASCADE,
    table_number      INTEGER NOT NULL,
    qr_code_url       TEXT NOT NULL,  -- API URL for QR code image
    qr_code_data      TEXT,            -- Optional: Base64 encoded image
    menu_url          TEXT NOT NULL,  -- The URL customer lands on
    created_at        TIMESTAMP,
    updated_at        TIMESTAMP,
    UNIQUE(food_court_id, table_number)
)
```

### Key Constraints:
- Each table can only have ONE QR code per food court
- QR codes are automatically deleted when food court is deleted (CASCADE)
- `updated_at` is automatically updated on changes

## 🔐 Security (RLS Policies)

The table has Row Level Security enabled with these policies:

- **SELECT**: All users can read QR codes
- **INSERT**: Admins can create QR codes
- **UPDATE**: Admins can update QR codes
- **DELETE**: Admins can delete QR codes

> **Note**: In production, you should add proper role checks to these policies.

## 🧪 Testing

### Test 1: Generate New QR Code

1. Go to Food Courts Management
2. Click "QR Code" for any food court
3. Enter table number: `1`
4. Click "Generate QR Code"
5. **Expected**: Green message "New QR Code generated and saved"

### Test 2: Retrieve Existing QR Code

1. Using the same food court
2. Enter the same table number: `1`
3. Click "Generate QR Code"
4. **Expected**: Blue message "QR Code retrieved from database"

### Test 3: Verify in Database

Run this query in Supabase SQL Editor:

```sql
SELECT 
    fc.name as food_court_name,
    qr.table_number,
    qr.menu_url,
    qr.created_at
FROM qr_codes qr
JOIN food_courts fc ON qr.food_court_id = fc.id
ORDER BY fc.name, qr.table_number;
```

## 📱 Customer Experience

When customers scan the QR code, they will be directed to:

```
https://your-domain.com/customer/menu.html?foodcourt={food_court_id}&table={table_number}
```

The system automatically:
- Shows the menu for that specific food court
- Assigns orders to the correct table
- Tracks which table placed each order

## 🐛 Troubleshooting

### Issue: "Table qr_codes does not exist"

**Solution**: Run the SQL migration script in Supabase SQL Editor

### Issue: QR code not saving to database

**Check**:
1. Verify Supabase connection in browser console
2. Check RLS policies are enabled
3. Verify you're logged in as admin

### Issue: Status message not showing

**Solution**: Clear browser cache and reload the page

### Issue: Same QR code generated twice

**Verify**: Check database with this query:
```sql
SELECT food_court_id, table_number, COUNT(*) as count
FROM qr_codes
GROUP BY food_court_id, table_number
HAVING COUNT(*) > 1;
```

If duplicates exist, the UNIQUE constraint wasn't applied properly.

## 🚀 Future Enhancements

Potential improvements:

1. **Offline Storage**: Store base64 encoded images in `qr_code_data` column
2. **Bulk Print**: Add feature to print all tables at once
3. **QR Analytics**: Track scan counts and usage statistics
4. **Custom Branding**: Add logos to QR codes
5. **Expiration**: Optional QR code expiration dates

## 📞 Support

For issues or questions:
- Check Supabase logs: Dashboard → Logs
- Check browser console for JavaScript errors
- Verify database connection and table structure

---

**Version**: 1.0  
**Last Updated**: October 31, 2025  
**Author**: Sarawak Food Court Development Team
