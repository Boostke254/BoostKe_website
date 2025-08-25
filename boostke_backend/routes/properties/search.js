const express = require("express");
const pool = require("../../db");

const router = express.Router();

// 🏘️ Search Properties
router.get("/search", async (req, res) => {
  try {
    // Extract query parameters
    const {
      title,
      property_type,
      min_price,
      max_price,
      min_rooms,
      max_rooms,
      min_bathrooms,
      max_bathrooms,
      address,
      is_available,
      amenities,
    } = req.query;

    // Start building the query dynamically
    let query = "SELECT * FROM properties WHERE 1=1";
    const values = [];
    let index = 1;

    if (title) {
      query += ` AND title ILIKE $${index}`;
      values.push(`%${title}%`);
      index++;
    }

    if (property_type) {
      query += ` AND property_type = $${index}`;
      values.push(property_type);
      index++;
    }

    if (min_price) {
      query += ` AND price >= $${index}`;
      values.push(min_price);
      index++;
    }

    if (max_price) {
      query += ` AND price <= $${index}`;
      values.push(max_price);
      index++;
    }

    if (min_rooms) {
      query += ` AND rooms >= $${index}`;
      values.push(min_rooms);
      index++;
    }

    if (max_rooms) {
      query += ` AND rooms <= $${index}`;
      values.push(max_rooms);
      index++;
    }

    if (min_bathrooms) {
      query += ` AND bathrooms >= $${index}`;
      values.push(min_bathrooms);
      index++;
    }

    if (max_bathrooms) {
      query += ` AND bathrooms <= $${index}`;
      values.push(max_bathrooms);
      index++;
    }

    if (address) {
      query += ` AND address ILIKE $${index}`;
      values.push(`%${address}%`);
      index++;
    }

    if (is_available) {
      query += ` AND is_available = $${index}`;
      values.push(is_available === "true");
      index++;
    }

    if (amenities) {
      const amenityArray = amenities
        .split(",")
        .map((amenity) => amenity.trim());
      query += ` AND amenities @> $${index}`;
      values.push(amenityArray);
      index++;
    }

    // Execute the query
    const result = await pool.query(query, values);

    res.status(200).json({
      message: "Properties retrieved successfully",
      count: result.rows.length,
      properties: result.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: "Failed to retrieve properties",
      details: err.message,
    });
  }
});

module.exports = router;
