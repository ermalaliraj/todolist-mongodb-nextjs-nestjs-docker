import { combineReducers } from '@reduxjs/toolkit'
import rowsRequestedFromServerSearchReducer from './rowsRequestedFromServerSearchSlice'

const rowsRequestedFromServerReducer = combineReducers({
  search: rowsRequestedFromServerSearchReducer
})

export default rowsRequestedFromServerReducer
