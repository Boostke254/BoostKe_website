-- Blog Database Schema for BoostKe
-- Execute this script to create all necessary tables for the blog system

-- Authors table
CREATE TABLE IF NOT EXISTS authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    featured_image TEXT,
    author_id INTEGER REFERENCES authors(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    published BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE,
    read_time INTEGER DEFAULT 5,
    views INTEGER DEFAULT 0,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tags table
CREATE TABLE IF NOT EXISTS blog_tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    slug VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Post-Tags junction table
CREATE TABLE IF NOT EXISTS blog_post_tags (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES blog_posts(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES blog_tags(id) ON DELETE CASCADE,
    UNIQUE(post_id, tag_id)
);

-- Comments table
CREATE TABLE IF NOT EXISTS blog_comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES blog_posts(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    parent_id INTEGER REFERENCES blog_comments(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Likes table
CREATE TABLE IF NOT EXISTS blog_likes (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES blog_posts(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(post_id, user_id)
);

-- Bookmarks table
CREATE TABLE IF NOT EXISTS blog_bookmarks (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES blog_posts(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(post_id, user_id)
);

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed BOOLEAN DEFAULT TRUE,
    verification_token VARCHAR(255),
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog analytics table
CREATE TABLE IF NOT EXISTS blog_analytics (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES blog_posts(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    session_id VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    time_spent INTEGER, -- in seconds
    scroll_depth INTEGER, -- percentage
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_views ON blog_posts(views DESC);
CREATE INDEX IF NOT EXISTS idx_blog_comments_post ON blog_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_user ON blog_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_likes_post ON blog_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_likes_user ON blog_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_bookmarks_post ON blog_bookmarks(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_bookmarks_user ON blog_bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_analytics_post ON blog_analytics(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_analytics_created ON blog_analytics(created_at);

-- Create triggers for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to relevant tables
CREATE TRIGGER update_authors_updated_at BEFORE UPDATE ON authors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_comments_updated_at BEFORE UPDATE ON blog_comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_newsletter_subscribers_updated_at BEFORE UPDATE ON newsletter_subscribers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically generate slug from title
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(trim(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'), '-'));
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate slug for blog posts
CREATE OR REPLACE FUNCTION set_blog_post_slug()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug = generate_slug(NEW.title);
        
        -- Ensure uniqueness
        WHILE EXISTS (SELECT 1 FROM blog_posts WHERE slug = NEW.slug AND id != COALESCE(NEW.id, 0)) LOOP
            NEW.slug = NEW.slug || '-' || extract(epoch from now())::text;
        END LOOP;
    END IF;
    
    -- Set published_at when first published
    IF NEW.published = TRUE AND OLD.published = FALSE THEN
        NEW.published_at = CURRENT_TIMESTAMP;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_blog_post_slug_trigger
    BEFORE INSERT OR UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION set_blog_post_slug();

-- Trigger to auto-generate slug for tags
CREATE OR REPLACE FUNCTION set_tag_slug()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug = generate_slug(NEW.name);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_tag_slug_trigger
    BEFORE INSERT OR UPDATE ON blog_tags
    FOR EACH ROW EXECUTE FUNCTION set_tag_slug();

-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES
('Business', 'business', 'Business insights, strategies, and market analysis'),
('Technology', 'technology', 'Technical tutorials, platform updates, and tech insights'),
('Success Stories', 'success-stories', 'User success stories and testimonials'),
('Tutorials', 'tutorials', 'Step-by-step guides and how-to articles'),
('Marketplace', 'marketplace', 'Marketplace tips, selling strategies, and best practices'),
('Franchise', 'franchise', 'Franchise opportunities and business scaling'),
('Freelance', 'freelance', 'Freelancer resources and opportunities'),
('News', 'news', 'Platform news and announcements')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample author (BoostKe Team)
INSERT INTO authors (name, email, avatar, bio) VALUES
('BoostKe Team', 'team@boostke.co.ke', '/images/boost_logo.png', 'Transforming Kenya''s digital marketplace through innovative technology and community-focused solutions.')
ON CONFLICT (email) DO NOTHING;

-- Insert sample blog post
INSERT INTO blog_posts (
    title, 
    excerpt, 
    content, 
    author_id, 
    category_id, 
    featured_image, 
    published, 
    featured, 
    read_time
) VALUES (
    'Welcome to the BoostKe Blog',
    'Discover insights, stories, and updates from Kenya''s leading digital marketplace ecosystem.',
    '<h2>Welcome to Our New Blog!</h2>
    <p>We''re excited to launch the official BoostKe blog, your go-to destination for insights, success stories, and updates from Kenya''s most innovative digital marketplace ecosystem.</p>
    
    <h3>What You''ll Find Here</h3>
    <ul>
        <li><strong>Business Insights:</strong> Expert analysis on market trends and business strategies</li>
        <li><strong>Success Stories:</strong> Real stories from entrepreneurs who have transformed their businesses</li>
        <li><strong>Technical Guides:</strong> Step-by-step tutorials to help you maximize your platform experience</li>
        <li><strong>Industry News:</strong> Latest updates and developments in Kenya''s digital economy</li>
    </ul>
    
    <p>Our mission is to empower every Kenyan entrepreneur with the knowledge, tools, and inspiration they need to succeed in the digital marketplace. Whether you''re just starting your journey or looking to scale your existing business, you''ll find valuable content tailored to your needs.</p>
    
    <blockquote>
        "Knowledge is power, but applied knowledge is empowerment. We''re here to help you apply what you learn."
    </blockquote>
    
    <p>Stay tuned for regular updates, and don''t forget to subscribe to our newsletter to get the latest insights delivered directly to your inbox!</p>',
    (SELECT id FROM authors WHERE email = 'team@boostke.co.ke'),
    (SELECT id FROM categories WHERE slug = 'news'),
    '/images/blog/welcome-post.jpg',
    true,
    true,
    3
) ON CONFLICT DO NOTHING;

-- Create view for blog post analytics
CREATE OR REPLACE VIEW blog_post_stats AS
SELECT 
    p.id,
    p.title,
    p.views,
    COUNT(DISTINCT l.user_id) as likes_count,
    COUNT(DISTINCT c.id) as comments_count,
    COUNT(DISTINCT b.user_id) as bookmarks_count,
    AVG(a.time_spent) as avg_time_spent,
    AVG(a.scroll_depth) as avg_scroll_depth
FROM blog_posts p
LEFT JOIN blog_likes l ON p.id = l.post_id
LEFT JOIN blog_comments c ON p.id = c.post_id
LEFT JOIN blog_bookmarks b ON p.id = b.post_id
LEFT JOIN blog_analytics a ON p.id = a.post_id
GROUP BY p.id, p.title, p.views;

-- Create function to get popular posts
CREATE OR REPLACE FUNCTION get_popular_posts(limit_count INTEGER DEFAULT 5)
RETURNS TABLE (
    id INTEGER,
    title VARCHAR(500),
    excerpt TEXT,
    featured_image TEXT,
    views INTEGER,
    likes_count BIGINT,
    category_name VARCHAR(255)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.title,
        p.excerpt,
        p.featured_image,
        p.views,
        COUNT(l.user_id) as likes_count,
        c.name as category_name
    FROM blog_posts p
    LEFT JOIN blog_likes l ON p.id = l.post_id
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.published = TRUE
    GROUP BY p.id, p.title, p.excerpt, p.featured_image, p.views, c.name
    ORDER BY p.views DESC, likes_count DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Create function to get related posts
CREATE OR REPLACE FUNCTION get_related_posts(post_id INTEGER, limit_count INTEGER DEFAULT 3)
RETURNS TABLE (
    id INTEGER,
    title VARCHAR(500),
    excerpt TEXT,
    featured_image TEXT,
    read_time INTEGER,
    category_name VARCHAR(255)
) AS $$
DECLARE
    post_category_id INTEGER;
BEGIN
    -- Get the category of the current post
    SELECT category_id INTO post_category_id FROM blog_posts WHERE blog_posts.id = post_id;
    
    RETURN QUERY
    SELECT 
        p.id,
        p.title,
        p.excerpt,
        p.featured_image,
        p.read_time,
        c.name as category_name
    FROM blog_posts p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.category_id = post_category_id 
      AND p.id != post_id 
      AND p.published = TRUE
    ORDER BY p.published_at DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

COMMENT ON TABLE blog_posts IS 'Main blog posts table containing all blog content';
COMMENT ON TABLE blog_comments IS 'User comments on blog posts with nested comment support';
COMMENT ON TABLE blog_likes IS 'User likes/favorites for blog posts';
COMMENT ON TABLE blog_bookmarks IS 'User bookmarks for saving posts to read later';
COMMENT ON TABLE blog_analytics IS 'Detailed analytics tracking for blog post engagement';
COMMENT ON TABLE newsletter_subscribers IS 'Email subscribers for blog newsletter';

-- Grant necessary permissions (adjust based on your user setup)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO your_app_user;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO your_app_user;
