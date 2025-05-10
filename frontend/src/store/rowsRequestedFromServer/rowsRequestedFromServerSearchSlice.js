import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  rowAdded: false,
  rowDeleted: false,
  rowUpdated: false,
  rowSearched: false
}

const rowRequestedFromServer = createSlice({
  name: 'rowRequestedFromServer',
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload
    },
    setPageSize(state, action) {
      state.pageSize = action.payload
    },

    setRowAdded: (state, action) => {
      state.rowAdded = action.payload
    },
    setRowDeleted: (state, action) => {
      state.rowDeleted = action.payload
    },
    setRowUpdated: (state, action) => {
      state.rowUpdated = action.payload
    },
    setRowSearched: (state, action) => {
      state.rowSearched = action.payload
    }
  }
})

export const { setRowAdded, setRowDeleted, setRowUpdated, setRowSearched } = rowRequestedFromServer.actions

export default rowRequestedFromServer.reducer
