import React, { useState } from 'react';
import blogService from '../services/blogService';
import { Email as EmailIcon, CheckCircle as CheckIcon } from '@mui/icons-material';

const NewsletterSignup = ({ className = '', compact = false }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      await blogService.subscribeNewsletter(email);
      
      setSuccess(true);
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
      
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      
      if (error.message.includes('already subscribed')) {
        setError('This email is already subscribed to our newsletter');
      } else {
        setError('Failed to subscribe. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={`newsletter-success ${className}`}>
        <CheckIcon />
        <h3>Thank you for subscribing!</h3>
        <p>You'll receive our latest updates and insights.</p>
      </div>
    );
  }

  return (
    <div className={`newsletter-signup ${className} ${compact ? 'compact' : ''}`}>
      {!compact && (
        <>
          <EmailIcon />
          <h3>Stay Updated</h3>
          <p>Get the latest insights from the BoostKe ecosystem delivered to your inbox.</p>
        </>
      )}
      
      <form onSubmit={handleSubmit} className="newsletter-form">
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(''); // Clear error when user types
            }}
            placeholder="Enter your email"
            required
            disabled={loading}
          />
          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default NewsletterSignup;
