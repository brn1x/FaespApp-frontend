import api from '../services/api';

export default async function validateCreationDate(){

  const token = localStorage.getItem('token');

  const dateC = await api.get(`/configs/date`, {
    headers:{
      authorization: token
    }
  })

  const today = new Date().setHours(0, 0, 0, 0)
  const initCreateDate = new Date(dateC.data.init_create_date).setMilliseconds(10800000)
  const endCreateDate = new Date(dateC.data.end_create_date).setMilliseconds(10800000)
  
  if (today >= initCreateDate &&
      today <= endCreateDate) {
    return true
  }

  return false
}