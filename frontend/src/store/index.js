import { configureStore } from '@reduxjs/toolkit'
import merchantsReducer from './merchants'
import rowsRequestedFromServerReducer from './rowsRequestedFromServer'

export const store = configureStore({
  reducer: {
    rowsRequestedFromServer: rowsRequestedFromServerReducer,
    merchants: merchantsReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
