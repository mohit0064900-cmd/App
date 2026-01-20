import api from './api';

export const quizService = {
  getAllQuizzes: async (params = {}) => {
    const response = await api.get('/quizzes', { params });
    return response.data;
  },

  getQuizById: async (id) => {
    const response = await api.get(`/quizzes/${id}`);
    return response.data;
  },

  createQuiz: async (data) => {
    const response = await api.post('/quizzes', data);
    return response.data;
  },

  updateQuiz: async (id, data) => {
    const response = await api.put(`/quizzes/${id}`, data);
    return response.data;
  },

  deleteQuiz: async (id) => {
    const response = await api.delete(`/quizzes/${id}`);
    return response.data;
  },

  joinQuizByCode: async (code) => {
    const response = await api.post('/quizzes/join', { code });
    return response.data;
  },

  submitQuiz: async (id, answers, timeSpent, tabSwitches = 0) => {
    const response = await api.post(`/quizzes/${id}/submit`, {
      answers,
      timeSpent,
      tabSwitches
    });
    return response.data;
  },

  getLeaderboard: async (id, limit = 10) => {
    const response = await api.get(`/quizzes/${id}/leaderboard`, {
      params: { limit }
    });
    return response.data;
  },

  getUserAttempts: async () => {
    const response = await api.get('/quizzes/my-attempts');
    return response.data;
  },

  getQuizStatistics: async (id) => {
    const response = await api.get(`/quizzes/${id}/statistics`);
    return response.data;
  }
};
