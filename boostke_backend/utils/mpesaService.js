const axios = require('axios');
const pool = require('../db');

class MpesaService {
    constructor() {
        this.consumerKey = process.env.MPESA_CONSUMER_KEY;
        this.consumerSecret = process.env.MPESA_CONSUMER_SECRET;
        this.environment = process.env.MPESA_ENVIRONMENT || 'sandbox';
        this.businessShortCode = process.env.MPESA_BUSINESS_SHORT_CODE;
        this.passkey = process.env.MPESA_PASSKEY;
        this.callbackUrl = process.env.MPESA_CALLBACK_URL;
        this.timeoutUrl = process.env.MPESA_TIMEOUT_URL;
        
        // API URLs
        this.baseUrl = this.environment === 'production' 
            ? 'https://api.safaricom.co.ke' 
            : 'https://sandbox.safaricom.co.ke';
    }

    /**
     * Generate M-Pesa API timestamp
     */
    generateTimestamp() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const date = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}${month}${date}${hours}${minutes}${seconds}`;
    }

    /**
     * Generate M-Pesa password
     */
    generatePassword(timestamp) {
        const dataToEncode = `${this.businessShortCode}${this.passkey}${timestamp}`;
        return Buffer.from(dataToEncode).toString('base64');
    }

    /**
     * Get M-Pesa access token
     */
    async getAccessToken() {
        try {
            const auth = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');
            
            const response = await axios.get(
                `${this.baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
                {
                    headers: {
                        'Authorization': `Basic ${auth}`
                    }
                }
            );

            return response.data.access_token;
        } catch (error) {
            console.error('Error getting access token:', error.response?.data || error.message);
            throw new Error('Failed to get M-Pesa access token');
        }
    }

    /**
     * Create a transaction record in database
     */
    async createTransaction(transactionData) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // Create main transaction record
            const transactionQuery = `
                INSERT INTO transactions (
                    transaction_reference, user_id, transaction_type, payment_method,
                    amount, currency, description, metadata, phone_number
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING transaction_id, transaction_reference
            `;

            const transactionResult = await client.query(transactionQuery, [
                transactionData.transaction_reference,
                transactionData.user_id,
                transactionData.transaction_type,
                'mpesa',
                transactionData.amount,
                transactionData.currency || 'KES',
                transactionData.description,
                JSON.stringify(transactionData.metadata || {}),
                transactionData.phone_number
            ]);

            await client.query('COMMIT');
            return transactionResult.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    /**
     * Create M-Pesa transaction record
     */
    async createMpesaTransaction(mpesaData) {
        const query = `
            INSERT INTO mpesa_transactions (
                transaction_id, checkout_request_id, merchant_request_id,
                amount, phone_number, account_reference, transaction_desc
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING mpesa_transaction_id
        `;

        const result = await pool.query(query, [
            mpesaData.transaction_id,
            mpesaData.checkout_request_id,
            mpesaData.merchant_request_id,
            mpesaData.amount,
            mpesaData.phone_number,
            mpesaData.account_reference,
            mpesaData.transaction_desc
        ]);

        return result.rows[0];
    }

    /**
     * Initiate STK Push payment
     */
    async initiateSTKPush(paymentData) {
        try {
            const timestamp = this.generateTimestamp();
            const password = this.generatePassword(timestamp);
            const accessToken = await this.getAccessToken();

            // Generate unique transaction reference
            const transactionRef = `BOOST${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

            // Create transaction record first
            const transaction = await this.createTransaction({
                transaction_reference: transactionRef,
                user_id: paymentData.user_id,
                transaction_type: paymentData.transaction_type,
                amount: paymentData.amount,
                description: paymentData.description,
                metadata: paymentData.metadata,
                phone_number: paymentData.phone_number
            });

            // Prepare STK Push request
            const stkPushData = {
                BusinessShortCode: this.businessShortCode,
                Password: password,
                Timestamp: timestamp,
                TransactionType: 'CustomerPayBillOnline',
                Amount: paymentData.amount,
                PartyA: paymentData.phone_number,
                PartyB: this.businessShortCode,
                PhoneNumber: paymentData.phone_number,
                CallBackURL: this.callbackUrl,
                AccountReference: paymentData.account_reference || transactionRef,
                TransactionDesc: paymentData.description || 'BoostKe Payment'
            };

            const response = await axios.post(
                `${this.baseUrl}/mpesa/stkpush/v1/processrequest`,
                stkPushData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );

            // Create M-Pesa transaction record
            await this.createMpesaTransaction({
                transaction_id: transaction.transaction_id,
                checkout_request_id: response.data.CheckoutRequestID,
                merchant_request_id: response.data.MerchantRequestID,
                amount: paymentData.amount,
                phone_number: paymentData.phone_number,
                account_reference: paymentData.account_reference || transactionRef,
                transaction_desc: paymentData.description || 'BoostKe Payment'
            });

            // Update transaction with M-Pesa checkout request ID
            await pool.query(
                'UPDATE transactions SET mpesa_checkout_request_id = $1, status = $2 WHERE transaction_id = $3',
                [response.data.CheckoutRequestID, 'processing', transaction.transaction_id]
            );

            return {
                success: true,
                transaction_id: transaction.transaction_id,
                transaction_reference: transaction.transaction_reference,
                checkout_request_id: response.data.CheckoutRequestID,
                merchant_request_id: response.data.MerchantRequestID,
                customer_message: response.data.CustomerMessage,
                response_code: response.data.ResponseCode,
                response_description: response.data.ResponseDescription
            };

        } catch (error) {
            console.error('STK Push Error:', error.response?.data || error.message);
            throw new Error(error.response?.data?.errorMessage || 'Failed to initiate M-Pesa payment');
        }
    }

    /**
     * Handle M-Pesa callback
     */
    async handleCallback(callbackData) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const { Body } = callbackData;
            const { stkCallback } = Body;
            const checkoutRequestId = stkCallback.CheckoutRequestID;
            const resultCode = stkCallback.ResultCode;
            const resultDesc = stkCallback.ResultDesc;

            // Update M-Pesa transaction
            await client.query(`
                UPDATE mpesa_transactions 
                SET callback_response = $1, result_code = $2, result_desc = $3, updated_at = CURRENT_TIMESTAMP
                WHERE checkout_request_id = $4
            `, [JSON.stringify(callbackData), resultCode, resultDesc, checkoutRequestId]);

            // Get transaction ID
            const transactionResult = await client.query(
                'SELECT transaction_id FROM mpesa_transactions WHERE checkout_request_id = $1',
                [checkoutRequestId]
            );

            if (transactionResult.rows.length === 0) {
                throw new Error('Transaction not found');
            }

            const transactionId = transactionResult.rows[0].transaction_id;

            if (resultCode === 0) {
                // Payment successful
                const callbackMetadata = stkCallback.CallbackMetadata;
                const items = callbackMetadata.Item;

                let mpesaReceiptNumber = '';
                let transactionDate = '';
                let phoneNumber = '';

                items.forEach(item => {
                    switch (item.Name) {
                        case 'MpesaReceiptNumber':
                            mpesaReceiptNumber = item.Value;
                            break;
                        case 'TransactionDate':
                            transactionDate = item.Value;
                            break;
                        case 'PhoneNumber':
                            phoneNumber = item.Value;
                            break;
                    }
                });

                // Update M-Pesa transaction with receipt details
                await client.query(`
                    UPDATE mpesa_transactions 
                    SET mpesa_receipt_number = $1, transaction_date = $2, updated_at = CURRENT_TIMESTAMP
                    WHERE checkout_request_id = $3
                `, [mpesaReceiptNumber, new Date(transactionDate), checkoutRequestId]);

                // Update main transaction as completed
                await client.query(`
                    UPDATE transactions 
                    SET status = 'completed', mpesa_receipt_number = $1, completed_at = CURRENT_TIMESTAMP
                    WHERE transaction_id = $2
                `, [mpesaReceiptNumber, transactionId]);

                // Process post-payment actions (commissions, wallet updates, etc.)
                await this.processPostPaymentActions(transactionId, client);

            } else {
                // Payment failed
                await client.query(`
                    UPDATE transactions 
                    SET status = 'failed', failure_reason = $1, failed_at = CURRENT_TIMESTAMP
                    WHERE transaction_id = $2
                `, [resultDesc, transactionId]);
            }

            await client.query('COMMIT');
            return { success: true, result_code: resultCode };

        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Callback processing error:', error);
            throw error;
        } finally {
            client.release();
        }
    }

    /**
     * Process post-payment actions (commissions, wallet updates, etc.)
     */
    async processPostPaymentActions(transactionId, client) {
        try {
            // Get transaction details
            const transactionResult = await client.query(`
                SELECT t.*, u.membership_tier 
                FROM transactions t 
                JOIN users u ON t.user_id = u.user_id 
                WHERE t.transaction_id = $1
            `, [transactionId]);

            const transaction = transactionResult.rows[0];

            // Process based on transaction type
            switch (transaction.transaction_type) {
                case 'membership_payment':
                    await this.processMembershipPayment(transaction, client);
                    break;
                case 'product_purchase':
                    await this.processProductPurchase(transaction, client);
                    break;
                case 'service_booking':
                    await this.processServiceBooking(transaction, client);
                    break;
                default:
                    console.log(`No specific processing for transaction type: ${transaction.transaction_type}`);
            }

            // Process referral commissions
            await this.processReferralCommissions(transaction, client);

        } catch (error) {
            console.error('Error in post-payment actions:', error);
            // Don't throw error here to avoid rolling back the successful payment
        }
    }

    /**
     * Process membership payment
     */
    async processMembershipPayment(transaction, client) {
        const metadata = typeof transaction.metadata === 'string' 
            ? JSON.parse(transaction.metadata) 
            : transaction.metadata;

        const membershipTier = metadata.membership_tier;
        const durationMonths = metadata.duration_months || 12;
        const isRenewal = metadata.is_renewal || false;

        // Calculate membership period
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + durationMonths);

        // Create membership transaction record
        await client.query(`
            INSERT INTO membership_transactions 
            (user_id, transaction_id, membership_tier, previous_tier, amount, 
             duration_months, start_date, end_date, is_renewal)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `, [
            transaction.user_id, transaction.transaction_id, membershipTier,
            metadata.previous_tier, transaction.amount, durationMonths,
            startDate, endDate, isRenewal
        ]);

        // Update user membership
        await client.query(`
            UPDATE users 
            SET membership_tier = $1, membership_expiry = $2, updated_at = CURRENT_TIMESTAMP
            WHERE user_id = $3
        `, [membershipTier, endDate, transaction.user_id]);

        // Initialize or update wallet if needed
        await this.ensureWalletExists(transaction.user_id, client);
    }

    /**
     * Process product purchase
     */
    async processProductPurchase(transaction, client) {
        const metadata = typeof transaction.metadata === 'string' 
            ? JSON.parse(transaction.metadata) 
            : transaction.metadata;

        // Create order record
        const orderNumber = `ORD${Date.now()}${Math.random().toString(36).substr(2, 3).toUpperCase()}`;
        
        const orderResult = await client.query(`
            INSERT INTO orders (order_number, user_id, transaction_id, order_type, total_amount, shipping_address, billing_address)
            VALUES ($1, $2, $3, 'product', $4, $5, $6)
            RETURNING order_id
        `, [
            orderNumber, transaction.user_id, transaction.transaction_id,
            transaction.amount, JSON.stringify(metadata.shipping_address || {}),
            JSON.stringify(metadata.billing_address || {})
        ]);

        const orderId = orderResult.rows[0].order_id;

        // Create order items
        if (metadata.items && Array.isArray(metadata.items)) {
            for (const item of metadata.items) {
                await client.query(`
                    INSERT INTO order_items (order_id, item_type, item_id, item_name, quantity, unit_price, total_price, metadata)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                `, [
                    orderId, item.item_type || 'product', item.item_id, item.item_name,
                    item.quantity, item.unit_price, item.total_price, JSON.stringify(item.metadata || {})
                ]);
            }
        }
    }

    /**
     * Process service booking
     */
    async processServiceBooking(transaction, client) {
        // Similar to product purchase but for services
        const metadata = typeof transaction.metadata === 'string' 
            ? JSON.parse(transaction.metadata) 
            : transaction.metadata;

        const orderNumber = `SRV${Date.now()}${Math.random().toString(36).substr(2, 3).toUpperCase()}`;
        
        await client.query(`
            INSERT INTO orders (order_number, user_id, transaction_id, order_type, total_amount, notes)
            VALUES ($1, $2, $3, 'service', $4, $5)
        `, [
            orderNumber, transaction.user_id, transaction.transaction_id,
            transaction.amount, metadata.service_details || ''
        ]);
    }

    /**
     * Process referral commissions
     */
    async processReferralCommissions(transaction, client) {
        // Get referrer information
        const referrerResult = await client.query(`
            SELECT referrer_id FROM users WHERE user_id = $1 AND referrer_id IS NOT NULL
        `, [transaction.user_id]);

        if (referrerResult.rows.length === 0) return;

        const referrerId = referrerResult.rows[0].referrer_id;

        // Get referrer's membership tier for commission calculation
        const referrerInfo = await client.query(`
            SELECT membership_tier FROM users WHERE user_id = $1
        `, [referrerId]);

        if (referrerInfo.rows.length === 0) return;

        const membershipTier = referrerInfo.rows[0].membership_tier;

        // Calculate commission based on membership tier and transaction type
        const commissionRate = this.getCommissionRate(membershipTier, transaction.transaction_type);
        const commissionAmount = (transaction.amount * commissionRate / 100);

        if (commissionAmount > 0) {
            // Create commission record
            await client.query(`
                INSERT INTO commissions 
                (user_id, referred_user_id, transaction_id, commission_type, commission_rate, 
                 commission_amount, base_amount, membership_tier)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            `, [
                referrerId, transaction.user_id, transaction.transaction_id,
                transaction.transaction_type, commissionRate, commissionAmount,
                transaction.amount, membershipTier
            ]);

            // Update referrer's wallet
            await this.updateWalletBalance(referrerId, commissionAmount, 'commission', client);
        }
    }

    /**
     * Get commission rate based on membership tier
     */
    getCommissionRate(membershipTier, transactionType) {
        const rates = {
            'aspirant': { 'membership_payment': 0, 'product_purchase': 1, 'service_booking': 1 },
            'visionary': { 'membership_payment': 5, 'product_purchase': 2, 'service_booking': 2 },
            'legacy': { 'membership_payment': 10, 'product_purchase': 3, 'service_booking': 3 },
            'titan': { 'membership_payment': 15, 'product_purchase': 5, 'service_booking': 5 },
            'invisible': { 'membership_payment': 20, 'product_purchase': 7, 'service_booking': 7 }
        };

        return rates[membershipTier]?.[transactionType] || 0;
    }

    /**
     * Ensure user wallet exists
     */
    async ensureWalletExists(userId, client) {
        const walletResult = await client.query(
            'SELECT wallet_id FROM boost_wallets WHERE user_id = $1',
            [userId]
        );

        if (walletResult.rows.length === 0) {
            await client.query(
                'INSERT INTO boost_wallets (user_id) VALUES ($1)',
                [userId]
            );
        }
    }

    /**
     * Update wallet balance
     */
    async updateWalletBalance(userId, amount, transactionType, client) {
        await this.ensureWalletExists(userId, client);

        // Get current balance
        const walletResult = await client.query(
            'SELECT wallet_id, balance FROM boost_wallets WHERE user_id = $1',
            [userId]
        );

        const wallet = walletResult.rows[0];
        const newBalance = parseFloat(wallet.balance) + parseFloat(amount);

        // Update wallet balance
        await client.query(`
            UPDATE boost_wallets 
            SET balance = $1, total_earned = total_earned + $2, updated_at = CURRENT_TIMESTAMP
            WHERE wallet_id = $3
        `, [newBalance, amount, wallet.wallet_id]);

        // Create wallet transaction record
        await client.query(`
            INSERT INTO wallet_transactions 
            (wallet_id, transaction_type, amount, balance_before, balance_after, description)
            VALUES ($1, $2, $3, $4, $5, $6)
        `, [
            wallet.wallet_id, transactionType, amount, wallet.balance, newBalance,
            `${transactionType} credit`
        ]);
    }

    /**
     * Check transaction status
     */
    async checkTransactionStatus(checkoutRequestId) {
        try {
            const accessToken = await this.getAccessToken();
            const timestamp = this.generateTimestamp();
            const password = this.generatePassword(timestamp);

            const response = await axios.post(
                `${this.baseUrl}/mpesa/stkpushquery/v1/query`,
                {
                    BusinessShortCode: this.businessShortCode,
                    Password: password,
                    Timestamp: timestamp,
                    CheckoutRequestID: checkoutRequestId
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );

            return response.data;
        } catch (error) {
            console.error('Transaction status check error:', error.response?.data || error.message);
            throw new Error('Failed to check transaction status');
        }
    }

    /**
     * Get transaction by reference
     */
    async getTransactionByReference(transactionReference) {
        const result = await pool.query(`
            SELECT t.*, mt.* 
            FROM transactions t 
            LEFT JOIN mpesa_transactions mt ON t.transaction_id = mt.transaction_id 
            WHERE t.transaction_reference = $1
        `, [transactionReference]);

        return result.rows[0] || null;
    }

    /**
     * Get user transactions
     */
    async getUserTransactions(userId, limit = 50, offset = 0) {
        const result = await pool.query(`
            SELECT t.*, mt.mpesa_receipt_number 
            FROM transactions t 
            LEFT JOIN mpesa_transactions mt ON t.transaction_id = mt.transaction_id 
            WHERE t.user_id = $1 
            ORDER BY t.created_at DESC 
            LIMIT $2 OFFSET $3
        `, [userId, limit, offset]);

        return result.rows;
    }
}

module.exports = MpesaService;
