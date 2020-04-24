import React from 'react';

import { Container, CategoryTxt } from './styles';
import { FiTrash2, FiEdit, FiCheckSquare, FiXSquare } from 'react-icons/fi'

export default function GroupCards ({ noButtons, name, category, description, qttMin, qttMax, qttMeetings }) {
  return (
    <Container>
      <h1>{name}</h1>
      <CategoryTxt>{category}</CategoryTxt>
      <span>{description}</span>
      <div>
        <p><strong>Quantidade alunos: </strong>0/{qttMax}</p>
        <p><strong>Quantidade de Encontros: </strong>{qttMeetings}</p>
      </div>
      { noButtons === true ? (
        <>
          <button type="button" onClick="">
            <FiCheckSquare size={20} color="#237534" />
          </button>
          <button type="button" onClick="">
            <FiXSquare size={20} color="#8f2929" />
          </button>
        </>
      ) : (
        <>
          <button type="button" onClick="">
            <FiEdit size={20} color="#183196" />
          </button>
          <button type="button" onClick="">
            <FiTrash2 size={20} color="#183196" />
          </button>
        </>
      ) }
      
    </Container>
  )
}







