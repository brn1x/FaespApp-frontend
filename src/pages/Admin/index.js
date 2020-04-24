import React, { useState } from 'react';

import { Container } from './styles';

import Header from '../../components/Header';

import api from '../../services/api';

export default function Admin () {
  const [startDate, setStartDate] = useState(new Date());

  async function handleCreationDate (event) {
    event.preventDefault();
    
  }

  async function handleSubscriptionDate (event) {
    event.preventDefault();
  }

  return (
    <>
      <Header />
      <Container>
        <div>
          <form onSubmit={handleCreationDate}>
            <h2>Data para criação de grupos</h2>
            <input type="date"></input>
            <input type="date"></input>
            <button>Atualizar</button>
          </form>
        </div>
        <div>
          <form onSubmit={handleSubscriptionDate}>
            <h2>Data para inscrição de grupos</h2>
            <input type="date"></input>
            <input type="date"></input>
            <button>Atualizar</button>
          </form>
        </div>
      </Container>
    </>
  )
}