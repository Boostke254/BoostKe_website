import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

// Custom hook to access authentication data
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// Helper function to get current user for blog interactions
export const getCurrentUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Helper function to get auth token
export const getAuthToken = () => {
  try {
    const token = localStorage.getItem('authToken');
    return token;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};
