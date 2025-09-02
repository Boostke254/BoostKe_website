//http://localhost:5000/api/listings/filter?category=Electronics
//http://localhost:5000/api/listings/filter?price_min=100&price_max=1000
//http://localhost:5000/api/listings/filter?is_available=true
//http://localhost:5000/api/listings/filter?search=modern
//http://localhost:5000/api/listings/filter?category=Electronics&price_min=100&is_available=true&search=smart
const express = require("express");
const pool = require("../../db");

const router = express.Router();

// 📧 GET: Filter Listings by Email
router.get("/listings/filter-by-email", async (req, res) => {
  try {
    const { email } = req.query;

    // Check if email is provided
    if (!email) {
      return res.status(400).json({ error: "Email is required for filtering" });
    }

    // Query to join and filter listings by user or retailer email
    const query = `
      SELECT l.*
      FROM listings l
      LEFT JOIN users u ON l.user_id = u.user_id
      LEFT JOIN retailers r ON l.retailer_id = r.retailer_id
      WHERE (u.email = $1 OR r.email = $1)
      ORDER BY l.created_at DESC
    `;

    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No listings found for this email" });
    }

    res.status(200).json({
      message: "Listings filtered by email fetched successfully",
      listings: result.rows,
    });
  } catch (err) {
    console.error("Error fetching listings by email:", err.message);
    res.status(500).json({
      error: "Failed to fetch listings by email",
      details: err.message,
    });
  }
});

// 🏷️ GET: Filter Listings by Category
router.get("/listings/filter-by-category", async (req, res) => {
  try {
    const { category } = req.query;

    // Check if category is provided
    if (!category) {
      return res.status(400).json({ error: "Category is required for filtering" });
    }

    // Query to filter listings by category
    const query = `
      SELECT *
      FROM listings
      WHERE category ILIKE $1
      ORDER BY created_at DESC
    `;

    const result = await pool.query(query, [`%${category}%`]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No listings found for this category" });
    }

    res.status(200).json({
      message: "Listings filtered by category fetched successfully",
      listings: result.rows,
    });
  } catch (err) {
    console.error("Error fetching listings by category:", err.message);
    res.status(500).json({
      error: "Failed to fetch listings by category",
      details: err.message,
    });
  }
});

// 📩 GET: Filter listings by Listing ID
router.get("/filter-by-listing-id", async (req, res) => {
  try {
    const { listing_id } = req.query;

    // Validate if listing_id is provided
    if (!listing_id) {
      return res.status(400).json({ error: "Listing ID is required for filtering messages" });
    }

    const query = `
      SELECT * FROM listings
      WHERE listing_id = $1
    `;

    const result = await pool.query(query, [listing_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No listing found" });
    }

    res.status(200).json({
      message: "Listing fetched successfully",
      listing: result.rows[0],
    });
  } catch (err) {
    console.error("Error fetching by listing ID:", err.message);
    res.status(500).json({
      error: "Failed to fetch listings by listing ID",
      details: err.message,
    });
  }
});

// 📚 GET: Filter Listings
router.get("/listings", async (req, res) => {
  try {
    const {
      category,
      price_min,
      price_max,
      is_available = true,
      search,
      location,
    } = req.query;

    let query = `SELECT * FROM listings WHERE 1=1`; // Base query
    const queryParams = [];
    let paramIndex = 1;

    // 🏷️ Filter by Category
    if (category) {
      query += ` AND category ILIKE $${paramIndex}`;
      queryParams.push(`%${category}%`);
      paramIndex++;
    }

    // 💵 Filter by Price Range
    if (price_min) {
      query += ` AND price >= $${paramIndex}`;
      queryParams.push(price_min);
      paramIndex++;
    }

    if (price_max) {
      query += ` AND price <= $${paramIndex}`;
      queryParams.push(price_max);
      paramIndex++;
    }

    // 📍 Filter by Location
    if (location) {
      query += ` AND location ILIKE $${paramIndex}`;
      queryParams.push(`%${location}%`);
      paramIndex++;
    }

    // ✅ Filter by Availability
    if (is_available !== undefined) {
      query += ` AND is_available = $${paramIndex}`;
      queryParams.push(is_available === "true" ? true : false);
      paramIndex++;
    }

    // 🔍 Free-text Search (title or description)
    if (search) {
      query += ` AND (title ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
      queryParams.push(`%${search}%`);
      paramIndex++;
    }

    // 📅 Sort results by newest
    query += ` ORDER BY created_at DESC`;

    const result = await pool.query(query, queryParams);

    res.status(200).json({
      message: "Filtered listings fetched successfully",
      listings: result.rows,
    });
  } catch (err) {
    console.error("Error fetching filtered listings:", err.message);
    res.status(500).json({
      error: "Failed to fetch filtered listings",
      details: err.message,
    });
  }
});

module.exports = router;
