const express = require("express");
const pool = require("../../db");

const router = express.Router();

// Fetch All Shops with Logo, Details, Total Views, and Total Listings
router.get("/all", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const offset = (parseInt(page) - 1) * parseInt(limit);

  try {
    // Get total number of shops (unfiltered count for pagination)
    const countResult = await pool.query("SELECT COUNT(*) FROM shops");
    const totalItems = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalItems / limit);

    // Get paginated shop data, including retailer name, total views, and total listings
    const result = await pool.query(
      `SELECT
        s.shop_id,
        s.shop_name,
        s.shop_description,
        s.shop_logo,
        s.created_at,
        r.full_name AS retailer_name,
        r.retailer_id,
        COALESCE(SUM(l.view_count), 0) AS total_shop_views, -- Calculate total views from listings
        COUNT(l.listing_id) AS total_listings_posted -- Count total listings for this retailer/shop
      FROM
        shops s
      JOIN
        retailers r ON s.retailer_id = r.retailer_id
      LEFT JOIN
        listings l ON s.retailer_id = l.retailer_id -- Join with listings to sum view_count and count listings
      GROUP BY
        s.shop_id, s.shop_name, s.shop_description, s.shop_logo, s.created_at, r.full_name, r.retailer_id
      ORDER BY
        s.created_at DESC
      LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    res.status(200).json({
      message: "Shops fetched successfully",
      shops: result.rows,
      totalPages,
      currentPage: parseInt(page),
      totalItems,
    });
  } catch (err) {
    console.error("Error fetching shops:", err.message);
    res.status(500).json({
      error: "Failed to fetch shops",
      details: err.message,
    });
  }
});

module.exports = router;
