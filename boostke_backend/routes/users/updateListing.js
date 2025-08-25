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
}).array("photos", 10); // Allow up to 5 photos per listing

// 🛍️ Normal Users Attempting to Update Listings
router.put("/listings/:listing_id", upload, async (req, res) => {
  // console.log("TEST")
  const { listing_id } = req.params;
  const { title, description, price, category, location, is_available } =
    req.body;
    // console.log(req.files);
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  try {
    // 🔒 Validate Token
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;

    // 🔍 Check if the listing exists
    const listingCheck = await pool.query(
      "SELECT * FROM listings WHERE listing_id = $1",
      [listing_id]
    );

    if (listingCheck.rows.length === 0) {
      return res.status(404).json({ error: "Listing not found" });
    }

    // ✅ Check if the listing belongs to the current user
    const listing = listingCheck.rows[0];

    // Check if the listing belongs to the user or if the retailer_id matches
    if (listing.user_id !== user_id && listing.retailer_id !== user_id) {
      return res.status(403).json({
        error: "You are not authorized to update this listing",
      });
    }
    //console.log(req.files);
    // 🚶‍♂️ Process uploaded photos (if new photos are uploaded)
    // const photos = req.files
    //   ? req.files.map(
    //       (file) =>
    //         `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    //     )
    //   : undefined;

    // ✅ Update the listing in the database
    const updatedListing = await pool.query(
      `UPDATE listings
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           price = COALESCE($3, price),
           category = COALESCE($4, category),
           location = COALESCE($5, location),
           is_available = COALESCE($6, is_available)
       WHERE listing_id = $7 AND (user_id = $8 OR retailer_id = $8)
       RETURNING *`,
      [
        title,
        description,
        price,
        category,
        // photos,
        location,
        is_available,
        listing_id,
        user_id,
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
