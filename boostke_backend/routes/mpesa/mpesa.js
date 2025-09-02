const express = require("express");
const MpesaService = require("../../utils/mpesaService");
const pool = require("../../db");

const router = express.Router();
const mpesaService = new MpesaService();

/**
 * Initiate M-Pesa STK Push Payment
 * POST /api/mpesa/pay
 */
router.post("/pay", async (req, res) => {
    try {
        const {
            user_id,
            phone_number,
            amount,
            transaction_type, // 'product_purchase', 'service_booking', 'membership_payment'
            description,
            account_reference,
            metadata
        } = req.body;

        // Validate required fields
        if (!user_id || !phone_number || !amount || !transaction_type) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: user_id, phone_number, amount, transaction_type"
            });
        }

        // Validate phone number format (Kenyan format)
        const phoneRegex = /^254[17]\d{8}$/;
        const formattedPhone = phone_number.replace(/^0/, '254').replace(/^\+/, '');
        
        if (!phoneRegex.test(formattedPhone)) {
            return res.status(400).json({
                success: false,
                message: "Invalid phone number format. Use format: 254XXXXXXXXX"
            });
        }

        // Validate amount (minimum 1 KES)
        if (amount < 1) {
            return res.status(400).json({
                success: false,
                message: "Minimum payment amount is 1 KES"
            });
        }

        // Verify user exists
        const userResult = await pool.query('SELECT user_id FROM users WHERE user_id = $1', [user_id]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const paymentData = {
            user_id,
            phone_number: formattedPhone,
            amount: parseFloat(amount),
            transaction_type,
            description: description || 'BoostKe Payment',
            account_reference: account_reference || `BOOST${user_id}`,
            metadata: metadata || {}
        };

        const result = await mpesaService.initiateSTKPush(paymentData);

        res.json({
            success: true,
            message: "Payment initiated successfully. Please check your phone for M-Pesa prompt.",
            data: {
                transaction_id: result.transaction_id,
                transaction_reference: result.transaction_reference,
                checkout_request_id: result.checkout_request_id,
                customer_message: result.customer_message
            }
        });

    } catch (error) {
        console.error("Payment initiation error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to initiate payment"
        });
    }
});

/**
 * M-Pesa Callback URL
 * POST /api/mpesa/callback
 */
router.post("/callback", async (req, res) => {
    try {
        console.log("M-Pesa Callback received:", JSON.stringify(req.body, null, 2));
        
        await mpesaService.handleCallback(req.body);
        
        // Always respond with success to M-Pesa
        res.json({
            ResultCode: 0,
            ResultDesc: "Callback processed successfully"
        });

    } catch (error) {
        console.error("Callback processing error:", error);
        
        // Still respond with success to avoid M-Pesa retries
        res.json({
            ResultCode: 0,
            ResultDesc: "Callback received"
        });
    }
});

/**
 * M-Pesa Timeout URL
 * POST /api/mpesa/timeout
 */
router.post("/timeout", async (req, res) => {
    try {
        console.log("M-Pesa Timeout received:", JSON.stringify(req.body, null, 2));
        
        const { CheckoutRequestID } = req.body;
        
        // Update transaction as timed out
        await pool.query(`
            UPDATE transactions 
            SET status = 'failed', failure_reason = 'Transaction timeout', failed_at = CURRENT_TIMESTAMP
            WHERE mpesa_checkout_request_id = $1
        `, [CheckoutRequestID]);

        res.json({
            ResultCode: 0,
            ResultDesc: "Timeout processed successfully"
        });

    } catch (error) {
        console.error("Timeout processing error:", error);
        res.json({
            ResultCode: 0,
            ResultDesc: "Timeout received"
        });
    }
});

/**
 * Check Transaction Status
 * GET /api/mpesa/status/:checkoutRequestId
 */
router.get("/status/:checkoutRequestId", async (req, res) => {
    try {
        const { checkoutRequestId } = req.params;
        
        const status = await mpesaService.checkTransactionStatus(checkoutRequestId);
        
        res.json({
            success: true,
            data: status
        });

    } catch (error) {
        console.error("Status check error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to check transaction status"
        });
    }
});

