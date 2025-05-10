import Link from 'next/link'

import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FooterContent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Typography sx={{ mr: 2 }}>
        {`© ${new Date().getFullYear()}, Made with `}
        <LinkStyled target='_blank' href='https://ermalaliraj.com'>
          <Box component='span' sx={{ color: 'error.main' }}>
            ❤️
          </Box>
        </LinkStyled>
      </Typography>
    </Box>
  )
}

export default FooterContent
