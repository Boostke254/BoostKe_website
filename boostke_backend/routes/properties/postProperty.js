const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const path = require("path");
const multer = require("multer");

// Database connection
const pool = require("../../db");

const router = express.Router();

// 📂 Serve Static Files
router.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// 🛡️ Middleware for JWT Authentication
const authenticateLandlord = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.landlord = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token." });
  }
};

// 📸 Multer Configuration for Image Upload
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
}).array("photos", 5); // Allow max 5 photos

// 📌 POST: Add a Property with Image Uploads
router.post("/properties", authenticateLandlord, upload, async (req, res) => {
  const {
    title,
    description,
    price,
    property_type,
    address,
    rooms,
    bathrooms,
    amenities,
    is_available,
    latitude,
    longitude,
    county,
    price_basis,
  } = req.body;

  // Handle uploaded photos
  const photos = req.files
    ? req.files.map(
        (file) =>
          `${req.protocol}://${req.get("host")}/${file.path.replace(
            /\\/g,
            "/"
          )}`
      )
    : [];

  try {
    // Validate Required Fields
    if (!title || !price || !property_type) {
      return res
        .status(400)
        .json({ error: "Title, price, and property type are required." });
    }

    // Insert Property into Database
    const result = await pool.query(
      `INSERT INTO properties (
        landlord_id, title, description, price, property_type, address, rooms, bathrooms, 
        amenities, photos, is_available, latitude, longitude, county, price_basis
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *`,
      [
        req.landlord.landlord_id,
        title,
        description,
        price,
        property_type,
        address || null,
        rooms || null,
        bathrooms || null,
        amenities || [],
        photos,
        is_available || true,
        latitude || null,
        longitude || null,
        county || null,
        price_basis || "monthly",
      ]
    );

    res.status(201).json({
      message: "Property added successfully",
      property: result.rows[0],
    });
  } catch (err) {
    console.error("Failed to add property:", err.message);
    res
      .status(500)
      .json({ error: "Failed to add property", details: err.message });
  }
});

module.exports = router;
