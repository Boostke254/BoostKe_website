import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

class CartService {
    constructor() {
        this.api = axios.create({
            baseURL: `${API_BASE_URL}/cart`,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });

        // Add token to requests
        this.api.interceptors.request.use((config) => {
            const token = localStorage.getItem('userToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }

    // Get user's cart with all items
    async getCart() {
        try {
            const response = await this.api.get('/');
            return response.data;
        } catch (error) {
            console.error('Get cart error:', error);
            throw this.handleError(error);
        }
    }

    // Add item to cart
    async addToCart(listingId, quantity = 1, itemType = 'product') {
        try {
            const response = await this.api.post('/add', {
                listing_id: listingId,
                quantity,
                item_type: itemType
            });
            return response.data;
        } catch (error) {
            console.error('Add to cart error:', error);
            throw this.handleError(error);
        }
    }

    // Update cart item quantity
    async updateCartItem(cartItemId, quantity) {
        try {
            const response = await this.api.put(`/item/${cartItemId}`, {
                quantity
            });
            return response.data;
        } catch (error) {
            console.error('Update cart item error:', error);
            throw this.handleError(error);
        }
    }

    // Remove item from cart
    async removeFromCart(cartItemId) {
        try {
            const response = await this.api.delete(`/item/${cartItemId}`);
            return response.data;
        } catch (error) {
            console.error('Remove from cart error:', error);
            throw this.handleError(error);
        }
    }

    // Clear entire cart
    async clearCart() {
        try {
            const response = await this.api.delete('/clear');
            return response.data;
        } catch (error) {
            console.error('Clear cart error:', error);
            throw this.handleError(error);
        }
    }

    // Get cart summary (items count and total)
    async getCartSummary() {
        try {
            const response = await this.api.get('/summary');
            return response.data;
        } catch (error) {
            console.error('Get cart summary error:', error);
            throw this.handleError(error);
        }
    }

    // Validate cart before checkout
    async validateCart() {
        try {
            const response = await this.api.get('/validate');
            return response.data;
        } catch (error) {
            console.error('Validate cart error:', error);
            throw this.handleError(error);
        }
    }

    // Get checkout data
    async getCheckoutData() {
        try {
            const response = await this.api.get('/checkout-data');
            return response.data;
        } catch (error) {
            console.error('Get checkout data error:', error);
            throw this.handleError(error);
        }
    }

    // Utility methods
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES'
        }).format(amount);
    }

    calculateSubtotal(items) {
        return items.reduce((total, item) => total + parseFloat(item.total_price), 0);
    }

    calculateTotal(subtotal, tax = 0, shipping = 0) {
        return subtotal + tax + shipping;
    }

    // Error handler
    handleError(error) {
        if (error.response) {
            // Server error response
            const message = error.response.data?.message || 'An error occurred';
            return new Error(message);
        } else if (error.request) {
            // Network error
            return new Error('Network error. Please check your connection.');
        } else {
            // Other error
            return new Error(error.message || 'An unexpected error occurred');
        }
    }

    // Check if user is authenticated
    isAuthenticated() {
        return !!localStorage.getItem('userToken');
    }

    // Get user from localStorage
    getCurrentUser() {
        try {
            const userStr = localStorage.getItem('user');
            return userStr ? JSON.parse(userStr) : null;
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    }
}

export default CartService;
