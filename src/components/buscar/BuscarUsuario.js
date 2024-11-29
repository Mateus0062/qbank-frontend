// src/components/BuscarUsuario.js
import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../../services/authService'; 
import './BuscarUsuario.css'
import apiProxy from '../../services/apiProxy';

const BuscarUsuario = () => {
  const [id, setId] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await apiProxy.get(`Account/${id}`);
      setUsuario(response.data); 
      setError(''); 
    } catch (err) {
      setUsuario(null);
      setError('Usuário não encontrado ou erro na requisição.');
    }
  };

  return (
    <div className='buscar-container'>
      <h2>Buscar Usuário</h2>

      <form onSubmit={handleSearch}>
        <div>
          <label htmlFor="id">ID do Usuário:</label>
          <input
            type="number"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Digite o ID do usuário"
            required
          />
        </div>
        <button type="submit">Buscar</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {usuario && (
        <div>
          <h3>Dados do Usuário</h3>
          <p><strong>ID:</strong> {usuario.id}</p>
          <p><strong>Nome:</strong> {usuario.name}</p>
          <p><strong>Idade:</strong> {usuario.age}</p>
          <p><strong>Conta:</strong> {usuario.accountNumber}</p>
          <p><strong>Saldo:</strong> {usuario.balance}</p>
        </div>
      )}
    </div>
  );
};

export default BuscarUsuario;
