import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { deleteTodoListApi } from '../../api/TodoListApi'
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../storeStates'

export const asyncDeleteTodoList = createAsyncThunk('todolist/asyncDeleteTodoList', async (id, { rejectWithValue }) => {
  try {
    await deleteTodoListApi(id)
    return id
  } catch (error) {
    return rejectWithValue(error.message || error)
  }
})

const initialState = {
  deleteStatus: IDLE,
  deleteError: null
}

const todolistDeleteSlice = createSlice({
  name: 'todolistDeleteSlice',
  initialState,
  reducers: {
    resetDeleteStatus: state => {
      state.deleteStatus = IDLE
      state.deleteError = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(asyncDeleteTodoList.pending, state => {
        state.deleteStatus = LOADING
      })
      .addCase(asyncDeleteTodoList.fulfilled, state => {
        state.deleteStatus = SUCCEEDED
      })
      .addCase(asyncDeleteTodoList.rejected, (state, action) => {
        state.deleteStatus = FAILED
        state.deleteError = action.payload
        console.error(`Error calling deleteTodoListApi`, state.deleteError)
      })
  }
})

export const { resetDeleteStatus } = todolistDeleteSlice.actions
export default todolistDeleteSlice.reducer 