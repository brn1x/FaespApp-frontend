import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

import { Container, CloseButton } from './styles';

import api from '../../../services/api';

import * as yup from 'yup'
import FormValidations from '../../../utils/FormValidations';

export default function ModalConfigDate ({ onClose }) {

  const [id, setId] = useState('');
  const [initCreateDate, setInitCreateDate] = useState('');
  const [endCreateDate, setEndCreateDate] = useState('');
  const [initSubscriptionDate, setInitSubscriptionDate] = useState('');
  const [endSubscriptionDate, setEndSubscriptionDate] = useState('');

  const token = localStorage.getItem('token');
  const login = localStorage.getItem('login');

  yup.setLocale({
    mixed:{
      default: 'Não é Valido',
      notType: '${path}',
    },
  })

  const configDateSchema = yup.object().shape({
    initCreateDate: yup.date(),
    endCreateDate: yup.date(),
    initSubscriptionDate: yup.date(),
    endSubscriptionDate: yup.date(),
  })
  
  async function handleCreateSemester(event) {
    event.preventDefault()

    try {
      await api.post('semesters', {
        headers:{
          'x-logged-user': login,
          authorization: token
        }
      });
      alert("Semestre criado!\n Ajuste as novas datas")
      onClose()
    } catch (error) {
      alert('Erro ao criar novo semestre');  
    }
  }

  async function handleUpdateDates(event) {
    event.preventDefault()

    const configDateFormData = {
      initCreateDate,
      endCreateDate,
      initSubscriptionDate,
      endSubscriptionDate,
    }

    configDateSchema.validate(configDateFormData, { abortEarly: false })
      .then( async valid => {
        const updatedAdminGroup = {
          init_create_date: initCreateDate,
          end_create_date: endCreateDate,
          init_subscription_date: initSubscriptionDate,
          end_subscription_date: endSubscriptionDate
        }
      
        try {
          await api.put(`/configs/date/${id}`, updatedAdminGroup, {
            headers:{
              'x-logged-user': login,
              authorization: token
            }
          });
          alert("Datas atualizadas!")
          onClose();
        } catch (error) {
          alert('Erro ao atualizar datas');
        }
      }).catch((err) => {
        FormValidations(err.errors)
        alert("Valores invalidos para datas")
      })
  }

  useEffect(() => {
    async function getDates() {
      const adminGroup = await api.get(`/configs/date`, {
        headers:{
          authorization: token
        }
      });

      setId(adminGroup.data.id);
      setInitCreateDate(adminGroup.data.init_create_date);
      setEndCreateDate(adminGroup.data.end_create_date);
      setInitSubscriptionDate(adminGroup.data.init_subscription_date);
      setEndSubscriptionDate(adminGroup.data.end_subscription_date);
    }
    getDates();
  }, [])

  return (
    <>
      <Container>
        <div>
          <form onSubmit={handleCreateSemester}>
            <button type="submit">
              Criar novo semestre
            </button>
          </form>
        </div>
        <div>
          <CloseButton onClick={() => onClose()}>
            <FiX size={20} color="000"/>
          </CloseButton>
          <form onSubmit={handleUpdateDates}>
              <h2>Data para criação de grupos</h2>
              <label>
                Início
                <input type="date"
                  id="initCreateDate" 
                  value={initCreateDate}
                  onChange={e => {setInitCreateDate(e.target.value); e.target.style.borderColor = ''}}
                />
              </label>
              <label>
                Término
                <input type="date"
                  id="endCreateDate" 
                  value={endCreateDate}
                  onChange={e => {setEndCreateDate(e.target.value); e.target.style.borderColor = ''}}
                />
              </label>
              <h2>Data para inscrição de grupos</h2>
              <label>
                Início
                <input type="date"
                  id="initSubscriptionDate"
                  value={initSubscriptionDate}
                  onChange={e => {setInitSubscriptionDate(e.target.value); e.target.style.borderColor = ''}}
                />
              </label>
              <label>
                Término
                <input type="date"
                  id="endSubscriptionDate" 
                  value={endSubscriptionDate}
                  onChange={e => {setEndSubscriptionDate(e.target.value); e.target.style.borderColor = ''}}
                />
              </label>
              <button type='submit'>
                Atualizar
              </button>
          </form>
        </div>
      </Container>
    </>
  )
}