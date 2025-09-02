const express = require("express");
const pool = require("../../db");

const router = express.Router();

// 🔍 Universal Search - Search across listings, properties, and shops
router.get("/universal", async (req, res) => {
  try {
    const { 
      query, 
      type = 'all', // 'all', 'listings', 'properties', 'shops'
      page = 1, 
      limit = 20 
    } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const searchPattern = `%${query}%`;
    const results = {};

    // Search Listings
    if (type === 'all' || type === 'listings') {
      const listingsQuery = `
        SELECT 
          'listing' as result_type,
          listing_id as id,
          title,
          description,
          price,
          category,
          location,
          photos,
          created_at,
          view_count,
          r.full_name as owner_name,
          'retailer' as owner_type
        FROM listings l
        LEFT JOIN retailers r ON l.retailer_id = r.retailer_id
        LEFT JOIN users u ON l.user_id = u.user_id
        WHERE (l.title ILIKE $1 OR l.description ILIKE $1 OR l.category ILIKE $1)
          AND l.is_available = true
        ORDER BY l.view_count DESC, l.created_at DESC
        LIMIT $2
      `;
      
      const listingsResult = await pool.query(listingsQuery, [searchPattern, Math.ceil(limit / 3)]);
      results.listings = listingsResult.rows;
    }

    // Search Properties
    if (type === 'all' || type === 'properties') {
      const propertiesQuery = `
        SELECT 
          'property' as result_type,
          property_id as id,
          title,
          description,
          price,
          property_type as category,
          address as location,
          photos,
          created_at,
          rooms,
          bathrooms,
          county,
          l.full_name as owner_name,
          'landlord' as owner_type
        FROM properties p
        LEFT JOIN landlords l ON p.landlord_id = l.landlord_id
        WHERE (p.title ILIKE $1 OR p.description ILIKE $1 OR p.property_type ILIKE $1 OR p.county ILIKE $1)
          AND p.is_available = true
        ORDER BY p.created_at DESC
        LIMIT $2
      `;
      
      const propertiesResult = await pool.query(propertiesQuery, [searchPattern, Math.ceil(limit / 3)]);
      results.properties = propertiesResult.rows;
    }

    // Search Shops
    if (type === 'all' || type === 'shops') {
      const shopsQuery = `
        SELECT 
          'shop' as result_type,
          shop_id as id,
          shop_name as title,
          shop_description as description,
          NULL as price,
          'shop' as category,
          NULL as location,
          ARRAY[shop_logo] as photos,
          s.created_at,
          views_count,
          r.full_name as owner_name,
          'retailer' as owner_type
        FROM shops s
        LEFT JOIN retailers r ON s.retailer_id = r.retailer_id
        WHERE (s.shop_name ILIKE $1 OR s.shop_description ILIKE $1 OR r.full_name ILIKE $1)
        ORDER BY s.views_count DESC, s.created_at DESC
        LIMIT $2
      `;
      
      const shopsResult = await pool.query(shopsQuery, [searchPattern, Math.floor(limit / 3)]);
      results.shops = shopsResult.rows;
    }

    // Combine and sort all results by relevance
    let allResults = [];
    if (results.listings) allResults = allResults.concat(results.listings);
    if (results.properties) allResults = allResults.concat(results.properties);
    if (results.shops) allResults = allResults.concat(results.shops);

    // Calculate total results
    const totalResults = allResults.length;
    const totalPages = Math.ceil(totalResults / parseInt(limit));

    // Apply pagination to combined results
    const paginatedResults = allResults.slice(offset, offset + parseInt(limit));

    res.status(200).json({
      message: "Universal search completed successfully",
      results: paginatedResults,
      summary: {
        total_results: totalResults,
        listings_found: results.listings ? results.listings.length : 0,
        properties_found: results.properties ? results.properties.length : 0,
        shops_found: results.shops ? results.shops.length : 0
      },
      pagination: {
        current_page: parseInt(page),
        total_pages: totalPages,
        total_results: totalResults,
        per_page: parseInt(limit),
        has_next: parseInt(page) < totalPages,
        has_prev: parseInt(page) > 1
      }
    });

  } catch (err) {
    console.error("Error in universal search:", err.message);
    res.status(500).json({
      error: "Failed to perform universal search",
      details: err.message,
    });
  }
});

