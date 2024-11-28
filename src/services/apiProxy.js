// src/services/api.js
import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'https://localhost:7100/api/'; 

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Proxy para interceptar chamadas
const apiProxy = new Proxy(api, {
  get(target, propKey) {
    const originalMethod = target[propKey];

    if (typeof originalMethod === 'function') {
      return async (...args) => {
        try {
          console.log(`API Proxy: Chamando método ${propKey} com argumentos:`, args);
          const result = await originalMethod.apply(target, args);
          console.log(`API Proxy: Sucesso na chamada ${propKey}`, result.data);
          return result;
        } catch (error) {
          console.error(`API Proxy: Erro na chamada ${propKey}`, error);
          throw error;
        }
      };
    }

    return originalMethod;
  },
});

export default apiProxy;
