# BoostKe M-Pesa Integration Guide

## Overview

This comprehensive M-Pesa integration for BoostKe enables secure payments for:
- Membership subscriptions (Aspirant, Visionary, Legacy, Titan)
- Product purchases
- Service bookings
- General payments

The system captures every transaction and implements a complete referral commission system.

## Features

✅ **Complete Transaction Management**
- Database-driven transaction tracking
- M-Pesa STK Push integration
- Real-time payment status updates
- Transaction history and receipts

✅ **Membership System Integration**
- Automated membership upgrades
- Commission calculations
- Wallet management
- Referral tracking

✅ **E-commerce Ready**
- Product checkout flow
- Service booking payments
- Order management
- Inventory tracking

✅ **Security & Compliance**
- Environment-based configuration
- Secure callback handling
- Transaction validation
- Error handling and logging

## Database Setup

1. **Run the database migration:**
```bash
psql -U postgres -d boostke -f boostke_db/transactions_tables.sql
```

2. **Verify tables were created:**
```sql
-- Check if tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('transactions', 'mpesa_transactions', 'orders', 'boost_wallets');
```

## Environment Configuration

Update your `.env` file with M-Pesa credentials:

```env
# M-Pesa Configuration
MPESA_ENVIRONMENT=sandbox
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_BUSINESS_SHORT_CODE=174379
MPESA_PASSKEY=your_passkey
MPESA_CALLBACK_URL=https://yourdomain.com/api/mpesa/callback
MPESA_TIMEOUT_URL=https://yourdomain.com/api/mpesa/timeout
```

## API Endpoints

### 1. General Payment
```javascript
POST /api/mpesa/pay
{
  "user_id": 123,
  "phone_number": "254712345678",
  "amount": 1000,
  "transaction_type": "product_purchase",
  "description": "Product purchase",
  "metadata": {
    "product_id": 456,
    "additional_info": "Extra details"
  }
}
```

### 2. Membership Payment
```javascript
POST /api/mpesa/membership-payment
{
  "user_id": 123,
  "phone_number": "254712345678",
  "membership_tier": "visionary",
  "duration_months": 12
}
```

### 3. Product/Service Checkout
```javascript
POST /api/mpesa/checkout
{
  "user_id": 123,
  "phone_number": "254712345678",
  "items": [
    {
      "item_id": 1,
      "item_name": "Laptop",
      "quantity": 1,
      "unit_price": 50000,
      "total_price": 50000
    }
  ],
  "shipping_address": {
    "street": "123 Main St",
    "city": "Nairobi",
    "postal_code": "00100"
  },
  "order_type": "product"
}
```

### 4. Check Transaction Status
```javascript
GET /api/mpesa/status/:checkoutRequestId
```

### 5. Get Transaction History
```javascript
GET /api/mpesa/transactions/user/:userId?limit=50&offset=0
```

## Frontend Integration

### React Component Usage

```jsx
import React from 'react';
import MpesaPayment from './components/MpesaPayment';

function CheckoutPage() {
  const user = { user_id: 123, name: "John Doe" };
  
  const handlePaymentSuccess = (result) => {
    console.log('Payment successful:', result);
    // Redirect or update UI
  };
  
  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
    // Show error message
  };

  return (
    <MpesaPayment
      user={user}
      paymentType="membership"
      paymentData={{
        membership_tier: "visionary",
        duration_months: 12
      }}
      onSuccess={handlePaymentSuccess}
      onError={handlePaymentError}
    />
  );
}
```

### JavaScript/Vanilla JS Usage

```javascript
import { BoostKePayments } from './utils/payments.js';

const payments = new BoostKePayments('http://localhost:5000/api');

// Membership payment
const membershipPayment = async () => {
  try {
    const result = await payments.payMembership({
      user_id: 123,
      phone_number: '254712345678',
      membership_tier: 'visionary'
    });
    
    console.log('Payment initiated:', result);
    
    // Poll for status
    const status = await payments.pollTransactionStatus(
      result.data.checkout_request_id
    );
    
    console.log('Payment completed:', status);
  } catch (error) {
    console.error('Payment error:', error);
  }
};
```

## Webhook/Callback Handling

The system automatically handles M-Pesa callbacks at `/api/mpesa/callback`. When a payment is completed:

1. **Transaction is updated** with M-Pesa receipt details
2. **Membership is upgraded** (for membership payments)
3. **Orders are created** (for product/service purchases)
4. **Commissions are calculated** and awarded to referrers
5. **Wallet balances are updated**

## Commission System

The referral commission system automatically calculates and awards commissions based on membership tiers:

| Tier | Membership Commission | Purchase Commission |
|------|---------------------|-------------------|
| Aspirant | 0% | 1% |
| Visionary | 5% | 2% |
| Legacy | 10% | 3% |
| Titan | 15% | 5% |
| Invisible | 20% | 7% |

## Transaction Flow

### 1. Payment Initiation
```
User clicks "Pay" → Frontend validates → API creates transaction → M-Pesa STK Push
```

### 2. User Payment
```
User receives SMS → Enters M-Pesa PIN → Confirms payment
```

### 3. Callback Processing
```
M-Pesa sends callback → API processes → Updates transaction → Triggers post-payment actions
```

### 4. Post-Payment Actions
```
Update membership → Create orders → Calculate commissions → Update wallets
```

## Testing

### Sandbox Testing
1. Use test phone numbers: `254708374149`, `254711222333`, etc.
2. Use the test shortcode: `174379`
3. Monitor logs for callback responses

### Production Setup
1. Update `MPESA_ENVIRONMENT=production`
2. Use production credentials
3. Update callback URLs to production domain
4. Test with small amounts first

## Error Handling

The system handles various error scenarios:

- **Invalid phone numbers**: Validates format before API calls
- **Insufficient funds**: M-Pesa error codes are captured
- **Network timeouts**: Automatic retry mechanisms
- **Callback failures**: Graceful error handling without affecting payments

## Security Considerations

1. **Environment Variables**: Never commit credentials to version control
2. **HTTPS Only**: All production URLs must use HTTPS
3. **Callback Validation**: Verify callback authenticity (implement IP whitelisting)
4. **Rate Limiting**: Implement API rate limiting for production
5. **Logging**: Log transactions but never log sensitive data

## Monitoring & Analytics

### Transaction Monitoring
```sql
-- Daily transaction summary
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_transactions,
  SUM(amount) as total_amount,
  COUNT(CASE WHEN status = 'completed' THEN 1 END) as successful_payments
FROM transactions 
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

### Commission Analytics
```sql
-- Commission summary by tier
SELECT 
  membership_tier,
  COUNT(*) as commission_count,
  SUM(commission_amount) as total_commissions
FROM commissions 
WHERE status = 'approved'
GROUP BY membership_tier;
```

## Support & Troubleshooting

### Common Issues

1. **"Invalid phone number"**: Ensure format is 254XXXXXXXXX
2. **"Transaction timeout"**: Check M-Pesa system status
3. **"Callback not received"**: Verify callback URL is accessible
4. **"Insufficient permissions"**: Check M-Pesa API credentials

### Debug Mode
Enable detailed logging by setting `NODE_ENV=development` in your environment.

## Next Steps

1. **Set up production M-Pesa account** with Safaricom
2. **Configure SSL certificates** for callback URLs
3. **Implement rate limiting** for API endpoints
4. **Set up monitoring** and alerting
5. **Test thoroughly** with real transactions

## Support

For technical support, refer to:
- M-Pesa API Documentation: https://developer.safaricom.co.ke/
- BoostKe Technical Team: tech@boostke.co.ke
