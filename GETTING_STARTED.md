# 🚀 Getting Started with Sarawak Food Court Ordering System

## Quick Start Guide

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- VS Code (recommended) or any code editor
- Live Server extension for VS Code (or any local web server)

### Installation Steps

1. **Open the project in VS Code**
   ```
   Open VS Code → File → Open Folder → Select "Sarawak_Hub_Centrel"
   ```

2. **Install Live Server Extension (if not already installed)**
   - Click Extensions icon in VS Code (or press `Ctrl+Shift+X`)
   - Search for "Live Server"
   - Install the extension by Ritwick Dey

3. **Launch the Application**
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Your browser will automatically open to `http://127.0.0.1:5500/`

## 📱 User Guides

### For Customers

1. **Start Ordering**
   - Open `index.html` in your browser
   - Click "Start Scanning" or "Enter Directly (Testing)"
   - You'll be assigned a table number

2. **Browse Food Stalls**
   - View all available food stalls on the home page
   - Use search bar to find specific stalls
   - Filter by category (Asian, Western, Drinks, Dessert)

3. **Order Food**
   - Click "View Menu" on any stall
   - Browse menu items
   - Click "+ Add" on items you want
   - Customize quantity and add special instructions
   - Items are added to your cart

4. **Checkout & Payment**
   - Click the cart icon to review your order
   - Edit or remove items as needed
   - Click "Proceed to Payment"
   - Scan the QR code for each stall (simulated in demo)
   - Check "I have completed the payment"
   - Confirm your order

5. **Track Your Order**
   - View real-time order status
   - Get notifications when status changes:
     * Pending → Preparing → Ready → Completed
   - See progress for each stall separately

### For Hawkers

1. **Login**
   - Go to `hawker/login.html`
   - Use demo credentials:
     * Stall ID: `stall1`
     * Password: `demo123`

2. **Dashboard**
   - View pending, preparing, and completed orders
   - Check today's revenue
   - Quick access to all features

3. **Manage Orders**
   - Go to "Orders" tab
   - Filter by status (Pending, Preparing, Ready)
   - Update order status:
     * Pending → Start Preparing
     * Preparing → Mark Ready
     * Ready → Complete
   - Orders update in real-time for customers

4. **Manage Menu**
   - Go to "Menu" tab
   - Add new items (name, price, description, image URL, category)
   - Edit existing items
   - Toggle availability (show/hide items)
   - Mark items as popular
   - Delete items

5. **Settings**
   - Update stall information
   - Change payment QR code
   - Toggle stall open/closed status

## 🎨 Features Overview

### Customer Features
✅ QR code table scanning (simulated)
✅ Browse multiple food stalls
✅ Search and filter stalls
✅ View detailed menus with images
✅ Add to cart with customization
✅ Multi-stall checkout
✅ Separate QR payment per stall
✅ Real-time order tracking
✅ Order progress notifications
✅ Order history

### Hawker Features
✅ Secure login system
✅ Real-time dashboard with stats
✅ Order management (update status)
✅ Menu management (CRUD operations)
✅ QR code payment setup
✅ Stall settings
✅ Filter orders by status
✅ Revenue tracking

### Admin Features (Coming Soon)
⏳ Advertisement management
⏳ System analytics
⏳ User management

## 🧪 Testing the System

### Test Scenario 1: Complete Customer Journey
1. Open `index.html`
2. Click "Start Scanning" → assigned to random table
3. Browse stalls → Select "Nasi Lemak Corner"
4. Add "Nasi Lemak Special" to cart
5. Add "Teh Tarik" from "Fresh Drinks Bar"
6. Go to cart → Review items
7. Proceed to payment
8. Mark payments as complete for both stalls
9. Place order
10. Track order status in real-time

### Test Scenario 2: Hawker Order Management
1. Open `hawker/login.html`
2. Login with stall1/demo123
3. View dashboard stats
4. Go to Orders
5. Find recent order
6. Update status: Pending → Preparing → Ready → Completed
7. Notice changes reflect in customer order tracking

### Test Scenario 3: Menu Management
1. Login to hawker dashboard
2. Go to Menu Management
3. Add new item with details
4. Edit existing item
5. Toggle item availability
6. Delete item
7. Changes visible to customers immediately

