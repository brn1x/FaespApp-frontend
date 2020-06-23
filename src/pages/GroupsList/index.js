import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom'

import { Container, List, CardList, Title } from './styles';

import Header from '../../components/Header';
import GroupCard from '../../components/GroupCard';

import api from '../../services/api';

export default function GroupList() {
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState('');
  const history = useHistory();
  
  const token = localStorage.getItem('token');
  const login = localStorage.getItem('login');

  async function handleUpdateGroupPage(id) {
    history.push(`/groups/update/${id}`, { id: id });
  }

  async function handleDeleteGroup(id) {
    try {
      await api.delete(`/groups/${id}`, {
        headers:{
          'x-logged-user': login,
          authorization: token
        }
      });

      setGroupId(id);
    } catch (error) {
      alert('Erro ao deletar grupo');
    }
  }

  useEffect(() => {
    async function fillGroup () {
      await api.get('groups/all', {
        headers:{
          authorization: token
        }
      })
      .then(response => {
          setGroups(response.data)
        });
    }
    fillGroup();
  }, [groupId]);

  return (
    <>
      <Header />
      <Container>
          <Title>Lista de Grupos</Title>
          <List>
            <CardList>
              { groups.map(group => (
                <GroupCard
                  isRequest={false}
                  up={handleUpdateGroupPage}
                  down={handleDeleteGroup}
                  key={group.id}
                  id={group.id}
                  name={group.name} 
                  category={group.category.name}
                  description={group.description}
                  qttMin={group.qtt_min_students}
                  qttMax={group.qtt_max_students}
                  qttMeetings={group.qtt_meetings}
                  campus={group.campus.name}
                  semesterYear={group.semester.name}
                  period={group.period}
                />
              ))}
            </CardList>
          </List>
      </Container>
    </>
  );
}