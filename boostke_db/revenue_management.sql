-- BoostKe Revenue Management & Commission System
-- This implements a complete revenue sharing architecture

-- Commission configuration table
CREATE TABLE IF NOT EXISTS commission_tiers (
    tier_id SERIAL PRIMARY KEY,
    tier_name VARCHAR(50) UNIQUE NOT NULL, -- 'basic', 'premium', 'gold', 'platinum'
    category VARCHAR(100), -- 'electronics', 'fashion', 'services', 'properties', etc.
    platform_commission_rate DECIMAL(5,2) NOT NULL, -- Platform's commission (e.g., 5.00 for 5%)
    vendor_retention_rate DECIMAL(5,2) NOT NULL, -- What vendor keeps (e.g., 95.00 for 95%)
    payment_processing_fee DECIMAL(5,2) DEFAULT 2.50, -- Payment gateway fees
    minimum_commission DECIMAL(10,2) DEFAULT 10.00, -- Minimum commission per transaction
    maximum_commission DECIMAL(10,2), -- Cap on commission (optional)
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Revenue split tracking for each transaction
CREATE TABLE IF NOT EXISTS revenue_splits (
    split_id SERIAL PRIMARY KEY,
    transaction_id INTEGER REFERENCES transactions(transaction_id),
    order_id INTEGER REFERENCES orders(order_id),
    vendor_id INTEGER, -- Could be retailer_id, landlord_id, etc.
    vendor_type VARCHAR(50), -- 'retailer', 'landlord', 'service_provider'
    
    -- Amount breakdown
    gross_amount DECIMAL(15,2) NOT NULL, -- Total transaction amount
    platform_commission DECIMAL(15,2) NOT NULL, -- BoostKe's cut
    payment_processing_fee DECIMAL(15,2) NOT NULL, -- M-Pesa/Stripe fees
    vendor_payout DECIMAL(15,2) NOT NULL, -- Amount vendor receives
    
    -- Commission rates used
    commission_rate DECIMAL(5,2) NOT NULL,
    commission_tier VARCHAR(50),
    
    -- Status tracking
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'calculated', 'vendor_paid', 'completed'
    vendor_payout_date TIMESTAMP,
    vendor_payout_reference VARCHAR(100),
    
    -- Metadata
    calculation_details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Platform revenue tracking
CREATE TABLE IF NOT EXISTS platform_revenue (
    revenue_id SERIAL PRIMARY KEY,
    transaction_id INTEGER REFERENCES transactions(transaction_id),
    revenue_type VARCHAR(50) NOT NULL, -- 'commission', 'subscription', 'listing_fee', 'advertising'
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'KES',
    source VARCHAR(100), -- 'product_sale', 'property_listing', 'membership', etc.
    recorded_date DATE DEFAULT CURRENT_DATE,
    financial_quarter VARCHAR(10), -- 'Q1-2025', etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vendor payout tracking
CREATE TABLE IF NOT EXISTS vendor_payouts (
    payout_id SERIAL PRIMARY KEY,
    vendor_id INTEGER NOT NULL,
    vendor_type VARCHAR(50) NOT NULL,
    
    -- Payout details
    total_amount DECIMAL(15,2) NOT NULL,
    transaction_count INTEGER NOT NULL,
    payout_period_start DATE NOT NULL,
    payout_period_end DATE NOT NULL,
    
    -- Payment details
    payout_method VARCHAR(50) DEFAULT 'mpesa', -- 'mpesa', 'bank_transfer', 'boost_wallet'
    payout_account VARCHAR(100), -- Phone number or account details
    payout_reference VARCHAR(100),
    payout_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
    
    -- Tracking
    initiated_by INTEGER REFERENCES admin(admin_id),
    initiated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    failure_reason TEXT,
    
    -- Metadata
    payout_details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vendor earnings summary
CREATE TABLE IF NOT EXISTS vendor_earnings (
    earning_id SERIAL PRIMARY KEY,
    vendor_id INTEGER NOT NULL,
    vendor_type VARCHAR(50) NOT NULL,
    
    -- Running totals
    total_gross_sales DECIMAL(15,2) DEFAULT 0.00,
    total_commissions_paid DECIMAL(15,2) DEFAULT 0.00,
    total_net_earnings DECIMAL(15,2) DEFAULT 0.00,
    pending_payout DECIMAL(15,2) DEFAULT 0.00,
    total_paid_out DECIMAL(15,2) DEFAULT 0.00,
    
    -- Statistics
    transaction_count INTEGER DEFAULT 0,
    average_transaction_value DECIMAL(15,2) DEFAULT 0.00,
    highest_transaction DECIMAL(15,2) DEFAULT 0.00,
    
    -- Dates
    first_sale_date DATE,
    last_sale_date DATE,
    last_payout_date DATE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(vendor_id, vendor_type)
);

-- Escrow system for secure transactions
CREATE TABLE IF NOT EXISTS transaction_escrow (
    escrow_id SERIAL PRIMARY KEY,
    transaction_id INTEGER REFERENCES transactions(transaction_id),
    order_id INTEGER REFERENCES orders(order_id),
    
    -- Escrow details
    amount DECIMAL(15,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'held', -- 'held', 'released_to_vendor', 'refunded_to_buyer', 'disputed'
    hold_period_days INTEGER DEFAULT 7, -- How long to hold funds
    
    -- Release conditions
    auto_release_date TIMESTAMP,
    release_condition VARCHAR(100), -- 'delivery_confirmed', 'buyer_approval', 'time_elapsed'
    
    -- Actions
    released_by INTEGER, -- admin_id who released funds
    released_at TIMESTAMP,
    release_reason TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payment gateway fees tracking
CREATE TABLE IF NOT EXISTS payment_gateway_fees (
    fee_id SERIAL PRIMARY KEY,
    transaction_id INTEGER REFERENCES transactions(transaction_id),
    gateway VARCHAR(50) NOT NULL, -- 'mpesa', 'stripe', 'paypal'
    
    -- Fee breakdown
    gateway_fee DECIMAL(15,2) NOT NULL,
    gateway_fee_percentage DECIMAL(5,2),
    fixed_fee DECIMAL(10,2) DEFAULT 0.00,
    
    -- Revenue impact
    net_amount_received DECIMAL(15,2) NOT NULL, -- Amount after gateway fees
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default commission tiers
INSERT INTO commission_tiers (tier_name, category, platform_commission_rate, vendor_retention_rate, payment_processing_fee) VALUES
('basic_electronics', 'Electronics', 8.00, 92.00, 2.50),
('basic_fashion', 'Fashion & Beauty', 12.00, 88.00, 2.50),
('basic_services', 'Services', 15.00, 85.00, 2.50),
('premium_electronics', 'Electronics', 6.00, 94.00, 2.50),
('premium_fashion', 'Fashion & Beauty', 10.00, 90.00, 2.50),
('premium_services', 'Services', 12.00, 88.00, 2.50),
('properties', 'Real Estate', 5.00, 95.00, 2.50),
('franchise', 'Franchise', 3.00, 97.00, 2.50);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_revenue_splits_transaction_id ON revenue_splits(transaction_id);
CREATE INDEX IF NOT EXISTS idx_revenue_splits_vendor ON revenue_splits(vendor_id, vendor_type);
CREATE INDEX IF NOT EXISTS idx_platform_revenue_date ON platform_revenue(recorded_date);
CREATE INDEX IF NOT EXISTS idx_vendor_payouts_vendor ON vendor_payouts(vendor_id, vendor_type);
CREATE INDEX IF NOT EXISTS idx_vendor_payouts_status ON vendor_payouts(payout_status);

-- Functions for automatic calculations
CREATE OR REPLACE FUNCTION calculate_revenue_split(
    p_transaction_id INTEGER,
    p_gross_amount DECIMAL,
    p_vendor_id INTEGER,
    p_vendor_type VARCHAR,
    p_category VARCHAR DEFAULT 'general'
) RETURNS JSONB AS $$
DECLARE
    v_commission_tier commission_tiers%ROWTYPE;
    v_platform_commission DECIMAL(15,2);
    v_payment_fee DECIMAL(15,2);
    v_vendor_payout DECIMAL(15,2);
    v_result JSONB;
BEGIN
    -- Get commission tier for category
    SELECT * INTO v_commission_tier 
    FROM commission_tiers 
    WHERE category = p_category AND is_active = true
    ORDER BY tier_name LIMIT 1;
    
    -- Fallback to basic tier if category not found
    IF NOT FOUND THEN
        SELECT * INTO v_commission_tier 
        FROM commission_tiers 
        WHERE tier_name LIKE 'basic_%' AND is_active = true
        LIMIT 1;
    END IF;
    
    -- Calculate amounts
    v_payment_fee := p_gross_amount * (v_commission_tier.payment_processing_fee / 100);
    v_platform_commission := p_gross_amount * (v_commission_tier.platform_commission_rate / 100);
    
    -- Ensure minimum commission
    IF v_platform_commission < v_commission_tier.minimum_commission THEN
        v_platform_commission := v_commission_tier.minimum_commission;
    END IF;
    
    -- Apply maximum commission if set
    IF v_commission_tier.maximum_commission IS NOT NULL AND v_platform_commission > v_commission_tier.maximum_commission THEN
        v_platform_commission := v_commission_tier.maximum_commission;
    END IF;
    
    v_vendor_payout := p_gross_amount - v_platform_commission - v_payment_fee;
    
    -- Insert revenue split record
    INSERT INTO revenue_splits (
        transaction_id, vendor_id, vendor_type, gross_amount,
        platform_commission, payment_processing_fee, vendor_payout,
        commission_rate, commission_tier, status
    ) VALUES (
        p_transaction_id, p_vendor_id, p_vendor_type, p_gross_amount,
        v_platform_commission, v_payment_fee, v_vendor_payout,
        v_commission_tier.platform_commission_rate, v_commission_tier.tier_name, 'calculated'
    );
    
    -- Record platform revenue
    INSERT INTO platform_revenue (transaction_id, revenue_type, amount, source)
    VALUES (p_transaction_id, 'commission', v_platform_commission, p_category);
    
    -- Update vendor earnings
    INSERT INTO vendor_earnings (vendor_id, vendor_type, total_gross_sales, total_commissions_paid, total_net_earnings, pending_payout, transaction_count)
    VALUES (p_vendor_id, p_vendor_type, p_gross_amount, v_platform_commission, v_vendor_payout, v_vendor_payout, 1)
    ON CONFLICT (vendor_id, vendor_type) DO UPDATE SET
        total_gross_sales = vendor_earnings.total_gross_sales + EXCLUDED.total_gross_sales,
        total_commissions_paid = vendor_earnings.total_commissions_paid + EXCLUDED.total_commissions_paid,
        total_net_earnings = vendor_earnings.total_net_earnings + EXCLUDED.total_net_earnings,
        pending_payout = vendor_earnings.pending_payout + EXCLUDED.pending_payout,
        transaction_count = vendor_earnings.transaction_count + 1,
        last_sale_date = CURRENT_DATE,
        updated_at = CURRENT_TIMESTAMP;
    
    -- Return calculation details
    v_result := jsonb_build_object(
        'gross_amount', p_gross_amount,
        'platform_commission', v_platform_commission,
        'payment_processing_fee', v_payment_fee,
        'vendor_payout', v_vendor_payout,
        'commission_rate', v_commission_tier.platform_commission_rate,
        'tier_used', v_commission_tier.tier_name
    );
    
    RETURN v_result;
END;
$$ LANGUAGE plpgsql;
