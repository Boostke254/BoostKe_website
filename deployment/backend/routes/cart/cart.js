const express = require('express');
const router = express.Router();
const CartService = require('../../utils/cartService');
const { authenticateToken } = require('../../middleware/authMiddleware');

// Middleware to authenticate all cart routes
router.use(authenticateToken);

// Get user's cart with all items
router.get('/', async (req, res) => {
    try {
        const userId = req.user.user_id;
        const cart = await CartService.getUserCart(userId);
        
        res.json({
            success: true,
            message: 'Cart retrieved successfully',
            data: cart
        });
    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to retrieve cart',
            error: error.message
        });
    }
});

// Add item to cart
router.post('/add', async (req, res) => {
    try {
        const userId = req.user.user_id;
        const { listing_id, quantity = 1, item_type = 'product' } = req.body;

        // Validation
        if (!listing_id) {
            return res.status(400).json({
                success: false,
                message: 'Listing ID is required'
            });
        }

        if (quantity <= 0 || !Number.isInteger(quantity)) {
            return res.status(400).json({
                success: false,
                message: 'Quantity must be a positive integer'
            });
        }

        const result = await CartService.addToCart(userId, listing_id, quantity, item_type);
        
        res.json({
            success: true,
            message: result.message,
            data: result.cartItem
        });
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to add item to cart',
            error: error.message
        });
    }
});

// Update cart item quantity
router.put('/item/:cartItemId', async (req, res) => {
    try {
        const userId = req.user.user_id;
        const cartItemId = parseInt(req.params.cartItemId);
        const { quantity } = req.body;

        // Validation
        if (!cartItemId || isNaN(cartItemId)) {
            return res.status(400).json({
                success: false,
                message: 'Valid cart item ID is required'
            });
        }

        if (quantity < 0 || !Number.isInteger(quantity)) {
            return res.status(400).json({
                success: false,
                message: 'Quantity must be a non-negative integer'
            });
        }

        const result = await CartService.updateCartItem(userId, cartItemId, quantity);
        
        res.json({
            success: true,
            message: result.message,
            data: result.cartItem
        });
    } catch (error) {
        console.error('Update cart item error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to update cart item',
            error: error.message
        });
    }
});

// Remove item from cart
router.delete('/item/:cartItemId', async (req, res) => {
    try {
        const userId = req.user.user_id;
        const cartItemId = parseInt(req.params.cartItemId);

        // Validation
        if (!cartItemId || isNaN(cartItemId)) {
            return res.status(400).json({
                success: false,
                message: 'Valid cart item ID is required'
            });
        }

        const result = await CartService.removeFromCart(userId, cartItemId);
        
        res.json({
            success: true,
            message: result.message,
            data: result.removedItem
        });
    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to remove item from cart',
            error: error.message
        });
    }
});

// Clear entire cart
router.delete('/clear', async (req, res) => {
    try {
        const userId = req.user.user_id;
        const result = await CartService.clearCart(userId);
        
        res.json({
            success: true,
            message: result.message,
            data: { deletedCount: result.deletedCount }
        });
    } catch (error) {
        console.error('Clear cart error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to clear cart',
            error: error.message
        });
    }
});

// Get cart summary (items count and total)
router.get('/summary', async (req, res) => {
    try {
        const userId = req.user.user_id;
        const summary = await CartService.getCartSummary(userId);
        
        res.json({
            success: true,
            message: 'Cart summary retrieved successfully',
            data: summary
        });
    } catch (error) {
        console.error('Get cart summary error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to retrieve cart summary',
            error: error.message
        });
    }
});

// Validate cart before checkout
router.get('/validate', async (req, res) => {
    try {
        const userId = req.user.user_id;
        const validation = await CartService.validateCart(userId);
        
        res.json({
            success: true,
            message: validation.valid ? 'Cart is valid' : 'Cart validation failed',
            data: {
                valid: validation.valid,
                errors: validation.errors,
                cart: validation.cart
            }
        });
    } catch (error) {
        console.error('Validate cart error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to validate cart',
            error: error.message
        });
    }
});

// Prepare cart data for checkout
router.get('/checkout-data', async (req, res) => {
    try {
        const userId = req.user.user_id;
        const checkoutData = await CartService.prepareCheckoutData(userId);
        
        res.json({
            success: true,
            message: 'Checkout data prepared successfully',
            data: checkoutData
        });
    } catch (error) {
        console.error('Prepare checkout data error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to prepare checkout data',
            error: error.message
        });
    }
});

module.exports = router;
