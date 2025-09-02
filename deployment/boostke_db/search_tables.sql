-- Create search analytics table for tracking search behavior
CREATE TABLE IF NOT EXISTS search_analytics (
    id SERIAL PRIMARY KEY,
    search_query VARCHAR(255),
    category VARCHAR(100),
    location VARCHAR(255),
    result_count INTEGER DEFAULT 0,
    search_timestamp TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    session_id VARCHAR(255),
    ip_address INET
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_search_analytics_query ON search_analytics(search_query);
CREATE INDEX IF NOT EXISTS idx_search_analytics_timestamp ON search_analytics(search_timestamp);
CREATE INDEX IF NOT EXISTS idx_search_analytics_category ON search_analytics(category);
CREATE INDEX IF NOT EXISTS idx_search_analytics_user_id ON search_analytics(user_id);

-- Create saved searches table for registered users
CREATE TABLE IF NOT EXISTS saved_searches (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    search_name VARCHAR(255) NOT NULL,
    search_query VARCHAR(255),
    category VARCHAR(100),
    location VARCHAR(255),
    min_price DECIMAL(10,2),
    max_price DECIMAL(10,2),
    filters JSON,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_alert_enabled BOOLEAN DEFAULT FALSE,
    alert_frequency VARCHAR(20) DEFAULT 'daily' -- daily, weekly, monthly
);

-- Create indexes for saved searches
CREATE INDEX IF NOT EXISTS idx_saved_searches_user_id ON saved_searches(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_searches_created_at ON saved_searches(created_at);

-- Create search suggestions table for popular/trending searches
CREATE TABLE IF NOT EXISTS search_suggestions (
    id SERIAL PRIMARY KEY,
    suggestion_text VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(100),
    search_count INTEGER DEFAULT 1,
    last_searched TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_trending BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for search suggestions
CREATE INDEX IF NOT EXISTS idx_search_suggestions_text ON search_suggestions(suggestion_text);
CREATE INDEX IF NOT EXISTS idx_search_suggestions_category ON search_suggestions(category);
CREATE INDEX IF NOT EXISTS idx_search_suggestions_trending ON search_suggestions(is_trending);
CREATE INDEX IF NOT EXISTS idx_search_suggestions_count ON search_suggestions(search_count);

-- Insert some initial popular search suggestions
INSERT INTO search_suggestions (suggestion_text, category, search_count, is_trending) VALUES
('laptop', 'electronics', 150, true),
('phone', 'electronics', 200, true),
('car', 'vehicles', 80, false),
('apartment', 'properties', 120, true),
('clothing', 'fashion', 90, false),
('furniture', 'home', 70, false),
('books', 'education', 60, false),
('shoes', 'fashion', 85, false),
('camera', 'electronics', 45, false),
('bicycle', 'sports', 35, false)
ON CONFLICT (suggestion_text) DO NOTHING;
