const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const pool = require("../../db");

const router = express.Router();

// 🛡️ Middleware for JWT Authentication
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

// ✅ GET request to count unread messages
router.get("/count", authenticateUser, async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const result = await pool.query(
      `SELECT COUNT(*) AS unread FROM messages WHERE status = 'unread' AND to_user = $1`,
      [user_id]
    );

    res.json({ unreadMessages: result.rows[0].unread });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch unread messages" });
  }
});

// ✅ PUT request to mark all unread messages as read
router.put("/mark-read", authenticateUser, async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const result = await pool.query(
      `UPDATE messages SET status = 'read' WHERE status = 'unread' AND to_user = $1 RETURNING *`,
      [user_id]
    );

    res.json({
      message: "All unread messages marked as read.",
      updatedCount: result.rowCount,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to update message status" });
  }
});

module.exports = router;
