import React from 'react';

import { Container, CategoryTxt, Paragraph } from './styles';
import { FiTrash2, FiEdit, FiCheckSquare, FiXSquare } from 'react-icons/fi';

export default function GroupCards ({ isRequest, up, down, id, name, category, description, qttMin, qttMax, qttMeetings, campus, semesterYear, period }) {
  return (
    <Container>
      <h1>{name}</h1>
      <CategoryTxt>{category}</CategoryTxt>
      <span>{description}</span>
      <div>
        <Paragraph><strong>Quantidade alunos: </strong>0/{qttMax}</Paragraph>
        <Paragraph><strong>Quantidade de Encontros: </strong>{qttMeetings}</Paragraph>
        <Paragraph><strong>Campus: </strong>{campus} <strong>Semestre: </strong>{semesterYear} <strong>Periodo: </strong>{period}</Paragraph>
      </div>
      { isRequest === true ? (
        <>
          <button type="button" onClick={() => down(id)}>
            <FiXSquare size={20} color="#8f2929" />
          </button>
          <button type="button" onClick={() => up(id)}>
            <FiCheckSquare size={20} color="#237534" />
          </button>
        </>
      ) : (
        <>
          <button type="button" onClick={() => up(id)}>
            <FiEdit size={20} color="#183196" />
          </button>
          <button type="button" onClick={() => down(id)}>
            <FiTrash2 size={20} color="#8f2929" />
          </button>
        </>
      ) 
      }
      
    </Container>
  )
}