/**
 * Get Transaction by Reference
 * GET /api/mpesa/transaction/:reference
 */
router.get("/transaction/:reference", async (req, res) => {
    try {
        const { reference } = req.params;
        
        const transaction = await mpesaService.getTransactionByReference(reference);
        
        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });
        }

        res.json({
            success: true,
            data: transaction
        });

    } catch (error) {
        console.error("Transaction fetch error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch transaction"
        });
    }
});

/**
 * Get User Transactions
 * GET /api/mpesa/transactions/user/:userId
 */
router.get("/transactions/user/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const { limit = 50, offset = 0 } = req.query;
        
        const transactions = await mpesaService.getUserTransactions(
            userId, 
            parseInt(limit), 
            parseInt(offset)
        );

        res.json({
            success: true,
            data: transactions,
            pagination: {
                limit: parseInt(limit),
                offset: parseInt(offset),
                total: transactions.length
            }
        });

    } catch (error) {
        console.error("User transactions fetch error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch user transactions"
        });
    }
});

/**
 * Membership Payment Endpoint
 * POST /api/mpesa/membership-payment
 */
router.post("/membership-payment", async (req, res) => {
    try {
        const {
            user_id,
            phone_number,
            membership_tier,
            duration_months = 12
        } = req.body;

        // Membership tier pricing
        const membershipPricing = {
            'aspirant': 0,
            'visionary': 999,
            'legacy': 2999,
            'titan': 5999
            // 'invisible' is invite-only
        };

        if (!membershipPricing.hasOwnProperty(membership_tier)) {
            return res.status(400).json({
                success: false,
                message: "Invalid membership tier"
            });
        }

        const amount = membershipPricing[membership_tier];

        if (amount === 0) {
            return res.status(400).json({
                success: false,
                message: "Aspirant membership is free. No payment required."
            });
        }

        // Get current membership for renewal check
        const currentMembershipResult = await pool.query(
            'SELECT membership_tier FROM users WHERE user_id = $1',
            [user_id]
        );

        const isRenewal = currentMembershipResult.rows.length > 0 && 
                         currentMembershipResult.rows[0].membership_tier === membership_tier;

        const paymentData = {
            user_id,
            phone_number,
            amount,
            transaction_type: 'membership_payment',
            description: `${membership_tier.charAt(0).toUpperCase() + membership_tier.slice(1)} Membership ${isRenewal ? 'Renewal' : 'Upgrade'}`,
            account_reference: `MEMBERSHIP${user_id}`,
            metadata: {
                membership_tier,
                duration_months,
                is_renewal: isRenewal,
                previous_tier: currentMembershipResult.rows[0]?.membership_tier
            }
        };

        const result = await mpesaService.initiateSTKPush(paymentData);

        res.json({
            success: true,
            message: "Membership payment initiated successfully. Please check your phone for M-Pesa prompt.",
            data: {
                transaction_id: result.transaction_id,
                transaction_reference: result.transaction_reference,
                checkout_request_id: result.checkout_request_id,
                membership_tier,
                amount,
                customer_message: result.customer_message
            }
        });

    } catch (error) {
        console.error("Membership payment error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to initiate membership payment"
        });
    }
});

/**
 * Product/Service Checkout
 * POST /api/mpesa/checkout
 */
