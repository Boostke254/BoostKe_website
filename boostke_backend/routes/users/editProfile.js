const express = require("express");
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
}).single("photo"); // Only allow one photo upload for the user profile

// 🛡️ Middleware for User Authentication
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

// 👤 **Get User Details**
router.get("/user", authenticateUser, async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const result = await pool.query(
      "SELECT user_id, full_name, email, mobile, photo_url, balance, created_at, is_verified FROM users WHERE user_id = $1",
      [user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: "Failed to fetch user details", details: err.message });
  }
});

// 👤 **Update User Profile Photo Only**
router.put("/photo", authenticateUser, upload, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const photo_url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  try {
    const user_id = req.user.user_id;

    // Update the photo_url in the database
    const updateResult = await pool.query(
      "UPDATE users SET photo_url = $1 WHERE user_id = $2 RETURNING *",
      [photo_url, user_id]
    );

    if (updateResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "Profile photo updated successfully",
      user: {
        user_id: updateResult.rows[0].user_id,
        photo_url: updateResult.rows[0].photo_url,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: "Failed to update profile photo",
      details: err.message,
    });
  }
});

// 👤 **Update User Details**
router.put("/user", authenticateUser, upload, async (req, res) => {
  const { full_name, email, mobile, password, old_password } = req.body;
  let photo_url = req.file
    ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    : null;

  try {
    const user_id = req.user.user_id;

    // Fetch current user details
    const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      user_id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result.rows[0];

    // 🛡️ Verify Old Password if Updating Password
    if (password) {
      if (!old_password) {
        return res
          .status(400)
          .json({ error: "Old password is required to update password." });
      }

      const isMatch = await bcrypt.compare(old_password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Old password is incorrect." });
      }

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // 🛠️ Update fields only if provided
    const updatedUser = {
      full_name: full_name || user.full_name,
      email: email || user.email,
      mobile: mobile || user.mobile,
      photo_url: photo_url || user.photo_url,
      balance: user.balance, // Keep the existing balance
      password: user.password, // Keep updated password
    };

    // Update user in the database
    const updateResult = await pool.query(
      `UPDATE users 
       SET full_name = $1, email = $2, mobile = $3, photo_url = $4, password = $5 
       WHERE user_id = $6 RETURNING *`,
      [
        updatedUser.full_name,
        updatedUser.email,
        updatedUser.mobile,
        updatedUser.photo_url,
        updatedUser.password,
        user_id,
      ]
    );

    res.status(200).json({
      message: "User details updated successfully",
      user: {
        user_id: updateResult.rows[0].user_id,
        full_name: updateResult.rows[0].full_name,
        email: updateResult.rows[0].email,
        mobile: updateResult.rows[0].mobile,
        photo_url: updateResult.rows[0].photo_url,
        balance: updateResult.rows[0].balance,
        created_at: updateResult.rows[0].created_at,
      },
    });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: "Failed to update user details", details: err.message });
  }
});

module.exports = router;
