import React, { useEffect, useState } from 'react'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useDispatch, useSelector } from 'react-redux'
import { setName, setAddress, setRegistrationNumber, setPhone, setEmail, validateForm, resetForm, closeDialog, setGateways, setProductSites } from 'src/store/merchants/merchantDetailsSlice'
import { asyncAddMerchant } from 'src/store/merchants/merchantAddSlice'
import { asyncUpdateMerchant } from 'src/store/merchants/merchantUpdateSlice'
import AddIcon from '@mui/icons-material/Add'
import Tooltip from '@mui/material/Tooltip'
import { DETAILS_PAGE_WIDTH, TEXTFIELD_HOVER_COLOR } from 'src/utils/consts'

function getMerchantFromState(state) {
  return {
    name: state.name,
    address: state.address,
    registrationNumber: state.registrationNumber,
    phone: state.phone,
    email: state.email,
    productSites: state.productSites
  }
}
const formatNameLength = name => {
  return name.length * 15 > DETAILS_PAGE_WIDTH ? `${name.substring(0, DETAILS_PAGE_WIDTH / 14)}...` : name
}

const MerchantDetails = () => {
  const dispatch = useDispatch()
  const state = useSelector(rootState => rootState.merchants.details)
  const [addRequested, setAddRequested] = useState(false)
  const [updateRequested, setUpdateRequested] = useState(false)

  useEffect(() => {
    if (addRequested) {
      if (!state.nameError && !state.addressError && !state.registrationNumberError && !state.phoneError && !state.emailError) {
        const merchant = getMerchantFromState(state)
        dispatch(asyncAddMerchant(merchant))
        dispatch(closeDialog())
      }
      setAddRequested(false)
    }
  }, [addRequested])

  useEffect(() => {
    if (updateRequested) {
      if (!state.nameError && !state.addressError && !state.registrationNumberError && !state.phoneError && !state.emailError) {
        const merchant = getMerchantFromState(state)
        dispatch(asyncUpdateMerchant({ id: state.id, data: merchant }))
        dispatch(closeDialog())
      }
      setUpdateRequested(false)
    }
  }, [updateRequested])

  const onAdd = e => {
    e.preventDefault()
    setAddRequested(true)
    dispatch(validateForm())
  }

  const onUpdate = e => {
    e.preventDefault()
    setUpdateRequested(true)
    dispatch(validateForm())
  }

  const onCancel = (event, reason) => {
    if (reason && reason === 'backdropClick') {
      return
    }
    dispatch(closeDialog())
    dispatch(resetForm())
  }

  return (
    <Drawer
      anchor='right'
      open={state.isOpened}
      onClose={onCancel}
      PaperProps={{
        sx: {
          width: ['100%', `${DETAILS_PAGE_WIDTH}px`]
        }
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          {!state.editMode ? `Merchant Details: ${state.id}` : state.editMode && state.id !== '' ? `Merchant Details: ${state.id}` : 'Merchant Details'}
        </Typography>
        <TextField fullWidth label='Name' value={state.name} onChange={e => dispatch(setName(e.target.value))} sx={{ mb: 3 }} error={state.nameError} helperText={state.nameError ? 'Name is required.' : ''} disabled={!state.editMode} />
        <TextField fullWidth label='Address' value={state.address} onChange={e => dispatch(setAddress(e.target.value))} sx={{ mb: 3 }} error={state.addressError} helperText={state.addressError ? 'Address is required.' : ''} disabled={!state.editMode} />
        <TextField
          fullWidth
          label='Registration Number'
          value={state.registrationNumber}
          onChange={e => dispatch(setRegistrationNumber(e.target.value))}
          sx={{ mb: 3 }}
          error={state.registrationNumberError}
          helperText={state.registrationNumberError ? 'Registration Number is required.' : ''}
          disabled={!state.editMode}
        />
        <TextField fullWidth label='Phone' value={state.phone} onChange={e => dispatch(setPhone(e.target.value))} type='number' sx={{ mb: 3 }} error={state.phoneError} helperText={state.phoneError ? 'Phone is required.' : ''} disabled={!state.editMode} />
        <TextField fullWidth label='Email' value={state.email} onChange={e => dispatch(setEmail(e.target.value))} sx={{ mb: 3 }} error={state.emailError} helperText={state.emailError ? 'Email is required.' : ''} disabled={!state.editMode} />
        <Tooltip
          title={
            <Box>
              {state.productSites?.flatMap(ps =>
                ps.mids.flatMap(mid => (
                  <Typography key={mid.gateway?.name} variant='body2' sx={{ mb: 3, color: `${TEXTFIELD_HOVER_COLOR}` }}>
                    {mid.gateway?.name}
                  </Typography>
                ))
              )}
            </Box>
          }
          arrow
          placement='top'
        >
          <TextField
            fullWidth
            multiline
            label='Gateways'
            value={state.productSites?.flatMap(ps => ps.mids.flatMap(mid => formatNameLength(mid.gateway.name)).join('\n')).join('\n')}
            placeholder={state.productSites.flatMap(ps => ps.mids.flatMap(mid => mid.gateway?.name)).length === 0 ? 'No Gateway' : ''}
            sx={{ mb: 3, cursor: 'pointer' }}
            disabled
          />
        </Tooltip>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            mb: 1
          }}
        >
          {state.editMode && (
            <Typography sx={{ color: 'primary.main', display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => alert('Add product clicked')}>
              <AddIcon sx={{ mr: 0.5 }} />
              Add Product Site
            </Typography>
          )}
        </Box>
        <TextField label='Product Site' fullWidth multiline value={state.productSites.map(site => site.name).join('\n')} sx={{ mb: 3 }} disabled />

        <Box sx={{ display: 'flex', gap: 2 }}>
          {state.editMode ? (
            state.id === '' ? (
              <Button variant='contained' color='primary' onClick={onAdd}>
                Add New
              </Button>
            ) : (
              <Button variant='contained' color='primary' onClick={onUpdate}>
                Update
              </Button>
            )
          ) : null}
          <Button variant='outlined' color='secondary' onClick={onCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

export default MerchantDetails
