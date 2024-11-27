// src/services/api.js
import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'https://localhost:7100/api/'; // Endereço base da sua API

// Instanciando o axios com configuração padrão
const api = axios.create({
  baseURL: API_URL,
});

// Interceptador para adicionar o token no cabeçalho das requisições
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Adicionando o token no header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
