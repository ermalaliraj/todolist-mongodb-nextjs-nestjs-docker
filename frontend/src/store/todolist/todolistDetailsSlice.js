import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getTodoByIdApi } from '../../api/TodoListApi'
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../storeStates'

export const asyncGetTodo = createAsyncThunk('asyncGetTodo', async (id, { rejectWithValue }) => {
  try {
    return await getTodoByIdApi(id)
  } catch (e) {
    return rejectWithValue(e.message || e)
  }
})

const initialValues = {
  id: '',
  title: '',
  description: '',
  isCompleted: false,
  createdAt: '',
  updatedAt: '',
  titleError: false,
  descriptionError: false,
  isOpened: false,
  editMode: false,
  getStatus: IDLE,
  getError: null
}

export const todolistDetailsSlice = createSlice({
  name: 'todolistDetailsSlice',
  initialState: initialValues,
  reducers: {
    openDialog: (state, action) => {
      state.isOpened = true
      state.editMode = action.payload.editMode
      state.id = action.payload.id || ''
    },
    closeDialog: () => ({ ...initialValues }),
    setId: (state, action) => {
      state.id = action.payload
    },
    setTitle: (state, action) => {
      state.title = action.payload
    },
    setDescription: (state, action) => {
      state.description = action.payload
    },
    setIsCompleted: (state, action) => {
      state.isCompleted = action.payload
    },
    setCreatedAt: (state, action) => {
      state.createdAt = action.payload
    },
    setUpdatedAt: (state, action) => {
      state.updatedAt = action.payload
    },
    validateForm: state => {
      state.titleError = !state.title
      state.descriptionError = !state.description
    },
    resetForm: () => ({ ...initialValues })
  },
  extraReducers: builder => {
    builder
      .addCase(asyncGetTodo.pending, state => {
        state.getStatus = LOADING
        state.getError = null
      })
      .addCase(asyncGetTodo.fulfilled, (state, action) => {
        const payload = action.payload || {}
        state.getStatus = SUCCEEDED
        state.id = payload._id || ''
        state.title = payload.title || ''
        state.description = payload.description || ''
        state.isCompleted = payload.isCompleted || false
        state.createdAt = payload.createdAt || ''
        state.updatedAt = payload.updatedAt || ''
      })
      .addCase(asyncGetTodo.rejected, (state, action) => {
        state.getStatus = FAILED
        state.getError = action.payload
      })
  }
})

export const { openDialog, closeDialog, setId, setTitle, setDescription, setIsCompleted, setCreatedAt, setUpdatedAt, validateForm, resetForm } = todolistDetailsSlice.actions

export default todolistDetailsSlice.reducer