// 🔍 Get Search Suggestions based on popular searches
router.get("/suggestions/popular", async (req, res) => {
  try {
    const { limit = 10, category } = req.query;

    let query = `
      SELECT suggestion_text, category, search_count, is_trending
      FROM search_suggestions
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    if (category) {
      query += ` AND category = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    query += ` ORDER BY is_trending DESC, search_count DESC, last_searched DESC LIMIT $${paramIndex}`;
    params.push(parseInt(limit));

    const result = await pool.query(query, params);

    res.status(200).json({
      message: "Popular search suggestions fetched successfully",
      suggestions: result.rows
    });
  } catch (err) {
    console.error("Error fetching popular search suggestions:", err.message);
    res.status(500).json({
      error: "Failed to fetch popular search suggestions",
      details: err.message,
    });
  }
});

// 💾 Save Search for authenticated users
router.post("/save", async (req, res) => {
  try {
    const {
      user_id,
      search_name,
      search_query,
      category,
      location,
      min_price,
      max_price,
      filters,
      is_alert_enabled = false,
      alert_frequency = 'daily'
    } = req.body;

    if (!user_id || !search_name || !search_query) {
      return res.status(400).json({ 
        error: "User ID, search name, and search query are required" 
      });
    }

    const result = await pool.query(`
      INSERT INTO saved_searches 
      (user_id, search_name, search_query, category, location, min_price, max_price, filters, is_alert_enabled, alert_frequency)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `, [
      user_id, 
      search_name, 
      search_query, 
      category, 
      location, 
      min_price, 
      max_price, 
      JSON.stringify(filters || {}), 
      is_alert_enabled, 
      alert_frequency
    ]);

    res.status(201).json({
      message: "Search saved successfully",
      saved_search: result.rows[0]
    });
  } catch (err) {
    console.error("Error saving search:", err.message);
    res.status(500).json({
      error: "Failed to save search",
      details: err.message,
    });
  }
});

// 📋 Get Saved Searches for a user
router.get("/saved/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const result = await pool.query(`
      SELECT * FROM saved_searches 
      WHERE user_id = $1 
      ORDER BY created_at DESC 
      LIMIT $2 OFFSET $3
    `, [user_id, parseInt(limit), offset]);

    const countResult = await pool.query(`
      SELECT COUNT(*) as total FROM saved_searches WHERE user_id = $1
    `, [user_id]);

    const totalResults = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(totalResults / parseInt(limit));

    res.status(200).json({
      message: "Saved searches fetched successfully",
      saved_searches: result.rows,
      pagination: {
        current_page: parseInt(page),
        total_pages: totalPages,
        total_results: totalResults,
        per_page: parseInt(limit)
      }
    });
  } catch (err) {
    console.error("Error fetching saved searches:", err.message);
    res.status(500).json({
      error: "Failed to fetch saved searches",
      details: err.message,
    });
  }
});

// 🗑️ Delete Saved Search
router.delete("/saved/:search_id", async (req, res) => {
  try {
    const { search_id } = req.params;

    const result = await pool.query(`
      DELETE FROM saved_searches WHERE id = $1 RETURNING *
    `, [search_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Saved search not found" });
    }

    res.status(200).json({
      message: "Saved search deleted successfully",
      deleted_search: result.rows[0]
    });
  } catch (err) {
    console.error("Error deleting saved search:", err.message);
    res.status(500).json({
      error: "Failed to delete saved search",
      details: err.message,
    });
  }
});

// 📊 Search Analytics - Get search trends
router.get("/analytics/trends", async (req, res) => {
  try {
    const { days = 30, limit = 20 } = req.query;

    const result = await pool.query(`
      SELECT 
        search_query,
        COUNT(*) as search_count,
        AVG(result_count) as avg_results,
        MAX(search_timestamp) as last_searched
      FROM search_analytics 
      WHERE search_timestamp >= NOW() - INTERVAL '${parseInt(days)} days'
        AND search_query IS NOT NULL 
        AND search_query != ''
      GROUP BY search_query
      ORDER BY search_count DESC, avg_results DESC
      LIMIT $1
    `, [parseInt(limit)]);

    res.status(200).json({
      message: "Search trends fetched successfully",
      trends: result.rows,
      period_days: parseInt(days)
    });
  } catch (err) {
    console.error("Error fetching search trends:", err.message);
    res.status(500).json({
      error: "Failed to fetch search trends",
      details: err.message,
    });
  }
});

module.exports = router;
