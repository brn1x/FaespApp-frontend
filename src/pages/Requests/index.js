import React, { useState, useEffect } from 'react';

import { Container, List, CardList, Title } from './styles';

import Header from '../../components/Header';
import GroupCard from '../../components/GroupCard';

import api from '../../services/api';

export default function Requests () {
  const [requests, setRequests] = useState([]);
  const [groupId, setGroupId] = useState('');

  async function handleAcceptRequest(id) {
    try {
      await api.put(`/requests/accept/${id}`);

      setGroupId(id);
    } catch (error) {
      alert('Erro ao aceitar o requerimento');
    }
  }
  
  async function handleRejectRequest(id) {
    try {
      await api.put(`/requests/reject/${id}`);

      setGroupId(id);
    } catch (error) {
      alert('Erro ao rejeitar o requerimento');
    }
  }

  useEffect(() => {
    async function fillRequests () {
      await api.get('requests')
        .then(response => {
          setRequests(response.data);
        })
    }
    fillRequests();
  }, [groupId])
  
  return (
    <>
      <Header />
      <Container>
        <Title>Requerimentos Pendentes</Title>
        <List>
          <CardList>
            { requests.map(request => (
              <GroupCard
                isRequest={true}
                up={handleAcceptRequest}
                down={handleRejectRequest}
                key={request.id}
                id={request.id}
                name={request.name}
                category={request.category.name}
                description={request.description}
                qttMin={request.qtt_min_students}
                qttMax={request.qtt_max_students}
                qttMeetings={request.qtt_meetings}
                campus={request.campus.name}
                semesterYear={request.semester.name}
                period={request.period}
              />
            ))}
          </CardList>
        </List>
      </Container>
    </>
  )
}