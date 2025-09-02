const express = require("express");
const pool = require("../../db");

const router = express.Router();

// 🔍 Enhanced Search Listings with Advanced Features
router.get("/filter-by-search", async (req, res) => {
  try {
    const { 
      query, 
      category, 
      min_price, 
      max_price, 
      location, 
      sort_by = 'relevance',
      page = 1, 
      limit = 20 
    } = req.query;

    // Check if search query is provided
    if (!query) {
      return res.status(400).json({ error: "Search query is required for filtering" });
    }

    // Calculate pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);

    // Build dynamic search query
    let baseQuery = `
      SELECT 
        l.*,
        r.full_name as retailer_name,
        s.shop_name,
        u.full_name as user_name,
        -- Calculate relevance score
        (
          CASE 
            WHEN l.title ILIKE $1 THEN 10
            WHEN l.title ILIKE $2 THEN 8
            WHEN l.description ILIKE $1 THEN 6
            WHEN l.description ILIKE $2 THEN 4
            WHEN l.category ILIKE $2 THEN 3
            ELSE 1
          END +
          CASE WHEN l.is_available = true THEN 2 ELSE 0 END +
          (l.view_count / 100.0)
        ) as relevance_score
      FROM listings l
      LEFT JOIN retailers r ON l.retailer_id = r.retailer_id
      LEFT JOIN shops s ON l.retailer_id = s.retailer_id
      LEFT JOIN users u ON l.user_id = u.user_id
      WHERE (l.title ILIKE $1 OR l.title ILIKE $2 OR l.description ILIKE $1 OR l.description ILIKE $2 OR l.category ILIKE $2)
        AND l.is_available = true
    `;

    const searchExact = `%${query}%`;
    const searchTerms = query.split(' ').map(term => `%${term}%`).join('|');
    
    let queryParams = [searchExact, searchTerms];
    let paramIndex = 3;

    // Add category filter
    if (category && category !== 'all') {
      baseQuery += ` AND l.category ILIKE $${paramIndex}`;
      queryParams.push(`%${category}%`);
      paramIndex++;
    }

    // Add price range filters
    if (min_price) {
      baseQuery += ` AND l.price >= $${paramIndex}`;
      queryParams.push(parseFloat(min_price));
      paramIndex++;
    }

    if (max_price) {
      baseQuery += ` AND l.price <= $${paramIndex}`;
      queryParams.push(parseFloat(max_price));
      paramIndex++;
    }

    // Add location filter
    if (location && location !== 'all') {
      baseQuery += ` AND l.location ILIKE $${paramIndex}`;
      queryParams.push(`%${location}%`);
      paramIndex++;
    }

    // Add sorting
    let orderClause = '';
    switch (sort_by) {
      case 'price_low':
        orderClause = 'ORDER BY l.price ASC';
        break;
      case 'price_high':
        orderClause = 'ORDER BY l.price DESC';
        break;
      case 'newest':
        orderClause = 'ORDER BY l.created_at DESC';
        break;
      case 'popular':
        orderClause = 'ORDER BY l.view_count DESC';
        break;
      case 'relevance':
      default:
        orderClause = 'ORDER BY relevance_score DESC, l.created_at DESC';
        break;
    }

    baseQuery += ` ${orderClause} LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    queryParams.push(parseInt(limit), offset);

    // Execute search query
    const result = await pool.query(baseQuery, queryParams);

    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) as total
      FROM listings l
      WHERE (l.title ILIKE $1 OR l.title ILIKE $2 OR l.description ILIKE $1 OR l.description ILIKE $2 OR l.category ILIKE $2)
        AND l.is_available = true
    `;
    
    let countParams = [searchExact, searchTerms];
    let countParamIndex = 3;

    if (category && category !== 'all') {
      countQuery += ` AND l.category ILIKE $${countParamIndex}`;
      countParams.push(`%${category}%`);
      countParamIndex++;
    }

    if (min_price) {
      countQuery += ` AND l.price >= $${countParamIndex}`;
      countParams.push(parseFloat(min_price));
      countParamIndex++;
    }

    if (max_price) {
      countQuery += ` AND l.price <= $${countParamIndex}`;
      countParams.push(parseFloat(max_price));
      countParamIndex++;
    }

    if (location && location !== 'all') {
      countQuery += ` AND l.location ILIKE $${countParamIndex}`;
      countParams.push(`%${location}%`);
      countParamIndex++;
    }

    const countResult = await pool.query(countQuery, countParams);
    const totalResults = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(totalResults / parseInt(limit));

    // Log search for analytics (optional)
    try {
      await pool.query(
        'INSERT INTO search_analytics (search_query, category, location, result_count, search_timestamp) VALUES ($1, $2, $3, $4, NOW())',
        [query, category || 'all', location || 'all', totalResults]
      );
    } catch (analyticsErr) {
      // Don't fail the search if analytics logging fails
      console.warn('Failed to log search analytics:', analyticsErr.message);
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        message: "No listings found matching the search criteria",
        suggestions: await getSearchSuggestions(query)
      });
    }

    res.status(200).json({
      message: "Listings filtered by search query fetched successfully",
      listings: result.rows,
      pagination: {
        current_page: parseInt(page),
        total_pages: totalPages,
        total_results: totalResults,
        per_page: parseInt(limit),
        has_next: parseInt(page) < totalPages,
        has_prev: parseInt(page) > 1
      },
      filters_applied: {
        query,
        category: category || 'all',
        min_price: min_price || null,
        max_price: max_price || null,
        location: location || 'all',
        sort_by
      }
    });
  } catch (err) {
    console.error("Error fetching listings by search query:", err.message);
    res.status(500).json({
      error: "Failed to fetch listings by search query",
      details: err.message,
    });
  }
});

