import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7100/api',
});

export const login = async (username, password) => {
  try {
    const response = await api.post('/Auth/login', { username, password });
    return response.data;
  } catch (error) {
    console.error('Erro ao realizar login', error);
    throw error;
  }
};

export default api;
