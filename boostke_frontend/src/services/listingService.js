import axios from "../api/axios";

export const listingService = {
  // Get all listings with pagination
  getAllListings: async (page = 1, limit = 10) => {
    try {
      const response = await axios.get(`/listings/all?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching listings:", error);
      throw error;
    }
  },

  // Get popular listings
  getPopularListings: async () => {
    try {
      const response = await axios.get("/listings/popular");
      return response.data;
    } catch (error) {
      console.error("Error fetching popular listings:", error);
      throw error;
    }
  },

  // Get recent listings
  getRecentListings: async () => {
    try {
      const response = await axios.get("/listings/recent");
      return response.data;
    } catch (error) {
      console.error("Error fetching recent listings:", error);
      throw error;
    }
  },

  // Search listings
  searchListings: async (query) => {
    try {
      const response = await axios.get(`/listings/search?query=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error("Error searching listings:", error);
      throw error;
    }
  },

  // Get filtered listings
  getFilteredListings: async (filters) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await axios.get(`/filter/listings?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching filtered listings:", error);
      throw error;
    }
  },

  // Get listing categories
  getListingCategories: async () => {
    try {
      const response = await axios.get("/listings/categories");
      return response.data;
    } catch (error) {
      console.error("Error fetching listing categories:", error);
      throw error;
    }
  },

  // Get listing by ID
  getListingById: async (id) => {
    try {
      const response = await axios.get(`/listings/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching listing:", error);
      throw error;
    }
  }
};
