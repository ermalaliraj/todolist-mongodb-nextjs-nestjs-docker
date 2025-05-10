import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import CustomAvatar from 'src/@core/components/mui/avatar'

const CardStatsVertical = props => {
  const {title, color, icon, stats, chipText, trendNumber} = props

  return (
    <Card>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <CustomAvatar skin='light' variant='rounded' color={color}>
          {icon}
        </CustomAvatar>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            mx: 2
          }}
        >
          <Typography variant='h6'>{stats}</Typography>
          <Typography variant='body2'>{title}</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardStatsVertical
