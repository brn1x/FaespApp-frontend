import React from 'react';
import { useHistory } from 'react-router-dom';

import { Container, CategoryTxt } from './styles';
import { FiTrash2, FiEdit, FiCheckSquare, FiXSquare } from 'react-icons/fi';

import api from '../../services/api';

export default function GroupCards ({ isRequest, id, name, category, description, qttMin, qttMax, qttMeetings }) {
  const history = useHistory();

  async function handleAcceptRequest(id) {
    try {
      await api.put(`/requests/accept/${id}`);
    } catch (error) {
      alert('Erro ao aceitar o requerimento');
    }
  }
  
  async function handleRejectRequest(id) {
    try {
      await api.put(`/requests/reject/${id}`);
    } catch (error) {
      alert('Erro ao rejeitar o requerimento');
    }
  }
  
  async function handleUpdateGroupPage(id) {
    history.push(`/groups/update/${id}`, { id: id });
  }
  
  async function handleDeleteGroup(id) {
    try {
      await api.delete(`/groups/${id}`);
    } catch (error) {
      alert('Erro ao deletar grupo');
    }
  }

  return (
    <Container>
      <h1>{name}</h1>
      <CategoryTxt>{category}</CategoryTxt>
      <span>{description}</span>
      <div>
        <p><strong>Quantidade alunos: </strong>0/{qttMax}</p>
        <p><strong>Quantidade de Encontros: </strong>{qttMeetings}</p>
      </div>
      { isRequest === true ? (
        <>
          <button type="button" onClick={() => handleRejectRequest(id)}>
            <FiXSquare size={20} color="#8f2929" />
          </button>
          <button type="button" onClick={() => handleAcceptRequest(id)}>
            <FiCheckSquare size={20} color="#237534" />
          </button>
        </>
      ) : (
        <>
          <button type="button" onClick={() => handleUpdateGroupPage(id)}>
            <FiEdit size={20} color="#183196" />
          </button>
          <button type="button" onClick={() => handleDeleteGroup(id)}>
            <FiTrash2 size={20} color="#183196" />
          </button>
        </>
      ) }
      
    </Container>
  )
}







