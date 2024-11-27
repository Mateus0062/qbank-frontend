// src/components/Cadastro.js
import React, { useState } from 'react';
import axios from 'axios';

const Cadastro = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Obtendo o token do localStorage (ou onde você estiver armazenando)
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Você precisa estar autenticado para cadastrar um usuário.');
      return;
    }

    try {
      // Envia os dados do novo usuário para a API usando o método POST
      const response = await axios.post(
        'https://localhost:7100/api/Account',
        {
          name,
          age: parseInt(age), // Certifica-se de que age é um número inteiro
          accountHolder,
          accountNumber,
          balance: parseFloat(balance), // Certifica-se de que balance é um número decimal
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Inclui o token de autenticação no cabeçalho
          },
        }
      );

      // Caso o cadastro seja bem-sucedido, mostra uma mensagem de sucesso
      setSuccessMessage('Usuário cadastrado com sucesso!');
      setError('');
    } catch (err) {
      // Caso ocorra um erro, exibe a mensagem de erro
      setError('Falha no cadastro. Verifique os dados e tente novamente.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Cadastrar Novo Usuário</h2>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome completo"
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
            placeholder="Idade"
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
            placeholder="Titular da conta"
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
            placeholder="Número da conta"
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
            placeholder="Saldo"
            required
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Cadastro;
