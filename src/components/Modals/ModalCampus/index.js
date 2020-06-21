import React, { useState, useEffect } from 'react';
import {FiX} from 'react-icons/fi'

import { Container, CloseButton } from './styles';
import api from '../../../services/api';

export default function Modalcampus({ onClose }){

  const [name, setName] = useState('');
  const [campus, setCampus] = useState('');
  const [campuses, setCampuses] = useState([]);

  const token = localStorage.getItem('token');
  const login = localStorage.getItem('login');
 
  async function handleDeleteCampus(id){

    try {
      await api.delete(`campus/${id}`, {
        headers:{
          'x-logged-user': login,
          authorization: token
        }
      });
    } catch (error) {
      alert('Erro ao deletar Campus');      
    }
  }
  
  async function handleCreateCampus(){
    const newCampus = {
      name
    }
    try {
      await api.post('campus', newCampus, {
        headers:{
          'x-logged-user': login,
          authorization: token
        }
      });
    } catch (error) {
      alert('Erro ao cadastrar Campus');      
    }
  }

  useEffect(() => {
    async function fillCampuses(){
      await api.get('campus', {
        headers:{
          authorization: token
        }
      })
      .then(response => {
        setCampuses(response.data);
      })
    }
    fillCampuses()
  }, [])
  console.log(`tkn: ${token} ||| user: ${login}`)

  return(
    <>
      <Container>
        <div>
          <CloseButton onClick={() => onClose()}>
            <FiX size={20} color="000"/>
          </CloseButton>
          <form onSubmit={() => handleDeleteCampus(campus)}>
              <select onChange={e => setCampus(e.target.value)}>
                <option value="" disabled hidden selected>Selecione um Campus para excluir </option>
                { campuses.map(campus => (
                  <option key={campus.id} value={campus.id}>
                    {campus.name}
                  </option>
                ))}
              </select>
            <button type="submit">
              Deletar
            </button>
          </form>
          <form onSubmit={handleCreateCampus}>
            <label>
              Criar novo Campus
              <input
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </label>
            <button type="submit">
              Criar
            </button>
          </form>
        </div>
      </Container>
    </>
  )
}