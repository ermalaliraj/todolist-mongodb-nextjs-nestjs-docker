import MuiChip from '@mui/material/Chip'

import clsx from 'clsx'

import useBgColor from 'src/@core/hooks/useBgColor'

const Chip = props => {
  const { sx } = props

  const bgColors = useBgColor()

  const propsToPass = { ...props }

  return <MuiChip {...propsToPass} variant='filled' sx={sx} />
}

export default Chip
