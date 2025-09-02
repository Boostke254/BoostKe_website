import axios from "../api/axios";

export const propertyService = {
  // Get all properties
  getAllProperties: async () => {
    try {
      const response = await axios.get("/properties/all");
      return response.data;
    } catch (error) {
      console.error("Error fetching properties:", error);
      throw error;
    }
  },

  // Get filtered properties
  getFilteredProperties: async (filters) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await axios.get(`/filter/properties?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching filtered properties:", error);
      throw error;
    }
  },

  // Search properties
  searchProperties: async (query) => {
    try {
      const response = await axios.get(`/properties/search?query=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error("Error searching properties:", error);
      throw error;
    }
  },

  // Get property by ID
  getPropertyById: async (id) => {
    try {
      const response = await axios.get(`/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching property:", error);
      throw error;
    }
  },

  // Post property (for landlords)
  postProperty: async (propertyData) => {
    try {
      const response = await axios.post("/landlord/post/property", propertyData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error posting property:", error);
      throw error;
    }
  },

  // Update property
  updateProperty: async (propertyId, propertyData) => {
    try {
      const response = await axios.put(`/landlord/update/property/${propertyId}`, propertyData);
      return response.data;
    } catch (error) {
      console.error("Error updating property:", error);
      throw error;
    }
  },

  // Delete property
  deleteProperty: async (propertyId) => {
    try {
      const response = await axios.delete(`/landlord/delete/property/${propertyId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting property:", error);
      throw error;
    }
  },

  // Get landlord's properties
  getLandlordProperties: async () => {
    try {
      const response = await axios.get("/landlord/posted/properties");
      return response.data;
    } catch (error) {
      console.error("Error fetching landlord properties:", error);
      throw error;
    }
  }
};
