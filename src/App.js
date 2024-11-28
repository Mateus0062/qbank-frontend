// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Importando as mudanças
import Accounts from '../src/components/contas/Accounts';
import Login from './components/login/Login';
import { isAuthenticated } from './services/authService';
import Cadastro from './components/cadastro/Cadastro';
import Menu from './components/menu/Menu';
import BuscarUsuario from './components/buscar/BuscarUsuario';
import AtualizarUsuario from './components/atualizar/AtualizarUsuario';
import DeletarUsuario from './components/deletar/DeletarUsuario';

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
        <Route
          path='/atualizar-usuario'
          element={authenticated ? <AtualizarUsuario /> : <Navigate to="/Login" />}
        />
        <Route
          path='/deletar-usuario'
          element={authenticated ? <DeletarUsuario /> : <Navigate to="/Login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
