const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("../../db"); // Assuming you have a database pool connection
const router = express.Router();

// Middleware for verifying admin authentication
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the "Authorization" header

  if (!token) {
    return res.status(401).json({ error: "Authorization token missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.admin = decoded; // Add the decoded payload to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Token verification error:", err.message);
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

/**
 * @route DELETE /api/admin/shop/delete/:shopId
 * @description Delete a shop (Admin only)
 * @access Private (Admin)
 */
router.delete("/delete/:shopId", authenticateAdmin, async (req, res) => {
  const { shopId } = req.params;

  try {
    const result = await pool.query(`DELETE FROM shops WHERE shop_id = $1`, [
      shopId,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Shop not found." });
    }

    res.status(200).json({ message: "Shop deleted successfully." });
  } catch (err) {
    console.error("Error deleting shop:", err.message);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
