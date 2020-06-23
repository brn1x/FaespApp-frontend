import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

import { Container } from './styles'

import logoFaespImg from '../../assets/Unifaesp1.png'
import studentsImg from '../../assets/students.png'

import api from '../../services/api'

import * as yup from 'yup'
import formValidations from '../../utils/FormValidations'

export default function Login(){
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  yup.setLocale({
    mixed:{
      default: 'Não é Valido',
      required: '${path}',
    },
  })

  const loginSchema = yup.object().shape({
    login: yup.string().required(),
    password: yup.string().required(),
  })

  async function handleLogin (event) {
    event.preventDefault();

    const loginFormData = {
      login,
      password,
    }

    loginSchema.validate(loginFormData, { abortEarly: false })
      .then( async valid => {
      const session = { login, password }

      try {
        await api.post('/session', session)
          .then(response => {
            if(!response.data.token){
              return alert('Acesso Invalido');
            }
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('login', login);
            history.push('/groups')
          })
      } catch (error) {
        alert('Usuário ou senha incorretos')
      }
      }).catch((err) => {
        formValidations(err.errors)
        alert("Campos obrigatórios não preenchidos")
      });

  }

  return(
    <>
      <Container>
        <div>
          <img src={logoFaespImg} alt="Logo Faesp" />
            <form onSubmit={handleLogin}>
                <input id="login" placeholder="Login" onChange={e => {setLogin(e.target.value); e.target.style.borderColor = ''}} />
                <input id="password" type="password" placeholder="Senha" onChange={e => {setPassword(e.target.value); e.target.style.borderColor = ''}} />

              <button type="submit">
                Entrar
              </button>
            </form>
        </div>
        <img src={studentsImg} alt="Students" />
      </Container>
    </> 
  );
}