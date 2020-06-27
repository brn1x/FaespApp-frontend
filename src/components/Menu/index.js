import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { Container, MenuList } from './styles';

import validateCreateDate from '../../utils/ValidateCreateDate';

export default function Menu() {
  const history = useHistory();

  async function navigateToCreateGroup(){

    await validateCreateDate()
      .then(date => {
        if(date){
          return history.push('/groups/create');
        }
        return alert('Datas para criação de grupos expiraram!\nAs datas podem ser reajustadas na aba "Configurações Administrativas"')
      })
  }

  return (
    <Container>
      <MenuList>
        <li><Link to="/groups">Listar Grupos</Link></li>
        <button onClick={navigateToCreateGroup}>Criar Grupos</button>
        <li><Link to="/requests">Requerimentos</Link></li>
        <li><Link to="/admin">Configurações Administrativas</Link></li>
      </MenuList>
      <Link to="/"><FiLogOut size={20} />Sair</Link>
    </Container>
  );
}