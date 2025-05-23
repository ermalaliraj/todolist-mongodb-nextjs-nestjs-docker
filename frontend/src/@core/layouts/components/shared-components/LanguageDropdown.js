import { useEffect } from 'react'
import Icon from 'src/@core/components/icon'
import { useTranslation } from 'react-i18next'
import OptionsMenu from 'src/@core/components/option-menu'

const LanguageDropdown = ({settings, saveSettings}) => {
  const {i18n} = useTranslation()
  const {layout} = settings

  const handleLangItemClick = lang => {
    i18n.changeLanguage(lang)
  }

  useEffect(() => {
    document.documentElement.setAttribute('lang', i18n.language)
  }, [i18n.language])

  return (
    <OptionsMenu
      icon={<Icon icon='mdi:translate'/>}
      menuProps={{sx: {'& .MuiMenu-paper': {mt: 4, minWidth: 130}}}}
      iconButtonProps={{
        color: 'inherit',
        sx: {
          ...(layout === 'vertical' ? {mr: 0.75} : {mx: 0.75})
        }
      }}
      options={[
        {
          text: 'English',
          menuItemProps: {
            sx: {py: 2},
            selected: i18n.language === 'en',
            onClick: () => {
              handleLangItemClick('en')
              saveSettings({...settings, direction: 'ltr'})
            }
          }
        },
        {
          text: 'French',
          menuItemProps: {
            sx: {py: 2},
            selected: i18n.language === 'fr',
            onClick: () => {
              handleLangItemClick('fr')
              saveSettings({...settings, direction: 'ltr'})
            }
          }
        },
        {
          text: 'Arabic',
          menuItemProps: {
            sx: {py: 2},
            selected: i18n.language === 'ar',
            onClick: () => {
              handleLangItemClick('ar')
              saveSettings({...settings, direction: 'rtl'})
            }
          }
        }
      ]}
    />
  )
}

export default LanguageDropdown
