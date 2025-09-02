const express = require("express");
const pool = require("../../db");

const router = express.Router();

// 🏪 Enhanced Search Shops with Advanced Filtering
router.get("/search", async (req, res) => {
  try {
    const { 
      query, 
      shop_name,
      retailer_name,
      sort_by = 'relevance',
      page = 1, 
      limit = 20 
    } = req.query;

    // Calculate pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);

    // Build dynamic search query
    let baseQuery = `
      SELECT 
        s.*,
        r.full_name as retailer_name,
        r.email as retailer_email,
        r.mobile as retailer_mobile,
        COALESCE(SUM(l.view_count), 0) AS total_shop_views,
        COUNT(l.listing_id) AS total_listings_posted,
        -- Calculate relevance score
        (
          CASE 
            WHEN s.shop_name ILIKE $1 THEN 10
            WHEN s.shop_name ILIKE $2 THEN 8
            WHEN s.shop_description ILIKE $1 THEN 6
            WHEN s.shop_description ILIKE $2 THEN 4
            WHEN r.full_name ILIKE $2 THEN 3
            ELSE 1
          END +
          (COALESCE(SUM(l.view_count), 0) / 100.0) +
          (COUNT(l.listing_id) / 10.0)
        ) as relevance_score
      FROM shops s
      JOIN retailers r ON s.retailer_id = r.retailer_id
      LEFT JOIN listings l ON s.retailer_id = l.retailer_id
      WHERE 1=1
    `;

    let queryParams = [];
    let paramIndex = 1;

    // Initialize search parameters
    if (query) {
      const searchExact = `%${query}%`;
      const searchTerms = query.split(' ').map(term => `%${term}%`).join('|');
      baseQuery += ` AND (s.shop_name ILIKE $${paramIndex} OR s.shop_name ILIKE $${paramIndex + 1} OR s.shop_description ILIKE $${paramIndex} OR s.shop_description ILIKE $${paramIndex + 1} OR r.full_name ILIKE $${paramIndex + 1})`;
      queryParams.push(searchExact, searchTerms);
      paramIndex += 2;
    }

    // Add specific shop name filter
    if (shop_name) {
      baseQuery += ` AND s.shop_name ILIKE $${paramIndex}`;
      queryParams.push(`%${shop_name}%`);
      paramIndex++;
    }

    // Add retailer name filter
    if (retailer_name) {
      baseQuery += ` AND r.full_name ILIKE $${paramIndex}`;
      queryParams.push(`%${retailer_name}%`);
      paramIndex++;
    }

    // Group by clause for aggregations
    baseQuery += ` GROUP BY s.shop_id, s.shop_name, s.shop_description, s.shop_logo, s.created_at, r.full_name, r.retailer_id, r.email, r.mobile`;

    // Add sorting
    let orderClause = '';
    switch (sort_by) {
      case 'name_asc':
        orderClause = 'ORDER BY s.shop_name ASC';
        break;
      case 'name_desc':
        orderClause = 'ORDER BY s.shop_name DESC';
        break;
      case 'newest':
        orderClause = 'ORDER BY s.created_at DESC';
        break;
      case 'most_listings':
        orderClause = 'ORDER BY total_listings_posted DESC';
        break;
      case 'most_views':
        orderClause = 'ORDER BY total_shop_views DESC';
        break;
      case 'relevance':
      default:
        if (query) {
          orderClause = 'ORDER BY relevance_score DESC, s.created_at DESC';
        } else {
          orderClause = 'ORDER BY s.created_at DESC';
        }
        break;
    }

    baseQuery += ` ${orderClause} LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    queryParams.push(parseInt(limit), offset);

    // Execute search query
    const result = await pool.query(baseQuery, queryParams);

    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(DISTINCT s.shop_id) as total
      FROM shops s
      JOIN retailers r ON s.retailer_id = r.retailer_id
      WHERE 1=1
    `;
    
    let countParams = [];
    let countParamIndex = 1;

    if (query) {
      const searchExact = `%${query}%`;
      const searchTerms = query.split(' ').map(term => `%${term}%`).join('|');
      countQuery += ` AND (s.shop_name ILIKE $${countParamIndex} OR s.shop_name ILIKE $${countParamIndex + 1} OR s.shop_description ILIKE $${countParamIndex} OR s.shop_description ILIKE $${countParamIndex + 1} OR r.full_name ILIKE $${countParamIndex + 1})`;
      countParams.push(searchExact, searchTerms);
      countParamIndex += 2;
    }

    if (shop_name) {
      countQuery += ` AND s.shop_name ILIKE $${countParamIndex}`;
      countParams.push(`%${shop_name}%`);
      countParamIndex++;
    }

    if (retailer_name) {
      countQuery += ` AND r.full_name ILIKE $${countParamIndex}`;
      countParams.push(`%${retailer_name}%`);
      countParamIndex++;
    }

    const countResult = await pool.query(countQuery, countParams);
    const totalResults = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(totalResults / parseInt(limit));

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        message: "No shops found matching the search criteria",
        suggestions: await getShopSearchSuggestions(query)
      });
    }

    res.status(200).json({
      message: "Shops search results fetched successfully",
      shops: result.rows,
      pagination: {
        current_page: parseInt(page),
        total_pages: totalPages,
        total_results: totalResults,
        per_page: parseInt(limit),
        has_next: parseInt(page) < totalPages,
        has_prev: parseInt(page) > 1
      },
      filters_applied: {
        query: query || null,
        shop_name: shop_name || null,
        retailer_name: retailer_name || null,
        sort_by
      }
    });
  } catch (err) {
    console.error("Error searching shops:", err.message);
    res.status(500).json({
      error: "Failed to search shops",
      details: err.message,
    });
  }
});

// 🔍 Shop Search Suggestions/Autocomplete
router.get("/suggestions", async (req, res) => {
  try {
    const { query, limit = 10 } = req.query;

    if (!query || query.length < 2) {
      return res.status(400).json({ error: "Query must be at least 2 characters long" });
    }

    const suggestions = await getShopSearchSuggestions(query, limit);
    
    res.status(200).json({
      message: "Shop search suggestions fetched successfully",
      suggestions
    });
  } catch (err) {
    console.error("Error fetching shop search suggestions:", err.message);
    res.status(500).json({
      error: "Failed to fetch shop search suggestions",
      details: err.message,
    });
  }
});

// Helper function to get shop search suggestions
async function getShopSearchSuggestions(query, limit = 10) {
  try {
    if (!query) return [];

    // Get suggestions from shop names and retailer names
    const shopSuggestions = await pool.query(`
      SELECT DISTINCT shop_name as suggestion, 'shop_name' as type, COUNT(*) as frequency
      FROM shops 
      WHERE shop_name ILIKE $1
      GROUP BY shop_name
      ORDER BY frequency DESC, shop_name
      LIMIT $2
    `, [`%${query}%`, Math.ceil(limit / 2)]);

    const retailerSuggestions = await pool.query(`
      SELECT DISTINCT r.full_name as suggestion, 'retailer_name' as type, COUNT(*) as frequency
      FROM shops s
      JOIN retailers r ON s.retailer_id = r.retailer_id
      WHERE r.full_name ILIKE $1
      GROUP BY r.full_name
      ORDER BY frequency DESC, r.full_name
      LIMIT $2
    `, [`%${query}%`, Math.floor(limit / 2)]);

    return [
      ...shopSuggestions.rows,
      ...retailerSuggestions.rows
    ].slice(0, limit);
  } catch (err) {
    console.warn('Failed to get shop search suggestions:', err.message);
    return [];
  }
}

module.exports = router;
