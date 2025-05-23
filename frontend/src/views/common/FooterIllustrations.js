import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'

const MaskImg = styled('img')(() => ({
  bottom: 0,
  zIndex: -1,
  width: '100%',
  position: 'absolute'
}))

const ShapeImg = styled('img')(({ theme }) => ({
  left: '15%',
  bottom: '12%',
  position: 'absolute',
  [theme.breakpoints.down('lg')]: {
    bottom: '7%'
  }
}))

const FooterIllustrations = props => {
  const { image } = props
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const src = image || '/images/pages/common-coming-soon-object.png'
  if (!hidden) {
    return (
      <>
        <ShapeImg alt='shape' src={src} />
        <MaskImg alt='mask' src={`/images/pages/misc-mask-${theme.palette.mode}.png`} />
      </>
    )
  } else {
    return null
  }
}

export default FooterIllustrations
