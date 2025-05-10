import { createSlice } from '@reduxjs/toolkit'

const initialValues = {
  id: '',
  name: '',
  address: '',
  registrationNumber: '',
  phone: '',
  email: '',
  productSites: [],
  nameError: false,
  addressError: false,
  registrationNumberError: false,
  phoneError: false,
  emailError: false,
  isOpened: false,
  editMode: false
}

export const merchantDetailsSlice = createSlice({
  name: 'merchantDetailsSlice',
  initialState: initialValues,
  reducers: {
    openDialog: (state, action) => {
      state.isOpened = true
      state.editMode = action.payload.editMode
      state.id = action.payload.merchant.id
      state.name = action.payload.merchant.name
      state.address = action.payload.merchant.address
      state.registrationNumber = action.payload.merchant.registrationNumber
      state.phone = action.payload.merchant.phone
      state.email = action.payload.merchant.email
      state.productSites = action.payload.merchant.productSites || []
    },
    closeDialog: () => {
      return { ...initialValues }
    },
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

    setProductSites: (state, action) => {
      state.productSites = action.payload
    },
    validateForm: state => {
      state.nameError = !state.name
      state.addressError = !state.address
      state.registrationNumberError = !state.registrationNumber
      state.phoneError = !state.phone
      state.emailError = !state.email
    },
    resetForm: () => {
      return { ...initialValues }
    }
  }
})

export const { openDialog, closeDialog, setId, setName, setAddress, setRegistrationNumber, setPhone, setEmail, setProductSites, validateForm, resetForm } = merchantDetailsSlice.actions

export default merchantDetailsSlice.reducer
