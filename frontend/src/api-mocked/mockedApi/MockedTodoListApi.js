import mockedServer from 'src/api-mocked/mockedServer'
import data1 from '../mockedData/todolistPagedBy5Rows_page1.json'
import data2 from '../mockedData/todolistPagedBy5Rows_page2.json'
import data3 from '../mockedData/todolistPagedBy5Rows_page3.json'
import data4 from '../mockedData/todolistPagedBy10Rows_page1.json'
import data5 from '../mockedData/todolistPagedBy10Rows_page2.json'
import { API_URL } from '../../utils/env'

mockedServer.onGet(new RegExp(`${API_URL}/secured/todolist`)).reply(request => {
  const url = new URL(request.url, window.location.origin)
  const page = Number(url.searchParams.get('page') || 0)
  const size = Number(url.searchParams.get('size') || 10)

  let payload = {}
  if (size === 5) {
    if (page === 0) payload = data1
    if (page === 1) payload = data2
    if (page === 2) payload = data3
  } else if (size === 10) {
    if (page === 0) payload = data4
    if (page === 1) payload = data5 
  }
  return [200, payload]
})

mockedServer.onPost(new RegExp(`${API_URL}/secured/todolist`)).reply(config => {
  try {
    const newTodo = JSON.parse(config.data)
    const newId = `${Date.now()}`
    const now = new Date().toISOString()
    const recordToStore = { id: newId, ...newTodo, createdAt: now, updatedAt: now }
    data.push(recordToStore)
    return [200, { success: true, todolist: recordToStore }]
  } catch {
    return [400, { success: false, error: 'Invalid request data' }]
  }
})

mockedServer.onPut(new RegExp(`${API_URL}/secured/todolist`)).reply(config => {
  try {
    const updatedData = JSON.parse(config.data)
    const urlParts = config.url.split('/')
    const idToUpdate = urlParts[urlParts.length - 1]
    const foundIndex = data.findIndex(item => item.id === idToUpdate)
    if (foundIndex !== -1) {
      const now = new Date().toISOString()
      data[foundIndex] = { ...data[foundIndex], ...updatedData, updatedAt: now }
      return [200, data[foundIndex]]
    } else {
      console.log(`Todo with ID ${idToUpdate} not found`)
      return [404, { success: false, error: `Todo with ID ${idToUpdate} not found` }]
    }
  } catch {
    return [400, { success: false, error: 'Invalid request data' }]
  }
})

mockedServer.onDelete(new RegExp(`${API_URL}/secured/todolist`)).reply(config => {
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
