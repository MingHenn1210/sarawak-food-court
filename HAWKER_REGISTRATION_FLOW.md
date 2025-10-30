# Hawker Registration & Login Flow

## Overview
The system now follows a **centralized admin-controlled registration** flow where only administrators can create hawker accounts. Hawkers cannot self-register.

---

## 🔐 Updated Registration Flow

### Step 1: Admin Creates Hawker Account
**Location:** `admin/food-courts.html` → "Manage Hawkers" → "Register New Hawker"

**Process:**
1. Admin logs into the admin dashboard
2. Navigates to **Food Courts** page (first item in navigation)
3. Clicks on a food court to manage
4. Clicks **"Manage Hawkers"** button
5. Clicks **"Register New Hawker"** button
6. Fills in the registration form:
   - **Stall Name** (e.g., "Ah Keat Laksa")
   - **Category** (Asian, Western, Drinks, Dessert, Snacks)
   - **Owner Full Name** (e.g., "Tan Ah Keat")
   - **Phone Number** ⚠️ This is the LOGIN USERNAME (10-11 digits)
   - **Email** (for contact purposes)
   - **Password** ⚠️ This is the LOGIN PASSWORD (minimum 6 characters)
   - **Stall Description**

**What Happens:**
1. System validates phone number is unique (prevents duplicates)
2. Creates user account in `users` table with role='hawker'
3. Creates stall record in `hawker_stalls` table linked to the food court
4. Shows **success modal** with:
   - Stall information (name, owner, food court)
   - **Login credentials** (phone & password)
   - Copy buttons for easy sharing
5. Admin can copy and share credentials with the hawker

---

### Step 2: Hawker Logs In
**Location:** `hawker/login.html`

**Process:**
1. Hawker navigates to hawker login page
2. Enters credentials provided by admin:
   - **Phone Number** (username)
   - **Password**
3. Clicks **Login**

**What Happens:**
1. System validates credentials against `users` table
2. Checks for active hawker stall in `hawker_stalls` table
3. Creates session (localStorage or sessionStorage)
4. Redirects to **Orders page** (first page, operational priority)

**No Self-Registration:**
- The "Register as Hawker" link has been removed
- Now shows message: "Don't have an account? Contact your food court administrator to register your stall."

---

## 📋 Database Schema

### Users Table
```sql
users (
  id: uuid PRIMARY KEY
  email: text UNIQUE NOT NULL
  phone: text
  password_hash: text NOT NULL
  full_name: text
  role: text CHECK (role IN ('admin', 'hawker', 'customer'))
  status: text DEFAULT 'active'
  created_at: timestamp
  updated_at: timestamp
)
```

### Hawker Stalls Table
```sql
hawker_stalls (
  id: uuid PRIMARY KEY
  food_court_id: uuid REFERENCES food_courts(id)
  hawker_id: uuid REFERENCES users(id)
  stall_name: text NOT NULL
  cuisine_type: text
  description: text
  status: text DEFAULT 'active'
  created_at: timestamp
  updated_at: timestamp
)
```

---

## 🎯 Key Features

### 1. Phone-Based Authentication
- **Login Username:** Phone number (10-11 digits)
- **Benefit:** Simple, memorable, no email verification needed
- **Format:** Malaysian phone format (e.g., 0123456789)

### 2. Admin Control
- ✅ Only admins can create hawker accounts
- ✅ Prevents unauthorized registrations
- ✅ Ensures proper vetting of hawkers
- ✅ Links hawkers to specific food courts

### 3. Credential Management
- **Success Modal** displays credentials immediately after creation
- **Copy buttons** for easy sharing with hawkers
- **Clear labeling** showing which field is username/password
- **Security reminder** to share credentials securely

### 4. Validation & Error Handling
- ✅ Phone number uniqueness check (prevents duplicates)
- ✅ Phone format validation (10-11 digits)
- ✅ Password minimum length (6 characters)
- ✅ Email format validation
- ✅ Required field validation
- ✅ Clear error messages

---

## 📱 User Journey Examples

### Example 1: Admin Creates New Hawker
1. **Admin** logs in → Food Courts → Selects "Kuching Food Court"
2. Clicks "Manage Hawkers" → "Register New Hawker"
3. Fills form:
   - Stall Name: "Ah Keat Laksa"
   - Owner: "Tan Ah Keat"
   - Phone: "0123456789"
   - Password: "hawker123"   - Category: Asian Cuisine
