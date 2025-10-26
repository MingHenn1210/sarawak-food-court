# Sarawak Food Court Ordering System

## 🎯 Project Overview
A web-based ordering system for food courts with multiple food stalls. This system provides separate interfaces for customers and hawkers (stall owners).

## 👥 Target Users
- **Customers**: Order food from multiple stalls via QR code scanning
- **Hawkers**: Manage menus, track orders, and update stall information
- **Programmers**: Advertisement management features

## ✨ Features

### Customer Features
- 📱 QR Code scanning for table-based ordering
- 🍜 Browse multiple food stalls
- 🛒 Add/Edit/Remove items from cart
- 💳 QR payment integration (different QR per stall)
- 📊 Real-time order progress tracking
- 🔔 Order status notifications

### Hawker Features
- 🔐 Secure login system
- 📝 Menu management (Add/Edit/Delete items)
- 📸 Image upload for food items
- 💰 Price and stock management
- 🏷️ QR code payment setup
- 📦 Order tracking and management
- 📊 Basic analytics dashboard

### Admin/Programmer Features
- 📢 Advertisement management
- 📈 System analytics

## 🗂️ Project Structure

```
Sarawak_Hub_Centrel/
├── index.html                 # Landing page with QR scan
├── README.md                  # Project documentation
│
├── customer/                  # Customer interface
│   ├── home.html             # Food stalls listing
│   ├── menu.html             # Stall menu details
│   ├── cart.html             # Shopping cart
│   ├── payment.html          # Payment page
│   └── order-tracking.html   # Order status tracking
│
├── hawker/                    # Hawker interface
│   ├── login.html            # Hawker login
│   ├── dashboard.html        # Main dashboard
│   ├── menu-management.html  # Manage menu items
│   ├── orders.html           # View and manage orders
│   └── settings.html         # Stall settings & QR codes
│
├── admin/                     # Admin/Programmer interface
│   ├── login.html            # Admin login
│   └── advertisements.html   # Manage ads
│
├── css/                       # Stylesheets
│   ├── main.css              # Global styles
│   ├── customer.css          # Customer-specific styles
│   ├── hawker.css            # Hawker-specific styles
│   └── responsive.css        # Mobile responsive styles
│
├── js/                        # JavaScript files
│   ├── app.js                # Main application logic
│   ├── customer.js           # Customer functionality
│   ├── hawker.js             # Hawker functionality
│   ├── cart.js               # Cart management
│   ├── orders.js             # Order management
│   └── notifications.js      # Real-time notifications
│
├── data/                      # Mock database (JSON for MVP)
│   ├── stalls.json           # Food stall data
│   ├── menus.json            # Menu items
│   ├── orders.json           # Orders data
│   ├── users.json            # User accounts
│   └── ads.json              # Advertisements
│
└── assets/                    # Static assets
    ├── images/               # Food images, logos
    │   ├── stalls/
    │   ├── food/
    │   └── qr-codes/
    ├── icons/                # UI icons
    └── fonts/                # Custom fonts

```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- Local web server (Live Server extension for VS Code)

### Installation
1. Clone or download this repository
2. Open the project folder in VS Code
3. Install "Live Server" extension in VS Code
4. Right-click on `index.html` and select "Open with Live Server"

## 💾 MVP Note: Mock Database
For the **Minimum Viable Product (MVP)**, we're using JSON files as a mock database stored in the `data/` folder. This approach:
- ✅ No server setup required
- ✅ Easy to test and demonstrate
- ✅ Quick development
- ⚠️ Data resets on page reload (no persistence)

For production, consider migrating to:
- Firebase (easy, free tier available)
- MongoDB + Node.js backend
- PostgreSQL + Express.js

## 📱 User Flow

### Customer Journey
1. Customer scans QR code at table → Lands on home page
2. Browses food stalls → Selects a stall
3. Views menu → Adds items to cart
4. Reviews cart → Proceeds to payment
5. Scans stall's payment QR → Confirms order
6. Receives order number → Tracks order status in real-time

### Hawker Journey
1. Logs into hawker dashboard
2. Views pending orders → Updates order status
3. Manages menu items → Add/Edit/Delete items
4. Updates stock availability
5. Configures payment QR codes
6. Views order history and analytics

## 🎨 Design Principles
- **Mobile-First**: Optimized for smartphone usage
- **Clean & Intuitive**: Easy navigation for all ages
- **Fast Loading**: Minimal assets for quick access
- **Accessible**: High contrast, readable fonts
- **Real-time Updates**: Live order status tracking

## 🛠️ Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Data Storage**: JSON (Mock DB for MVP)
- **Icons**: Font Awesome / Material Icons
- **Responsive**: CSS Grid & Flexbox

## 🔄 Future Enhancements
- Real database integration (Firebase/MongoDB)
- User authentication with JWT
- Payment gateway integration
- SMS/Email notifications
- Multi-language support (English, Malay, Chinese)
- Analytics dashboard for hawkers
- Loyalty program
- Review and rating system

## 📄 License
This project is created for educational purposes as part of UTS Digital Innovation Assignment.

## 👨‍💻 Development Team
Sarawak Hub Central Project Team

---
**Version**: 1.0.0 (MVP)  
**Last Updated**: October 2025
