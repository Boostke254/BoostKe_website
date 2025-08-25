// const express = require("express");
// const pool = require("../../db");
// const jwt = require("jsonwebtoken");
// const crypto = require("crypto"); // To generate unique session IDs
// const cookieParser = require("cookie-parser"); // Ensure cookie-parser is used
// require("dotenv").config();

// const router = express.Router();

// // Generate a unique session ID
// function generateSessionId() {
//   return crypto.randomBytes(16).toString("hex"); // Generates a 32-character hex string
// }

// // Apply cookie-parser middleware globally (Make sure it's before routes)
// router.use(cookieParser());

// router.get("/getlisting/:listingId", async (req, res) => {
//   const { listingId } = req.params;
//   const token = req.headers.authorization?.split(" ")[1];
//   let userId = null;

//   // Check if session_id cookie exists
//   let sessionId = req.cookies?.session_id;

//   // If session_id doesn't exist, generate and set a new one in the response
//   if (!sessionId) {
//     sessionId = generateSessionId();
//     res.cookie("session_id", sessionId, { httpOnly: true, maxAge: 86400000 }); // Set cookie with 1-day expiration
//   }

//   try {
//     // Get user ID from the token if available
//     if (token) {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       userId = decoded.user_id;
//     }

//     // 📝 Fetch the listing details
//     const listingResult = await pool.query(
//       `SELECT 
//           listing_id, user_id, retailer_id, title, description, price, category, 
//           photos, location, is_available, created_at, view_count 
//        FROM listings 
//        WHERE listing_id = $1`,
//       [listingId]
//     );

//     if (listingResult.rows.length === 0) {
//       return res.status(404).json({ error: "Listing not found." });
//     }

//     const listing = listingResult.rows[0];

//     // 🛡️ Check if a view by this user/session already exists
//     const existingView = await pool.query(
//       "SELECT * FROM product_views WHERE listing_id = $1 AND (user_id = $2 OR session_id = $3)",
//       [listingId, userId || null, sessionId]
//     );

//     if (existingView.rows.length === 0) {
//       // Insert product view record
//       await pool.query(
//         "INSERT INTO product_views (listing_id, user_id, session_id) VALUES ($1, $2, $3)",
//         [listingId, userId || null, sessionId]
//       );

//       // Increment view count directly in the listings table
//       await pool.query(
//         "UPDATE listings SET view_count = view_count + 1 WHERE listing_id = $1",
//         [listingId]
//       );

//       // Update local listing object with incremented view_count
//       listing.view_count += 1;
//     }

//     // ✅ Return listing details
//     res.status(200).json({
//       message: "Listing details fetched successfully.",
//       listing,
//     });
//   } catch (err) {
//     console.error("Failed to fetch listing details:", err.message);
//     res.status(500).json({ error: "Failed to fetch listing details." });
//   }
// });

// module.exports = router;


const express = require("express");
const pool = require("../../db");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); // To generate unique session IDs
const cookieParser = require("cookie-parser"); // Ensure cookie-parser is used
require("dotenv").config();

const router = express.Router();

// Generate a unique session ID
function generateSessionId() {
  return crypto.randomBytes(16).toString("hex"); // Generates a 32-character hex string
}

// Apply cookie-parser middleware globally (Make sure it's before routes)
router.use(cookieParser());

router.get("/getlisting/:listingId", async (req, res) => {
  const { listingId } = req.params;
  const token = req.headers.authorization?.split(" ")[1];
  let userId = null;

  // Check if session_id cookie exists
  let sessionId = req.cookies?.session_id;

  // If session_id doesn't exist, generate and set a new one in the response
  if (!sessionId) {
    sessionId = generateSessionId();
    res.cookie("session_id", sessionId, { httpOnly: true, maxAge: 86400000 }); // Set cookie with 1-day expiration
  }

  try {
    // Get user ID from the token if available
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.user_id;
    }

    // 📝 Fetch the listing details
    const listingResult = await pool.query(
      `SELECT 
          listing_id, user_id, retailer_id, title, description, price, category, 
          photos, location, is_available, created_at, view_count 
       FROM listings 
       WHERE listing_id = $1`,
      [listingId]
    );

    if (listingResult.rows.length === 0) {
      return res.status(404).json({ error: "Listing not found." });
    }

    const listing = listingResult.rows[0];

    // 🛡️ Check if a view by this user/session already exists
    const existingView = await pool.query(
      "SELECT * FROM product_views WHERE listing_id = $1 AND (user_id = $2 OR session_id = $3)",
      [listingId, userId || null, sessionId]
    );

    if (existingView.rows.length === 0) {
      // Insert product view record
      await pool.query(
        "INSERT INTO product_views (listing_id, user_id, session_id) VALUES ($1, $2, $3)",
        [listingId, userId || null, sessionId]
      );

      // Increment view count directly in the listings table
      await pool.query(
        "UPDATE listings SET view_count = view_count + 1 WHERE listing_id = $1",
        [listingId]
      );

      // Update local listing object with incremented view_count
      listing.view_count += 1;
    }

    // 🧑‍💻 Get the phone number and email based on user or retailer
    let contactInfo = null;

    if (listing.user_id) {
      // If it's a user listing, fetch from the `users` table
      const userResult = await pool.query(
        "SELECT email, mobile FROM users WHERE user_id = $1",
        [listing.user_id]
      );
      if (userResult.rows.length > 0) {
        contactInfo = userResult.rows[0];
      }
    } else if (listing.retailer_id) {
      // If it's a retailer listing, fetch from the `retailers` table
      const retailerResult = await pool.query(
        "SELECT email, mobile FROM retailers WHERE retailer_id = $1",
        [listing.retailer_id]
      );
      if (retailerResult.rows.length > 0) {
        contactInfo = retailerResult.rows[0];
      }
    }

    // ✅ Return listing details with contact info
    res.status(200).json({
      message: "Listing details fetched successfully.",
      listing: {
        ...listing,
        contact_info: contactInfo, // Attach the contact information
      },
    });
  } catch (err) {
    console.error("Failed to fetch listing details:", err.message);
    res.status(500).json({ error: "Failed to fetch listing details." });
  }
});

module.exports = router;
