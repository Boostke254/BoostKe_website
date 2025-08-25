const express = require("express");
const pool = require("../../db"); // Assuming you have a database pool connection
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
}).single("photo"); // Only allow one photo upload for the admin profile

/**
 * @route PUT /api/admin/edit-profile
 * @description Edit profile route for Admin
 * @access Private
 */
router.put("/edit-profile", upload, async (req, res) => {
  const { admin_id, full_name, mobile, email } = req.body;
  let photo_url = req.file
    ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    : null;

  try {
    // 🛡️ Validate input
    if (!admin_id || !full_name || !mobile || !email) {
      return res.status(400).json({
        error: "Admin ID, full name, mobile, and email are required.",
      });
    }

    // 🔍 Check if the email or mobile is already taken by another user
    const checkEmail = await pool.query(
      "SELECT * FROM admin WHERE email = $1 AND admin_id != $2",
      [email, admin_id]
    );
    if (checkEmail.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Email is already in use by another user." });
    }

    const checkMobile = await pool.query(
      "SELECT * FROM admin WHERE mobile = $1 AND admin_id != $2",
      [mobile, admin_id]
    );
    if (checkMobile.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Mobile number is already in use by another user." });
    }

    // 📝 Update the admin profile in the database
    const updatedAdmin = await pool.query(
      `UPDATE admin SET full_name = $1, mobile = $2, email = $3, photo_url = $4, updated_at = CURRENT_TIMESTAMP 
      WHERE admin_id = $5 RETURNING *`,
      [full_name, mobile, email, photo_url, admin_id]
    );

    // 📩 Return updated profile response
    res.status(200).json({
      message: "Profile updated successfully.",
      admin: updatedAdmin.rows[0], // Return the updated admin details
    });
  } catch (err) {
    console.error("Error updating profile:", err.message);
    res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
});

module.exports = router;
