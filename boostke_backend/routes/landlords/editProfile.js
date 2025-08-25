const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const pool = require("../../db");
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
}).single("photo"); // Only allow one photo upload for the landlord profile

// 🛡️ Middleware for Authentication
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

// 🏠 Get Landlord Details
router.get("/landlord", authenticateLandlord, async (req, res) => {
  try {
    const landlord_id = req.landlord.landlord_id;

    const result = await pool.query(
      "SELECT landlord_id, full_name, email, mobile, photo_url, created_at FROM landlords WHERE landlord_id = $1",
      [landlord_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Landlord not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: "Failed to fetch landlord details",
      details: err.message,
    });
  }
});

// 🏠 Update Landlord Details
router.put("/landlord", authenticateLandlord, upload, async (req, res) => {
  const { full_name, email, mobile, password, old_password } = req.body;
  let photo_url = req.file
    ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    : null;

  try {
    const landlord_id = req.landlord.landlord_id;

    // Fetch current landlord details
    const result = await pool.query(
      "SELECT * FROM landlords WHERE landlord_id = $1",
      [landlord_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Landlord not found" });
    }

    const landlord = result.rows[0];

    // If password update is requested, verify old password
    if (password) {
      if (!old_password) {
        return res
          .status(400)
          .json({ error: "Old password is required to update password." });
      }

      const isMatch = await bcrypt.compare(old_password, landlord.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Old password is incorrect." });
      }

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      landlord.password = await bcrypt.hash(password, salt);
    }

    // Update fields only if provided
    const updatedLandlord = {
      full_name: full_name || landlord.full_name,
      email: email || landlord.email,
      mobile: mobile || landlord.mobile,
      photo_url: photo_url || landlord.photo_url,
      password: landlord.password, // Keep updated password
    };

    // Update database
    const updateResult = await pool.query(
      `UPDATE landlords 
         SET full_name = $1, email = $2, mobile = $3, photo_url = $4, password = $5 
         WHERE landlord_id = $6 RETURNING *`,
      [
        updatedLandlord.full_name,
        updatedLandlord.email,
        updatedLandlord.mobile,
        updatedLandlord.photo_url,
        updatedLandlord.password,
        landlord_id,
      ]
    );

    res.status(200).json({
      message: "Landlord details updated successfully",
      landlord: {
        landlord_id: updateResult.rows[0].landlord_id,
        full_name: updateResult.rows[0].full_name,
        email: updateResult.rows[0].email,
        mobile: updateResult.rows[0].mobile,
        photo_url: updateResult.rows[0].photo_url,
        created_at: updateResult.rows[0].created_at,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: "Failed to update landlord details",
      details: err.message,
    });
  }
});

module.exports = router;
