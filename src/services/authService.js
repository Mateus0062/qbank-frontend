// src/services/authService.js
import api from './api';

export const login = async (username, password) => {
  const response = await api.post('auth/login', { username, password });
  const { token } = response.data;

  // Armazenar o token no localStorage
  localStorage.setItem('token', token);
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  return !!getToken(); // Verifica se o token existe
};
