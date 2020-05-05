import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom'

import { Container } from './styles';

import Header from '../../components/Header';

import api from '../../services/api';

export default function GroupUpdate () {
  const location = useLocation();
  const history = useHistory();

  const id = location.state.id;

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

  useEffect(() => {
    async function fillGroup() {
      const group = await api.get(`/groups/${id}`);

      setName(group.data.name);
      setCategory(group.data.category);
      setDescription(group.data.description);
      setGroupOwner(group.data.ra_group_owner);
      setQttMinStd(group.data.qtt_min_students);
      setQttMaxStd(group.data.qtt_max_students);
      setQttMeet(group.data.qtt_meetings);
      setCampus(group.data.campus);
      setSemesterYear(group.data.semester_year);
      setPeriod(group.data.period);
    }
    fillGroup();
  }, [])

  async function handleUpdateGroup (event) {
    event.preventDefault();
    
    const updatedGroup = {
      name,
      category,
      description,
      ra_group_owner: groupOwner,
      qtt_min_students: qttMinStd,
      qtt_max_students: qttMaxStd,
      qtt_meetings: qttMeet
    }

    await api.put(`/groups/${id}`, updatedGroup);

    history.push('/')
  }

  return (
    <>
      <Header />
      <Container>
          <form onSubmit={handleUpdateGroup}>
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
              Alterar
            </button>
          </form>
      </Container>
    </>
  )
}