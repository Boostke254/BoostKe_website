import axios from "../api/axios";

export const shopService = {
  // Get all shops
  getAllShops: async () => {
    try {
      const response = await axios.get("/shops/all");
      return response.data;
    } catch (error) {
      console.error("Error fetching shops:", error);
      throw error;
    }
  },

  // Get shop by ID
  getShopById: async (id) => {
    try {
      const response = await axios.get(`/shop/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching shop:", error);
      throw error;
    }
  },

  // Get shop listings
  getShopListings: async (shopId) => {
    try {
      const response = await axios.get(`/shop/${shopId}/listings`);
      return response.data;
    } catch (error) {
      console.error("Error fetching shop listings:", error);
      throw error;
    }
  },

  // Search shops
  searchShops: async (query) => {
    try {
      const response = await axios.get(`/shops/search?query=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error("Error searching shops:", error);
      throw error;
    }
  },

  // Create shop
  createShop: async (shopData) => {
    try {
      const response = await axios.post("/shop/create", shopData);
      return response.data;
    } catch (error) {
      console.error("Error creating shop:", error);
      throw error;
    }
  },

  // Update shop
  updateShop: async (shopId, shopData) => {
    try {
      const response = await axios.put(`/shop/update/${shopId}`, shopData);
      return response.data;
    } catch (error) {
      console.error("Error updating shop:", error);
      throw error;
    }
  },

  // Delete shop
  deleteShop: async (shopId) => {
    try {
      const response = await axios.delete(`/shop/delete/${shopId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting shop:", error);
      throw error;
    }
  }
};
