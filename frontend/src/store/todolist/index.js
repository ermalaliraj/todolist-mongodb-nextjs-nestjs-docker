import { combineReducers } from '@reduxjs/toolkit'
import todolistAddReducer from './todolistAddSlice'
import todolistUpdateReducer from './todolistUpdateSlice'
import todolistDeleteReducer from './todolistDeleteSlice'
import todolistSearchReducer from './todolistSearchSlice'
import todolistDetailsReducer from './todolistDetailsSlice'

const todolistReducer = combineReducers({
  add: todolistAddReducer,
  update: todolistUpdateReducer,
  delete: todolistDeleteReducer,
  search: todolistSearchReducer,
  details: todolistDetailsReducer
})

export default todolistReducer 