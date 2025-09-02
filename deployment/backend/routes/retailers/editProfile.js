const express = require("express");
const pool = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const multer = require("multer");
const path = require("path");

const router = express.Router();

// 📂 Serve Static Files (to access uploaded images)
router.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// 📸 Multer Configuration for Profile Photo Upload
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
}).single("photo"); // Only allow one photo upload for the retailer profile

// 🛡️ Middleware for JWT Authentication
const authenticateRetailer = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.retailer = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token." });
  }
};

// 📌 GET: Retrieve Retailer Details
router.get("/me", authenticateRetailer, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT retailer_id, full_name, email, mobile, photo_url, created_at 
       FROM retailers 
       WHERE retailer_id = $1`,
      [req.retailer.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Retailer not found" });
    }

    res.status(200).json({ retailer: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve retailer details" });
  }
});

// 📌 PUT: Update Retailer Details
router.put("/update", authenticateRetailer, upload, async (req, res) => {
  const { full_name, email, mobile, password, old_password } = req.body;
  let photo_url = req.file
    ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    : null;

  try {
    // Fetch current retailer data
    const retailerResult = await pool.query(
      `SELECT * FROM retailers WHERE retailer_id = $1`,
      [req.retailer.userId]
    );

    if (retailerResult.rows.length === 0) {
      return res.status(404).json({ error: "Retailer not found" });
    }

    const retailer = retailerResult.rows[0];

    // Handle Password Update
    if (password) {
      if (!old_password) {
        return res
          .status(400)
          .json({ error: "Old password is required to set a new password." });
      }

      const validPassword = await bcrypt.compare(
        old_password,
        retailer.password
      );
      if (!validPassword) {
        return res.status(400).json({ error: "Old password is incorrect." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      retailer.password = hashedPassword;
    }

    // Update other fields
    const updatedRetailer = {
      full_name: full_name || retailer.full_name,
      email: email || retailer.email,
      mobile: mobile || retailer.mobile,
      photo_url: photo_url || retailer.photo_url,
      password: retailer.password,
    };

    await pool.query(
      `UPDATE retailers 
       SET full_name = $1, email = $2, mobile = $3, photo_url = $4, password = $5 
       WHERE retailer_id = $6`,
      [
        updatedRetailer.full_name,
        updatedRetailer.email,
        updatedRetailer.mobile,
        updatedRetailer.photo_url,
        updatedRetailer.password,
        req.retailer.userId,
      ]
    );

    res.status(200).json({ message: "Retailer details updated successfully." });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to update retailer details" });
  }
});

module.exports = router;
