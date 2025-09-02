const express = require("express");
const pool = require("../../db");

const router = express.Router();

// 🏠 Fetch Total and Available Properties Count
router.get("/count", async (req, res) => {
  try {
    // Query to count total properties
    const totalPropertiesResult = await pool.query(
      "SELECT COUNT(*) AS total_properties FROM properties"
    );

    // Query to count available properties
    const availablePropertiesResult = await pool.query(
      "SELECT COUNT(*) AS available_properties FROM properties WHERE is_available = TRUE"
    );

    // Extract counts
    const totalProperties = parseInt(
      totalPropertiesResult.rows[0].total_properties,
      10
    );
    const availableProperties = parseInt(
      availablePropertiesResult.rows[0].available_properties,
      10
    );

    res.status(200).json({
      message: "Properties counts fetched successfully",
      total_properties: totalProperties,
      available_properties: availableProperties,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: "Failed to fetch properties counts",
      details: err.message,
    });
  }
});

module.exports = router;
