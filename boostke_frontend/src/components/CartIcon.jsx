import React, { useState, useEffect } from 'react';
import { 
  IconButton, 
  Badge, 
  Tooltip 
} from '@mui/material';
import { 
  ShoppingCartOutlined 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import CartService from '../utils/cartService';

const CartIcon = ({ 
  showCount = true,
  color = 'inherit',
  size = 'medium'
}) => {
  const navigate = useNavigate();
  const cartService = new CartService();
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only fetch cart count if user is authenticated
    if (cartService.isAuthenticated()) {
      fetchCartCount();
      
      // Set up interval to refresh cart count every 30 seconds
      const interval = setInterval(fetchCartCount, 30000);
      
      return () => clearInterval(interval);
    }
  }, []);

  const fetchCartCount = async () => {
    try {
      setLoading(true);
      const response = await cartService.getCartSummary();
      
      if (response.success) {
        setCartCount(response.data.total_items || 0);
      }
    } catch (error) {
      console.error('Error fetching cart count:', error);
      setCartCount(0);
    } finally {
      setLoading(false);
    }
  };

  const handleCartClick = () => {
    if (!cartService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    navigate('/cart');
  };

  // Add method to manually refresh cart count (can be called from other components)
  const refreshCartCount = () => {
    if (cartService.isAuthenticated()) {
      fetchCartCount();
    }
  };

  // Expose refresh method for external use
  React.useImperativeHandle(React.forwardRef, () => ({
    refreshCartCount
  }));

  if (!cartService.isAuthenticated()) {
    return (
      <Tooltip title="Login to view cart">
        <IconButton
          color={color}
          size={size}
          onClick={handleCartClick}
        >
          <ShoppingCartOutlined />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Tooltip title="View cart">
      <IconButton
        color={color}
        size={size}
        onClick={handleCartClick}
        disabled={loading}
      >
        {showCount && cartCount > 0 ? (
          <Badge 
            badgeContent={cartCount > 99 ? '99+' : cartCount} 
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                right: -3,
                top: -3,
                border: '2px solid white',
                padding: '0 4px',
                fontSize: '0.75rem',
                minWidth: '20px',
                height: '20px'
              }
            }}
          >
            <ShoppingCartOutlined />
          </Badge>
        ) : (
          <ShoppingCartOutlined />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default CartIcon;
