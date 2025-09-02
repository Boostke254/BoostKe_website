import React, { useState } from 'react';
import {
  Button,
  IconButton,
  TextField,
  Box,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  AddShoppingCart,
  Add,
  Remove,
  ShoppingCart
} from '@mui/icons-material';
import CartService from '../utils/cartService';

const AddToCart = ({ 
  listing, 
  variant = 'button', // 'button', 'icon', 'detailed'
  size = 'medium',
  showQuantity = false,
  disabled = false,
  onAddSuccess,
  onAddError
}) => {
  const cartService = new CartService();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [showQuantityDialog, setShowQuantityDialog] = useState(false);

  const isAuthenticated = cartService.isAuthenticated();

  const handleAddToCart = async (selectedQuantity = quantity) => {
    if (!isAuthenticated) {
      setNotification({
        open: true,
        message: 'Please login to add items to cart',
        severity: 'warning'
      });
      return;
    }

    if (!listing || !listing.listing_id) {
      setNotification({
        open: true,
        message: 'Invalid listing data',
        severity: 'error'
      });
      return;
    }

    setLoading(true);

    try {
      const response = await cartService.addToCart(
        listing.listing_id,
        selectedQuantity,
        listing.item_type || 'product'
      );

      if (response.success) {
        setNotification({
          open: true,
          message: `${listing.title || listing.item_name} added to cart!`,
          severity: 'success'
        });
        
        setQuantity(1); // Reset quantity
        setShowQuantityDialog(false);
        
        if (onAddSuccess) {
          onAddSuccess(response.data);
        }
      } else {
        throw new Error(response.message || 'Failed to add item to cart');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      setNotification({
        open: true,
        message: error.message || 'Failed to add item to cart',
        severity: 'error'
      });
      
      if (onAddError) {
        onAddError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const handleQuantityInputChange = (event) => {
    const value = parseInt(event.target.value) || 1;
    if (value >= 1 && value <= 99) {
      setQuantity(value);
    }
  };

  const openQuantityDialog = () => {
    if (disabled || loading) return;
    setShowQuantityDialog(true);
  };

  const confirmAddToCart = () => {
    handleAddToCart(quantity);
  };

  const closeNotification = () => {
    setNotification({ ...notification, open: false });
  };

  if (!isAuthenticated && variant !== 'detailed') {
    return null; // Don't show add to cart for non-authenticated users except in detailed view
  }

  // Simple icon button variant
  if (variant === 'icon') {
    return (
      <>
        <IconButton
          onClick={showQuantity ? openQuantityDialog : handleAddToCart}
          disabled={disabled || loading}
          color="primary"
          size={size}
          title="Add to cart"
        >
          {loading ? <CircularProgress size={20} /> : <AddShoppingCart />}
        </IconButton>
        
        {renderQuantityDialog()}
        {renderNotification()}
      </>
    );
  }

  // Detailed variant with quantity controls
  if (variant === 'detailed') {
    return (
      <Box>
        {showQuantity && (
          <Box display="flex" alignItems="center" gap={1} sx={{ mb: 2 }}>
            <Typography variant="body2">Quantity:</Typography>
            <IconButton
              size="small"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              <Remove />
            </IconButton>
            <TextField
              type="number"
              value={quantity}
              onChange={handleQuantityInputChange}
              inputProps={{ min: 1, max: 99 }}
              size="small"
              sx={{ width: '80px' }}
            />
            <IconButton
              size="small"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= 99}
            >
              <Add />
            </IconButton>
          </Box>
        )}
        
        <Button
          variant="contained"
          startIcon={loading ? <CircularProgress size={20} /> : <AddShoppingCart />}
          onClick={handleAddToCart}
          disabled={disabled || loading || !isAuthenticated}
          fullWidth
          size={size}
          sx={{
            background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #219a52 0%, #27ae60 100%)',
            }
          }}
        >
          {loading ? 'Adding...' : isAuthenticated ? 'Add to Cart' : 'Login to Add to Cart'}
        </Button>
        
        {renderNotification()}
      </Box>
    );
  }

  // Default button variant
  return (
    <>
      <Button
        variant="contained"
        startIcon={loading ? <CircularProgress size={20} /> : <AddShoppingCart />}
        onClick={showQuantity ? openQuantityDialog : handleAddToCart}
        disabled={disabled || loading}
        size={size}
        sx={{
          background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #219a52 0%, #27ae60 100%)',
          }
        }}
      >
        {loading ? 'Adding...' : 'Add to Cart'}
      </Button>
      
      {renderQuantityDialog()}
      {renderNotification()}
    </>
  );

  function renderQuantityDialog() {
    return (
      <Dialog open={showQuantityDialog} onClose={() => setShowQuantityDialog(false)}>
        <DialogTitle>Add to Cart</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {listing?.title || listing?.item_name}
          </Typography>
          <Typography variant="body2" color="primary" sx={{ mb: 2 }}>
            Price: {cartService.formatCurrency(listing?.price || listing?.unit_price || 0)}
          </Typography>
          
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2">Quantity:</Typography>
            <IconButton
              size="small"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              <Remove />
            </IconButton>
            <TextField
              type="number"
              value={quantity}
              onChange={handleQuantityInputChange}
              inputProps={{ min: 1, max: 99 }}
              size="small"
              sx={{ width: '80px' }}
            />
            <IconButton
              size="small"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= 99}
            >
              <Add />
            </IconButton>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Total: {cartService.formatCurrency((listing?.price || listing?.unit_price || 0) * quantity)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowQuantityDialog(false)}>Cancel</Button>
          <Button 
            onClick={confirmAddToCart} 
            variant="contained" 
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <ShoppingCart />}
          >
            {loading ? 'Adding...' : 'Add to Cart'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  function renderNotification() {
    return (
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={closeNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={closeNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    );
  }
};

export default AddToCart;
