import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addMerchantApi } from '../../api/MerchantsApi'
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../storeStates'

export const asyncAddMerchant = createAsyncThunk('asyncAddMerchant', async (data, { rejectWithValue }) => {
  try {
    const response = await addMerchantApi(data)
    return response
  } catch (error) {
    return rejectWithValue(error.message || error)
  }
})

const initialState = {
  addStatus: IDLE,
  addError: null
}

const merchantAddSlice = createSlice({
  name: 'merchantAddSlice',
  initialState,
  reducers: {
    resetAddStatus: state => {
      state.addStatus = IDLE
      state.addError = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(asyncAddMerchant.pending, state => {
        state.addStatus = LOADING
      })
      .addCase(asyncAddMerchant.fulfilled, state => {
        state.addStatus = SUCCEEDED
      })
      .addCase(asyncAddMerchant.rejected, (state, action) => {
        state.addStatus = FAILED
        state.addError = action.payload
        console.error(`Error calling addMerchantApi`, state.addError)
      })
  }
})
export const { resetAddStatus } = merchantAddSlice.actions

export default merchantAddSlice.reducer
