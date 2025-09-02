-- Transaction management tables for BoostKe ecosystem

-- Main transactions table
CREATE TABLE IF NOT EXISTS transactions (
    transaction_id SERIAL PRIMARY KEY,
    transaction_reference VARCHAR(100) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(user_id),
    transaction_type VARCHAR(50) NOT NULL, -- 'product_purchase', 'service_booking', 'membership_payment', 'subscription', 'commission_payout'
    payment_method VARCHAR(50) NOT NULL, -- 'mpesa', 'card', 'boost_wallet', 'bank_transfer'
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'KES',
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded'
    description TEXT,
    metadata JSONB, -- Store additional transaction data
    mpesa_checkout_request_id VARCHAR(100), -- M-Pesa checkout request ID
    mpesa_receipt_number VARCHAR(100), -- M-Pesa receipt number
    phone_number VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    failed_at TIMESTAMP,
    failure_reason TEXT
);

-- M-Pesa specific transaction details
CREATE TABLE IF NOT EXISTS mpesa_transactions (
    mpesa_transaction_id SERIAL PRIMARY KEY,
    transaction_id INTEGER REFERENCES transactions(transaction_id),
    checkout_request_id VARCHAR(100) UNIQUE,
    merchant_request_id VARCHAR(100),
    amount DECIMAL(15,2) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    account_reference VARCHAR(100),
    transaction_desc TEXT,
    callback_response JSONB,
    mpesa_receipt_number VARCHAR(100),
    transaction_date TIMESTAMP,
    result_code INTEGER,
    result_desc TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table for product/service purchases
CREATE TABLE IF NOT EXISTS orders (
    order_id SERIAL PRIMARY KEY,
    order_number VARCHAR(100) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(user_id),
    transaction_id INTEGER REFERENCES transactions(transaction_id),
    order_type VARCHAR(50) NOT NULL, -- 'product', 'service', 'membership'
    total_amount DECIMAL(15,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'
    shipping_address JSONB,
    billing_address JSONB,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items for detailed order tracking
CREATE TABLE IF NOT EXISTS order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(order_id),
    item_type VARCHAR(50) NOT NULL, -- 'product', 'service'
    item_id INTEGER NOT NULL, -- References shops.shop_id or service provider ID
    item_name VARCHAR(255) NOT NULL,
    quantity INTEGER DEFAULT 1,
    unit_price DECIMAL(15,2) NOT NULL,
    total_price DECIMAL(15,2) NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Membership transactions
CREATE TABLE IF NOT EXISTS membership_transactions (
    membership_transaction_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    transaction_id INTEGER REFERENCES transactions(transaction_id),
    membership_tier VARCHAR(50) NOT NULL, -- 'aspirant', 'visionary', 'legacy', 'titan', 'invisible'
    previous_tier VARCHAR(50),
    amount DECIMAL(15,2) NOT NULL,
    duration_months INTEGER DEFAULT 12,
    start_date DATE,
    end_date DATE,
    is_renewal BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wallet system for Boost ecosystem
CREATE TABLE IF NOT EXISTS boost_wallets (
    wallet_id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(user_id),
    balance DECIMAL(15,2) DEFAULT 0.00,
    pending_balance DECIMAL(15,2) DEFAULT 0.00,
    total_earned DECIMAL(15,2) DEFAULT 0.00,
    total_spent DECIMAL(15,2) DEFAULT 0.00,
    wallet_status VARCHAR(50) DEFAULT 'active', -- 'active', 'suspended', 'closed'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wallet transactions for internal ecosystem transactions
CREATE TABLE IF NOT EXISTS wallet_transactions (
    wallet_transaction_id SERIAL PRIMARY KEY,
    wallet_id INTEGER REFERENCES boost_wallets(wallet_id),
    transaction_id INTEGER REFERENCES transactions(transaction_id),
    transaction_type VARCHAR(50) NOT NULL, -- 'credit', 'debit', 'commission', 'refund', 'payout'
    amount DECIMAL(15,2) NOT NULL,
    balance_before DECIMAL(15,2),
    balance_after DECIMAL(15,2),
    description TEXT,
    reference_id INTEGER, -- Can reference order_id, commission_id, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Commission tracking for referral system
CREATE TABLE IF NOT EXISTS commissions (
    commission_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id), -- User earning the commission
    referred_user_id INTEGER REFERENCES users(user_id), -- User who was referred
    transaction_id INTEGER REFERENCES transactions(transaction_id),
    commission_type VARCHAR(50) NOT NULL, -- 'signup', 'purchase', 'renewal', 'membership_upgrade'
    commission_rate DECIMAL(5,2), -- Percentage rate
    commission_amount DECIMAL(15,2) NOT NULL,
    base_amount DECIMAL(15,2), -- Original transaction amount
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'paid', 'cancelled'
    membership_tier VARCHAR(50), -- Tier of user earning commission
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paid_at TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(transaction_type);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at);
CREATE INDEX IF NOT EXISTS idx_mpesa_checkout_request_id ON mpesa_transactions(checkout_request_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_wallet_id ON wallet_transactions(wallet_id);
CREATE INDEX IF NOT EXISTS idx_commissions_user_id ON commissions(user_id);
CREATE INDEX IF NOT EXISTS idx_commissions_status ON commissions(status);

-- Triggers to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mpesa_transactions_updated_at BEFORE UPDATE ON mpesa_transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_boost_wallets_updated_at BEFORE UPDATE ON boost_wallets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
