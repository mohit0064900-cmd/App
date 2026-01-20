import api from './api';

export const reviewService = {
  getAllReviews: async (params = {}) => {
    const response = await api.get('/reviews', { params });
    return response.data;
  },

  createReview: async (data) => {
    const response = await api.post('/reviews', data);
    return response.data;
  },

  updateReview: async (data) => {
    const response = await api.put('/reviews/my-review', data);
    return response.data;
  },

  deleteReview: async (id) => {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
  },

  getUserReview: async () => {
    const response = await api.get('/reviews/my-review');
    return response.data;
  },

  getReviewStats: async () => {
    const response = await api.get('/reviews/stats');
    return response.data;
  },

  toggleApproval: async (id) => {
    const response = await api.put(`/reviews/${id}/toggle-approval`);
    return response.data;
  }
};
