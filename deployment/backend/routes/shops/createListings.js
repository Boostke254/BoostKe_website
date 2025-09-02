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

// 🛍️ Post a New Listing for a Shop with Photos Upload
router.post("/listings/create", upload, async (req, res) => {
  const { title, description, price, category, location, is_available } =
    req.body;
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  try {
    // 🔒 Validate Token
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const retailer_id = decoded.retailer_id;

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

    // 🚶‍♂️ Process uploaded photos
    const photos = req.files
      ? req.files.map(
          (file) =>
            `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
        )
      : [];

    // ✅ Insert listing into database
    const result = await pool.query(
      `INSERT INTO listings (retailer_id, title, description, price, category, photos, location, is_available) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [
        retailer_id,
        title,
        description,
        price,
        category,
        photos,
        location,
        is_available,
      ]
    );

    res.status(201).json({
      message: "Listing created successfully",
      listing: result.rows[0],
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
      .json({ error: "Failed to create listing", details: err.message });
  }
});

module.exports = router;
