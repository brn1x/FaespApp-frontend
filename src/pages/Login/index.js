import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { Container } from './styles';

import logoFaespImg from '../../assets/Unifaesp1.png'
import studentsImg from '../../assets/students.png'

import api from '../../services/api';

export default function Login(){
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  async function handleLogin (event) {
    event.preventDefault();

    const session = { login, password }

    try {
      await api.post('/session', session)
        
      history.push('/groups')
    } catch (error) {
      alert('Usuário ou senha incorretos')
    }
  }

  return(
    <>
      <Container>
        <div>
          <img src={logoFaespImg} alt="Logo Faesp" />
            <form onSubmit={handleLogin}>
                <input placeholder="Login" onChange={e => setLogin(e.target.value)} />
                <input type="password" placeholder="Senha" onChange={e => setPassword(e.target.value)} />

              <button type="submit">
                Entrar
              </button>
            </form>
        </div>
        <img src={studentsImg} alt="Students" />
      </Container>
    </> 
  );
}