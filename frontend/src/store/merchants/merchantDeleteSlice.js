import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { deleteMerchantApi } from '../../api/MerchantsApi'
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../storeStates'

export const asyncDeleteMerchant = createAsyncThunk('merchants/asyncDeleteMerchant', async (id, { rejectWithValue }) => {
  try {
    await deleteMerchantApi(id)
    return id
  } catch (error) {
    return rejectWithValue(error.message || error)
  }
})

const initialState = {
  deleteStatus: IDLE,
  deleteError: null
}

const merchantDeleteSlice = createSlice({
  name: 'merchantDeleteSlice',
  initialState,
  reducers: {
    resetDeleteStatus: state => {
      state.deleteStatus = IDLE
      state.deleteError = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(asyncDeleteMerchant.pending, state => {
        state.deleteStatus = LOADING
      })
      .addCase(asyncDeleteMerchant.fulfilled, state => {
        state.deleteStatus = SUCCEEDED
      })
      .addCase(asyncDeleteMerchant.rejected, (state, action) => {
        state.deleteStatus = FAILED
        state.deleteError = action.payload
        console.error(`Error calling deleteMerchantApi`, state.deleteError)
      })
  }
})
export const { resetDeleteStatus } = merchantDeleteSlice.actions
export default merchantDeleteSlice.reducer
