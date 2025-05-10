import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { updateMerchantApi } from '../../api/MerchantsApi'
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../storeStates'

export const asyncUpdateMerchant = createAsyncThunk('merchants/asyncUpdateMerchant', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await updateMerchantApi(id, data)
    return response
  } catch (error) {
    return rejectWithValue(error.message || error)
  }
})

const initialState = {
  updateStatus: IDLE,
  updateError: null
}

const merchantUpdateSlice = createSlice({
  name: 'merchantUpdateSlice',
  initialState,
  reducers: {
    resetUpdateStatus: state => {
      state.updateStatus = IDLE
      state.updateError = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(asyncUpdateMerchant.pending, state => {
        state.updateStatus = LOADING
      })
      .addCase(asyncUpdateMerchant.fulfilled, state => {
        state.updateStatus = SUCCEEDED
      })
      .addCase(asyncUpdateMerchant.rejected, (state, action) => {
        state.updateStatus = FAILED
        state.updateError = action.payload
        console.error(`Error calling updateMerchantApi`, state.updateError)
      })
  }
})
export const { resetUpdateStatus } = merchantUpdateSlice.actions
export default merchantUpdateSlice.reducer
