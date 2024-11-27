// src/components/Menu.js
import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div>
      <h2>Menu</h2>
      <nav>
        <ul>
          <li>
            <Link to="/accounts">Ver todas as contas</Link>
          </li>
          <li>
            <Link to="/cadastro">Cadastrar novo usuário</Link>
          </li>
          <li>
            <Link to="/buscar-usuario">Buscar Usuario</Link>
          </li>
          <li>
            <Link to="/atualizar-usuario">Atualizar Usuario</Link>
          </li>
          <li>
            <Link to="/deletar-usuario">Deletar Usuario</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
