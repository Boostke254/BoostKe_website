const db = require('../db');

class CartService {
    // Get or create cart for user
    static async getOrCreateCart(userId) {
        try {
            const result = await db.query(
                'SELECT get_or_create_cart($1) as cart_id',
                [userId]
            );
            return result.rows[0].cart_id;
        } catch (error) {
            console.error('Error getting/creating cart:', error);
            throw new Error('Failed to get cart');
        }
    }

    // Get user's cart with items
    static async getUserCart(userId) {
        try {
            const cartId = await this.getOrCreateCart(userId);
            
            const cartQuery = `
                SELECT 
                    cs.cart_id,
                    cs.user_id,
                    cs.total_items,
                    cs.total_amount,
                    cs.updated_at
                FROM cart_summary cs
                WHERE cs.user_id = $1
            `;
            
            const itemsQuery = `
                SELECT 
                    ci.cart_item_id,
                    ci.listing_id,
                    ci.retailer_id,
                    ci.quantity,
                    ci.unit_price,
                    ci.total_price,
                    ci.item_type,
                    l.title as item_name,
                    l.description,
                    l.category,
                    l.image_urls,
                    r.business_name as retailer_name
                FROM cart_items ci
                JOIN listings l ON ci.listing_id = l.listing_id
                LEFT JOIN retailers r ON ci.retailer_id = r.retailer_id
                WHERE ci.cart_id = $1
                ORDER BY ci.added_at DESC
            `;

            const [cartResult, itemsResult] = await Promise.all([
                db.query(cartQuery, [userId]),
                db.query(itemsQuery, [cartId])
            ]);

            const cart = cartResult.rows[0] || {
                cart_id: cartId,
                user_id: userId,
                total_items: 0,
                total_amount: 0,
                updated_at: new Date()
            };

            return {
                ...cart,
                items: itemsResult.rows
            };
        } catch (error) {
            console.error('Error getting user cart:', error);
            throw new Error('Failed to retrieve cart');
        }
    }

    // Add item to cart
    static async addToCart(userId, listingId, quantity = 1, itemType = 'product') {
        try {
            const cartId = await this.getOrCreateCart(userId);

            // Get listing details
            const listingQuery = `
                SELECT listing_id, title, price, retailer_id
                FROM listings 
                WHERE listing_id = $1 AND status = 'active'
            `;
            const listingResult = await db.query(listingQuery, [listingId]);
            
            if (listingResult.rows.length === 0) {
                throw new Error('Listing not found or inactive');
            }

            const listing = listingResult.rows[0];
            const unitPrice = parseFloat(listing.price);
            const totalPrice = unitPrice * quantity;

            // Check if item already exists in cart
            const existingItemQuery = `
                SELECT cart_item_id, quantity, total_price
                FROM cart_items 
                WHERE cart_id = $1 AND listing_id = $2
            `;
            const existingResult = await db.query(existingItemQuery, [cartId, listingId]);

            let result;
            if (existingResult.rows.length > 0) {
                // Update existing item
                const existingItem = existingResult.rows[0];
                const newQuantity = existingItem.quantity + quantity;
                const newTotalPrice = unitPrice * newQuantity;

                const updateQuery = `
                    UPDATE cart_items 
                    SET quantity = $1, total_price = $2, updated_at = CURRENT_TIMESTAMP
                    WHERE cart_item_id = $3
                    RETURNING *
                `;
                result = await db.query(updateQuery, [newQuantity, newTotalPrice, existingItem.cart_item_id]);
            } else {
                // Add new item
                const insertQuery = `
                    INSERT INTO cart_items (cart_id, listing_id, retailer_id, quantity, unit_price, total_price, item_type)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                    RETURNING *
                `;
                result = await db.query(insertQuery, [
                    cartId, listingId, listing.retailer_id, quantity, unitPrice, totalPrice, itemType
                ]);
            }

            return {
                success: true,
                message: 'Item added to cart successfully',
                cartItem: result.rows[0]
            };
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw new Error(error.message || 'Failed to add item to cart');
        }
    }

