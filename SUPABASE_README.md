# Supabase Integration for Sarawak Food Court

## ✅ Connection Status
Your application is now connected to Supabase!

## 📊 Database Schema

### Tables Created:
1. **users** - Store admin, hawker, and customer accounts
2. **food_courts** - Food court locations and details
3. **hawker_stalls** - Individual stalls within food courts
4. **menu_items** - Food items offered by each stall
5. **orders** - Customer orders
6. **order_items** - Individual items in each order
7. **subscription_plans** - Available subscription plans
8. **hawker_subscriptions** - Hawker subscription records

## 🔑 Credentials

- **Project URL**: https://mtmkghuhhrerlcubhzot.supabase.co
- **Project Name**: SHC
- **Region**: ap-northeast-1 (Tokyo)
- **Status**: ACTIVE_HEALTHY

## 📁 Files Added

1. **config/supabase.js** - Supabase configuration and initialization
2. **js/supabase-food-courts.js** - Food court CRUD operations with Supabase

## 🚀 Usage

### Fetch Food Courts
```javascript
const foodCourts = await fetchFoodCourtsFromSupabase();
```

### Create Food Court
```javascript
const newFoodCourt = await createFoodCourtInSupabase({
    name: 'Central Food Court',
    address: '123 Main St',
    capacity: 20,
    operating_hours: {
        open: '08:00',
        close: '22:00'
    }
});
```

### Update Food Court
```javascript
await updateFoodCourtInSupabase(id, updatedData);
```

### Delete Food Court
```javascript
await deleteFoodCourtFromSupabase(id);
```

## 🔐 Security Notes

⚠️ **Important**: The anon key is currently embedded in the JavaScript files for development. For production:

1. Enable Row Level Security (RLS) on all tables
2. Set up proper authentication
3. Create security policies for each table
4. Consider moving sensitive keys to environment variables

## 📝 Next Steps

1. **Enable RLS**: Protect your data with Row Level Security policies
2. **Set up Authentication**: Implement proper user authentication
3. **Create Policies**: Define who can read/write to each table
4. **Migrate Existing Data**: Import your JSON data to Supabase
5. **Update Frontend**: Replace JSON file operations with Supabase queries

## 🔄 Data Migration

To migrate your existing JSON data to Supabase, you can use the SQL queries or the Supabase dashboard to import data.

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
