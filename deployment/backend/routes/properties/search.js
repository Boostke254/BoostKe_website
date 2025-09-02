const express = require("express");
const pool = require("../../db");

const router = express.Router();

// 🏘️ Enhanced Search Properties with Advanced Filtering
router.get("/search", async (req, res) => {
  try {
    // Extract query parameters
    const {
      query,
      title,
      property_type,
      min_price,
      max_price,
      min_rooms,
      max_rooms,
      min_bathrooms,
      max_bathrooms,
      address,
      county,
      is_available = true,
      amenities,
      price_basis,
      sort_by = 'relevance',
      page = 1,
      limit = 20
    } = req.query;

    // Calculate pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);

    // Start building the query dynamically
    let baseQuery = `
      SELECT 
        p.*,
        l.full_name as landlord_name,
        l.email as landlord_email,
        l.mobile as landlord_mobile,
        -- Calculate relevance score for search
        (
          CASE 
            WHEN p.title ILIKE $1 THEN 10
            WHEN p.title ILIKE $2 THEN 8
            WHEN p.description ILIKE $1 THEN 6
            WHEN p.description ILIKE $2 THEN 4
            WHEN p.property_type ILIKE $2 THEN 3
            WHEN p.county ILIKE $2 THEN 2
            ELSE 1
          END +
          CASE WHEN p.is_available = true THEN 2 ELSE 0 END
        ) as relevance_score
      FROM properties p
      LEFT JOIN landlords l ON p.landlord_id = l.landlord_id
      WHERE p.is_available = $3
    `;

    const values = [];
    let paramIndex = 4;

    // Initialize search parameters
    if (query) {
      const searchExact = `%${query}%`;
      const searchTerms = query.split(' ').map(term => `%${term}%`).join('|');
      values.push(searchExact, searchTerms, is_available === "true");
      
      baseQuery += ` AND (p.title ILIKE $1 OR p.title ILIKE $2 OR p.description ILIKE $1 OR p.description ILIKE $2 OR p.property_type ILIKE $2 OR p.county ILIKE $2)`;
    } else {
      values.push(null, null, is_available === "true");
    }

    // Additional filters
    if (title) {
      baseQuery += ` AND p.title ILIKE $${paramIndex}`;
      values.push(`%${title}%`);
      paramIndex++;
    }

    if (property_type) {
      baseQuery += ` AND p.property_type = $${paramIndex}`;
      values.push(property_type);
      paramIndex++;
    }

    if (min_price) {
      baseQuery += ` AND p.price >= $${paramIndex}`;
      values.push(min_price);
      paramIndex++;
    }

    if (max_price) {
      baseQuery += ` AND p.price <= $${paramIndex}`;
      values.push(max_price);
      paramIndex++;
    }

    if (min_rooms) {
      baseQuery += ` AND p.rooms >= $${paramIndex}`;
      values.push(min_rooms);
      paramIndex++;
    }

    if (max_rooms) {
      baseQuery += ` AND p.rooms <= $${paramIndex}`;
      values.push(max_rooms);
      paramIndex++;
    }

    if (min_bathrooms) {
      baseQuery += ` AND p.bathrooms >= $${paramIndex}`;
      values.push(min_bathrooms);
      paramIndex++;
    }

    if (max_bathrooms) {
      baseQuery += ` AND p.bathrooms <= $${paramIndex}`;
      values.push(max_bathrooms);
      paramIndex++;
    }

    if (address) {
      baseQuery += ` AND p.address ILIKE $${paramIndex}`;
      values.push(`%${address}%`);
      paramIndex++;
    }

    if (county) {
      baseQuery += ` AND p.county ILIKE $${paramIndex}`;
      values.push(`%${county}%`);
      paramIndex++;
    }

    if (price_basis) {
      baseQuery += ` AND p.price_basis = $${paramIndex}`;
      values.push(price_basis);
      paramIndex++;
    }

    if (amenities) {
      const amenityArray = amenities
        .split(",")
        .map((amenity) => amenity.trim());
      baseQuery += ` AND p.amenities @> $${paramIndex}`;
      values.push(amenityArray);
      paramIndex++;
    }

    // Add sorting
    let orderClause = '';
    switch (sort_by) {
      case 'price_low':
        orderClause = 'ORDER BY p.price ASC';
        break;
      case 'price_high':
        orderClause = 'ORDER BY p.price DESC';
        break;
      case 'newest':
        orderClause = 'ORDER BY p.created_at DESC';
        break;
      case 'rooms_high':
        orderClause = 'ORDER BY p.rooms DESC';
        break;
      case 'relevance':
      default:
        if (query) {
          orderClause = 'ORDER BY relevance_score DESC, p.created_at DESC';
        } else {
          orderClause = 'ORDER BY p.created_at DESC';
        }
        break;
    }

    baseQuery += ` ${orderClause} LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    values.push(parseInt(limit), offset);

    // Execute the search query
    const result = await pool.query(baseQuery, values);

    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) as total
      FROM properties p
      WHERE p.is_available = $1
    `;
    
    let countValues = [is_available === "true"];
    let countParamIndex = 2;

    if (query) {
      const searchExact = `%${query}%`;
      const searchTerms = query.split(' ').map(term => `%${term}%`).join('|');
      countQuery += ` AND (p.title ILIKE $${countParamIndex} OR p.title ILIKE $${countParamIndex + 1} OR p.description ILIKE $${countParamIndex} OR p.description ILIKE $${countParamIndex + 1} OR p.property_type ILIKE $${countParamIndex + 1} OR p.county ILIKE $${countParamIndex + 1})`;
      countValues.push(searchExact, searchTerms);
      countParamIndex += 2;
    }

    // Apply the same filters to count query
    if (title) {
      countQuery += ` AND p.title ILIKE $${countParamIndex}`;
      countValues.push(`%${title}%`);
      countParamIndex++;
    }

    if (property_type) {
      countQuery += ` AND p.property_type = $${countParamIndex}`;
      countValues.push(property_type);
      countParamIndex++;
    }

    if (min_price) {
      countQuery += ` AND p.price >= $${countParamIndex}`;
      countValues.push(min_price);
      countParamIndex++;
    }

    if (max_price) {
      countQuery += ` AND p.price <= $${countParamIndex}`;
      countValues.push(max_price);
      countParamIndex++;
    }

    if (min_rooms) {
      countQuery += ` AND p.rooms >= $${countParamIndex}`;
      countValues.push(min_rooms);
      countParamIndex++;
    }

    if (max_rooms) {
      countQuery += ` AND p.rooms <= $${countParamIndex}`;
      countValues.push(max_rooms);
      countParamIndex++;
    }

    if (min_bathrooms) {
      countQuery += ` AND p.bathrooms >= $${countParamIndex}`;
      countValues.push(min_bathrooms);
      countParamIndex++;
    }

    if (max_bathrooms) {
      countQuery += ` AND p.bathrooms <= $${countParamIndex}`;
      countValues.push(max_bathrooms);
      countParamIndex++;
    }

    if (address) {
      countQuery += ` AND p.address ILIKE $${countParamIndex}`;
      countValues.push(`%${address}%`);
      countParamIndex++;
    }

    if (county) {
      countQuery += ` AND p.county ILIKE $${countParamIndex}`;
      countValues.push(`%${county}%`);
      countParamIndex++;
    }

    if (price_basis) {
      countQuery += ` AND p.price_basis = $${countParamIndex}`;
      countValues.push(price_basis);
      countParamIndex++;
    }

    if (amenities) {
      const amenityArray = amenities
        .split(",")
        .map((amenity) => amenity.trim());
      countQuery += ` AND p.amenities @> $${countParamIndex}`;
      countValues.push(amenityArray);
      countParamIndex++;
    }

    const countResult = await pool.query(countQuery, countValues);
    const totalResults = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(totalResults / parseInt(limit));

    res.status(200).json({
      message: "Properties retrieved successfully",
      properties: result.rows,
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
        title: title || null,
        property_type: property_type || null,
        min_price: min_price || null,
        max_price: max_price || null,
        min_rooms: min_rooms || null,
        max_rooms: max_rooms || null,
        min_bathrooms: min_bathrooms || null,
        max_bathrooms: max_bathrooms || null,
        address: address || null,
        county: county || null,
        amenities: amenities || null,
        price_basis: price_basis || null,
        sort_by,
        is_available
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: "Failed to retrieve properties",
      details: err.message,
    });
  }
});

