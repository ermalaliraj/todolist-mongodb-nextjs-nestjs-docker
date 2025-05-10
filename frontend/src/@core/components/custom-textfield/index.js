import React from 'react'
import { TextField } from '@mui/material'

const CustomTextField = props => {
  return (
    <TextField
      sx={{
        width: '100%',
        '& .MuiInputBase-root': {
          height: 40,
          fontSize: '13px',
          transition: 'all ease-in-out 0.4s'
        },

        '& .MuiInputLabel-root': {
          left: '8%',
          top: '23%',
          fontSize: '14px',
          transform: 'translateX(-8%)',
          transition: 'all ease-in-out 0.4s'
        },
        '& .MuiInputLabel-shrink': {
          transform: 'translate(0, -1.5px) scale(0.75) !important',
          left: '15px !important',
          top: '-5px !important',
          transition: 'all ease-in-out 0.4s'
        }
      }}
      {...props}
    />
  )
}

export default CustomTextField
