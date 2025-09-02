//GET /api/filter/properties
//GET /api/filter/properties?county=Nairobi&price_min=1000&price_max=5000&property_type=Apartment&rooms=3&is_available=true&search=modern

const express = require("express");
const pool = require("../../db");

const router = express.Router();

// 📚 GET: Fetch Properties with Filters
router.get("/properties", async (req, res) => {
  try {
    const {
      county,
      price_min,
      price_max,
      property_type,
      rooms,
      is_available = true,
      search,
    } = req.query;

    let query = `SELECT * FROM properties WHERE 1=1`; // Base query
    const queryParams = [];
    let paramIndex = 1;

    // 🏙️ Filter by county
    if (county) {
      query += ` AND county ILIKE $${paramIndex}`;
      queryParams.push(`%${county}%`);
      paramIndex++;
    }

    // 💵 Filter by price range
    if (price_min) {
      query += ` AND price >= $${paramIndex}`;
      queryParams.push(parseFloat(price_min));
      paramIndex++;
    }

    if (price_max) {
      query += ` AND price <= $${paramIndex}`;
      queryParams.push(parseFloat(price_max));
      paramIndex++;
    }

    // 🏠 Filter by property type
    if (property_type) {
      query += ` AND property_type ILIKE $${paramIndex}`;
      queryParams.push(`%${property_type}%`);
      paramIndex++;
    }

    // 🛏️ Filter by number of rooms
    if (rooms) {
      query += ` AND rooms = $${paramIndex}`;
      queryParams.push(parseInt(rooms, 10));
      paramIndex++;
    }

    // ✅ Filter by availability
    if (is_available !== undefined) {
      query += ` AND is_available = $${paramIndex}`;
      queryParams.push(is_available === "true" || is_available === true);
      paramIndex++;
    } else {
      // Default to true if not specified
      query += ` AND is_available = $${paramIndex}`;
      queryParams.push(true);
      paramIndex++;
    }

    // 🔍 Free-text search (title or description)
    if (search) {
      query += ` AND (title ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
      queryParams.push(`%${search}%`);
      paramIndex++;
    }

    // 📅 Sort results by newest
    query += ` ORDER BY created_at DESC`;

    // console.log("Generated Query:", query);
    // console.log("Query Params:", queryParams);

    const result = await pool.query(query, queryParams);

    res.status(200).json({
      message: "Properties fetched successfully",
      properties: result.rows,
    });
  } catch (err) {
    console.error("Error fetching properties:", err.message);
    res.status(500).json({
      error: "Failed to fetch properties",
      details: err.message,
    });
  }
});

module.exports = router;
