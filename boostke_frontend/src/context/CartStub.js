// Minimal cart stub to prevent errors
export const useCart = () => {
  return {
    cart: null,
    cartSummary: { total_items: 0, total_amount: 0 },
    loading: false,
    error: null,
    isAuthenticated: false,
    addToCart: () => Promise.resolve({ success: false, message: 'Cart not available' }),
    removeFromCart: () => Promise.resolve({ success: false, message: 'Cart not available' }),
    updateQuantity: () => Promise.resolve({ success: false, message: 'Cart not available' }),
    clearCart: () => Promise.resolve({ success: false, message: 'Cart not available' }),
    loadCart: () => Promise.resolve({ success: false, message: 'Cart not available' })
  };
};

export const CartProvider = ({ children }) => children;
