const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("../../db"); // Assuming you have a database pool connection
const router = express.Router();
const sendEmail = require("../../utils/sendEmail");

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
 * @route GET /api/admin/users
 * @description Fetch all users' details (Admin only)
 * @access Private (Admin)
 */

router.get("/users", authenticateAdmin, async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const offset = (page - 1) * limit;

  try {
    const usersQuery = `
      SELECT user_id, full_name, email, mobile, photo_url, balance, created_at, is_verified
      FROM users
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;

    const usersResult = await pool.query(usersQuery, [limit, offset]);

    const countResult = await pool.query("SELECT COUNT(*) FROM users");

    res.status(200).json({
      message: "Users fetched successfully.",
      users: usersResult.rows,
      total: parseInt(countResult.rows[0].count),
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
});

/**
 * @route GET /api/admin/retailers
 * @description Fetch all retailers' details (Admin only)
 * @access Private (Admin)
 */
router.get("/retailers", authenticateAdmin, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const dataQuery = `
      SELECT 
        r.retailer_id, 
        r.full_name, 
        r.email, 
        r.mobile, 
        r.photo_url, 
        r.approved, 
        r.admin_id, 
        r.created_at, 
        r.is_verified,
        a.full_name AS approved_by_name,
        a.email AS approved_by_email,
        a.photo_url AS approved_by_photo
      FROM retailers r
      LEFT JOIN admin a ON r.admin_id = a.admin_id
      WHERE r.approved = TRUE
      ORDER BY r.created_at DESC
      LIMIT $1 OFFSET $2
    `;

    const countQuery = "SELECT COUNT(*) FROM retailers WHERE approved = TRUE";

    const [retailersResult, countResult] = await Promise.all([
      pool.query(dataQuery, [limit, offset]),
      pool.query(countQuery),
    ]);

    const totalItems = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      message: "Retailers fetched successfully.",
      retailers: retailersResult.rows,
      totalItems,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    console.error("Error fetching retailers:", err.message);
    res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
});

// Fetch a specific retailer by ID
router.get("/retailers/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const dataQuery = `
      SELECT * FROM retailers WHERE retailer_id = $1
    `;

    const retailersResult = await pool.query(dataQuery, [id]);

    if (retailersResult.rows.length === 0) {
      return res.status(404).json({ message: "Retailer not found." });
    }

    res.status(200).json({
      message: "Retailer fetched successfully.",
      retailer: retailersResult.rows[0],
    });
  } catch (err) {
    console.error("Error fetching retailer:", err.message);
    res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
});

//pending approval retailers
router.get("/pending-retailers", authenticateAdmin, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const dataQuery = `
      SELECT retailer_id, full_name, email, mobile, photo_url, approved, created_at, is_verified
      FROM retailers  WHERE approved = false
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;
    const countQuery = "SELECT COUNT(*) FROM retailers";

    const [retailersResult, countResult] = await Promise.all([
      pool.query(dataQuery, [limit, offset]),
      pool.query(countQuery),
    ]);

    const totalItems = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      message: "Retailers fetched successfully.",
      retailers: retailersResult.rows,
      totalItems,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    console.error("Error fetching retailers:", err.message);
    res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
});

// PATCH route to approve a retailer and record admin_id
router.patch(
  "/retailers/:id/:fullName/:email/approve",
  authenticateAdmin,
  async (req, res) => {
    const { id, fullName, email } = req.params;
    const adminId = req.admin.adminId; // Must be set in token during login

    try {
      const result = await pool.query(
        `
      UPDATE retailers
      SET approved = true, admin_id = $2
      WHERE retailer_id = $1
      RETURNING *;
      `,
        [id, adminId]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Retailer not found." });
      }

      await sendEmail(
        email,
        "Congratulations! Your Vendor Application Has Been Approved - BoostKE",
        `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Vendor Approval - BoostKE</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f9fafc;
            }
      
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border: 1px solid #e0e0e0;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
            }
      
            .header {
              text-align: center;
              padding: 20px 0;
              border-bottom: 1px solid #e0e0e0;
            }
      
            .header img {
              max-width: 150px;
            }
      
            .content {
              padding: 20px;
              text-align: center;
            }
      
            .content h2 {
              color: #333333;
            }
      
            .content p {
              font-size: 16px;
              color: #555555;
              margin: 10px 0;
              line-height: 1.5;
            }
      
            .cta-button {
              display: inline-block;
              margin-top: 20px;
              padding: 12px 24px;
              font-size: 16px;
              color: #ffffff;
              background-color: #ff6f00;
              border-radius: 6px;
              text-decoration: none;
            }
      
            .footer {
              margin-top: 30px;
              text-align: center;
              font-size: 12px;
              color: #999999;
            }
      
            .footer a {
              color: #ff6f00;
              text-decoration: none;
            }
      
            .footer a:hover {
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header Section -->
            <div class="header">
              <img src="https://retail.boostke.co.ke/logo.png" alt="BoostKE Logo" />
            </div>
      
            <!-- Content Section -->
            <div class="content">
              <h2>Congratulations, You're Now an Approved Vendor!</h2>
              <p>Hello <strong>${fullName}</strong>,</p>
              <p>
                We're excited to let you know that your vendor application has been <strong>approved</strong>. Your account is now active on <strong>BoostKE</strong>.
              </p>
              <p>
                You can now log in to start listing your products, managing sales, and reaching customers across our platform.
              </p>
              <p>
                We're thrilled to have you onboard. Welcome to the BoostKE community!
              </p>
              <a class="cta-button" href="https://retail.boostke.co.ke/login" alt="Login to BoostKE">Log In Now</a>
            </div>
      
            <!-- Footer Section -->
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} BoostKE. All Rights Reserved.</p>
              <p>
                Need help? <a href="mailto:info@boostke.co.ke">Contact Support</a>
              </p>
            </div>
          </div>
        </body>
      </html>
      `,
        `Hello ${fullName},\n\nYour vendor application has been approved!\n\nYou can now log in to your BoostKE account and start listing your products:\nhttps://retail.boostke.co.ke/login\n\nWelcome aboard and thank you for joining us.\n\nBest regards,\nBoostKE Team`
      );

      res.status(200).json({
        message: "Retailer approved successfully.",
        retailer: result.rows[0],
      });
    } catch (err) {
      console.error("Error approving retailer:", err.message);
      res.status(500).json({ error: "Server error", details: err.message });
    }
  }
);

