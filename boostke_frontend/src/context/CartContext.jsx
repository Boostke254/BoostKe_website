import React, { createContext, useContext, useReducer, useEffect } from 'react';
import CartService from '../utils/cartService';

// Cart Context
const CartContext = createContext();

// Action types
const CART_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_CART: 'SET_CART',
  SET_ERROR: 'SET_ERROR',
  SET_AUTH: 'SET_AUTH',
  ADD_ITEM_SUCCESS: 'ADD_ITEM_SUCCESS',
  UPDATE_ITEM_SUCCESS: 'UPDATE_ITEM_SUCCESS',
  REMOVE_ITEM_SUCCESS: 'REMOVE_ITEM_SUCCESS',
  CLEAR_CART_SUCCESS: 'CLEAR_CART_SUCCESS',
  SET_CART_SUMMARY: 'SET_CART_SUMMARY'
};

// Initial state
const initialState = {
  cart: null,
  cartSummary: { total_items: 0, total_amount: 0 },
  loading: false,
  error: null,
  isAuthenticated: false
};

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: action.payload ? null : state.error
      };

    case CART_ACTIONS.SET_CART:
      return {
        ...state,
        cart: action.payload,
        cartSummary: {
          total_items: action.payload?.total_items || 0,
          total_amount: action.payload?.total_amount || 0
        },
        loading: false,
        error: null
      };

    case CART_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case CART_ACTIONS.SET_CART_SUMMARY:
      return {
        ...state,
        cartSummary: action.payload
      };

    case CART_ACTIONS.SET_AUTH:
      return {
        ...state,
        isAuthenticated: action.payload
      };

    case CART_ACTIONS.ADD_ITEM_SUCCESS:
    case CART_ACTIONS.UPDATE_ITEM_SUCCESS:
    case CART_ACTIONS.REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        cartSummary: {
          total_items: action.payload?.total_items || 0,
          total_amount: action.payload?.total_amount || 0
        },
        loading: false,
        error: null
      };

    case CART_ACTIONS.CLEAR_CART_SUCCESS:
      return {
        ...state,
        cart: { ...state.cart, items: [], total_items: 0, total_amount: 0 },
        cartSummary: { total_items: 0, total_amount: 0 },
        loading: false,
        error: null
      };

    default:
      return state;
  }
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const cartService = new CartService();

  // Check authentication status
  useEffect(() => {
    const isAuth = cartService.isAuthenticated();
    dispatch({ type: CART_ACTIONS.SET_AUTH, payload: isAuth });
    
    if (isAuth) {
      loadCartSummary();
    }
  }, []);

  // Load cart summary (for header cart icon)
  const loadCartSummary = async () => {
    try {
      const response = await cartService.getCartSummary();
      if (response.success) {
        dispatch({
          type: CART_ACTIONS.SET_CART_SUMMARY,
          payload: response.data
        });
      }
    } catch (error) {
      console.error('Failed to load cart summary:', error);
    }
  };

  // Load full cart
  const loadCart = async () => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      
      const response = await cartService.getCart();
      if (response.success) {
        dispatch({ type: CART_ACTIONS.SET_CART, payload: response.data });
      } else {
        dispatch({ type: CART_ACTIONS.SET_ERROR, payload: response.message });
      }
    } catch (error) {
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // Add item to cart
  const addToCart = async (listingId, quantity = 1, itemType = 'product') => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      
      const response = await cartService.addToCart(listingId, quantity, itemType);
      if (response.success) {
        await loadCartSummary(); // Refresh summary
        dispatch({ type: CART_ACTIONS.SET_LOADING, payload: false });
        return { success: true, message: 'Item added to cart successfully!' };
      } else {
        dispatch({ type: CART_ACTIONS.SET_ERROR, payload: response.message });
        return { success: false, message: response.message };
      }
    } catch (error) {
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, message: error.message };
    }
  };

  // Update cart item
  const updateCartItem = async (cartItemId, quantity) => {
    try {
      const response = await cartService.updateCartItem(cartItemId, quantity);
      if (response.success) {
        await loadCart(); // Refresh full cart
        await loadCartSummary(); // Refresh summary
        return { success: true };
      } else {
        dispatch({ type: CART_ACTIONS.SET_ERROR, payload: response.message });
        return { success: false, message: response.message };
      }
    } catch (error) {
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, message: error.message };
    }
  };

  // Remove cart item
  const removeFromCart = async (cartItemId) => {
    try {
      const response = await cartService.removeFromCart(cartItemId);
      if (response.success) {
        await loadCart(); // Refresh full cart
        await loadCartSummary(); // Refresh summary
        return { success: true };
      } else {
        dispatch({ type: CART_ACTIONS.SET_ERROR, payload: response.message });
        return { success: false, message: response.message };
      }
    } catch (error) {
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, message: error.message };
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      
      const response = await cartService.clearCart();
      if (response.success) {
        dispatch({ type: CART_ACTIONS.CLEAR_CART_SUCCESS });
        return { success: true };
      } else {
        dispatch({ type: CART_ACTIONS.SET_ERROR, payload: response.message });
        return { success: false, message: response.message };
      }
    } catch (error) {
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, message: error.message };
    }
  };

  // Get checkout data
  const getCheckoutData = async () => {
    try {
      const response = await cartService.getCheckoutData();
      return response;
    } catch (error) {
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: CART_ACTIONS.SET_ERROR, payload: null });
  };

  const value = {
    // State
    cart: state.cart,
    cartSummary: state.cartSummary,
    loading: state.loading,
    error: state.error,
    isAuthenticated: cartService.isAuthenticated(),
    
    // Actions
    loadCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCheckoutData,
    clearError,
    loadCartSummary,
    
    // Utilities
    formatCurrency: cartService.formatCurrency.bind(cartService)
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};

// HOC for components that need cart data
export const withCart = (Component) => {
  return function CartWrapper(props) {
    const cart = useCart();
    return <Component {...props} cart={cart} />;
  };
};

export default CartContext;
