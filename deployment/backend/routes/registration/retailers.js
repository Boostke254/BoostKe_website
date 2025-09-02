const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../../utils/sendEmail");
const pool = require("../../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

//importations

// Assuming you have a database pool connection
const multer = require("multer");
const path = require("path");

// ?? Serve Static Files (to access uploaded images)
router.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// ?? Multer Configuration for Profile Photo Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
});

//end of importations

// Middleware for verifying admin authentication
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the "Authorization" header

  if (!token) {
    return res
      .status(401)
      .json({ error: "Admin authorization token missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.adminId = decoded.adminId; // Add the decoded payload to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Token verification error:", err.message);
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

// ??? Retailer Registration Route
router.post(
  "/register",
  upload.fields([
    { name: "businessCert", maxCount: 1 },
    { name: "idDocument", maxCount: 1 },
  ]),
  async (req, res) => {
    console.log(req.body); // text fields
    console.log(req.files); // uploaded files
    const {
      full_Name,
      email,
      phone,
      refCode,
      businessName,
      businessLocation,
      password,
    } = req.body;

    try {
      const emailCheck = await pool.query(
        "SELECT * FROM retailers WHERE email = $1",
        [email]
      );

      if (emailCheck.rows.length > 0) {
        return res.status(400).json({ error: "Email already registered" });
      }

      const businessCertificateUrl =
        req.files.businessCert?.[0].filename || null;
      const idDocumentUrl = req.files.idDocument?.[0].filename || null;

      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationCode = crypto.randomInt(100000, 999999);

      await pool.query(
        `INSERT INTO retailers 
       (full_name, email, mobile, password, referral_code, verification_code, business_name, business_location, business_certificate_url, id_document_url, is_verified, approved) 
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,false,false)`,
        [
          full_Name,
          email,
          phone,
          hashedPassword,
          refCode || null,
          verificationCode,
          businessName,
          businessLocation,
          businessCertificateUrl,
          idDocumentUrl,
        ]
      );

      await sendEmail(
        email,
        "Thank You for Registering with BoostKE",
        `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Vendor Registration Received - BoostKE</title>
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
              <img
                src="https://retail.boostke.co.ke/logo.png"
                alt="BoostKE Logo"
              />
            </div>
      
            <!-- Content Section -->
            <div class="content">
              <h2>Thank You for Registering as a Vendor</h2>
              <p>Hello <strong>${full_Name}</strong>,</p>
              <p>
                We have successfully received your registration with <strong>BoostKE</strong>.
              </p>
              <p>
                Kindly be patient as our team reviews your application. You will be notified
                via email as soon as your account is approved.
              </p>
              <p>
                We appreciate your interest and look forward to partnering with you to grow your business.
              </p>
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
        `Hello ${full_Name},\n\nThank you for registering with BoostKE.\n\nWe have received your application and our team is currently reviewing it. You will be notified via email once your account is approved.\n\nWe appreciate your patience.\n\nBest regards,\nBoostKE Team`
      );

      res.status(201).json({
        message: "Retailer registered successfully. Verification email sent.",
      });
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .json({ error: "Retailer registration failed", details: err.message });
    }
  }
);

/**
 * @route POST /api/retailers/verify
 * @description Verify retailer account using email and verification code
 * @access Public
 */
router.post("/verify", async (req, res) => {
  const { email, verificationCode } = req.body;

  try {
    // Validate request data
    if (!email || !verificationCode) {
      return res
        .status(400)
        .json({ error: "Email and verification code are required." });
    }

    // Check if the user exists with the provided email and code
    const user = await pool.query(
      "SELECT * FROM retailers WHERE email = $1 AND verification_code = $2",
      [email, verificationCode]
    );

    if (user.rows.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid verification code or email." });
    }

    // Update user as verified
    await pool.query(
      "UPDATE retailers SET is_verified = true, verification_code = NULL WHERE email = $1",
      [email]
    );

    res.status(200).json({
      message: "Account successfully verified. You can now log in.",
    });
  } catch (err) {
    console.error("Error verifying retailer:", err.message);
    res
      .status(500)
      .json({ error: "Failed to verify account", details: err.message });
  }
});

//resend code
router.post("/resend-verification-code", async (req, res) => {
  const { email } = req.body;

  try {
    // 1?? Validate Input
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    // 2?? Check if the user exists
    const user = await pool.query("SELECT * FROM retailers WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(404).json({ error: "Retailer not found." });
    }

    const retailer = user.rows[0];

    // 3?? Check if the account is already verified
    if (retailer.is_verified) {
      return res.status(400).json({ error: "Account is already verified." });
    }

    // 4?? Generate a new verification code
    const newVerificationCode = crypto.randomInt(100000, 999999);

    // 5?? Update verification code in the database
    await pool.query(
      "UPDATE retailers SET verification_code = $1 WHERE email = $2",
      [newVerificationCode, email]
    );

    // 6?? Send verification email
    await sendEmail(
      email,
      "Resend Verification Code",
      `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Retailer Account Verification - BoostKE</title>
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
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
      }

      .verification-code {
        display: inline-block;
        margin: 20px 0;
        padding: 10px 20px;
        font-size: 24px;
        font-weight: bold;
        color: #ffffff;
        background-color: #ff6f00;
        border-radius: 5px;
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
        <img
          src="https://retail.boostke.co.ke/logo.png"
          alt="BoostKE Logo"
        />
      </div>

      <!-- Content Section -->
      <div class="content">
        <h2>Account Verification</h2>
        <p>Hello <strong>${retailer.full_name}</strong>,</p>
        <p>
          Thank you for registering with <strong>BoostKE</strong>. Please use
          the code below to verify your account:
        </p>
        <div class="verification-code">${newVerificationCode}</div>
        <p>
          If you did not request this, please ignore this email or contact our
          support team immediately.
        </p>
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
      `Hello ${retailer.full_name},\nYour new verification code is: ${newVerificationCode}\nPlease use this code to verify your account.`
    );

    // 7?? Response
    res.status(200).json({
      message: "A new verification code has been sent to your email.",
    });
  } catch (err) {
    console.error("Error resending verification code:", err.message);
    res.status(500).json({
      error: "Failed to resend verification code.",
      details: err.message,
    });
  }
});

// ??? Test Email Route
router.get("/test-mail", async (req, res) => {
  try {
    await sendEmail(
      "paulndalila001@gmail.com",
      "Test Email",
      `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Retailer Account Verification - BoostKE</title>
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
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
      }

      .verification-code {
        display: inline-block;
        margin: 20px 0;
        padding: 10px 20px;
        font-size: 24px;
        font-weight: bold;
        color: #ffffff;
        background-color: #ff6f00;
        border-radius: 5px;
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
        <img
          src="https://retail.boostke.co.ke/logo.png"
          alt="BoostKE Logo"
        />
      </div>

      <!-- Content Section -->
      <div class="content">
        <h2>Account Verification</h2>
        <p>Hello <strong>Paul Ndalila</strong>,</p>
        <p>
          Thank you for registering with <strong>BoostKE</strong>. Please use
          the code below to verify your account:
        </p>
        <div class="verification-code">000000</div>
        <p>
          If you did not request this, please ignore this email or contact our
          support team immediately.
        </p>
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
      "This is a test email sent via Nodemailer using Zoho SMTP."
    );

    res.status(200).json({ message: "Test email sent successfully!" });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: "Failed to send test email", details: err.message });
  }
});

module.exports = router;
