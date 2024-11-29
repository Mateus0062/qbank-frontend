// src/services/apiProxy.js
import axios from 'axios';
import { getToken } from './authService';

class ApiProxy {
  constructor() {
    if (!ApiProxy.instance) {
      this.apiClient = axios.create({
        baseURL: 'https://localhost:7100/api/', 
      });

      this.apiClient.interceptors.request.use((config) => {
        const token = getToken(); // Obtém o token de autenticação
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      });

      ApiProxy.instance = this;
    }

    return ApiProxy.instance;
  }

  get(url, config = {}) {
    return this.apiClient.get(url, config);
  }

  post(url, data, config = {}) {
    return this.apiClient.post(url, data, config);
  }

  put(url, data, config = {}) {
    return this.apiClient.put(url, data, config);
  }

  delete(url, config = {}) {
    return this.apiClient.delete(url, config);
  }
}

const apiProxy = new ApiProxy();
Object.freeze(apiProxy);

export default apiProxy;
