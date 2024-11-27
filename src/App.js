// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Importando as mudanças
import Accounts from './components/Accounts';
import Login from './components/Login';
import { isAuthenticated } from './services/authService';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(isAuthenticated()); // Verifica se está autenticado
  }, []);

  return (
    <Router>
      <Routes>
        {/* Definindo as rotas dentro de <Routes> */}
        <Route path="/Login" element={<Login />} />
        <Route
          path="/accounts"
          element={authenticated ? <Accounts /> : <Navigate to="/Login" />} // Substituindo o Redirect por Navigate
        />
      </Routes>
    </Router>
  );
}

export default App;
