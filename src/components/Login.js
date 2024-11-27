// src/components/Login.js
import React, { useState } from 'react';
import { login } from '../services/authService';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirectToAccounts, setRedirectToAccounts] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(username, password);
      setRedirectToAccounts(true); // Redireciona para a página de contas após login bem-sucedido
    } catch (err) {
      setError('Falha no login. Verifique suas credenciais.');
    }
  };

  if (redirectToAccounts) {
    return <Navigate to="/menu" />;
  }

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuário"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
