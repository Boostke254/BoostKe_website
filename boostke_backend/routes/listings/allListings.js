const express = require("express");
const pool = require("../../db");

const router = express.Router();

//popular
router.get("/all", async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Defaults
  const offset = (page - 1) * limit;

  try {
    const result = await pool.query(
      `
      SELECT
        listing_id,
        title,
        description,
        price,
        category,
        location,
        photos,
        view_count,
        created_at
      FROM
        listings
      WHERE
        is_available = TRUE
      ORDER BY
        view_count DESC
      LIMIT $1 OFFSET $2;
      `,
      [limit, offset]
    );

    if (result.rows.length === 0) {
      return res
        .status(200)
        .json({ message: "No listings available", listings: [] });
    }

    // Fix photos array to use /api/uploads/
    const listings = result.rows.map((listing) => {
      const photos = (listing.photos || []).map((url) =>
        url.replace("/uploads/", "/api/uploads/")
      );
      return { ...listing, photos };
    });

    res.status(200).json({
      message: "All available listings fetched successfully",
      page: Number(page),
      limit: Number(limit),
      listings,
    });
  } catch (err) {
    console.error("Error fetching listings:", err.message);
    res.status(500).json({
      error: "Failed to fetch listings",
      details: err.message,
    });
  }
});

//latest
router.get("/latest", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const result = await pool.query(
      `SELECT
        l.*,
        r.full_name AS retailer_name,
        s.shop_name
      FROM
        listings l
      JOIN
        retailers r ON l.retailer_id = r.retailer_id
      LEFT JOIN
        shops s ON l.retailer_id = s.retailer_id -- Use LEFT JOIN in case a retailer doesn't have a shop entry
      WHERE
        l.is_available = TRUE
      ORDER BY
        l.created_at DESC
      LIMIT $1 OFFSET $2;`,
      [limit, offset]
    );

    if (result.rows.length === 0) {
      return res
        .status(200)
        .json({ message: "No listings available", listings: [] });
    }

    res.status(200).json({
      message: "Listings sorted by latest",
      listings: result.rows,
    });
  } catch (err) {
    console.error("Error fetching latest listings:", err.message);
    res
      .status(500)
      .json({ error: "Failed to fetch listings", details: err.message });
  }
});

//oldest
router.get("/oldest", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const result = await pool.query(
      `
      SELECT
        l.*,
        r.full_name AS retailer_name,
        s.shop_name
      FROM
        listings l
      JOIN
        retailers  r ON l.retailer_id = r.retailer_id
      LEFT JOIN
        shops s ON l.retailer_id = s.retailer_id -- Use LEFT JOIN in case a retailer doesn't have a shop entry
      WHERE
        l.is_available = TRUE
      ORDER BY
        l.created_at ASC
      LIMIT $1 OFFSET $2;`,
      [limit, offset]
    );

    if (result.rows.length === 0) {
      return res
        .status(200)
        .json({ message: "No listings available", listings: [] });
    }

    res.status(200).json({
      message: "Listings sorted by oldest",
      listings: result.rows,
    });
  } catch (err) {
    console.error("Error fetching oldest listings:", err.message);
    res
      .status(500)
      .json({ error: "Failed to fetch listings", details: err.message });
  }
});

module.exports = router;
