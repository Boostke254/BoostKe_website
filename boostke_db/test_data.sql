-- Test Data for BoostKe Database
-- This script adds sample users and products for testing the cart and payment system

-- First, let's add a test user (if not exists)
INSERT INTO users (full_name, email, mobile, password, is_verified)
VALUES (
    'Test User',
    'testuser@boostke.co.ke',
    '254712345678',
    '$2b$10$rOhKP7R6uGmvQpz7H8KjY.3YXKq2GqJgN0Zx8nDyKxC8nYnYdF5a2', -- password: "testpassword123"
    true
)
ON CONFLICT (email) DO NOTHING;

-- Add a test retailer/seller user
INSERT INTO users (full_name, email, mobile, password, is_verified)
VALUES (
    'Test Retailer',
    'retailer@boostke.co.ke',
    '254723456789',
    '$2b$10$rOhKP7R6uGmvQpz7H8KjY.3YXKq2GqJgN0Zx8nDyKxC8nYnYdF5a2', -- password: "testpassword123"
    true
)
ON CONFLICT (email) DO NOTHING;

-- Now let's add some test products/listings
-- Get the user_id of our test retailer for the listings
DO $$
DECLARE
    retailer_user_id INTEGER;
BEGIN
    -- Get the retailer user ID
    SELECT user_id INTO retailer_user_id 
    FROM users 
    WHERE email = 'retailer@boostke.co.ke';
    
    -- Insert test products
    INSERT INTO listings (
        user_id, 
        title, 
        description, 
        price, 
        category, 
        photos, 
        location, 
        is_available
    ) VALUES 
    (
        retailer_user_id,
        'HP EliteBook 840 G5 Laptop',
        'Excellent condition HP EliteBook 840 G5 with Intel Core i5 8th Gen processor, 8GB RAM, 256GB SSD, 14-inch FHD display. Perfect for business and professional use. Includes original charger and laptop bag.',
        65000.00,
        'Electronics',
        ARRAY[
            'https://example.com/hp-elitebook-1.jpg',
            'https://example.com/hp-elitebook-2.jpg',
            'https://example.com/hp-elitebook-3.jpg'
        ],
        'Nairobi, Kenya',
        true
    ),
    (
        retailer_user_id,
        'Lenovo IdeaPad Slim 3',
        'Brand new Lenovo IdeaPad Slim 3 with AMD Ryzen 5 processor, 8GB RAM, 512GB SSD, 14-inch FHD display. Lightweight and perfect for students and professionals. 2-year warranty included.',
        55000.00,
        'Electronics',
        ARRAY[
            'https://example.com/lenovo-ideapad-1.jpg',
            'https://example.com/lenovo-ideapad-2.jpg'
        ],
        'Mombasa, Kenya',
        true
    ),
    (
        retailer_user_id,
        'Dell Latitude E7280',
        'Refurbished Dell Latitude E7280 ultrabook. Intel Core i7 7th Gen, 16GB RAM, 256GB SSD, 12.5-inch FHD touchscreen. Ultra-portable and durable business laptop. 6 months warranty.',
        48000.00,
        'Electronics',
        ARRAY[
            'https://example.com/dell-latitude-1.jpg',
            'https://example.com/dell-latitude-2.jpg',
            'https://example.com/dell-latitude-3.jpg'
        ],
        'Kisumu, Kenya',
        true
    ),
    (
        retailer_user_id,
        'Samsung Galaxy S23 Ultra',
        'Brand new Samsung Galaxy S23 Ultra 256GB, Phantom Black. 200MP camera, S Pen included, 5000mAh battery, 120Hz display. Comes with original Samsung accessories and 2-year warranty.',
        120000.00,
        'Electronics',
        ARRAY[
            'https://example.com/samsung-s23-1.jpg',
            'https://example.com/samsung-s23-2.jpg'
        ],
        'Nairobi, Kenya',
        true
    ),
    (
        retailer_user_id,
        'iPhone 14 Pro Max',
        'Excellent condition iPhone 14 Pro Max 128GB, Space Black. No scratches, battery health 95%. Includes original box, charger, and screen protector already applied. 10 months warranty remaining.',
        135000.00,
        'Electronics',
        ARRAY[
            'https://example.com/iphone-14-1.jpg',
            'https://example.com/iphone-14-2.jpg'
        ],
        'Nairobi, Kenya',
        true
    ),
    (
        retailer_user_id,
        'MacBook Air M2',
        'Brand new MacBook Air with M2 chip, 8GB unified memory, 256GB SSD, 13.6-inch Liquid Retina display. Space Gray color. Perfect for creative professionals and students. Full Apple warranty.',
        145000.00,
        'Electronics',
        ARRAY[
            'https://example.com/macbook-air-1.jpg',
            'https://example.com/macbook-air-2.jpg'
        ],
        'Nairobi, Kenya',
        true
    ),
    (
        retailer_user_id,
        'Sony WH-1000XM5 Headphones',
        'Premium noise-canceling wireless headphones. 30-hour battery life, crystal clear calls, touch controls. Perfect for music lovers and professionals. Includes carrying case and cables.',
        32000.00,
        'Electronics',
        ARRAY[
            'https://example.com/sony-headphones-1.jpg',
            'https://example.com/sony-headphones-2.jpg'
        ],
        'Mombasa, Kenya',
        true
    ),
    (
        retailer_user_id,
        'Gaming Setup - ROG Strix',
        'Complete gaming setup: ASUS ROG Strix laptop (RTX 3060, Intel i7, 16GB RAM), gaming mouse, mechanical keyboard, and headset. Perfect for gaming enthusiasts and content creators.',
        185000.00,
        'Electronics',
        ARRAY[
            'https://example.com/gaming-setup-1.jpg',
            'https://example.com/gaming-setup-2.jpg',
            'https://example.com/gaming-setup-3.jpg'
        ],
        'Nakuru, Kenya',
        true
    );
    
END $$;

-- Display the inserted products for verification
SELECT 
    listing_id,
    title,
    price,
    category,
    location,
    is_available,
    created_at
FROM listings 
WHERE user_id = (SELECT user_id FROM users WHERE email = 'retailer@boostke.co.ke')
ORDER BY created_at DESC;

-- Display user information
SELECT 
    user_id,
    full_name,
    email,
    mobile,
    is_verified,
    created_at
FROM users 
WHERE email IN ('testuser@boostke.co.ke', 'retailer@boostke.co.ke');

-- Summary
SELECT 
    'Products Added' as action,
    COUNT(*) as count
FROM listings 
WHERE user_id = (SELECT user_id FROM users WHERE email = 'retailer@boostke.co.ke');
