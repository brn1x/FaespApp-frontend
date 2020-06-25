/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'

import { Container } from './styles';

import Header from '../../components/Header';

import api from '../../services/api';

import * as yup from 'yup'
import formValidations from '../../utils/FormValidations'

export default function GroupCreation () {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const login = localStorage.getItem('login');

  const [name, setName] = useState('');
  const [category, setCategory] = useState(0);
  const [description, setDescription] = useState('');
  const [groupOwner, setGroupOwner] = useState('');
  const [qttMinStd, setQttMinStd] = useState(0);
  const [qttMaxStd, setQttMaxStd] = useState(0);
  const [qttMeet, setQttMeet] = useState(0);
  const [campus, setCampus] = useState(0);
  const [semesterYear, setSemesterYear] = useState(0);
  const [period, setPeriod] = useState('');

  const [categories, setCategories] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [semesters, setSemesters] = useState([]);

  yup.setLocale({
    mixed:{
      default: 'Não é Valido',
      required: '${path}',
    },
    string:{
      min: '${path}',
      max: '${path}',
    },
    number:{
      min: '${path}',
    },
  })

  const createGroupSchema = yup.object().shape({
    name: yup.string().required(),
    category: yup.number().required().min(1),
    description: yup.string().required(),
    groupOwner: yup.string().min(11).max(11),
    qttMinStd: yup.number().required().min(1),
    qttMaxStd: yup.number().required().min(1),
    qttMeet: yup.number().required().min(1),
    campus: yup.number().required().min(1),
    //semesterYear: yup.number().required().min(1),
    period: yup.string().required().max(1),
  })

  async function handleCreateGroup (event) {
    event.preventDefault();

    const createGroupFormData = {
      name,
      description,
      category,
      groupOwner,
      qttMinStd,
      qttMaxStd,
      qttMeet,
      campus,
      //semesterYear,
      period
    }

    createGroupSchema.validate(createGroupFormData, { abortEarly: false })
      .then(async valid => {
        const group = {
          name,
          description,
          category_id: category,
          ra_group_owner: groupOwner,
          qtt_min_students: qttMinStd,
          qtt_max_students: qttMaxStd,
          qtt_meetings: qttMeet,
          campus_id: campus,
          //semester_id: semesterYear,
          period
        };
    
        try {
          await api.post('/groups', group, {
            headers:{
              'x-logged-user': login,
              authorization: token
            }
          });
          alert("Grupo Criado!")
          history.push('/requests');
        } catch (error) {
          alert('Erro ao cadastrar grupo');
        }
      }).catch((err)=> {
        formValidations(err.errors)
        alert("Campos Obrigatórios não preenchidos")
      })
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
                id="name"
                value={name}
                onChange={e => {setName(e.target.value); e.target.style.borderColor = ''}} 
              />
            </label>

            <label>
              Categoria
              <select id="category" onChange={e => {setCategory(e.target.value); e.target.style.borderColor = ''}}>
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
                id="description"
                value={description}
                onChange={e => {setDescription(e.target.value); e.target.style.borderColor = ''}}
              />
            </label>

            <label>
              RA Presidente do Grupo
              <input
                id="groupOwner"
                maxlength="11"
                value={groupOwner}
                onChange={e => {setGroupOwner(e.target.value); e.target.style.borderColor = ''}}
              />
            </label>

            <label>
              Quantidade minima de alunos
              <input type="number"
                id="qttMinStd"
                value={qttMinStd}
                onChange={e => {setQttMinStd(e.target.value); e.target.style.borderColor = ''}}
              />
            </label>

            <label>
              Quantidade máxima de alunos
              <input type="number"
                id="qttMaxStd"
                value={qttMaxStd}
                onChange={e => {setQttMaxStd(e.target.value); e.target.style.borderColor = ''}}
              />
            </label>

            <label>
              Quantidade de encontros
              <input type="number"
                id="qttMeet"
                value={qttMeet}
                onChange={e => {setQttMeet(e.target.value); e.target.style.borderColor = ''}}
              />
            </label>

            <div>
              <label>
                Campus
                <select id="campus" onChange={e => {setCampus(e.target.value); e.target.style.borderColor = ''}}>
                  <option value="" disabled hidden selected>Selecione o Campus</option>
                { campuses.map(camp => (
                  <option key={camp.id} value={camp.id}>
                    {camp.name}
                  </option>
                ))}
                </select>
              </label>

              <label>
                Periodo
                <select id="period" onChange={e => {setPeriod(e.target.value); e.target.style.borderColor = ''}}>
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