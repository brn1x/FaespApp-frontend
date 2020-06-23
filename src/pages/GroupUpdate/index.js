import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom'

import { Container } from './styles';

import Header from '../../components/Header';

import api from '../../services/api';

import * as yup from 'yup'
import formValidations from '../../utils/FormValidations'


export default function GroupUpdate () {
  const location = useLocation();
  const history = useHistory();

  const token = localStorage.getItem('token');
  const login = localStorage.getItem('login');

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

  const [categories, setCategories] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    async function fillGroup() {
      const group = await api.get(`/groups/${id}`, {
        headers:{
          authorization: token
        }
      });

      setName(group.data.name);
      setCategory(group.data.category.id);
      setDescription(group.data.description);
      setGroupOwner(group.data.ra_group_owner);
      setQttMinStd(group.data.qtt_min_students);
      setQttMaxStd(group.data.qtt_max_students);
      setQttMeet(group.data.qtt_meetings);
      setCampus(group.data.campus.id);
      setSemesterYear(group.data.semester.id);
      setPeriod(group.data.period);
    }
    fillGroup();
  }, [id])

  yup.setLocale({
    mixed:{
      default: 'Não é Valido',
      required: '${path}',
    },
    string:{
      min: '${path}',
    },
    number:{
      min: '${path}',
    },
  })

  const updateGroupSchema = yup.object().shape({
    name: yup.string().required(),
    category: yup.number().required().min(1),
    description: yup.string().required(),
    groupOwner: yup.string().min(11).max(11),
    qttMinStd: yup.number().required().min(1),
    qttMaxStd: yup.number().required().min(1),
    qttMeet: yup.number().required().min(1),
    campus: yup.number().required().min(1),
    semesterYear: yup.number().required().min(1),
    period: yup.string().required().max(1),
  })
  
  async function handleUpdateGroup (event) {
    event.preventDefault();
    
    const updateGroupFormData = {
      name,
      description,
      category,
      groupOwner,
      qttMinStd,
      qttMaxStd,
      qttMeet,
      campus,
      semesterYear,
      period
    }

    updateGroupSchema.validate(updateGroupFormData, { abortEarly: false })
      .then(async valid => {
        const updatedGroup = {
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
        }
    
        try{
          await api.put(`/groups/${id}`, updatedGroup, {
            headers:{
              'x-logged-user': login,
              authorization: token
            }
          });
        } catch(error){
          alert('Erro ao atualizar os grupos');
        }
      }).catch((err) => {
        formValidations(err.errors)
        alert("Campos Obrigatórios não preenchidos")
      })

    history.push('/groups')
  }

  useEffect(() => {
    async function fillCategories () {
      await api.get('categories',{
        headers:{
          authorization: token
        }
      }).then(response => {
        setCategories(response.data)
      });
    }
    async function fillCampus () {
      await api.get('campus',{
        headers:{
          authorization: token
        }
      }).then(response => {
        setCampuses(response.data)
      });
    }
    async function fillSemester () {
      await api.get('semesters',{
        headers:{
          authorization: token
        }
      }).then(response => {
        setSemesters(response.data)
      });
      
    }
    
    fillCategories();
    fillCampus();
    fillSemester();
  }, [])  

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
              <select value={category}  onChange={e => setCategory(e.target.value)}>
                <option value="" disabled hidden>Selecione a Categoria</option>
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
                <select value={campus} onChange={e => setCampus(e.target.value)}>
                  <option value="" disabled hidden>Selecione o Campus</option>
                  { campuses.map(camp => (
                    <option key={camp.id} value={camp.id}>
                      {camp.name}
                  </option>
                  ))}
                </select>
              </label>

              <label>
                Semestre
                <select value={semesterYear} onChange={e => setSemesterYear(e.target.value)}>
                  <option value="" disabled hidden>Selecione o semestre</option>
                  <option key={semesters.id} value={semesters.id}>
                    {semesters.name}
                  </option>
                </select>
              </label>

              <label>
                Periodo
                <select value={period} onChange={e => setPeriod(e.target.value)}>
                  <option value="" disabled hidden>Selecione o período</option>
                  <option value="M">Manhã</option>
                  <option value="T">Tarde</option>
                  <option value="N">Noite</option>
                </select>
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