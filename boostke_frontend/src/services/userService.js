import axios from "../api/axios";

export const userService = {
  // Register user
  registerUser: async (userData) => {
    try {
      const response = await axios.post("/user/register", userData);
      return response.data;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  },

  // Login user
  loginUser: async (credentials) => {
    try {
      const response = await axios.post("/user/login", credentials);
      return response.data;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  },

  // Get user profile
  getUserProfile: async () => {
    try {
      const response = await axios.get("/user/profile");
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },

  // Update user profile
  updateUserProfile: async (userData) => {
    try {
      const response = await axios.put("/user/edit-profile", userData);
      return response.data;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  },

  // Reset password
  resetPassword: async (email) => {
    try {
      const response = await axios.post("/user/reset-password", { email });
      return response.data;
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  },

  // Post user listing
  postListing: async (listingData) => {
    try {
      const response = await axios.post("/user/post/listing", listingData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error posting listing:", error);
      throw error;
    }
  },

  // Update user listing
  updateListing: async (listingId, listingData) => {
    try {
      const response = await axios.put(`/user/update/listing/${listingId}`, listingData);
      return response.data;
    } catch (error) {
      console.error("Error updating listing:", error);
      throw error;
    }
  },

  // Delete user listing
  deleteListing: async (listingId) => {
    try {
      const response = await axios.delete(`/user/delete/listing/${listingId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting listing:", error);
      throw error;
    }
  },

  // Get user's listings
  getUserListings: async () => {
    try {
      const response = await axios.get("/user/from-listings/listings");
      return response.data;
    } catch (error) {
      console.error("Error fetching user listings:", error);
      throw error;
    }
  }
};
