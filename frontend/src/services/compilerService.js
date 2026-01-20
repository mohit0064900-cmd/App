import api from './api';

export const compilerService = {
  executeCode: async (language, code, input = '') => {
    const response = await api.post('/compiler/execute', {
      language,
      code,
      input
    });
    return response.data;
  },

  getSupportedLanguages: async () => {
    const response = await api.get('/compiler/languages');
    return response.data;
  }
};
