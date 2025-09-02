const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const path = require("path");
const multer = require("multer");
const pool = require("../../db"); // Database connection

const router = express.Router();

// 📂 Serve Static Files
router.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// 🛡️ JWT Authentication Middleware
const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Invalid token." });
  }
};

// 📸 Multer Configuration
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
}).array("photos", 10);

// 📝 Route: Create a Listing
router.post("/listing", authenticateUser, upload, async (req, res) => {
  const { title, description, price, category, location } = req.body;
  const photos = req.files
    ? req.files.map((file) => file.path.replace(/\\/g, "/"))
    : [];

  try {
    // Validate Required Fields
    if (!title || !price || !category) {
      return res
        .status(400)
        .json({ error: "Title, price, and category are required." });
    }

    // Insert Listing into Database
    const result = await pool.query(
      `INSERT INTO listings (user_id, title, description, price, category, photos, location)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        req.user.user_id,
        title,
        description,
        price,
        category,
        photos,
        location || null,
      ]
    );

    res.status(201).json({
      message: "Listing created successfully",
      listing: result.rows[0],
    });
  } catch (err) {
    console.error("Failed to create listing:", err);
    res
      .status(500)
      .json({ error: "Failed to create listing", details: err.message });
  }
});

module.exports = router;
