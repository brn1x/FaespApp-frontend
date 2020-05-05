import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

import { Container } from './styles';

import Header from '../../components/Header';

import api from '../../services/api';

export default function GroupCreation () {
  const history = useHistory();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [groupOwner, setGroupOwner] = useState('');
  const [qttMinStd, setQttMinStd] = useState('');
  const [qttMaxStd, setQttMaxStd] = useState('');
  const [qttMeet, setQttMeet] = useState('');
  const [campus, setCampus] = useState('');
  const [semesterYear, setSemesterYear] = useState('');
  const [period, setPeriod] = useState('');

  async function handleCreateGroup (event) {
    event.preventDefault();

    const group = {
      name,
      description,
      category,
      ra_group_owner: groupOwner,
      qtt_min_students: qttMinStd,
      qtt_max_students: qttMaxStd,
      qtt_meetings: qttMeet,
      campus,
      semester_year: semesterYear,
      period
    };

    try {
      await api.post('/groups', group);

      history.push('/');
    } catch (error) {
      alert('Erro ao cadastrar grupo');
    }
  }

  return (
    <>
      <Header />
      <Container>
          <form onSubmit={handleCreateGroup}>
            <label>
              Nome do Grupo
              <input
                value={name}
                onChange={e => setName(e.target.value)} 
              />
            </label>

            <label>
              Categoria
              <input
                value={category}
                onChange={e => setCategory(e.target.value)}
              />
            </label>

            <label>
              Descrição
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </label>

            <label>
              RA Presidente do Grupo
              <input
                value={groupOwner}
                onChange={e => setGroupOwner(e.target.value)}
              />
            </label>

            <label>
              Quantidade minima de alunos
              <input
                value={qttMinStd}
                onChange={e => setQttMinStd(e.target.value)}
              />
            </label>

            <label>
              Quantidade máxima de alunos
              <input
                value={qttMaxStd}
                onChange={e => setQttMaxStd(e.target.value)}
              />
            </label>

            <label>
              Quantidade de encontros
              <input
                value={qttMeet}
                onChange={e => setQttMeet(e.target.value)}
              />
            </label>

            <div>
              <label>
                Campus
                <input 
                  value={campus}
                  onChange={e => setCampus(e.target.value)}
                />
              </label>

              <label>
                Semestre
                <input 
                  value={semesterYear}
                  onChange={e => setSemesterYear(e.target.value)}
                />
              </label>

              <label>
                Periodo
                <input 
                  value={period}
                  onChange={e => setPeriod(e.target.value)}
                />
              </label>
            </div>

            <button type="submit">
              Cadastrar
            </button>
          </form>
      </Container>
    </>
  )
}