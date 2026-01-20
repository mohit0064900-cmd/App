import api from './api';

export const resourceService = {
  getAllResources: async (params = {}) => {
    const response = await api.get('/resources', { params });
    return response.data;
  },

  getResourceById: async (id) => {
    const response = await api.get(`/resources/${id}`);
    return response.data;
  },

  createResource: async (formData) => {
    const response = await api.post('/resources', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  updateResource: async (id, formData) => {
    const response = await api.put(`/resources/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  deleteResource: async (id) => {
    const response = await api.delete(`/resources/${id}`);
    return response.data;
  },

  downloadResource: async (id) => {
    const response = await api.get(`/resources/${id}/download`);
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get('/resources/categories');
    return response.data;
  }
};