// 🔍 Search Suggestions/Autocomplete
router.get("/suggestions", async (req, res) => {
  try {
    const { query, limit = 10 } = req.query;

    if (!query || query.length < 2) {
      return res.status(400).json({ error: "Query must be at least 2 characters long" });
    }

    const suggestions = await getSearchSuggestions(query, limit);
    
    res.status(200).json({
      message: "Search suggestions fetched successfully",
      suggestions
    });
  } catch (err) {
    console.error("Error fetching search suggestions:", err.message);
    res.status(500).json({
      error: "Failed to fetch search suggestions",
      details: err.message,
    });
  }
});

// 📊 Popular Searches
router.get("/popular", async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const result = await pool.query(`
      SELECT 
        search_query,
        COUNT(*) as search_count,
        AVG(result_count) as avg_results
      FROM search_analytics 
      WHERE search_timestamp >= NOW() - INTERVAL '30 days'
        AND search_query IS NOT NULL 
        AND search_query != ''
      GROUP BY search_query
      ORDER BY search_count DESC, avg_results DESC
      LIMIT $1
    `, [parseInt(limit)]);

    res.status(200).json({
      message: "Popular searches fetched successfully",
      popular_searches: result.rows
    });
  } catch (err) {
    console.error("Error fetching popular searches:", err.message);
    res.status(500).json({
      error: "Failed to fetch popular searches",
      details: err.message,
    });
  }
});

// Helper function to get search suggestions
async function getSearchSuggestions(query, limit = 10) {
  try {
    // Get suggestions from listing titles and categories
    const titleSuggestions = await pool.query(`
      SELECT DISTINCT title as suggestion, 'title' as type, COUNT(*) as frequency
      FROM listings 
      WHERE title ILIKE $1 AND is_available = true
      GROUP BY title
      ORDER BY frequency DESC, title
      LIMIT $2
    `, [`%${query}%`, Math.ceil(limit / 2)]);

    const categorySuggestions = await pool.query(`
      SELECT DISTINCT category as suggestion, 'category' as type, COUNT(*) as frequency
      FROM listings 
      WHERE category ILIKE $1 AND is_available = true
      GROUP BY category
      ORDER BY frequency DESC, category
      LIMIT $2
    `, [`%${query}%`, Math.floor(limit / 2)]);

    return [
      ...titleSuggestions.rows,
      ...categorySuggestions.rows
    ].slice(0, limit);
  } catch (err) {
    console.warn('Failed to get search suggestions:', err.message);
    return [];
  }
}

module.exports = router;
