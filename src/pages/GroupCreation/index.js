import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'

import { Container } from './styles';

import Header from '../../components/Header';

import api from '../../services/api';

export default function GroupCreation () {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const login = localStorage.getItem('login');

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

  const [categories, setCategories] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [semesters, setSemesters] = useState([]);

  async function handleCreateGroup (event) {
    event.preventDefault();

    const group = {
      name,
      description,
      category_id: category,
      ra_group_owner: groupOwner,
      qtt_min_students: qttMinStd,
      qtt_max_students: qttMaxStd,
      qtt_meetings: qttMeet,
      campus_id: campus,
      semester_id: semesterYear,
      period
    };

    try {
      await api.post('/groups', group, {
        headers:{
          'x-logged-user': login,
          authorization: token
        }
      });

      history.push('/requests');
    } catch (error) {
      alert('Erro ao cadastrar grupo');
    }
  }

  useEffect(() => {
    async function fillCategories () {
      await api.get('categories', {
        headers:{
          authorization: token
        }
      })
      .then(response => {
        setCategories(response.data)
      });
    }
    async function fillCampus () {
      await api.get('campus', {
        headers:{
          authorization: token
        }
      })
      .then(response => {
        setCampuses(response.data)
      });
    }
    async function fillSemester () {
      await api.get('semesters', {
        headers:{
          authorization: token
        }
      })
      .then(response => {
        setSemesters(response.data)
      });
    }

    fillCategories();
    fillCampus();
    fillSemester();
  }, [token]);

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
              <select onChange={e => setCategory(e.target.value)}>
                <option value="" disabled hidden selected>Selecione a Categoria</option>
                { categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
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
              <input type="number"
                value={qttMinStd}
                onChange={e => setQttMinStd(e.target.value)}
              />
            </label>

            <label>
              Quantidade máxima de alunos
              <input type="number"
                value={qttMaxStd}
                onChange={e => setQttMaxStd(e.target.value)}
              />
            </label>

            <label>
              Quantidade de encontros
              <input type="number"
                value={qttMeet}
                onChange={e => setQttMeet(e.target.value)}
              />
            </label>

            <div>
              <label>
                Campus
                <select onChange={e => setCampus(e.target.value)}>
                  <option value="" disabled hidden selected>Selecione o Campus</option>
                { campuses.map(camp => (
                  <option key={camp.id} value={camp.id}>
                    {camp.name}
                  </option>
                ))}
                </select>
              </label>

              <label>
                Semestre
                <select onChange={e => setSemesterYear(e.target.value)}>
                  <option value="" disabled hidden selected>Selecione o semestre</option>
                  <option key={semesters.id} value={semesters.id}>
                    {semesters.name}
                  </option>
                ))
                </select>
              </label>

              <label>
                Periodo
                <select onChange={e => setPeriod(e.target.value)}>
                  <option value="" disabled hidden selected>Selecione o período</option>
                  <option value="M">Manhã</option>
                  <option value="T">Tarde</option>
                  <option value="N">Noite</option>
                </select>
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