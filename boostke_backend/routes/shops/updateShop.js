const express = require("express");
const pool = require("../../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const multer = require("multer");
const path = require("path");

const router = express.Router();

// 📂 Serve Static Files (to access uploaded images)
router.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// 📸 Multer Configuration for Logo Upload
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
}).single("shop_logo"); // Only allow a single logo file upload

// Middleware for User Authentication
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
    res.status(400).json({ error: "Invalid token." });
  }
};

// Update Shop Details
router.put("/update", authenticateUser, upload, async (req, res) => {
  const { shop_name, shop_description } = req.body;
  const shop_logo = req.file
    ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    : null;
  const retailer_id = req.user.retailer_id;

  try {
    // Check shop ownership
    const shopCheck = await pool.query(
      "SELECT * FROM shops WHERE retailer_id = $1",
      [retailer_id]
    );

    if (shopCheck.rows.length === 0) {
      return res.status(404).json({
        error: "Shop not found or you are not authorized to update it",
      });
    }

    // Update shop
    const updatedShop = await pool.query(
      `UPDATE shops 
         SET shop_name = COALESCE($1, shop_name), 
             shop_description = COALESCE($2, shop_description), 
             shop_logo = COALESCE($3, shop_logo) 
         WHERE retailer_id = $4 
         RETURNING *`,
      [
        shop_name || null,
        shop_description || null,
        shop_logo || null,
        retailer_id,
      ]
    );

    res.status(200).json({
      message: "Shop updated successfully",
      shop: updatedShop.rows[0],
    });
  } catch (err) {
    console.error(err);

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }

    res
      .status(500)
      .json({ error: "Failed to update shop", details: err.message });
  }
});

module.exports = router;
