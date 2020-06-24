import React, { useState, useEffect } from 'react';
import {FiX} from 'react-icons/fi'

import { Container, CloseButton } from './styles';
import api from '../../../services/api';

import * as yup from 'yup'
import FormValidations from '../../../utils/FormValidations';

export default function ModalCategory({ onClose }){

  const [name, setName] = useState('');

  const [category, setCategory] = useState('');
  
  const [categories, setCategories] = useState([]);

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

  async function handleDeleteCategory(id, event){
    event.preventDefault();
    try{
      await api.delete(`/categories/${id}`, {
        headers:{
          'x-logged-user': login,
          authorization: token
        }
      });
      alert("Categoria salva!")
      onClose();
    }catch (error){
      alert('Erro ao deletar categoria');
    }
  }

  async function handleCreateCategory(event){
    event.preventDefault();

    const categoryFormData = { name, }

    campusSchema.validate(categoryFormData)
      .then( async valid => {
        const newCategory = { name };
        try {
          await api.post('categories', newCategory, {
            headers:{
              'x-logged-user': login,
              authorization: token
            }
          });
          alert("Categoria salva!")
          onClose();
        }catch (error){
          alert('Erro ao cadastrar categoria');
        }
      }).catch((err) => {
        FormValidations(err.errors)
        alert("Campos obrigatórios não preenchidos")
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

    fillCategories();
  }, [token]);

  return(
    <>
      <Container>
        <div>
          <CloseButton onClick={() => onClose()}>
            <FiX size={20} color="000"/>
          </CloseButton>
          <form onSubmit={() => handleDeleteCategory(category)}>
              <select onChange={e => setCategory(e.target.value)}>
                <option value="" disabled hidden selected>Selecione uma categoria para excluir </option>
                { categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            <button type="submit">
              Deletar
            </button>
          </form>
          <form onSubmit={handleCreateCategory}>
            <label>
              Criar nova categoria
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