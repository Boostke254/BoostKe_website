import axios from "./axios";

// Ambassador API service functions
export const ambassadorAPI = {
  // Apply to become an ambassador
  applyAmbassador: async (applicationData) => {
    try {
      const response = await axios.post("/ambassadors/apply", applicationData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get ambassador profile
  getAmbassadorProfile: async () => {
    try {
      const response = await axios.get("/ambassadors/profile");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get leaderboard
  getLeaderboard: async (limit = 10) => {
    try {
      const response = await axios.get(`/ambassadors/leaderboard?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get ambassador rewards
  getRewards: async () => {
    try {
      const response = await axios.get("/ambassadors/rewards");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Claim reward
  claimReward: async (rewardId) => {
    try {
      const response = await axios.post(`/ambassadors/rewards/${rewardId}/claim`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Send referral invitation
  sendInvitation: async (invitationData) => {
    try {
      const response = await axios.post("/ambassadors/invite", invitationData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get ambassador statistics
  getStats: async () => {
    try {
      const response = await axios.get("/ambassadors/stats");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get ambassador training materials
  getTrainingMaterials: async () => {
    try {
      const response = await axios.get("/ambassadors/training");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default ambassadorAPI;
