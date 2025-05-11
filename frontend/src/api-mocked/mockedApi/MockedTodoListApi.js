import mockedServer from 'src/api-mocked/mockedServer'
import data from '../mockedData/todolist.json'
import { API_URL } from '../../utils/env'

console.log('Initializing MockedTodoListApi with data:', data)

mockedServer.onGet(new RegExp(`${API_URL}/secured/todolist`)).reply(request => {
  console.log('Mocked API: Intercepted GET request for todolist')
  const url = new URL(request.url, window.location.origin)
  const params = Object.fromEntries(url.searchParams.entries())
  const { id = '', title = '', description = '', isCompleted = '', fromDate = '', toDate = '' } = params
  const filtered = data.filter(item => {
    const matchesId = id ? String(item.id).includes(id) : true
    const matchesTitle = title ? item.title.toLowerCase().includes(title.toLowerCase()) : true
    const matchesDescription = description ? item.description.toLowerCase().includes(description.toLowerCase()) : true
    const matchesStatus = isCompleted !== '' ? String(item.isCompleted) === isCompleted : true
    const matchesFromDate = fromDate ? new Date(item.createdAt) >= new Date(fromDate) : true
    const matchesToDate = toDate ? new Date(item.updatedAt) <= new Date(toDate) : true
    return matchesId && matchesTitle && matchesDescription && matchesStatus && matchesFromDate && matchesToDate
  })
  const page = parseInt(params.page) || 0
  const size = parseInt(params.size) || data.length
  const totalCount = filtered.length
  const reversedData = filtered.slice().reverse()
  const startIndex = page * size
  const endIndex = startIndex + size
  const slicedData = reversedData.slice(startIndex, endIndex)

  console.log('Mocked API: Returning data:', slicedData)
  return [200, { data: slicedData, total: totalCount }]
})

mockedServer.onPost(new RegExp(`${API_URL}/secured/todolist`)).reply(config => {
  try {
    const newTodo = JSON.parse(config.data)
    const newId = `${Date.now()}`
    const now = new Date().toISOString()
    const recordToStore = {
      id: newId,
      ...newTodo,
      createdAt: now,
      updatedAt: now
    }
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
      data[foundIndex] = {
        ...data[foundIndex],
        ...updatedData,
        updatedAt: now
      }
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