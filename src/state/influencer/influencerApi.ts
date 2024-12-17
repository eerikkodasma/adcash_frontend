import { Influencer, InfluencerFormData } from "../../types/influencer";
import axios from "axios";
import { API_BASE_URL } from "../../App";

export const influencerService = {
  async fetchInfluencers(searchQuery: string) {
    const response = await axios.get(`${API_BASE_URL}/influencers/`, {
      params: {
        search: searchQuery,
      },
    });

    return response.data;
  },

  async createInfluencer(influencerData: InfluencerFormData) {
    const response = await axios.post(
      `${API_BASE_URL}/influencers/`,
      influencerData
    );
    return response.data;
  },

  async updateInfluencer(influencer: Influencer) {
    const response = await axios.put(
      `${API_BASE_URL}/influencers/${influencer.id}/`,
      influencer
    );
    return response.data;
  },

  async deleteInfluencer(id: number) {
    const response = await axios.delete(`${API_BASE_URL}/influencers/${id}/`);
    return response.data;
  },
};
