const express = require("express");
const pool = require("../../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const multer = require("multer");
const path = require("path");

const router = express.Router();

// 📂 Serve Static Files (to access uploaded images)
router.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// 📸 Multer Configuration for Photos Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max file size
}).array("photos", 5); // Allow up to 5 photos per listing

// 🛍️ Update an Existing Listing for a Shop
router.put("/listings/update/:listing_id", upload, async (req, res) => {
  const { listing_id } = req.params;
  const { title, description, price, category, location, is_available } =
    req.body;
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  try {
    // 🔒 Validate Token
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const retailer_id = decoded.userId;

    // 🔍 Check if retailer exists
    const retailerCheck = await pool.query(
      "SELECT * FROM retailers WHERE retailer_id = $1",
      [retailer_id]
    );

    if (retailerCheck.rows.length === 0) {
      return res.status(404).json({ error: "Retailer not found" });
    }

    // 🏬 Check if retailer owns a shop
    const shopCheck = await pool.query(
      "SELECT * FROM shops WHERE retailer_id = $1",
      [retailer_id]
    );

    if (shopCheck.rows.length === 0) {
      return res
        .status(400)
        .json({ error: "Retailer does not own a shop. Create a shop first." });
    }

    // 🔍 Check if listing exists and belongs to the retailer
    const listingCheck = await pool.query(
      "SELECT * FROM listings WHERE listing_id = $1 AND retailer_id = $2",
      [listing_id, retailer_id]
    );

    if (listingCheck.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Listing not found or not owned by retailer" });
    }

    // 🚶‍♂️ Process uploaded photos (if new photos are uploaded)
    const photos = req.files
      ? req.files.map(
          (file) =>
            `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
        )
      : undefined;

    // ✅ Update the listing in the database
    const updatedListing = await pool.query(
      `UPDATE listings
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           price = COALESCE($3, price),
           category = COALESCE($4, category),
           photos = COALESCE($5, photos),
           location = COALESCE($6, location),
           is_available = COALESCE($7, is_available)
       WHERE listing_id = $8 AND retailer_id = $9
       RETURNING *`,
      [
        title,
        description,
        price,
        category,
        photos,
        location,
        is_available,
        listing_id,
        retailer_id,
      ]
    );

    if (updatedListing.rows.length === 0) {
      return res.status(400).json({ error: "Failed to update the listing" });
    }

    res.status(200).json({
      message: "Listing updated successfully",
      listing: updatedListing.rows[0],
    });
  } catch (err) {
    console.error(err.message);

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }

    res
      .status(500)
      .json({ error: "Failed to update listing", details: err.message });
  }
});

module.exports = router;
