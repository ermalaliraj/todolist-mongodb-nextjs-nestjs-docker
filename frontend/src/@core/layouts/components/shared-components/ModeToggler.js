import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'

const ModeToggler = props => {
  const {settings, saveSettings} = props

  const handleModeChange = mode => {
    saveSettings({...settings, mode: mode})
  }

  const handleModeToggle = () => {
    if (settings.mode === 'light') {
      handleModeChange('dark')
    } else {
      handleModeChange('light')
    }
  }

  return (
    <IconButton color='inherit' aria-haspopup='true' onClick={handleModeToggle}>
      <Icon icon={settings.mode === 'dark' ? 'mdi:weather-sunny' : 'mdi:weather-night'}/>
    </IconButton>
  )
}

export default ModeToggler
