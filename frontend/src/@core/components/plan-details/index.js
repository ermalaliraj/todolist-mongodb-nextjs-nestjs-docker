import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Icon from 'src/@core/components/icon'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import CustomChip from 'src/@core/components/mui/chip'

const BoxWrapper = styled(Box)(({theme}) => ({
  position: 'relative',
  padding: theme.spacing(6),
  paddingTop: theme.spacing(14.75),
  borderRadius: theme.shape.borderRadius
}))

const BoxFeature = styled(Box)(({theme}) => ({
  marginBottom: theme.spacing(5),
  '& > :not(:first-of-type)': {
    marginTop: theme.spacing(4)
  }
}))

const PlanDetails = props => {
  const {plan, data} = props

  const renderFeatures = () => {
    return data?.planBenefits.map((item, index) => (
      <Box key={index} sx={{display: 'flex', alignItems: 'center'}}>
        <Box
          component='span'
          sx={{
            display: 'inline-flex',
            color: 'text.secondary',
            mr: 2
          }}
        >
          <Icon icon='mdi:circle-outline' fontSize='0.75rem'/>
        </Box>
        <Typography variant='body2'>{item}</Typography>
      </Box>
    ))
  }

  return (
    <BoxWrapper
      sx={{
        border: theme => (!data?.popularPlan ? `1px solid ${theme.palette.divider}` : `1px solid ${hexToRGBA(theme.palette.primary.main, 0.5)}`)
      }}
    >
      {data?.popularPlan ? (
        <CustomChip
          skin='light'
          label='Popular'
          color='primary'
          sx={{
            top: 12,
            right: 12,
            height: 24,
            position: 'absolute',
            '& .MuiChip-label': {
              px: 1.75,
              fontWeight: 600,
              fontSize: '0.75rem'
            }
          }}
        />
      ) : null}
      <Box sx={{mb: 5, display: 'flex', justifyContent: 'center'}}>
        <img width={data?.imgWidth} src={`${data?.imgSrc}`} height={data?.imgHeight} alt={`${data?.title.toLowerCase().replace(' ', '-')}-plan-img`}/>
      </Box>
      <Box sx={{textAlign: 'center'}}>
        <Typography variant='h5' sx={{mb: 1.5}}>
          {data?.title}
        </Typography>
        <Typography variant='body2'>{data?.subtitle}</Typography>
        <Box sx={{my: 7, position: 'relative'}}>
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Typography
              variant='body2'
              sx={{
                mt: 1.6,
                fontWeight: 600,
                alignSelf: 'flex-start'
              }}
            >
              $
            </Typography>
            <Typography
              variant='h3'
              sx={{
                fontWeight: 600,
                color: 'primary.main',
                lineHeight: 1.17
              }}
            >
              {plan === 'monthly' ? data?.monthlyPrice : data?.yearlyPlan.perMonth}
            </Typography>
            <Typography
              variant='body2'
              sx={{
                mb: 1.6,
                fontWeight: 600,
                alignSelf: 'flex-end'
              }}
            >
              /month
            </Typography>
          </Box>
          {plan !== 'monthly' && data?.monthlyPrice !== 0 ? (
            <Typography
              variant='caption'
              sx={{
                top: 50,
                left: '50%',
                position: 'absolute',
                transform: 'translateX(-50%)'
              }}
            >{`USD ${data?.yearlyPlan.totalAnnual}/year`}</Typography>
          ) : null}
        </Box>
      </Box>
      <BoxFeature>{renderFeatures()}</BoxFeature>
      <Button fullWidth color={data?.currentPlan ? 'success' : 'primary'} variant={data?.popularPlan ? 'contained' : 'outlined'}>
        {data?.currentPlan ? 'Your Current Plan' : 'Upgrade'}
      </Button>
    </BoxWrapper>
  )
}

export default PlanDetails