router.post("/checkout", async (req, res) => {
    try {
        const {
            user_id,
            phone_number,
            items, // Array of items being purchased
            shipping_address,
            billing_address,
            order_type = 'product' // 'product' or 'service'
        } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Items array is required and cannot be empty"
            });
        }

        // Calculate total amount
        let totalAmount = 0;
        const processedItems = items.map(item => {
            const itemTotal = parseFloat(item.unit_price) * parseInt(item.quantity);
            totalAmount += itemTotal;
            
            return {
                ...item,
                total_price: itemTotal
            };
        });

        const transactionType = order_type === 'service' ? 'service_booking' : 'product_purchase';

        const paymentData = {
            user_id,
            phone_number,
            amount: totalAmount,
            transaction_type: transactionType,
            description: `${order_type.charAt(0).toUpperCase() + order_type.slice(1)} Purchase - ${items.length} item(s)`,
            account_reference: `${order_type.toUpperCase()}${user_id}${Date.now()}`,
            metadata: {
                items: processedItems,
                shipping_address,
                billing_address,
                order_type
            }
        };

        const result = await mpesaService.initiateSTKPush(paymentData);

        res.json({
            success: true,
            message: "Checkout initiated successfully. Please check your phone for M-Pesa prompt.",
            data: {
                transaction_id: result.transaction_id,
                transaction_reference: result.transaction_reference,
                checkout_request_id: result.checkout_request_id,
                total_amount: totalAmount,
                items_count: items.length,
                customer_message: result.customer_message
            }
        });

    } catch (error) {
        console.error("Checkout error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to initiate checkout"
        });
    }
});

/**
 * Cart Checkout Endpoint
 * POST /api/mpesa/cart-checkout
 */
router.post("/cart-checkout", async (req, res) => {
    try {
        const { user_id, phone_number } = req.body;

        if (!user_id || !phone_number) {
            return res.status(400).json({
                success: false,
                message: "User ID and phone number are required"
            });
        }

        // Get cart data using CartService
        const CartService = require("../../utils/cartService");
        
        try {
            const checkoutData = await CartService.prepareCheckoutData(user_id);
            
            if (!checkoutData.items || checkoutData.items.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Cart is empty"
                });
            }

            // Create order record first
            const orderQuery = `
                INSERT INTO orders (user_id, total_amount, order_type, status, created_at)
                VALUES ($1, $2, $3, 'pending', CURRENT_TIMESTAMP)
                RETURNING order_id
            `;
            const orderResult = await pool.query(orderQuery, [
                user_id,
                checkoutData.total_amount,
                'cart_purchase'
            ]);
            const orderId = orderResult.rows[0].order_id;

            // Insert order items
            for (const item of checkoutData.items) {
                const orderItemQuery = `
                    INSERT INTO order_items (order_id, listing_id, item_name, quantity, unit_price, total_price, item_type)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                `;
                await pool.query(orderItemQuery, [
                    orderId,
                    item.listing_id,
                    item.item_name,
                    item.quantity,
                    item.unit_price,
                    item.total_price,
                    item.item_type
                ]);
            }

            // Prepare M-Pesa payment data
            const paymentData = {
                user_id,
                phone_number,
                amount: checkoutData.total_amount,
                transaction_type: 'cart_checkout',
                description: `Cart Purchase - ${checkoutData.total_items} items`,
                account_reference: `ORDER${orderId}`,
                metadata: {
                    order_id: orderId,
                    items_count: checkoutData.total_items,
                    cart_items: checkoutData.items
                }
            };

            const result = await mpesaService.initiateSTKPush(paymentData);

            // Update order with transaction reference
            await pool.query(
                'UPDATE orders SET transaction_reference = $1 WHERE order_id = $2',
                [result.transaction_reference, orderId]
            );

            res.json({
                success: true,
                message: "Cart checkout initiated successfully. Please check your phone for M-Pesa prompt.",
                data: {
                    order_id: orderId,
                    transaction_id: result.transaction_id,
                    transaction_reference: result.transaction_reference,
                    checkout_request_id: result.checkout_request_id,
                    total_amount: checkoutData.total_amount,
                    items_count: checkoutData.total_items,
                    customer_message: result.customer_message
                }
            });

        } catch (cartError) {
            console.error("Cart checkout error:", cartError);
            return res.status(400).json({
                success: false,
                message: cartError.message || "Cart validation failed"
            });
        }

    } catch (error) {
        console.error("Cart checkout error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to initiate cart checkout"
        });
    }
});

module.exports = router;