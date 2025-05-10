import { combineReducers } from '@reduxjs/toolkit'
import merchantAddReducer from './merchantAddSlice'
import merchantUpdateReducer from './merchantUpdateSlice'
import merchantDeleteReducer from './merchantDeleteSlice'
import merchantSearchReducer from './merchantSearchSlice'
import merchantDetailsReducer from './merchantDetailsSlice'

const merchantsReducer = combineReducers({
  add: merchantAddReducer,
  update: merchantUpdateReducer,
  delete: merchantDeleteReducer,
  search: merchantSearchReducer,
  details: merchantDetailsReducer
})

export default merchantsReducer
