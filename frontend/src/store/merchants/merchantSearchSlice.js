import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { searchMerchantsApi } from '../../api/MerchantsApi'
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../storeStates'

export const asyncSearchMerchants = createAsyncThunk('asyncSearchMerchants', async (queryParams, { rejectWithValue }) => {
  try {
    const response = await searchMerchantsApi(queryParams)
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
  name: '',
  address: '',
  registrationNumber: '',
  phone: '',
  email: '',
  queryData: '',
  isSearchExpanded: true,
  rows: [],
  searchStatus: IDLE,
  searchError: null
}

const merchantSearchSlice = createSlice({
  name: 'merchantSearchSlice',
  initialState: initialValues,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload
    },
    setName: (state, action) => {
      state.name = action.payload
    },
    setAddress: (state, action) => {
      state.address = action.payload
    },
    setRegistrationNumber: (state, action) => {
      state.registrationNumber = action.payload
    },
    setPhone: (state, action) => {
      state.phone = action.payload
    },
    setEmail: (state, action) => {
      state.email = action.payload
    },
    setQueryData: (state, action) => {
      state.queryData = action.payload
    },
    toggleSearch: state => {
      state.isSearchExpanded = !state.isSearchExpanded
    },
    resetSearch: () => {
      return { ...initialValues, isSearchExpanded: true }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(asyncSearchMerchants.pending, state => {
        state.searchStatus = LOADING
      })
      .addCase(asyncSearchMerchants.fulfilled, (state, action) => {
        state.searchStatus = SUCCEEDED
        state.rows = action.payload
      })
      .addCase(asyncSearchMerchants.rejected, (state, action) => {
        state.searchStatus = FAILED
        state.searchError = action.payload
      })
  }
})

export const { resetSearch, setId, setName, setAddress, setRegistrationNumber, setPhone, setEmail, toggleSearch, setQueryData } = merchantSearchSlice.actions

export default merchantSearchSlice.reducer
