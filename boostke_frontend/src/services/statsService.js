import axios from "../api/axios";

export const statsService = {
  // Get user count
  getUserCount: async () => {
    try {
      const response = await axios.get("/users/count");
      return response.data;
    } catch (error) {
      console.error("Error fetching user count:", error);
      throw error;
    }
  },

  // Get retailer count
  getRetailerCount: async () => {
    try {
      const response = await axios.get("/retailers/count");
      return response.data;
    } catch (error) {
      console.error("Error fetching retailer count:", error);
      throw error;
    }
  },

  // Get landlord count
  getLandlordCount: async () => {
    try {
      const response = await axios.get("/landlords/count");
      return response.data;
    } catch (error) {
      console.error("Error fetching landlord count:", error);
      throw error;
    }
  },

  // Get listing count
  getListingCount: async () => {
    try {
      const response = await axios.get("/listings/count");
      return response.data;
    } catch (error) {
      console.error("Error fetching listing count:", error);
      throw error;
    }
  },

  // Get property count
  getPropertyCount: async () => {
    try {
      const response = await axios.get("/properties/count");
      return response.data;
    } catch (error) {
      console.error("Error fetching property count:", error);
      throw error;
    }
  },

  // Get shop count
  getShopCount: async () => {
    try {
      const response = await axios.get("/shops/count");
      return response.data;
    } catch (error) {
      console.error("Error fetching shop count:", error);
      throw error;
    }
  },

  // Get category count
  getCategoryCount: async () => {
    try {
      const response = await axios.get("/categories/count");
      return response.data;
    } catch (error) {
      console.error("Error fetching category count:", error);
      throw error;
    }
  },

  // Get all stats at once
  getAllStats: async () => {
    try {
      const [users, retailers, landlords, listings, properties, shops, categories] = await Promise.all([
        statsService.getUserCount(),
        statsService.getRetailerCount(),
        statsService.getLandlordCount(),
        statsService.getListingCount(),
        statsService.getPropertyCount(),
        statsService.getShopCount(),
        statsService.getCategoryCount()
      ]);

      return {
        users: users.count || 0,
        retailers: retailers.count || 0,
        landlords: landlords.count || 0,
        listings: listings.count || 0,
        properties: properties.count || 0,
        shops: shops.count || 0,
        categories: categories.count || 0
      };
    } catch (error) {
      console.error("Error fetching all stats:", error);
      throw error;
    }
  }
};
