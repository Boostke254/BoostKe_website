import axios from "../api/axios";

export const searchService = {
  // Universal search across all content types
  universalSearch: async (query) => {
    try {
      const response = await axios.get(`/search/universal?query=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error("Error performing universal search:", error);
      throw error;
    }
  },

  // Search with filters
  searchWithFilters: async (query, filters = {}) => {
    try {
      const queryParams = new URLSearchParams({
        query: query,
        ...filters
      }).toString();
      const response = await axios.get(`/search/universal?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error("Error performing filtered search:", error);
      throw error;
    }
  },

  // Get search suggestions
  getSearchSuggestions: async (query) => {
    try {
      const response = await axios.get(`/search/suggestions?query=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
      throw error;
    }
  }
};