// 🔍 Property Search Suggestions/Autocomplete
router.get("/suggestions", async (req, res) => {
  try {
    const { query, limit = 10 } = req.query;

    if (!query || query.length < 2) {
      return res.status(400).json({ error: "Query must be at least 2 characters long" });
    }

    // Get suggestions from property titles, types, and counties
    const titleSuggestions = await pool.query(`
      SELECT DISTINCT title as suggestion, 'title' as type, COUNT(*) as frequency
      FROM properties 
      WHERE title ILIKE $1 AND is_available = true
      GROUP BY title
      ORDER BY frequency DESC, title
      LIMIT $2
    `, [`%${query}%`, Math.ceil(limit / 3)]);

    const typeSuggestions = await pool.query(`
      SELECT DISTINCT property_type as suggestion, 'property_type' as type, COUNT(*) as frequency
      FROM properties 
      WHERE property_type ILIKE $1 AND is_available = true
      GROUP BY property_type
      ORDER BY frequency DESC, property_type
      LIMIT $2
    `, [`%${query}%`, Math.ceil(limit / 3)]);

    const countySuggestions = await pool.query(`
      SELECT DISTINCT county as suggestion, 'county' as type, COUNT(*) as frequency
      FROM properties 
      WHERE county ILIKE $1 AND is_available = true
      GROUP BY county
      ORDER BY frequency DESC, county
      LIMIT $2
    `, [`%${query}%`, Math.floor(limit / 3)]);

    const suggestions = [
      ...titleSuggestions.rows,
      ...typeSuggestions.rows,
      ...countySuggestions.rows
    ].slice(0, limit);

    res.status(200).json({
      message: "Property search suggestions fetched successfully",
      suggestions
    });
  } catch (err) {
    console.error("Error fetching property search suggestions:", err.message);
    res.status(500).json({
      error: "Failed to fetch property search suggestions",
      details: err.message,
    });
  }
});

module.exports = router;
