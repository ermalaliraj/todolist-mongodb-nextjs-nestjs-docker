import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { updateTodoListApi } from '../../api/TodoListApi'
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../storeStates'

export const asyncUpdateTodoList = createAsyncThunk('todolist/asyncUpdateTodoList', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await updateTodoListApi(id, data)
    return response
  } catch (error) {
    return rejectWithValue(error.message || error)
  }
})

const initialState = {
  updateStatus: IDLE,
  updateError: null
}

const todolistUpdateSlice = createSlice({
  name: 'todolistUpdateSlice',
  initialState,
  reducers: {
    resetUpdateStatus: state => {
      state.updateStatus = IDLE
      state.updateError = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(asyncUpdateTodoList.pending, state => {
        state.updateStatus = LOADING
      })
      .addCase(asyncUpdateTodoList.fulfilled, state => {
        state.updateStatus = SUCCEEDED
      })
      .addCase(asyncUpdateTodoList.rejected, (state, action) => {
        state.updateStatus = FAILED
        state.updateError = action.payload
        console.error(`Error calling updateTodoListApi`, state.updateError)
      })
  }
})

export const { resetUpdateStatus } = todolistUpdateSlice.actions
export default todolistUpdateSlice.reducer 