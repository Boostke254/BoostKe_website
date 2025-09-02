import axios from "../api/axios";

export const retailerService = {
  // Register retailer
  registerRetailer: async (retailerData) => {
    try {
      const response = await axios.post("/retailer/register", retailerData);
      return response.data;
    } catch (error) {
      console.error("Error registering retailer:", error);
      throw error;
    }
  },

  // Login retailer
  loginRetailer: async (credentials) => {
    try {
      const response = await axios.post("/retailer/login", credentials);
      return response.data;
    } catch (error) {
      console.error("Error logging in retailer:", error);
      throw error;
    }
  },

  // Get retailer profile
  getRetailerProfile: async () => {
    try {
      const response = await axios.get("/retailer/profile");
      return response.data;
    } catch (error) {
      console.error("Error fetching retailer profile:", error);
      throw error;
    }
  },

  // Update retailer profile
  updateRetailerProfile: async (retailerData) => {
    try {
      const response = await axios.put("/retailer/edit-profile", retailerData);
      return response.data;
    } catch (error) {
      console.error("Error updating retailer profile:", error);
      throw error;
    }
  },

  // Reset password
  resetPassword: async (email) => {
    try {
      const response = await axios.post("/retailer/reset-password", { email });
      return response.data;
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  },

  // Get retailer's listings
  getRetailerListings: async () => {
    try {
      const response = await axios.get("/retailer/from-listings/listings");
      return response.data;
    } catch (error) {
      console.error("Error fetching retailer listings:", error);
      throw error;
    }
  }
};
