import api from './api';

export const socialService = {
  getAllLinks: async () => {
    const response = await api.get('/social');
    return response.data;
  },

  updateLinks: async (data) => {
    const response = await api.put('/social', data);
    return response.data;
  },

  deleteLink: async (platform) => {
    const response = await api.delete(`/social/${platform}`);
    return response.data;
  },

  toggleLinkStatus: async (platform) => {
    const response = await api.put(`/social/${platform}/toggle`);
    return response.data;
  }
};