4. Submits form
5. **Success modal appears** showing credentials
6. Admin copies phone & password
7. Admin shares credentials with Tan Ah Keat via WhatsApp/SMS

### Example 2: Hawker First Login
1. **Hawker** receives credentials from admin
2. Opens hawker login page
3. Enters:
   - Phone: "0123456789"
   - Password: "hawker123"
4. Clicks Login
5. **Redirected to Orders page** (ready to take orders)
6. Can navigate to Dashboard, Menu, Settings

---

## 🔒 Security Considerations

### Current Implementation
- Password stored as plain text in `password_hash` column
- ⚠️ **TODO:** Implement proper password hashing (bcrypt/argon2)
- ⚠️ **TODO:** Add password change functionality
- ⚠️ **TODO:** Implement password reset via admin

### Recommended Improvements
1. **Server-side password hashing** before storage
2. **Password complexity requirements**
3. **Account lockout** after failed login attempts
4. **Session timeout** for inactive sessions
5. **Two-factor authentication** (optional)
6. **Audit logging** for account creation/modifications

---

## 📊 Navigation Structure

### Admin Portal
1. **Food Courts** (First - operational priority)
2. Dashboard (Second - analytics)
3. Plans (Third - subscriptions)
4. Ads (Fourth - marketing)

### Hawker Portal
1. **Orders** (First - operational priority)
2. Dashboard (Second - overview)
3. Menu (Third - management)
4. Settings (Fourth - configuration)

---

## ✅ Testing Checklist

### Admin Side
- [ ] Can create hawker account with all required fields
- [ ] Phone number validation works (10-11 digits)
- [ ] Duplicate phone number is rejected
- [ ] Success modal displays correct credentials
- [ ] Copy buttons work for phone & password
- [ ] Hawker appears in food court hawkers list
- [ ] Admin dashboard shows correct hawker count

### Hawker Side
- [ ] Cannot access registration modal
- [ ] Shows message to contact admin
- [ ] Can login with phone & password
- [ ] Invalid credentials show error
- [ ] Successful login redirects to Orders page
- [ ] Session persists with "Remember me"
- [ ] Can logout successfully

### Database
- [ ] User record created with role='hawker'
- [ ] Stall record linked to correct food court
- [ ] Phone number stored correctly
- [ ] Email format is valid
- [ ] Status defaults to 'active'

---

## 🎨 UI/UX Improvements Made

1. **Clear Form Labels**
   - Phone field labeled as "Login Username"
   - Password field labeled as "Login Password"
   - Helpful hints under important fields

2. **Modern Success Modal**
   - Gradient design with icons
   - Clear sections for stall info & credentials
   - Copy buttons for convenience
   - Professional color scheme

3. **Responsive Design**
   - Works on mobile, tablet, desktop
   - Touch-friendly buttons
   - Readable font sizes
   - Proper spacing

4. **Form Validation**
   - Real-time pattern validation
   - Clear error messages
   - Required field indicators (red asterisk)
   - Input placeholders with examples

---

## 📝 Demo Credentials

### Admin Login
- Email: `admin@sarawak.com`
- Password: `admin123`

### Demo Hawker Login
- Phone: `0123456789`
- Password: `demo123`

---

## 🔄 Future Enhancements

1. **Bulk Hawker Import**
   - CSV upload for multiple hawkers
   - Template download

2. **Credential Email/SMS**
   - Auto-send credentials to hawker email
   - SMS notification with credentials

3. **Account Management**
   - Admin can reset hawker passwords
   - Admin can suspend/reactivate accounts
   - Hawker can change own password

4. **Onboarding Process**
   - First-time login tutorial
   - Setup wizard for menu items
   - Welcome email with resources

5. **Reporting**
   - Track hawker registration dates
   - Monitor active/inactive accounts
   - Export hawker list

---

## 📧 Support

For issues or questions about the hawker registration flow, contact:
- System Administrator
- Food Court Management
- Technical Support Team

---

**Last Updated:** October 30, 2025
**Version:** 2.0 - Centralized Admin Registration