## 📊 Mock Data Included

The system includes realistic sample data:

- **6 Food Stalls**: Various cuisines (Asian, Western, Drinks, Desserts)
- **18+ Menu Items**: With images, prices, descriptions
- **5 Hawker Accounts**: Ready for testing
- **1 Admin Account**: For future features

## 🔑 Demo Credentials

### Hawker Accounts
| Stall | Stall ID | Password |
|-------|----------|----------|
| Nasi Lemak Corner | stall1 | demo123 |
| Laksa House | stall2 | demo123 |
| Western Grill | stall3 | demo123 |
| Kolo Mee Specialist | stall4 | demo123 |
| Fresh Drinks Bar | stall5 | demo123 |

### Admin Account
| Username | Password |
|----------|----------|
| admin | admin123 |

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Data Storage**: JSON (Mock database for MVP)
- **Styling**: Custom CSS with CSS Variables
- **Icons**: Font Awesome 6
- **No Dependencies**: Pure vanilla JavaScript, no frameworks needed!

## 📂 Project Structure

```
Sarawak_Hub_Centrel/
├── index.html              # Landing page
├── customer/               # Customer interface
│   ├── home.html          # Stalls listing
│   ├── menu.html          # Menu items
│   ├── cart.html          # Shopping cart
│   ├── payment.html       # Payment
│   └── order-tracking.html # Order status
├── hawker/                 # Hawker interface
│   ├── login.html         # Login
│   ├── dashboard.html     # Dashboard
│   ├── menu-management.html # Menu CRUD
│   ├── orders.html        # Order management
│   └── settings.html      # Settings
├── admin/                  # Admin interface
├── css/                    # Stylesheets
│   ├── main.css           # Global styles
│   ├── customer.css       # Customer styles
│   ├── hawker.css         # Hawker styles
│   └── responsive.css     # Mobile responsive
├── js/                     # JavaScript
│   ├── app.js             # Core utilities
│   ├── cart.js            # Cart management
│   ├── customer.js        # Customer functions
│   ├── hawker.js          # Hawker functions
│   ├── orders.js          # Order management
│   └── notifications.js   # Real-time notifications
└── data/                   # Mock database
    ├── stalls.json        # Food stalls
    ├── menus.json         # Menu items
    ├── orders.json        # Orders
    ├── users.json         # User accounts
    └── ads.json           # Advertisements
```

## 💡 Tips & Tricks

1. **Clear Data**: Open browser DevTools → Application → Local Storage → Clear
2. **View Console**: Press F12 to see logs and debug information
3. **Mobile Testing**: Use browser DevTools → Toggle device toolbar (Ctrl+Shift+M)
4. **Reload**: Press Ctrl+R to refresh and see changes
5. **Multiple Tabs**: Open customer and hawker in separate tabs to see real-time updates

## 🐛 Troubleshooting

### Issue: "Failed to load stalls/menu"
**Solution**: Make sure you're using Live Server, not opening files directly (file://)

### Issue: Cart not updating
**Solution**: Check browser console for errors, clear Local Storage

### Issue: Orders not showing
**Solution**: Make sure to complete the full order flow from cart → payment → tracking

### Issue: Images not loading
**Solution**: This demo uses external URLs (Unsplash). Check internet connection.

## 🚀 Next Steps (Future Enhancements)

1. **Backend Integration**
   - Replace JSON with real database (Firebase, MongoDB)
   - Implement proper authentication
   - Add real-time database sync

2. **Payment Gateway**
   - Integrate with actual payment providers
   - Support multiple payment methods
   - Generate payment receipts

3. **Notifications**
   - SMS/Email notifications
   - Push notifications
   - WhatsApp integration

4. **Advanced Features**
   - User accounts and profiles
   - Loyalty program
   - Review and rating system
   - Multi-language support
   - Advanced analytics

5. **Mobile Apps**
   - Convert to Progressive Web App (PWA)
   - Native iOS/Android apps

## 📞 Support

For questions or issues:
- Check the README.md documentation
- Review the code comments
- Open browser console for debugging

## 📜 License

This project is created for educational purposes as part of UTS Digital Innovation Assignment.

---

**Happy Coding! 🍜**

Made with ❤️ for Sarawak Food Court
