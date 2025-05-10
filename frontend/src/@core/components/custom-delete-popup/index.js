import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'
import { closeDeletePopup } from 'src/store/deletePopup/deletePopupSearchSlice'

export default function DeletePopup({ onConfirm }) {
  const dispatch = useDispatch()
  const { open, message, data } = useSelector(state => state.deletePopup.search)
  const handleClose = () => {
    dispatch(closeDeletePopup())
  }
  const handleConfirm = () => {
    onConfirm(data)
    dispatch(closeDeletePopup())
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color='error' onClick={handleConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