    // Update cart item quantity
    static async updateCartItem(userId, cartItemId, quantity) {
        try {
            if (quantity <= 0) {
                return await this.removeFromCart(userId, cartItemId);
            }

            const cartId = await this.getOrCreateCart(userId);

            // Verify item belongs to user's cart
            const verifyQuery = `
                SELECT ci.cart_item_id, ci.unit_price
                FROM cart_items ci
                JOIN carts c ON ci.cart_id = c.cart_id
                WHERE ci.cart_item_id = $1 AND c.user_id = $2
            `;
            const verifyResult = await db.query(verifyQuery, [cartItemId, userId]);

            if (verifyResult.rows.length === 0) {
                throw new Error('Cart item not found');
            }

            const unitPrice = parseFloat(verifyResult.rows[0].unit_price);
            const totalPrice = unitPrice * quantity;

            const updateQuery = `
                UPDATE cart_items 
                SET quantity = $1, total_price = $2, updated_at = CURRENT_TIMESTAMP
                WHERE cart_item_id = $3
                RETURNING *
            `;
            const result = await db.query(updateQuery, [quantity, totalPrice, cartItemId]);

            return {
                success: true,
                message: 'Cart item updated successfully',
                cartItem: result.rows[0]
            };
        } catch (error) {
            console.error('Error updating cart item:', error);
            throw new Error(error.message || 'Failed to update cart item');
        }
    }

    // Remove item from cart
    static async removeFromCart(userId, cartItemId) {
        try {
            const cartId = await this.getOrCreateCart(userId);

            // Verify item belongs to user's cart and delete
            const deleteQuery = `
                DELETE FROM cart_items ci
                USING carts c
                WHERE ci.cart_id = c.cart_id 
                AND ci.cart_item_id = $1 
                AND c.user_id = $2
                RETURNING ci.*
            `;
            const result = await db.query(deleteQuery, [cartItemId, userId]);

            if (result.rows.length === 0) {
                throw new Error('Cart item not found');
            }

            return {
                success: true,
                message: 'Item removed from cart successfully',
                removedItem: result.rows[0]
            };
        } catch (error) {
            console.error('Error removing from cart:', error);
            throw new Error(error.message || 'Failed to remove item from cart');
        }
    }

    // Clear entire cart
    static async clearCart(userId) {
        try {
            const cartId = await this.getOrCreateCart(userId);

            const deleteQuery = `
                DELETE FROM cart_items 
                WHERE cart_id = $1
                RETURNING COUNT(*) as deleted_count
            `;
            const result = await db.query(deleteQuery, [cartId]);

            return {
                success: true,
                message: 'Cart cleared successfully',
                deletedCount: result.rows[0]?.deleted_count || 0
            };
        } catch (error) {
            console.error('Error clearing cart:', error);
            throw new Error('Failed to clear cart');
        }
    }

    // Get cart summary
    static async getCartSummary(userId) {
        try {
            const summaryQuery = `
                SELECT 
                    total_items,
                    total_amount,
                    updated_at
                FROM cart_summary 
                WHERE user_id = $1
            `;
            const result = await db.query(summaryQuery, [userId]);

            return result.rows[0] || {
                total_items: 0,
                total_amount: 0,
                updated_at: new Date()
            };
        } catch (error) {
            console.error('Error getting cart summary:', error);
            throw new Error('Failed to get cart summary');
        }
    }

    // Validate cart before checkout
    static async validateCart(userId) {
        try {
            const cart = await this.getUserCart(userId);
            const errors = [];

            if (cart.items.length === 0) {
                errors.push('Cart is empty');
                return { valid: false, errors };
            }

            // Check if all items are still active
            for (const item of cart.items) {
                const listingQuery = `
                    SELECT status, price 
                    FROM listings 
                    WHERE listing_id = $1
                `;
                const listingResult = await db.query(listingQuery, [item.listing_id]);

                if (listingResult.rows.length === 0) {
                    errors.push(`Item "${item.item_name}" is no longer available`);
                } else {
                    const listing = listingResult.rows[0];
                    if (listing.status !== 'active') {
                        errors.push(`Item "${item.item_name}" is currently inactive`);
                    }
                    if (parseFloat(listing.price) !== parseFloat(item.unit_price)) {
                        errors.push(`Price changed for "${item.item_name}". Please update your cart.`);
                    }
                }
            }

            return {
                valid: errors.length === 0,
                errors,
                cart
            };
        } catch (error) {
            console.error('Error validating cart:', error);
            throw new Error('Failed to validate cart');
        }
    }

    // Prepare cart for checkout (convert to order format)
    static async prepareCheckoutData(userId) {
        try {
            const validation = await this.validateCart(userId);
            
            if (!validation.valid) {
                throw new Error(`Cart validation failed: ${validation.errors.join(', ')}`);
            }

            const cart = validation.cart;
            const items = cart.items.map(item => ({
                listing_id: item.listing_id,
                item_name: item.item_name,
                quantity: item.quantity,
                unit_price: item.unit_price,
                total_price: item.total_price,
                item_type: item.item_type,
                retailer_id: item.retailer_id
            }));

            return {
                items,
                total_amount: cart.total_amount,
                total_items: cart.total_items
            };
        } catch (error) {
            console.error('Error preparing checkout data:', error);
            throw new Error(error.message || 'Failed to prepare checkout data');
        }
    }
}

module.exports = CartService;
