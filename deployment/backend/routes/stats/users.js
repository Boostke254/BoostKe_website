const express = require("express");
const pool = require("../../db");

const router = express.Router();

// ðŸ‘¥ Fetch Total and Verified Users Count
router.get("/count", async (req, res) => {
  try {
    // Query to count total users
    const totalResult = await pool.query(
      "SELECT COUNT(*) AS total_users FROM users"
    );

    // Query to count verified users
    const verifiedResult = await pool.query(
      "SELECT COUNT(*) AS verified_users FROM users WHERE is_verified = TRUE"
    );

    // Extract counts
    const totalUsers = parseInt(totalResult.rows[0].total_users, 10);
    const verifiedUsers = parseInt(verifiedResult.rows[0].verified_users, 10);

    res.status(200).json({
      message: "User counts fetched successfully",
      total_users: totalUsers,
      verified_users: verifiedUsers,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: "Failed to fetch user counts",
      details: err.message,
    });
  }
});

//stats
router.get("/stats", async (req, res) => {
  try {
    const usersRes = await pool.query("SELECT COUNT(*) AS total FROM users");

    const retailersTotalRes = await pool.query(
      "SELECT COUNT(*) AS total FROM retailers"
    );

    const retailersVerifiedRes = await pool.query(
      "SELECT COUNT(*) AS verified FROM retailers WHERE approved = TRUE"
    );

    const retailersPendingRes = await pool.query(
      "SELECT COUNT(*) AS pending FROM retailers WHERE approved = FALSE"
    );

    const productCategoriesRes = await pool.query(
      "SELECT COUNT(DISTINCT category) AS total FROM listings"
    );

    const productCategories = parseInt(productCategoriesRes.rows[0].total, 10);

    const shopsRes = await pool.query("SELECT COUNT(*) AS total FROM shops");
    const listingsRes = await pool.query(
      "SELECT COUNT(*) AS total FROM listings"
    );

    // ...add more as needed

    res.json({
      users: parseInt(usersRes.rows[0].total, 10),
      retailers: {
        total: parseInt(retailersTotalRes.rows[0].total, 10),
        verified: parseInt(retailersVerifiedRes.rows[0].verified, 10),
        pending: parseInt(retailersPendingRes.rows[0].pending, 10),
      },
      providers: {
        total: parseInt(0, 10),
        verified: parseInt(0, 10),
        pending: parseInt(0, 10),
      },
      services: parseInt(0, 10),
      shops: parseInt(shopsRes.rows[0].total, 10),
      products: parseInt(listingsRes.rows[0].total, 10),
      productCategories,
    });
  } catch (err) {
    console.error("Failed to fetch dashboard stats", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

module.exports = router;
