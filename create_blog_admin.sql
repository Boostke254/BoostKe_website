-- Script to create blog admin user with proper credentials
-- Run this script in your PostgreSQL database

-- First, let's create the admin user in the admin table
-- Password will be hashed version of "Francis6949"

DO $$
DECLARE
    hashed_password TEXT;
BEGIN
    -- Hash the password "Francis6949" using bcrypt (this is a sample hash)
    -- In production, you should use the /api/admin/update-password endpoint
    hashed_password := '$2b$10$X1bS1YwK8vH9mBPqO7X0XOHzR6kO7tXzZpCy7YwK8vH9mBPqO7X0XO'; -- This is just an example
    
    -- Insert admin user
    INSERT INTO admin (
        user_id,
        full_name,
        email,
        mobile,
        password,
        role,
        access,
        level,
        created_at,
        updated_at
    ) VALUES (
        1,                                      -- user_id
        'Francis Nganga',                       -- full_name
        'ngangafrancis6949@gmail.com',         -- email
        '+254793710713',                       -- mobile
        'Francis6949',                         -- password (will be hashed later)
        'Blog Admin',                          -- role
        'blog_admin',                          -- access level
        2,                                     -- level (2 = Admin level)
        CURRENT_TIMESTAMP,                     -- created_at
        CURRENT_TIMESTAMP                      -- updated_at
    )
    ON CONFLICT (email) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        mobile = EXCLUDED.mobile,
        role = EXCLUDED.role,
        access = EXCLUDED.access,
        level = EXCLUDED.level,
        updated_at = CURRENT_TIMESTAMP;
    
    RAISE NOTICE 'Admin user created/updated successfully';
END $$;

-- Create corresponding author entry for blog posts
INSERT INTO authors (
    name,
    email,
    avatar,
    bio,
    created_at,
    updated_at
) VALUES (
    'Francis Nganga',                           -- name
    'ngangafrancis6949@gmail.com',             -- email
    'https://via.placeholder.com/150x150/4A90E2/ffffff?text=FN', -- avatar placeholder
    'Blog Administrator and Content Creator for BoostKe. Passionate about technology, business development, and digital innovation in Kenya.', -- bio
    CURRENT_TIMESTAMP,                         -- created_at
    CURRENT_TIMESTAMP                          -- updated_at
)
ON CONFLICT (email) DO UPDATE SET
    name = EXCLUDED.name,
    avatar = EXCLUDED.avatar,
    bio = EXCLUDED.bio,
    updated_at = CURRENT_TIMESTAMP;

-- Display the created admin details
SELECT 
    admin_id,
    full_name,
    email,
    mobile,
    role,
    access,
    level,
    created_at
FROM admin 
WHERE email = 'ngangafrancis6949@gmail.com';

-- Display the created author details  
SELECT 
    id,
    name,
    email,
    avatar,
    bio,
    created_at
FROM authors 
WHERE email = 'ngangafrancis6949@gmail.com';

RAISE NOTICE 'Blog admin setup completed!';
RAISE NOTICE 'Login credentials:';
RAISE NOTICE 'Email: ngangafrancis6949@gmail.com';
RAISE NOTICE 'Password: Francis6949';
RAISE NOTICE 'Access the admin panel at: /blog-admin';
