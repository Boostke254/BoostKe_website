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

// Check if retailer has a shop
router.get("/has-shop/:retailer_id", async (req, res) => {
  const { retailer_id } = req.params;

  try {
    // 🔍 Check if retailer exists
    const retailerCheck = await pool.query(
      "SELECT * FROM retailers WHERE retailer_id = $1",
      [retailer_id]
    );

    if (retailerCheck.rows.length === 0) {
      return res.status(404).json({ error: "Retailer not found" });
    }

    // 🚫 Check if retailer already owns a shop
    const existingShop = await pool.query(
      "SELECT * FROM shops WHERE retailer_id = $1",
      [retailer_id]
    );

    if (existingShop.rows.length > 0) {
      return res.status(200).json({
        message: "Retailer has a shop",
        shop_status: true,
      });
    } else {
      return res.status(200).json({
        message: "Retailer has no shop",
        shop_status: false,
      });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Failed to check", details: err.message });
  }
});

// 🛒 Create a New Shop with Logo Upload
router.post("/create", upload, async (req, res) => {
  const { shop_name, shop_description } = req.body;
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

    console.log(retailer_id);
    console.log(retailerCheck.rows);

    if (retailerCheck.rows.length === 0) {
      return res.status(404).json({ error: "Retailer not found" });
    }

    // 🚫 Check if retailer already owns a shop
    const existingShop = await pool.query(
      "SELECT * FROM shops WHERE retailer_id = $1",
      [retailer_id]
    );

    if (existingShop.rows.length > 0) {
      return res.status(400).json({
        error:
          "Retailer already owns a shop. Duplicate shop creation is not allowed.",
      });
    }

    // Handle shop logo file path
    const shop_logo = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    // ✅ Create a new shop
    const result = await pool.query(
      `INSERT INTO shops (retailer_id, shop_name, shop_description, shop_logo) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [retailer_id, shop_name, shop_description, shop_logo]
    );

    res.status(201).json({
      message: "Shop created successfully",
      shop: result.rows[0],
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
      .json({ error: "Failed to create shop", details: err.message });
  }
});

module.exports = router;
