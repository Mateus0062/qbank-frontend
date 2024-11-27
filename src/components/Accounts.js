// src/components/Accounts.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await api.get('/Account'); // Rota para pegar contas
        setAccounts(response.data);
      } catch (error) {
        console.error('Erro ao buscar contas:', error);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div>
      <h2>Contas</h2>
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>{account.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Accounts;
