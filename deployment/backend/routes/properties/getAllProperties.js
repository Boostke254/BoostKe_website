const express = require("express");
const pool = require("../../db");

const router = express.Router();

// 📚 GET: Fetch All Properties
router.get("/all", async (req, res) => {
  try {
    // Fetch all properties
    const result = await pool.query(
      `SELECT * FROM properties WHERE is_available = TRUE ORDER BY created_at DESC`
    );

    res.status(200).json({
      message: "All available properties fetched successfully",
      properties: result.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: "Failed to fetch properties",
      details: err.message,
    });
  }
});

// 📚 GET: Fetch All Properties with Pagination
//GET /api/properties/paged/all?page=1&limit=10
router.get("paged/all", async (req, res) => {
  try {
    // 📝 Extract pagination parameters from query
    const { page = 1, limit = 10 } = req.query; // Default: page 1, 10 items per page

    // 🧠 Validate and calculate offset
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (
      isNaN(pageNumber) ||
      isNaN(limitNumber) ||
      pageNumber < 1 ||
      limitNumber < 1
    ) {
      return res.status(400).json({
        error:
          "Invalid pagination parameters. Page and limit must be positive numbers.",
      });
    }

    const offset = (pageNumber - 1) * limitNumber;

    // 📊 Fetch properties with pagination
    const result = await pool.query(
      `SELECT * FROM properties 
       WHERE is_available = TRUE 
       ORDER BY created_at DESC 
       LIMIT $1 OFFSET $2`,
      [limitNumber, offset]
    );

    // 📊 Fetch total count of available properties
    const totalResult = await pool.query(
      `SELECT COUNT(*) FROM properties WHERE is_available = TRUE`
    );

    const totalProperties = parseInt(totalResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalProperties / limitNumber);

    res.status(200).json({
      message: "Available properties fetched successfully",
      currentPage: pageNumber,
      totalPages,
      totalProperties,
      properties: result.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: "Failed to fetch properties",
      details: err.message,
    });
  }
});

module.exports = router;
