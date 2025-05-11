import axios from 'axios'
import { API_URL } from '../utils/env'

export const searchTodoListApi = async query => {
  query = query ? query : ''
  const token = sessionStorage.getItem('token')
  const url = `${API_URL}/secured/todolist${query}`
  console.log(`calling GET ${url}`)
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(" respoonse search", response.data)
    return response.data
  } catch (error) {
    console.error('Failed calling backend url:', url, error)
    throw error
  }
}

export const getTodoListApi = async id => {
  const token = sessionStorage.getItem('token')
  const url = `${API_URL}/secured/todolist/${id}`
  console.log(`calling GET ${url}`)
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Failed calling backend url:', url, error)
    throw error
  }
}

export const addTodoListApi = async data => {
  const token = sessionStorage.getItem('token')
  const url = `${API_URL}/secured/todolist`
  console.log(`calling POST ${url}, with data: ${JSON.stringify(data)}`)
  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Failed calling backend url:', url, error)
    throw error
  }
}

export const updateTodoListApi = async (id, data) => {
  const token = sessionStorage.getItem('token')
  const url = `${API_URL}/secured/todolist/${id}`
  console.log(`calling PUT ${url}, with data: ${JSON.stringify(data)}`)
  try {
    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Failed calling backend url:', url, error)
    throw error
  }
}

export const deleteTodoListApi = async id => {
  const token = sessionStorage.getItem('token')
  const url = `${API_URL}/secured/todolist/${id}`
  console.log(`calling DELETE ${url}`)
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Failed calling backend url:', url, error)
    throw error
  }
} 