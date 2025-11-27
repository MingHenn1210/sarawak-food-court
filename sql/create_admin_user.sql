-- Create admin user in users table
-- Run this in Supabase SQL Editor

-- First, check if users table exists and see its structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'users';

-- Insert admin user (adjust fields based on your users table structure)
INSERT INTO users (
    email,
    full_name,
    phone,
    role,
    password_hash,
    created_at
) VALUES (
    'admin@sarawak-foodcourt.com',
    'Administrator',
    '0123456789',
    'admin',
    'admin123',  -- In production, this should be hashed!
    NOW()
) ON CONFLICT (email) DO NOTHING;

-- Verify admin was created
SELECT id, email, full_name, role, created_at 
FROM users 
WHERE role = 'admin';
