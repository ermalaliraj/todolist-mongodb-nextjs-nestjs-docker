import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import MerchantsTable from 'src/views/merchants/MerchantsTable'
import MerchantSearch from 'src/views/merchants/MerchantSearch'
import MerchantDetails from 'src/views/merchants/MerchantDetails'
import { FAILED, SUCCEEDED } from 'src/store/storeStates'
import { openDialog, closeDialog } from 'src/store/merchants/merchantDetailsSlice'
import toast from 'react-hot-toast'
import { resetAddStatus } from 'src/store/merchants/merchantAddSlice'
import { resetUpdateStatus } from 'src/store/merchants/merchantUpdateSlice'
import { resetDeleteStatus } from 'src/store/merchants/merchantDeleteSlice'
import { setRowAdded, setRowDeleted, setRowUpdated } from 'src/store/rowsRequestedFromServer/rowsRequestedFromServerSearchSlice'
import { Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const MerchantsPage = () => {
  const dispatch = useDispatch()
  const { searchStatus, searchError } = useSelector(state => state.merchants.search)
  const { addStatus, addError } = useSelector(state => state.merchants.add)
  const { updateStatus, updateError } = useSelector(state => state.merchants.update)
  const { deleteStatus, deleteError } = useSelector(state => state.merchants.delete)

  useEffect(() => {
    if (addStatus === SUCCEEDED) {
      toast.success('Merchant added successfully!', { duration: 2500 })
      dispatch(resetAddStatus())
      dispatch(closeDialog())
      dispatch(setRowAdded(true))
    } else if (addStatus === FAILED) {
      console.log('Add result error:', addError)
      toast.error(addError, { duration: 2500 })
    }
  }, [addStatus])

  useEffect(() => {
    if (updateStatus === SUCCEEDED) {
      toast.success('Merchant updated successfully!', { duration: 2500 })
      dispatch(resetUpdateStatus())
      dispatch(closeDialog())
      dispatch(setRowUpdated(true))
    } else if (updateStatus === FAILED) {
      console.log('Update result error:', updateError)
      toast.error(updateError, { duration: 2500 })
    }
  }, [updateStatus])

  useEffect(() => {
    if (deleteStatus === SUCCEEDED) {
      toast.success('Merchant deleted successfully!', { duration: 2500 })
      dispatch(resetDeleteStatus())
      dispatch(setRowDeleted(true))
    } else if (deleteStatus === FAILED) {
      console.log('Delete result error:', deleteError)
      toast.error(deleteError, { duration: 2500 })
    }
  }, [deleteStatus])

  useEffect(() => {
    if (searchStatus === FAILED) {
      console.log('Search result error:', searchError)
      toast.error(searchError, { duration: 2500 })
    }
  }, [searchStatus])

  const onClickAdd = e => {
    let merchant = {
      id: '',
      companyName: '',
      address: '',
      registrationNumber: '',
      phone: '',
      email: ''
    }
    dispatch(openDialog({ editMode: true, merchant }))
  }

  return (
    <Card sx={{ p: 2 }}>
      <Grid container spacing={2} alignItems='flex-start' justifyContent='space-between'>
        <Grid item xs={12} md={10}>
          <MerchantSearch />
        </Grid>
        <Grid item xs={12} md={2}>
          <Grid container direction='column' spacing={2}>
            <Grid item xs={12} display='flex' justifyContent='flex-end'>
              <Button startIcon={<AddIcon />} variant='contained' onClick={onClickAdd}>
                New
              </Button>
            </Grid>
            <Grid item xs={12}>
              {/* <MerchantUpload /> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <MerchantsTable />
      <MerchantDetails />
    </Card>
  )
}

export default MerchantsPage
