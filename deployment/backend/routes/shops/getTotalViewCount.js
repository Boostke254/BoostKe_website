const express = require("express");
const pool = require("../../db");

const router = express.Router();

router.get("/shop-view-count/:shopId", async (req, res) => {
  const { shopId } = req.params;

  try {
    // Query to get total views for the shop by summing the view counts of all the products in the shop
    const result = await pool.query(
      `
        SELECT SUM(l.view_count) AS total_views
        FROM listings l
        JOIN product_views pv ON l.listing_id = pv.listing_id
        WHERE l.retailer_id = $1
        `,
      [shopId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No views found for this shop" });
    }

    res.status(200).json({ total_views: result.rows[0].total_views });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch shop view count" });
  }
});
