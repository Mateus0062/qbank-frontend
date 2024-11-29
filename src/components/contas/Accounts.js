// src/components/Accounts.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importando Link do react-router-dom
import apiProxy from '../../services/apiProxy';
import './Accounts.css';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await apiProxy.get('Account'); 
        setAccounts(response.data);
      } catch (error) {
        setError('Erro ao carregar contas.');
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div className='contas-container'>
      <h2 className='accounts'>Contas</h2>
      {error && <p>{error}</p>}

      <div className='accounts-list'>
        {accounts.map((account) => (
          <div key={account.id} className='account-card'>
            <h3>Informações da Conta</h3>
            <p><strong>Nome:</strong> {account.name}</p>
            <p><strong>Idade:</strong> {account.age}</p>
            <p><strong>Account Holder:</strong> {account.accountHolder}</p>
            <p><strong>Account Number:</strong> {account.accountNumber}</p>
            <p><strong>Balance:</strong> {account.balance}</p>
          </div>
        ))}
      </div>

      {/* Botão de Voltar para o Menu */}
      <Link to="/" className="voltar-button">Voltar para o Menu</Link>
    </div>
  );
};

export default Accounts;
