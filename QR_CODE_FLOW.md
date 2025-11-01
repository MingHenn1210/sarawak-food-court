# QR Code Flow - How It Works

## 📱 Complete Customer Journey

### Step 1: Customer Scans QR Code
```
Customer sits at Table 5
  ↓
Scans QR code on table using phone camera
  ↓
QR code contains URL: /customer/home.html?foodcourt={id}&table=5
```

### Step 2: Lands on Food Court Home Page
```
Browser opens: customer/home.html?foodcourt=abc123&table=5
  ↓
Page displays:
  - "Table 5" indicator at top
  - All hawker stalls in THIS food court (loaded from database)
  - Search and filter options
  - Cart icon
```

### Step 3: Browse Hawker Stalls
```
Customer sees all stalls:
  - Ah Keat Laksa (Asian)
  - Western Grill (Western)
  - Bubble Tea Station (Drinks)
  - etc.
  ↓
Can filter by category (All, Asian, Western, Drinks, Dessert)
Can search by name
```

### Step 4: Select a Stall
```
Customer clicks "View Menu" on a stall
  ↓
Redirects to: menu.html?stall={stallId}
  ↓
Shows that specific hawker's menu items
```

### Step 5: Order Food
```
Customer browses menu
  ↓
Clicks "Add" on items
  ↓
Selects quantity and special instructions
  ↓
Adds to cart
```

### Step 6: Checkout
```
Customer clicks "View Cart"
  ↓
Reviews order (items from multiple stalls)
  ↓
Proceeds to payment
  ↓
Order is created with:
  - Table number (5)
  - Food court ID
  - Items from each stall
  - Total amount
```

## 🔄 QR Code Generation & Storage

### Online QR Code API
The system uses **QR Server API** (https://api.qrserver.com) to generate QR codes:

```javascript
// QR code URL format:
https://api.qrserver.com/v1/create-qr-code/?size=300x300&data={encoded_url}

// Where {encoded_url} is:
http://your-domain.com/customer/home.html?foodcourt=abc123&table=5
```

### Why Online API?
✅ **Pros:**
- No need to generate QR codes server-side
- Always accessible (works on any device)
- Free and reliable service
- Easy to implement
- Auto-scales QR code size

❌ **Cons:**
- Requires internet to view/download QR codes
- Depends on external service

### Database Storage Schema

```sql
qr_codes table:
├── id (UUID)
├── food_court_id (UUID) → References food_courts(id)
├── table_number (INTEGER)
├── qr_code_url (TEXT) → API URL for QR image
├── qr_code_data (TEXT) → Optional: Base64 encoded image
├── menu_url (TEXT) → Customer landing page URL
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

UNIQUE constraint: (food_court_id, table_number)
```

### Storage Logic

**First Time (Table 5 at Food Court A):**
```javascript
1. Admin generates QR code
2. System checks database: NOT FOUND
3. Creates QR code URL via API
4. Saves to database:
   {
     food_court_id: "abc123",
     table_number: 5,
     qr_code_url: "https://api.qrserver.com/v1/create-qr-code/...",
     menu_url: "http://domain.com/customer/home.html?foodcourt=abc123&table=5"
   }
5. Status: "✨ New QR Code generated and saved"
```

**Next Time (Same Table 5 at Food Court A):**
```javascript
1. Admin generates QR code
2. System checks database: FOUND!
3. Retrieves existing QR code URL
4. No API call needed
5. Status: "🗄️ QR Code retrieved from database"
```

**Different Food Court (Table 5 at Food Court B):**
```javascript
1. Different food_court_id
2. Creates new QR code entry
3. Unique per (food_court_id + table_number)
```

## 🎯 Real-World Example

### Scenario: Kuching Central Food Court

**Setup:**
```
Admin generates QR codes for:
- Table 1, 2, 3... 20
- Food Court ID: "kuching-central-fc-001"
```

**What Gets Stored:**
```
Database qr_codes table:
├── QR for Table 1 → home.html?foodcourt=kuching-central-fc-001&table=1
├── QR for Table 2 → home.html?foodcourt=kuching-central-fc-001&table=2
├── QR for Table 3 → home.html?foodcourt=kuching-central-fc-001&table=3
└── ... (up to Table 20)
```

**Customer Experience:**

**Customer A sits at Table 5:**
1. Scans QR code
2. Opens: `home.html?foodcourt=kuching-central-fc-001&table=5`
3. Sees: "Table 5" + all stalls in Kuching Central
4. Orders Laksa from Ah Keat's stall
5. Order saved with `table_number: 5`

**Customer B sits at Table 12:**
1. Scans QR code
2. Opens: `home.html?foodcourt=kuching-central-fc-001&table=12`
3. Sees: "Table 12" + same stalls
4. Orders Western food
5. Order saved with `table_number: 12`

**Hawker Dashboard:**
```
Hawker sees orders:
├── Order #001 - Table 5 - Laksa
├── Order #002 - Table 12 - Western Burger
└── Order #003 - Table 5 - Drinks (same table, different time)
```

## 📦 File Structure

```
sarawak-food-court/
├── admin/
│   └── food-courts.html          → Admin generates QR codes here
├── customer/
│   ├── home.html                 → Customer lands here after scan
│   ├── menu.html                 → Individual stall menu
│   └── cart.html                 → Shopping cart
├── js/
│   └── qr-code-manager.js        → QR code logic (generates URLs)
└── sql/
    └── create_qr_codes_table.sql → Database schema
```

## 🔐 Security & Data Flow

```
QR Code Scan
  ↓
Customer Browser
  ↓
GET /customer/home.html?foodcourt={id}&table={num}
  ↓
JavaScript reads URL parameters
  ↓
Fetches stalls from Supabase (food_court_id)
  ↓
Displays stalls
  ↓
Customer selects stall → menu.html
  ↓
Customer adds to cart (localStorage)
  ↓
Checkout → Order saved to database with table number
  ↓
Hawker receives order notification
```

## 🎨 QR Code Customization

### Current Setup:
- Size: 300x300 pixels
- Format: PNG
- API: QR Server (free service)
- Data: URL to customer home page

### Future Enhancements:
1. **Custom branding**: Add logo to QR code center
2. **Offline support**: Store base64 in `qr_code_data` column
3. **Analytics**: Track scan counts per table
4. **Dynamic routing**: Update URLs without regenerating QR codes
5. **Multiple languages**: QR code lands on language selection page

## 🚀 Deployment Considerations

### Development:
```
QR Code points to: http://localhost:5500/customer/home.html
```

### Production:
```
QR Code points to: https://your-domain.com/customer/home.html
```

### Important:
- Update `baseUrl` in production deployment
- Consider URL shortener for cleaner QR codes
- Test QR codes on multiple devices before printing
- Print on waterproof/durable material for tables

## ✅ Benefits of This System

1. **No Regeneration**: QR codes generated once, stored forever
2. **Table Tracking**: Every order knows which table it came from
3. **Multi-Stall Support**: One QR code gives access to ALL stalls
4. **Flexible**: Can filter/search stalls
5. **Scalable**: Works for 10 tables or 100 tables
6. **Efficient**: Database lookup faster than regeneration
7. **Consistent**: Same URL structure for all food courts

---

**Status**: ✅ Fully implemented and ready to use  
**Last Updated**: October 31, 2025
