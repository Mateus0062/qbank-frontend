// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Importando as mudanças
import Accounts from './components/Accounts';
import Login from './components/Login';
import { isAuthenticated } from './services/authService';
import Cadastro from './components/Cadastro';
import Menu from './components/Menu';
import BuscarUsuario from './components/BuscarUsuario';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(isAuthenticated());  
  }, []);

  return (
    <Router>
      <Routes>
        <Route 
          path='/'
          element={authenticated ? <Menu /> : <Navigate to="/Login" />}
        />
        
        <Route path="/Login" element={<Login />} />
        <Route
          path="/accounts"
          element={authenticated ? <Accounts /> : <Navigate to="/Login" />} 
        />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route 
          path="/menu"
          element={authenticated ? <Menu /> : <Navigate to="/Login" />}
        />
        <Route
          path='/buscar-usuario'
          element={authenticated ? <BuscarUsuario /> : <Navigate to="/Login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
