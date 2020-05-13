import React from 'react';
import { Link } from 'react-router-dom';

import { Container, MenuList } from './styles'

export default function Menu() {
  return (
    <Container>
      <MenuList>
        <li><Link to="/groups">Listar Grupos</Link></li>
        <li><Link to="/groups/create">Criar Grupo</Link></li>
        <li><Link to="/requests">Requerimentos</Link></li>
        <li><Link to="/admin">Configurações Administrativas</Link></li>
      </MenuList>
      <Link to="/">Sair</Link>
    </Container>
  );
}