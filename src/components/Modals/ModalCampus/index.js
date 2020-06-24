/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from 'react';
import {FiX} from 'react-icons/fi'

import { Container, CloseButton } from './styles';
import api from '../../../services/api';

import * as yup from 'yup'
import FormValidations from '../../../utils/FormValidations';

export default function Modalcampus({ onClose }){

  const [name, setName] = useState('');
  const [campus, setCampus] = useState('');
  const [campuses, setCampuses] = useState([]);

  const token = localStorage.getItem('token');
  const login = localStorage.getItem('login');

  yup.setLocale({
    mixed:{
      default: 'Não é Valido',
      required: '${path}',
    },
  })
 
  const campusSchema = yup.object().shape({
    name: yup.string().required(),
  })

  async function handleDeleteCampus(event, id){
    event.preventDefault()

    try {
      await api.delete(`campus/${id}`, {
        headers:{
          'x-logged-user': login,
          authorization: token
        }
      });
      alert("Campus excluido!")
      onClose();
    } catch (error) {
      alert('Erro ao deletar Campus');      
    }
  }
  
  async function handleCreateCampus(event){
    event.preventDefault()

    const campusFormData = { name, }

    campusSchema.validate(campusFormData)
      .then( async valid =>{
        const newCampus = { name }
        try {
          await api.post('campus', newCampus, {
            headers:{
              'x-logged-user': login,
              authorization: token
            }
          });
          alert("Campus salvo!")
          onClose();
        } catch (error) {
          alert('Erro ao cadastrar Campus');      
        }
      }).catch((err) => {
        FormValidations(err.errors)
        alert("Campos obrigatórios não preenchidos")
      })
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
  }, [token])

  return(
    <>
      <Container>
        <div>
          <CloseButton onClick={() => onClose()}>
            <FiX size={20} color="000"/>
          </CloseButton>
          <form onSubmit={(e) => handleDeleteCampus(e, campus)}>
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
                id="name"
                value={name}
                onChange={e => {setName(e.target.value); e.target.style.borderColor = ''}}
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