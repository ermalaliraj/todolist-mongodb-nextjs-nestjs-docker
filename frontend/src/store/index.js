import { configureStore } from '@reduxjs/toolkit'
import todolistReducer from './todolist'
import rowsRequestedFromServerReducer from './rowsRequestedFromServer'

export const store = configureStore({
  reducer: {
    rowsRequestedFromServer: rowsRequestedFromServerReducer,
    todolist: todolistReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
