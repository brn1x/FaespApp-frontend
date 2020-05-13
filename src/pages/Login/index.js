import React from 'react';

import { Container } from './styles';

import logoFaespImg from '../../assets/Unifaesp1.png'
import studentsImg from '../../assets/students.png'

import api from '../../services/api';

export default function Login(){
  return(
    <>
      <Container>
        <div>
          <img src={logoFaespImg} alt="Logo Faesp" />
            <form>
                <input placeholder="Login"/>
                <input type="password" placeholder="Senha"/>

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