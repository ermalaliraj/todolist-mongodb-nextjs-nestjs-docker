import mockedServer from 'src/api-mocked/mockedServer'
import data from '../mockedData/merchants.json'
import { API_URL } from '../../utils/env'

mockedServer.onGet(new RegExp(`${API_URL}/secured/merchants`)).reply(request => {
  const url = new URL(request.url, window.location.origin)
  const params = Object.fromEntries(url.searchParams.entries())
  const { id = '', name = '', address = '', phone = '', email = '' } = params
  const filtered = data.filter(item => {
    const matchesId = id ? String(item.id).includes(id) : true
    const matchesName = name ? item.name.toLowerCase().includes(name.toLowerCase()) : true
    const matchesAddress = address ? item.address.toLowerCase().includes(address.toLowerCase()) : true
    const matchesPhone = phone ? item.phone.includes(phone) : true
    const matchesEmail = email ? item.email.toLowerCase().includes(email.toLowerCase()) : true
    return matchesId && matchesName && matchesAddress && matchesPhone && matchesEmail
  })
  const page = parseInt(params.page) || 0
  const size = parseInt(params.size) || data.length
  const totalCount = filtered.length
  const reversedData = filtered.slice().reverse()
  const startIndex = page * size
  const endIndex = startIndex + size
  const slicedData = reversedData.slice(startIndex, endIndex)

  console.log('slice Data= ', slicedData)
  return [200, { data: slicedData, total: totalCount }]
})

mockedServer.onPost(new RegExp(`${API_URL}/secured/merchants`)).reply(config => {
  try {
    const newMerchant = JSON.parse(config.data)
    const newId = `${Date.now()}`
    const recordToStore = { id: newId, ...newMerchant }
    data.push(recordToStore)
    return [200, { success: true, merchant: recordToStore }]
  } catch {
    return [400, { success: false, error: 'Invalid request data' }]
  }
})

mockedServer.onPut(new RegExp(`${API_URL}/secured/merchants`)).reply(config => {
  try {
    const updatedData = JSON.parse(config.data)
    const urlParts = config.url.split('/')
    const idToUpdate = urlParts[urlParts.length - 1]
    const foundIndex = data.findIndex(item => item.id === idToUpdate)
    if (foundIndex !== -1) {
      data[foundIndex] = { ...data[foundIndex], ...updatedData }
      return [200, data[foundIndex]]
    } else {
      console.log(`Merchant with ID ${idToUpdate} not found`)
      return [404, { success: false, error: `Merchant with ID ${idToUpdate} not found` }]
    }
  } catch {
    return [400, { success: false, error: 'Invalid request data' }]
  }
})

mockedServer.onDelete(new RegExp(`${API_URL}/secured/merchants`)).reply(config => {
  const urlParts = config.url.split('/')
  const idToDelete = urlParts[urlParts.length - 1]
  const index = data.findIndex(item => item.id === idToDelete)
  if (index !== -1) {
    data.splice(index, 1)
    return [200, { success: true }]
  } else {
    return [404, { success: false, error: 'Item not found' }]
  }
})
