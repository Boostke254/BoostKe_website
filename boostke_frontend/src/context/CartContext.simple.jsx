import React, { createContext, useContext, useReducer, useEffect } from 'react';

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

// Simple Cart Provider Component (without API calls to test)
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Basic authentication check without API calls
  useEffect(() => {
    try {
      const token = localStorage.getItem('userToken');
      const isAuth = !!token;
      dispatch({ type: CART_ACTIONS.SET_AUTH, payload: isAuth });
      
      if (isAuth) {
        // Initialize with empty cart summary to avoid API calls during startup
        dispatch({
          type: CART_ACTIONS.SET_CART_SUMMARY,
          payload: { total_items: 0, total_amount: 0 }
        });
      }
    } catch (error) {
      console.error('CartProvider initialization error:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Failed to initialize cart' });
    }
  }, []);

  const value = {
    ...state,
    // Add minimal required functions to prevent errors
    addToCart: () => Promise.resolve({ success: false, message: 'Not implemented' }),
    removeFromCart: () => Promise.resolve({ success: false, message: 'Not implemented' }),
    updateQuantity: () => Promise.resolve({ success: false, message: 'Not implemented' }),
    clearCart: () => Promise.resolve({ success: false, message: 'Not implemented' }),
    loadCart: () => Promise.resolve({ success: false, message: 'Not implemented' })
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