// Reject a retailer
router.patch(
  "/retailers/:id/unapprove",
  authenticateAdmin,
  async (req, res) => {
    const { id } = req.params;

    try {
      const result = await pool.query(
        `UPDATE retailers SET approved = false WHERE retailer_id = $1 RETURNING *`,
        [id]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Retailer not found." });
      }

      res.status(200).json({
        message: "Retailer unapproved successfully.",
        retailer: result.rows[0],
      });
    } catch (err) {
      console.error("Error unapproving retailer:", err.message);
      res.status(500).json({ error: "Server error", details: err.message });
    }
  }
);

/**
 * @route GET /api/admin/landlords
 * @description Fetch all landlords' details (Admin only)
 * @access Private (Admin)
 */
router.get("/landlords", authenticateAdmin, async (req, res) => {
  try {
    // Fetch all landlords from the database
    const landlords = await pool.query(
      "SELECT landlord_id, full_name, email, mobile, photo_url, created_at, is_verified FROM landlords"
    );

    res.status(200).json({
      message: "Landlords fetched successfully.",
      landlords: landlords.rows, // Return the list of landlords
    });
  } catch (err) {
    console.error("Error fetching landlords:", err.message);
    res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
});

/**
 * @route GET /api/admin/admins
 * @description Fetch all admins' details (Admin only)
 * @access Private (Admin)
 */
router.get("/admins", authenticateAdmin, async (req, res) => {
  try {
    // Fetch all admins from the database
    const admins = await pool.query(
      "SELECT admin_id, user_id, full_name, email, mobile, role, photo_url, created_at, updated_at FROM admin ORDER BY admin_id"
    );

    res.status(200).json({
      message: "Admins fetched successfully.",
      admins: admins.rows, // Return the list of admins
    });
  } catch (err) {
    console.error("Error fetching admins:", err.message);
    res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
});

/**
 * @route PATCH /api/admin/deactivate-user/:userId
 * @description Admin can deactivate a user's account
 * @access Private (Admin)
 */
router.patch(
  "/deactivate-user/:userId",
  authenticateAdmin,
  async (req, res) => {
    const { userId } = req.params; // Get user ID from route parameters

    try {
      // Check if the user exists
      const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
        userId,
      ]);

      if (user.rows.length === 0) {
        return res.status(404).json({ error: "User not found." });
      }

      // Deactivate the user account by setting account_deactivate to true
      await pool.query(
        "UPDATE users SET account_deactivate = TRUE WHERE user_id = $1",
        [userId]
      );

      res.status(200).json({
        message: `User account with ID ${userId} deactivated successfully.`,
      });
    } catch (err) {
      console.error("Error deactivating user account:", err.message);
      res.status(500).json({
        error: "Server error",
        details: err.message,
      });
    }
  }
);

/**
 * @route DELETE /api/admin/delete-user/:userId
 * @description Admin can delete a user's account permanently
 * @access Private (Admin)
 */
router.delete("/delete-user/:userId", authenticateAdmin, async (req, res) => {
  const { userId } = req.params; // Get user ID from route parameters

  try {
    // Check if the user exists
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      userId,
    ]);

    if (user.rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    // Delete the user's data from the users table
    await pool.query("DELETE FROM users WHERE user_id = $1", [userId]);

    // Optionally, delete related data from other tables (if any, e.g., orders, products, etc.)

    res.status(200).json({
      message: `User account with ID ${userId} deleted successfully.`,
    });
  } catch (err) {
    console.error("Error deleting user account:", err.message);
    res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
});

module.exports = router;
