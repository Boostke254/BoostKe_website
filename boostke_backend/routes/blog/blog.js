const express = require('express');
const router = express.Router();
const db = require('../../db');

// Get all blog posts with pagination and filtering
router.get('/posts', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 9,
      category,
      search,
      sort = 'newest',
      featured
    } = req.query;

    const offset = (page - 1) * limit;
    let query = `
      SELECT 
        p.*,
        a.name as author_name,
        a.avatar as author_avatar,
        a.bio as author_bio,
        c.name as category_name,
        (SELECT COUNT(*) FROM blog_comments bc WHERE bc.post_id = p.id) as comments_count,
        (SELECT COUNT(*) FROM blog_likes bl WHERE bl.post_id = p.id) as likes_count
      FROM blog_posts p
      LEFT JOIN authors a ON p.author_id = a.id
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.published = true
    `;

    const queryParams = [];
    let paramIndex = 1;

    // Add category filter
    if (category) {
      query += ` AND c.slug = $${paramIndex}`;
      queryParams.push(category);
      paramIndex++;
    }

    // Add search filter
    if (search) {
      query += ` AND (p.title ILIKE $${paramIndex} OR p.excerpt ILIKE $${paramIndex} OR p.content ILIKE $${paramIndex})`;
      queryParams.push(`%${search}%`);
      paramIndex++;
    }

    // Add featured filter
    if (featured === 'true') {
      query += ` AND p.featured = true`;
    }

    // Add sorting
    switch (sort) {
      case 'oldest':
        query += ` ORDER BY p.published_at ASC`;
        break;
      case 'popular':
        query += ` ORDER BY p.views DESC`;
        break;
      case 'liked':
        query += ` ORDER BY likes_count DESC`;
        break;
      default: // newest
        query += ` ORDER BY p.published_at DESC`;
    }

    // Add pagination
    query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    queryParams.push(limit, offset);

    const result = await db.query(query, queryParams);
    
    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) 
      FROM blog_posts p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.published = true
    `;
    
    const countParams = [];
    let countParamIndex = 1;
    
    if (category) {
      countQuery += ` AND c.slug = $${countParamIndex}`;
      countParams.push(category);
      countParamIndex++;
    }
    
    if (search) {
      countQuery += ` AND (p.title ILIKE $${countParamIndex} OR p.excerpt ILIKE $${countParamIndex} OR p.content ILIKE $${countParamIndex})`;
      countParams.push(`%${search}%`);
    }
    
    if (featured === 'true') {
      countQuery += ` AND p.featured = true`;
    }

    const countResult = await db.query(countQuery, countParams);
    const totalPosts = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalPosts / limit);

    res.json({
      posts: result.rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalPosts,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single blog post by ID
router.get('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT 
        p.*,
        a.name as author_name,
        a.avatar as author_avatar,
        a.bio as author_bio,
        c.name as category_name,
        c.slug as category_slug,
        (SELECT COUNT(*) FROM blog_comments bc WHERE bc.post_id = p.id) as comments_count,
        (SELECT COUNT(*) FROM blog_likes bl WHERE bl.post_id = p.id) as likes_count
      FROM blog_posts p
      LEFT JOIN authors a ON p.author_id = a.id
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = $1 AND p.published = true
    `;

    const result = await db.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const post = result.rows[0];

    // Get tags for the post
    const tagsQuery = `
      SELECT t.name 
      FROM blog_tags t
      JOIN blog_post_tags pt ON t.id = pt.tag_id
      WHERE pt.post_id = $1
    `;
    const tagsResult = await db.query(tagsQuery, [id]);
    post.tags = tagsResult.rows.map(row => row.name);

    // Increment view count
    await db.query('UPDATE blog_posts SET views = views + 1 WHERE id = $1', [id]);

    // Get related posts
    const relatedQuery = `
      SELECT p.id, p.title, p.excerpt, p.featured_image, p.read_time, c.name as category_name
      FROM blog_posts p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.category_id = $1 AND p.id != $2 AND p.published = true
      ORDER BY p.published_at DESC
      LIMIT 3
    `;
    const relatedResult = await db.query(relatedQuery, [post.category_id, id]);

    res.json({
      post,
      relatedPosts: relatedResult.rows
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new blog post (admin only)
router.post('/posts', async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      category_id,
      author_id,
      featured_image,
      tags,
      published = false,
      featured = false,
      read_time
    } = req.body;

    // Validate required fields
    if (!title || !excerpt || !content || !category_id || !author_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = `
      INSERT INTO blog_posts (title, excerpt, content, category_id, author_id, featured_image, published, featured, read_time)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;

    const result = await db.query(query, [
      title,
      excerpt,
      content,
      category_id,
      author_id,
      featured_image,
      published,
      featured,
      read_time
    ]);

    const postId = result.rows[0].id;

    // Add tags if provided
    if (tags && tags.length > 0) {
      for (const tagName of tags) {
        // Insert or get tag
        const tagQuery = `
          INSERT INTO blog_tags (name) VALUES ($1)
          ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
          RETURNING id
        `;
        const tagResult = await db.query(tagQuery, [tagName]);
        const tagId = tagResult.rows[0].id;

        // Link tag to post
        await db.query(
          'INSERT INTO blog_post_tags (post_id, tag_id) VALUES ($1, $2)',
          [postId, tagId]
        );
      }
    }

    res.status(201).json({ message: 'Blog post created successfully', post: result.rows[0] });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update blog post (admin only)
router.put('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      excerpt,
      content,
      category_id,
      featured_image,
      tags,
      published,
      featured,
      read_time
    } = req.body;

    const query = `
      UPDATE blog_posts 
      SET title = $1, excerpt = $2, content = $3, category_id = $4, 
          featured_image = $5, published = $6, featured = $7, read_time = $8, updated_at = NOW()
      WHERE id = $9
      RETURNING *
    `;

    const result = await db.query(query, [
      title,
      excerpt,
      content,
      category_id,
      featured_image,
      published,
      featured,
      read_time,
      id
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Update tags
    if (tags) {
      // Remove existing tags
      await db.query('DELETE FROM blog_post_tags WHERE post_id = $1', [id]);

      // Add new tags
      for (const tagName of tags) {
        const tagQuery = `
          INSERT INTO blog_tags (name) VALUES ($1)
          ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
          RETURNING id
        `;
        const tagResult = await db.query(tagQuery, [tagName]);
        const tagId = tagResult.rows[0].id;

        await db.query(
          'INSERT INTO blog_post_tags (post_id, tag_id) VALUES ($1, $2)',
          [id, tagId]
        );
      }
    }

    res.json({ message: 'Blog post updated successfully', post: result.rows[0] });
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete blog post (admin only)
router.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Delete related data first
    await db.query('DELETE FROM blog_post_tags WHERE post_id = $1', [id]);
    await db.query('DELETE FROM blog_comments WHERE post_id = $1', [id]);
    await db.query('DELETE FROM blog_likes WHERE post_id = $1', [id]);
    await db.query('DELETE FROM blog_bookmarks WHERE post_id = $1', [id]);

    // Delete the post
    const result = await db.query('DELETE FROM blog_posts WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Like/unlike a post
router.post('/posts/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body; // This should come from authenticated user

    if (!user_id) {
      return res.status(400).json({ error: 'User ID required' });
    }

    // Check if already liked
    const existingLike = await db.query(
      'SELECT * FROM blog_likes WHERE post_id = $1 AND user_id = $2',
      [id, user_id]
    );

    if (existingLike.rows.length > 0) {
      // Unlike
      await db.query('DELETE FROM blog_likes WHERE post_id = $1 AND user_id = $2', [id, user_id]);
      res.json({ liked: false, message: 'Post unliked' });
    } else {
      // Like
      await db.query('INSERT INTO blog_likes (post_id, user_id) VALUES ($1, $2)', [id, user_id]);
      res.json({ liked: true, message: 'Post liked' });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Bookmark/unbookmark a post
router.post('/posts/:id/bookmark', async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: 'User ID required' });
    }

    const existingBookmark = await db.query(
      'SELECT * FROM blog_bookmarks WHERE post_id = $1 AND user_id = $2',
      [id, user_id]
    );

    if (existingBookmark.rows.length > 0) {
      await db.query('DELETE FROM blog_bookmarks WHERE post_id = $1 AND user_id = $2', [id, user_id]);
      res.json({ bookmarked: false, message: 'Bookmark removed' });
    } else {
      await db.query('INSERT INTO blog_bookmarks (post_id, user_id) VALUES ($1, $2)', [id, user_id]);
      res.json({ bookmarked: true, message: 'Post bookmarked' });
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get categories
router.get('/categories', async (req, res) => {
  try {
    const query = `
      SELECT c.*, COUNT(p.id) as post_count
      FROM categories c
      LEFT JOIN blog_posts p ON c.id = p.category_id AND p.published = true
      GROUP BY c.id
      ORDER BY c.name
    `;

    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get comments for a post
router.get('/posts/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT c.*, u.full_name as author_name, u.email as author_email
      FROM blog_comments c
      LEFT JOIN users u ON c.user_id = u.user_id
      WHERE c.post_id = $1
      ORDER BY c.created_at DESC
    `;

    const result = await db.query(query, [id]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add comment to a post
router.post('/posts/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, content } = req.body;

    if (!user_id || !content) {
      return res.status(400).json({ error: 'User ID and content required' });
    }

    const query = `
      INSERT INTO blog_comments (post_id, user_id, content)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const result = await db.query(query, [id, user_id, content]);
    res.status(201).json({ message: 'Comment added successfully', comment: result.rows[0] });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Newsletter subscription
router.post('/newsletter', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email required' });
    }

    // Check if already subscribed
    const existing = await db.query('SELECT * FROM newsletter_subscribers WHERE email = $1', [email]);

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }

    await db.query('INSERT INTO newsletter_subscribers (email) VALUES ($1)', [email]);
    res.json({ message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
