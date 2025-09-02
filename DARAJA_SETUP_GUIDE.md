# BoostKe M-Pesa Daraja Portal Setup Guide

## Overview
This guide will walk you through setting up your BoostKe website on the Safaricom Daraja portal to enable M-Pesa payments. Based on your system implementation, you'll need specific M-Pesa API configurations.

## Prerequisites
- Registered business with Safaricom M-Pesa
- Valid M-Pesa paybill or till number
- Access to Safaricom Daraja portal
- Your BoostKe system deployed and accessible online

## Step 1: Daraja Portal Registration

### 1.1 Create Daraja Account
1. Visit [https://developer.safaricom.co.ke/](https://developer.safaricom.co.ke/)
2. Click "Sign Up" and create an account
3. Verify your email address
4. Complete your profile with business details

### 1.2 Create Your App
1. Login to Daraja portal
2. Click "Create App" (as shown in your screenshot)
3. Fill in the app details:
   - **App Name**: `boostke_website` (or your preferred name)
   - **Description**: "BoostKe E-commerce Platform M-Pesa Integration"

## Step 2: API Product Selection

Based on your BoostKe system implementation, you need these specific APIs:

### ✅ **Required APIs for BoostKe**

#### 1. **M-Pesa Express (STK Push) - MANDATORY**
- **Purpose**: Customer-initiated payments (your primary payment flow)
- **Use Case**: When customers pay for products/services/memberships
- **Your Implementation**: Used in your cart checkout and membership payments
- **Select**: ✅ M-Pesa Sandbox (for testing)

#### 2. **Lipa Na M-Pesa Online - MANDATORY**
- **Purpose**: Online payment processing
- **Use Case**: Direct integration with your website checkout
- **Your Implementation**: Powers your `cartCheckout()` and `payMembership()` functions
- **Select**: ✅ Lipa Na M-Pesa Sandbox

### ⚠️ **Optional APIs (Select Based on Future Needs)**

#### 3. **C2B (Customer to Business) - RECOMMENDED**
- **Purpose**: Receive payments initiated by customers via USSD/SMS
- **Use Case**: Customers can pay using *334# or SMS without visiting your website
- **Your Implementation**: Would extend your current payment system
- **Select**: ✅ M-Pesa Sandbox (if you want offline payment options)

#### 4. **B2C (Business to Customer) - FOR REFUNDS/PAYOUTS**
- **Purpose**: Send money to customers
- **Use Case**: Refunds, affiliate payouts, cashback
- **Your Implementation**: Could be used for commission payments to retailers
- **Select**: ✅ M-Pesa Sandbox (if you plan to do automated payouts)

#### 5. **Transaction Status Query - RECOMMENDED**
- **Purpose**: Check payment status
- **Use Case**: Verify payment completion
- **Your Implementation**: Used in your `pollTransactionStatus()` function
- **Select**: ✅ M-Pesa Sandbox

### ❌ **Not Needed for BoostKe**

#### B2B (Business to Business)
- **Purpose**: Payments between businesses
- **Use Case**: Bulk payments to suppliers
- **Your System**: Not currently implemented
- **Select**: ❌ Skip for now

#### Pre-Tips Sandbox & Bill Manager
- **Purpose**: Specialized payment scenarios
- **Use Case**: Not applicable to e-commerce
- **Select**: ❌ Skip

## Step 3: Recommended API Selection for BoostKe

Based on your screenshot, select these checkboxes:

```
✅ Lipa Na M-Pesa Sandbox
   For Lipa Na M-Pesa express

✅ M-Pesa Sandbox  
   For M-Pesa Sandbox B2B, B2C and C2B APIs

❌ Pre-Tips Sandbox
   Pinless Top Up Sandbox API

❌ Bill Manager Sandbox
   Bill Manager Generic Sandbox APIs

❌ B2B Express Checkout
   B2B Express Checkout Sandbox APIs

✅ M-Pesa Ratiba Sandbox (Optional)
   M-Pesa Ratiba Sandbox API
```

## Step 4: Complete App Creation

1. Click "CREATE APP" after selecting appropriate APIs
2. Wait for app approval (usually instant for sandbox)
3. Once approved, you'll get your credentials

## Step 5: Obtain API Credentials

After app creation, you'll receive:

### Sandbox Credentials
```
Consumer Key: [Your Consumer Key]
Consumer Secret: [Your Consumer Secret]
Shortcode: [Your Test Shortcode - usually 174379]
Passkey: [Your STK Push Passkey]
```

### Production Credentials (After Go-Live)
```
Consumer Key: [Production Consumer Key]
Consumer Secret: [Production Consumer Secret]  
Shortcode: [Your Business Shortcode/Paybill]
Passkey: [Production STK Push Passkey]
```

## Step 6: Configure Your BoostKe Environment

Update your `.env` file:

### Sandbox Configuration
```bash
# M-Pesa Sandbox Configuration
MPESA_ENVIRONMENT=sandbox
MPESA_CONSUMER_KEY=your_sandbox_consumer_key
MPESA_CONSUMER_SECRET=your_sandbox_consumer_secret
MPESA_SHORTCODE=174379
MPESA_PASSKEY=your_sandbox_passkey
MPESA_CALLBACK_URL=https://yourdomain.com/api/mpesa/callback
MPESA_TIMEOUT_URL=https://yourdomain.com/api/mpesa/timeout

# STK Push Configuration
MPESA_STK_SHORTCODE=174379
MPESA_INITIATOR_NAME=testapi
MPESA_SECURITY_CREDENTIAL=your_security_credential

# API URLs (Sandbox)
MPESA_BASE_URL=https://sandbox.safaricom.co.ke
```

### Production Configuration (After Testing)
```bash
# M-Pesa Production Configuration
MPESA_ENVIRONMENT=production
MPESA_CONSUMER_KEY=your_production_consumer_key
MPESA_CONSUMER_SECRET=your_production_consumer_secret
MPESA_SHORTCODE=your_paybill_number
MPESA_PASSKEY=your_production_passkey
MPESA_CALLBACK_URL=https://boostke.co.ke/api/mpesa/callback
MPESA_TIMEOUT_URL=https://boostke.co.ke/api/mpesa/timeout

# STK Push Configuration
MPESA_STK_SHORTCODE=your_paybill_number
MPESA_INITIATOR_NAME=your_initiator_name
MPESA_SECURITY_CREDENTIAL=your_production_security_credential

# API URLs (Production)
MPESA_BASE_URL=https://api.safaricom.co.ke
```

## Step 7: Set Up Callback URLs

### 7.1 Configure Callback Endpoints
Ensure your callback URLs are accessible:

```javascript
// Your existing callback handler in routes/mpesa/mpesa.js
router.post("/callback", async (req, res) => {
    // Handle M-Pesa payment callbacks
    console.log("M-Pesa Callback:", req.body);
    // Update transaction status in database
    res.status(200).json({ ResultCode: 0, ResultDesc: "Success" });
});

router.post("/timeout", async (req, res) => {
    // Handle payment timeouts
    console.log("M-Pesa Timeout:", req.body);
    res.status(200).json({ ResultCode: 0, ResultDesc: "Success" });
});
```

### 7.2 Register Callback URLs in Daraja
1. Go to your app settings in Daraja portal
2. Register these URLs:
   - **Callback URL**: `https://yourdomain.com/api/mpesa/callback`
   - **Timeout URL**: `https://yourdomain.com/api/mpesa/timeout`
   - **Validation URL**: `https://yourdomain.com/api/mpesa/validate` (for C2B)

## Step 8: Testing Your Integration

### 8.1 Test Numbers (Sandbox Only)
```
Test Phone Numbers: 254708374149, 254711123456, 254701234567
Test Amount: Any amount between 1-50000
Test PIN: 1234 (for sandbox)
```

### 8.2 Test Your Implementation
1. Add items to cart on your website
2. Proceed to checkout
3. Enter a test phone number
4. Complete STK push on your phone
5. Verify payment status updates

## Step 9: Go-Live Process

### 9.1 Prerequisites for Production
- [ ] Completed sandbox testing
- [ ] Valid SSL certificate on your domain
- [ ] Business registration documents
- [ ] M-Pesa paybill/till number
- [ ] Completed KYB (Know Your Business) with Safaricom

### 9.2 Go-Live Steps
1. Submit go-live request in Daraja portal
2. Provide required business documents
3. Wait for approval (3-5 business days)
4. Receive production credentials
5. Update environment variables
6. Deploy to production
7. Test with real transactions

## Step 10: API-Specific Configurations

### STK Push (Your Primary Use)
```javascript
// Already implemented in your mpesaService.js
const stkPushRequest = {
    BusinessShortCode: process.env.MPESA_STK_SHORTCODE,
    Password: Buffer.from(shortcode + passkey + timestamp).toString('base64'),
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phoneNumber,
    PartyB: process.env.MPESA_STK_SHORTCODE,
    PhoneNumber: phoneNumber,
    CallBackURL: process.env.MPESA_CALLBACK_URL,
    AccountReference: accountReference,
    TransactionDesc: description
};
```

### C2B Configuration (Optional)
```javascript
// Register C2B URLs
const c2bRegister = {
    ShortCode: process.env.MPESA_SHORTCODE,
    ResponseType: "Completed", // or "Cancelled"
    ConfirmationURL: `${process.env.BASE_URL}/api/mpesa/c2b/confirmation`,
    ValidationURL: `${process.env.BASE_URL}/api/mpesa/c2b/validation`
};
```

### B2C Configuration (For Payouts)
```javascript
// B2C Payment Request
const b2cRequest = {
    InitiatorName: process.env.MPESA_INITIATOR_NAME,
    SecurityCredential: process.env.MPESA_SECURITY_CREDENTIAL,
    CommandID: "BusinessPayment", // or "SalaryPayment", "PromotionPayment"
    Amount: amount,
    PartyA: process.env.MPESA_SHORTCODE,
    PartyB: recipientPhone,
    Remarks: "Payout from BoostKe",
    QueueTimeOutURL: process.env.MPESA_TIMEOUT_URL,
    ResultURL: process.env.MPESA_CALLBACK_URL,
    Occasion: "Commission Payment"
};
```

## Step 11: Security Best Practices

### 11.1 Environment Security
```bash
# Use strong, unique credentials
# Rotate keys regularly
# Use HTTPS for all callback URLs
# Validate all incoming requests
# Log all transactions for audit
```

### 11.2 Callback Security
```javascript
// Validate M-Pesa callbacks
const validateCallback = (req, res, next) => {
    // Verify callback authenticity
    // Check IP whitelist (M-Pesa IPs)
    // Validate request structure
    next();
};
```

## Step 12: Monitoring and Troubleshooting

### 12.1 Transaction Monitoring
- Monitor callback responses
- Set up alerts for failed transactions
- Regular reconciliation with M-Pesa statements
- Track transaction completion rates

### 12.2 Common Issues
```
Error: Invalid Credentials
Solution: Verify Consumer Key/Secret, check environment

Error: Invalid Phone Number
Solution: Ensure format 254XXXXXXXXX

Error: Duplicate Transaction
Solution: Use unique transaction references

Error: Insufficient Funds
Solution: Customer-side issue, inform user
```

## Step 13: Your Current Implementation Compatibility

Your BoostKe system is already well-designed for M-Pesa integration:

### ✅ What's Already Perfect
- STK Push implementation
- Transaction polling
- Database transaction tracking
- Cart checkout integration
- Error handling
- Phone number validation

### 🔧 What You Might Add Later
- C2B payment validation
- B2C payout system for commissions
- Transaction reconciliation
- Advanced reporting

## Conclusion

Based on your system architecture, start with:
1. **Lipa Na M-Pesa Sandbox** ✅
2. **M-Pesa Sandbox** ✅
3. **Transaction Status Query** ✅

This will fully support your current cart checkout and membership payment features. Add C2B and B2C later as your business grows.

Your existing implementation is production-ready once you complete the Daraja portal setup and obtain the proper credentials!
