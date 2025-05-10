import axios from 'axios'
import { API_URL } from '../utils/env'

export const searchMerchantsApi = async query => {
  query = query ? query : ''
  const token = sessionStorage.getItem('token')
  const url = `${API_URL}/secured/merchants${query}`
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

export const getMerchantApi = async id => {
  const token = sessionStorage.getItem('token')
  const url = `${API_URL}/secured/merchants/${id}`
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

export const addMerchantApi = async data => {
  const token = sessionStorage.getItem('token')
  const url = `${API_URL}/secured/merchants`
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

export const updateMerchantApi = async (id, data) => {
  const token = sessionStorage.getItem('token')
  const url = `${API_URL}/secured/merchants/${id}`
  console.log(`calling PUT ${url}, with data: ${JSON.stringify(data)}`)
  console.log('update-url=', url)
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

export const deleteMerchantApi = async id => {
  const token = sessionStorage.getItem('token')
  const url = `${API_URL}/secured/merchants/${id}`
  console.log(`calling DELETE ${url}`)
  console.info('Calling url:', url)
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
