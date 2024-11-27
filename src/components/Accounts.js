// src/components/Accounts.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await api.get('account'); 
        setAccounts(response.data);
      } catch (error) {
        setError('Erro ao carregar contas.');
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div>
      <h2>Contas</h2>
      {error && <p>{error}</p>}
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>{account.name} - {account.balance}</li>
        ))}
      </ul>
    </div>
  );
};

export default Accounts;
