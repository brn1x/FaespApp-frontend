import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

import { Container, CloseButton } from './styles';

import api from '../../../services/api';

export default function ModalConfigDate ({ onClose }) {

  const [id, setId] = useState('');
  const [initCreateDate, setInitCreateDate] = useState('');
  const [endCreateDate, setEndCreateDate] = useState('');
  const [initSubscriptionDate, setInitSubscriptionDate] = useState('');
  const [endSubscriptionDate, setEndSubscriptionDate] = useState('');
  
  useEffect(() => {
    async function getDates() {
      const adminGroup = await api.get(`/configs/date`);

      setId(adminGroup.data.id);
      setInitCreateDate(adminGroup.data.init_create_date);
      setEndCreateDate(adminGroup.data.end_create_date);
      setInitSubscriptionDate(adminGroup.data.init_subscription_date);
      setEndSubscriptionDate(adminGroup.data.end_subscription_date);
    }
    getDates();
  }, [])

  async function handleUpdateDates() {

    const updatedAdminGroup = {
      init_create_date: initCreateDate,
      end_create_date: endCreateDate,
      init_subscription_date: initSubscriptionDate,
      end_subscription_date: endSubscriptionDate
    }

    await api.put(`/configs/date/${id}`, updatedAdminGroup);
  }

  return (
    <>
      <Container>
        <div>
          <CloseButton onClick={() => onClose()}>
            <FiX size={20} color="000"/>
          </CloseButton>
          <form onSubmit={handleUpdateDates}>
              <h2>Data para criação de grupos</h2>
              <label>
                Início
                <input type="date" 
                  value={initCreateDate}
                  onChange={e => setInitCreateDate(e.target.value)}
                />
              </label>
              <label>
                Término
                <input type="date" 
                  value={endCreateDate}
                  onChange={e => setEndCreateDate(e.target.value)}
                />
              </label>
              <h2>Data para inscrição de grupos</h2>
              <label>
                Início
                <input type="date" 
                  value={initSubscriptionDate}
                  onChange={e => setInitSubscriptionDate(e.target.value)}
                />
              </label>
              <label>
                Término
                <input type="date" 
                  value={endSubscriptionDate}
                  onChange={e => setEndSubscriptionDate(e.target.value)}
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