import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Divider,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import {
  CheckCircle,
  ShoppingBag,
  Receipt,
  Home,
  ShoppingCartOutlined
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import CartService from '../utils/cartService';

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cartService = new CartService();
  
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get transaction details from URL parameters
  const transactionId = searchParams.get('transaction_id');
  const receiptNumber = searchParams.get('receipt');
  const orderNumber = searchParams.get('order');

  useEffect(() => {
    // Clear cart after successful payment
    clearUserCart();
    
    // If we have transaction details, fetch order information
    if (transactionId) {
      fetchOrderDetails();
    } else {
      setLoading(false);
    }
  }, [transactionId]);

  const clearUserCart = async () => {
    try {
      await cartService.clearCart();
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const fetchOrderDetails = async () => {
    try {
      // You can implement an API call to fetch order details
      // For now, we'll use placeholder data
      setOrderDetails({
        orderId: orderNumber || 'ORDER123',
        receiptNumber: receiptNumber || 'MPesa Receipt',
        totalAmount: 0,
        items: [],
        estimatedDelivery: '3-5 business days'
      });
    } catch (error) {
      console.error('Error fetching order details:', error);
      setError('Unable to load order details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Processing your order...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          {/* Success Icon and Message */}
          <Box sx={{ mb: 3 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <CheckCircle 
                sx={{ 
                  fontSize: 80, 
                  color: 'success.main',
                  mb: 2
                }} 
              />
            </motion.div>
            
            <Typography variant="h4" color="success.main" gutterBottom>
              Payment Successful!
            </Typography>
            
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              Thank you for your purchase
            </Typography>
            
            <Alert severity="success" sx={{ mb: 3 }}>
              Your order has been confirmed and is being processed.
            </Alert>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Order Details */}
          {orderDetails && (
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      <Receipt sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Order Information
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Order ID: {orderDetails.orderId}
                    </Typography>
                    {receiptNumber && (
                      <Typography variant="body2" color="text.secondary">
                        M-Pesa Receipt: {receiptNumber}
                      </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary">
                      Payment Method: M-Pesa
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      <ShoppingBag sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Delivery Information
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Estimated Delivery: {orderDetails.estimatedDelivery}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status: Processing
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tracking: Will be provided via email
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Error Display */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Next Steps */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              What's Next?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              • You will receive an email confirmation shortly
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              • Track your order status in your profile
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              • Contact support if you have any questions
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<Home />}
              onClick={() => navigate('/')}
              sx={{
                background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #e55a2b 0%, #e08619 100%)',
                }
              }}
            >
              Continue Shopping
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Receipt />}
              onClick={() => navigate('/profile')}
            >
              View Orders
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<ShoppingCartOutlined />}
              onClick={() => navigate('/vendors')}
            >
              Browse Vendors
            </Button>
          </Box>

          {/* Support Information */}
          <Box sx={{ mt: 4, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Need help? Contact our support team:
            </Typography>
            <Typography variant="body2">
              📞 <a href="tel:+254708827471" style={{ color: '#ff6b35' }}>+254 708 827 471</a>
            </Typography>
            <Typography variant="body2">
              ✉️ <a href="mailto:info@boostke.co.ke" style={{ color: '#ff6b35' }}>info@boostke.co.ke</a>
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default CheckoutSuccess;
