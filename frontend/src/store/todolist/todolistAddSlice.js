import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addTodoListApi } from '../../api/TodoListApi'
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../storeStates'

export const asyncAddTodoList = createAsyncThunk('asyncAddTodoList', async (data, { rejectWithValue }) => {
  try {
    const response = await addTodoListApi(data)
    return response
  } catch (error) {
    return rejectWithValue(error.message || error)
  }
})

const initialState = {
  addStatus: IDLE,
  addError: null
}

const todolistAddSlice = createSlice({
  name: 'todolistAddSlice',
  initialState,
  reducers: {
    resetAddStatus: state => {
      state.addStatus = IDLE
      state.addError = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(asyncAddTodoList.pending, state => {
        state.addStatus = LOADING
      })
      .addCase(asyncAddTodoList.fulfilled, state => {
        state.addStatus = SUCCEEDED
      })
      .addCase(asyncAddTodoList.rejected, (state, action) => {
        state.addStatus = FAILED
        state.addError = action.payload
        console.error(`Error calling addTodoListApi`, state.addError)
      })
  }
})

export const { resetAddStatus } = todolistAddSlice.actions
export default todolistAddSlice.reducer 