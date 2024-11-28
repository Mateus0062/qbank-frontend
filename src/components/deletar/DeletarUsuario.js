// src/components/DeletarUsuario.js
import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../../services/authService';
import './DeletarUsuario.css'
import apiProxy from '../../services/apiProxy';

const DeletarUsuario = () => {
  const [id, setId] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Função para buscar o usuário pelo ID
  const handleSearch = async (event) => {
    event.preventDefault();
    const token = getToken();

    try {
      const response = await apiProxy.get(`Account/${id}`);
      setUsuario(response.data);
      setError('');
      setSuccessMessage('');
    } catch (err) {
      setUsuario(null);
      setError('Usuário não encontrado ou erro na requisição.');
    }
  };

  // Função para deletar o usuário
  const handleDelete = async () => {
    const token = getToken();

    try {
      const response = await apiProxy.delete(`Account/${id}`);
      setSuccessMessage('Usuário deletado com sucesso!');
      setError('');
      setUsuario(null);
      setConfirmDelete(false);
    } catch (err) {
      setError('Erro ao deletar o usuário. Tente novamente.');
      setSuccessMessage('');
    }
  };

  return (
    <div className='deletar-container'>
      <h2>Deletar Usuário</h2>

      {/* Formulário para buscar o usuário */}
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
        <button type="submit">Deletar</button>
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

          {/* Confirmação para deletar o usuário */}
          <div>
            <p>Tem certeza de que deseja deletar este usuário?</p>
            <button onClick={() => setConfirmDelete(true)}>Sim, deletar</button>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div>
          <p>Você tem certeza que deseja deletar este usuário?</p>
          <button onClick={handleDelete}>Confirmar</button>
          <button onClick={() => setConfirmDelete(false)}>Cancelar</button>
        </div>
      )}

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default DeletarUsuario;
