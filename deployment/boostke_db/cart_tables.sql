-- Cart system tables for BoostKe ecosystem

-- Main cart table to store user carts
CREATE TABLE IF NOT EXISTS carts (
    cart_id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cart items table to store individual items in cart
CREATE TABLE IF NOT EXISTS cart_items (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id INTEGER REFERENCES carts(cart_id) ON DELETE CASCADE,
    listing_id INTEGER REFERENCES listings(listing_id) ON DELETE CASCADE,
    retailer_id INTEGER REFERENCES retailers(retailer_id),
    quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
    unit_price DECIMAL(15,2) NOT NULL,
    total_price DECIMAL(15,2) NOT NULL,
    item_type VARCHAR(20) DEFAULT 'product', -- 'product' or 'service'
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(cart_id, listing_id) -- Prevent duplicate items in same cart
);

-- Cart summary view for easy querying
CREATE OR REPLACE VIEW cart_summary AS
SELECT 
    c.cart_id,
    c.user_id,
    COUNT(ci.cart_item_id) as total_items,
    COALESCE(SUM(ci.total_price), 0) as total_amount,
    c.updated_at
FROM carts c
LEFT JOIN cart_items ci ON c.cart_id = ci.cart_id
GROUP BY c.cart_id, c.user_id, c.updated_at;

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON cart_items(cart_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_listing_id ON cart_items(listing_id);
CREATE INDEX IF NOT EXISTS idx_carts_user_id ON carts(user_id);

-- Triggers to update timestamps
CREATE OR REPLACE FUNCTION update_cart_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    
    -- Also update the parent cart's updated_at
    IF TG_TABLE_NAME = 'cart_items' THEN
        UPDATE carts SET updated_at = CURRENT_TIMESTAMP WHERE cart_id = NEW.cart_id;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_carts_updated_at 
    BEFORE UPDATE ON carts 
    FOR EACH ROW EXECUTE FUNCTION update_cart_updated_at();

CREATE TRIGGER update_cart_items_updated_at 
    BEFORE UPDATE ON cart_items 
    FOR EACH ROW EXECUTE FUNCTION update_cart_updated_at();

-- Function to get or create cart for user
CREATE OR REPLACE FUNCTION get_or_create_cart(p_user_id INTEGER)
RETURNS INTEGER AS $$
DECLARE
    cart_id INTEGER;
BEGIN
    -- Try to get existing cart
    SELECT c.cart_id INTO cart_id 
    FROM carts c 
    WHERE c.user_id = p_user_id;
    
    -- If no cart exists, create one
    IF cart_id IS NULL THEN
        INSERT INTO carts (user_id) 
        VALUES (p_user_id) 
        RETURNING carts.cart_id INTO cart_id;
    END IF;
    
    RETURN cart_id;
END;
$$ language 'plpgsql';

-- Function to calculate cart total
CREATE OR REPLACE FUNCTION calculate_cart_total(p_cart_id INTEGER)
RETURNS DECIMAL(15,2) AS $$
DECLARE
    total DECIMAL(15,2);
BEGIN
    SELECT COALESCE(SUM(total_price), 0) INTO total
    FROM cart_items 
    WHERE cart_id = p_cart_id;
    
    RETURN total;
END;
$$ language 'plpgsql';
