import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { searchTodoListApi } from '../../api/TodoListApi'
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../storeStates'

export const asyncSearchTodoList = createAsyncThunk('asyncSearchTodoList', async (queryParams, { rejectWithValue }) => {
  try {
    const response = await searchTodoListApi(queryParams)
    return response
  } catch (searchError) {
    if (searchError.message) {
      return rejectWithValue(searchError.message)
    } else {
      return rejectWithValue(searchError)
    }
  }
})

const initialValues = {
  id: '',
  title: '',
  description: '',
  isCompleted: '',
  fromDate: '',
  toDate: '',
  isSearchExpanded: true,
  queryData: '',
  rows: [],
  total: 0,
  searchStatus: IDLE,
  searchError: null
}

const todolistSearchSlice = createSlice({
  name: 'todolistSearchSlice',
  initialState: initialValues,
  reducers: {
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
    setFromDate: (state, action) => {
      state.fromDate = action.payload
    },
    setToDate: (state, action) => {
      state.toDate = action.payload
    },
    toggleSearch: state => {
      state.isSearchExpanded = !state.isSearchExpanded
    },
    setQueryData: (state, action) => {
      state.queryData = action.payload
    },
    resetSearch: state => {
      state.id = ''
      state.title = ''
      state.description = ''
      state.isCompleted = ''
      state.fromDate = ''
      state.toDate = ''
      state.queryData = ''
    }
  },
  extraReducers: builder => {
    builder
      .addCase(asyncSearchTodoList.pending, state => {
        state.searchStatus = LOADING
      })
      .addCase(asyncSearchTodoList.fulfilled, (state, action) => {
        state.searchStatus = SUCCEEDED
        state.rows = action.payload.data
        state.total = action.payload.total
      })
      .addCase(asyncSearchTodoList.rejected, (state, action) => {
        state.searchStatus = FAILED
        state.searchError = action.payload
      })
  }
})

export const {
  resetSearch,
  setId,
  setTitle,
  setDescription,
  setIsCompleted,
  setFromDate,
  setToDate,
  toggleSearch,
  setQueryData
} = todolistSearchSlice.actions

export default todolistSearchSlice.reducer 