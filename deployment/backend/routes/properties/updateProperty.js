//PATCH /api/properties/:property_id
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Database connection
const pool = require("../../db");

const router = express.Router();

// 🛡️ Middleware for JWT Authentication
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

// ✏️ PATCH: Update a Property
router.patch(
  "/properties/:property_id",
  authenticateLandlord,
  async (req, res) => {
    const { property_id } = req.params;
    const landlord_id = req.landlord.landlord_id;
    const {
      title,
      description,
      price,
      property_type,
      address,
      rooms,
      bathrooms,
      amenities,
      photos,
      is_available,
      latitude,
      longitude,
      county,
      price_basis,
    } = req.body;

    try {
      // Check if the property exists and belongs to the landlord
      const propertyCheck = await pool.query(
        "SELECT * FROM properties WHERE property_id = $1 AND landlord_id = $2",
        [property_id, landlord_id]
      );

      if (propertyCheck.rows.length === 0) {
        return res.status(404).json({
          error:
            "Property not found or you are not authorized to update this property.",
        });
      }

      // Update the property
      const result = await pool.query(
        `UPDATE properties
       SET 
         title = COALESCE($1, title),
         description = COALESCE($2, description),
         price = COALESCE($3, price),
         property_type = COALESCE($4, property_type),
         address = COALESCE($5, address),
         rooms = COALESCE($6, rooms),
         bathrooms = COALESCE($7, bathrooms),
         amenities = COALESCE($8, amenities),
         photos = COALESCE($9, photos),
         is_available = COALESCE($10, is_available),
         latitude = COALESCE($11, latitude),
         longitude = COALESCE($12, longitude),
         county = COALESCE($13, county),
         price_basis = COALESCE($14, price_basis)
       WHERE property_id = $15
       RETURNING *`,
        [
          title,
          description,
          price,
          property_type,
          address,
          rooms,
          bathrooms,
          amenities,
          photos,
          is_available,
          latitude,
          longitude,
          county,
          price_basis,
          property_id,
        ]
      );

      res.status(200).json({
        message: "Property updated successfully",
        property: result.rows[0],
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        error: "Failed to update property",
        details: err.message,
      });
    }
  }
);

module.exports = router;
