import { configureStore } from '@reduxjs/toolkit'
import merchantsReducer from './merchants'
import todolistReducer from './todolist'
import rowsRequestedFromServerReducer from './rowsRequestedFromServer'

export const store = configureStore({
  reducer: {
    rowsRequestedFromServer: rowsRequestedFromServerReducer,
    merchants: merchantsReducer,
    todolist: todolistReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
