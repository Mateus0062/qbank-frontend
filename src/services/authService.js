// src/services/authService.js
import axios from 'axios';

const API_URL = 'https://localhost:7100/api/Auth/login'; // Alterar conforme o endereço da sua API

// Função para fazer o login e obter o token
export const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL, { username, password });
    if (response.data && response.data.token) {
      localStorage.setItem('authToken', response.data.token); // Armazenar o token no localStorage
    }
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

// Função para obter o token armazenado
export const getToken = () => {
  return localStorage.getItem('authToken');
};

// Função para verificar se o usuário está autenticado
export const isAuthenticated = () => {
  return !!getToken(); // Retorna true se houver um token
};

// Função para fazer logout (limpar o token)
export const logout = () => {
  localStorage.removeItem('authToken');
};
