import { createSlice } from '@reduxjs/toolkit'

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
  editMode: false
}

export const todolistDetailsSlice = createSlice({
  name: 'todolistDetailsSlice',
  initialState: initialValues,
  reducers: {
    openDialog: (state, action) => {
      state.isOpened = true
      state.editMode = action.payload.editMode
      state.id = action.payload.todolist.id
      state.title = action.payload.todolist.title
      state.description = action.payload.todolist.description
      state.isCompleted = action.payload.todolist.isCompleted
      state.createdAt = action.payload.todolist.createdAt
      state.updatedAt = action.payload.todolist.updatedAt
    },
    closeDialog: () => {
      return { ...initialValues }
    },
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
    resetForm: () => {
      return { ...initialValues }
    }
  }
})

export const {
  openDialog,
  closeDialog,
  setId,
  setTitle,
  setDescription,
  setIsCompleted,
  setCreatedAt,
  setUpdatedAt,
  validateForm,
  resetForm
} = todolistDetailsSlice.actions

export default todolistDetailsSlice.reducer 