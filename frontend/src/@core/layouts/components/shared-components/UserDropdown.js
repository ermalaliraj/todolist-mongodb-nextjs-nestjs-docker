import { Fragment, useState } from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'

const BadgeContentSpan = styled('span')(({theme}) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = props => {
  const {settings} = props
  const [anchorEl, setAnchorEl] = useState(null)
  const router = useRouter()
  const {direction} = settings

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = url => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2,
      fontSize: '1.375rem',
      color: 'text.primary'
    }
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ml: 2, cursor: 'pointer'}}
        badgeContent={<BadgeContentSpan/>}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar alt='John Doe' onClick={handleDropdownOpen} sx={{width: 40, height: 40}} src='/images/avatars/1.png'/>
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{'& .MuiMenu-paper': {width: 230, mt: 4}}}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: direction === 'ltr' ? 'right' : 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: direction === 'ltr' ? 'right' : 'left'
        }}
      >
        <Box sx={{pt: 2, pb: 3, px: 4}}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan/>}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <Avatar alt='John Doe' src='/images/avatars/1.png' sx={{width: '2.5rem', height: '2.5rem'}}/>
            </Badge>
            <Box
              sx={{
                display: 'flex',
                ml: 3,
                alignItems: 'flex-start',
                flexDirection: 'column'
              }}
            >
              <Typography sx={{fontWeight: 600}}>John Doe</Typography>
              <Typography
                variant='body2'
                sx={{
                  fontSize: '0.8rem',
                  color: 'text.disabled'
                }}
              >
                Admin
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{mt: '0 !important'}}/>

        <MenuItem sx={{p: 0}} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <Icon icon='mdi:cog-outline'/>
            Settings
          </Box>
        </MenuItem>
        <Divider/>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
