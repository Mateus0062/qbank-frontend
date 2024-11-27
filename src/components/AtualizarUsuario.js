// src/components/AtualizarUsuario.js
import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../services/authService';

const AtualizarUsuario = () => {
  const [id, setId] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [balance, setBalance] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Função para buscar os dados do usuário ao fornecer o ID
  const handleSearch = async (event) => {
    event.preventDefault();
    const token = getToken();

    try {
      const response = await axios.get(`https://localhost:7100/api/Account/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsuario(response.data);
      setName(response.data.name);
      setAge(response.data.age);
      setAccountHolder(response.data.accountHolder);
      setAccountNumber(response.data.accountNumber);
      setBalance(response.data.balance);
      setError('');
    } catch (err) {
      setUsuario(null);
      setError('Usuário não encontrado ou erro na requisição.');
    }
  };

  // Função para atualizar os dados do usuário
  const handleUpdate = async (event) => {
    event.preventDefault();
    const token = getToken();

    try {
      const response = await axios.put(`https://localhost:7100/api/Account/${id}`, {
        name,
        age: parseInt(age),
        accountHolder,
        accountNumber,
        balance: parseFloat(balance),
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage('Usuário atualizado com sucesso!');
      setError('');
    } catch (err) {
      setError('Falha ao atualizar o usuário. Verifique os dados e tente novamente.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Atualizar Usuário</h2>

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
        <button type="submit">Buscar</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {usuario && (
        <div>
          {/* Formulário para editar o usuário */}
          <h3>Editar Dados do Usuário</h3>
          <form onSubmit={handleUpdate}>
            <div>
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="age">Idade:</label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="accountHolder">Titular da Conta:</label>
              <input
                type="text"
                id="accountHolder"
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="accountNumber">Número da Conta:</label>
              <input
                type="text"
                id="accountNumber"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="balance">Saldo:</label>
              <input
                type="number"
                id="balance"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                required
              />
            </div>

            <button type="submit">Atualizar</button>
          </form>
        </div>
      )}

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default AtualizarUsuario;