import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Fade from '@mui/material/Fade'
import List from '@mui/material/List'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import ListItemIcon from '@mui/material/ListItemIcon'
import { styled, useTheme } from '@mui/material/styles'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MuiListItem from '@mui/material/ListItem'
import clsx from 'clsx'
import { usePopper } from 'react-popper'
import Icon from 'src/@core/components/icon'
import themeConfig from 'src/configs/themeConfig'
import HorizontalNavItems from './HorizontalNavItems'
import UserIcon from 'src/layouts/components/UserIcon'
import Translations from 'src/layouts/components/Translations'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { hasActiveChild } from 'src/@core/layouts/utils'

const ListItem = styled(MuiListItem)(({ theme }) => ({
  cursor: 'pointer',
  paddingTop: theme.spacing(2.25),
  paddingBottom: theme.spacing(2.25),
  '&:hover': {
    background: theme.palette.action.hover
  }
}))

const NavigationMenu = styled(Paper)(({ theme }) => ({
  overflowY: 'auto',
  padding: theme.spacing(2, 0),
  backgroundColor: theme.palette.background.paper,
  ...(themeConfig.menuTextTruncate ? { width: 260 } : { minWidth: 260 }),
  '&::-webkit-scrollbar': {
    width: 6
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: 20,
    background: hexToRGBA(theme.palette.mode === 'light' ? '#BFBFD5' : '#57596C', 0.6)
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: 20,
    background: 'transparent'
  },
  '& .MuiList-root': {
    paddingTop: 0,
    paddingBottom: 0
  },
  '& .menu-group.Mui-selected': {
    borderRadius: 0,
    backgroundColor: theme.palette.action.hover
  }
}))

const HorizontalNavGroup = props => {
  const { item, hasParent, settings } = props

  const theme = useTheme()
  const router = useRouter()
  const currentURL = router.asPath
  const { skin, direction } = settings
  const { navSubItemIcon, menuTextTruncate, horizontalMenuToggle, horizontalMenuAnimation } = themeConfig
  const popperOffsetHorizontal = direction === 'rtl' ? 16 : -16
  const popperPlacement = direction === 'rtl' ? 'bottom-end' : 'bottom-start'
  const popperPlacementSubMenu = direction === 'rtl' ? 'left-start' : 'right-start'

  const [menuOpen, setMenuOpen] = useState(false)
  const [popperElement, setPopperElement] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [referenceElement, setReferenceElement] = useState(null)

  const { styles, attributes, update } = usePopper(referenceElement, popperElement, {
    placement: hasParent ? popperPlacementSubMenu : popperPlacement,
    modifiers: [
      {
        enabled: true,
        name: 'offset',
        options: {
          offset: hasParent ? [-8, 15] : [popperOffsetHorizontal, 5]
        }
      },
      {
        enabled: true,
        name: 'flip'
      }
    ]
  })

  const handleGroupOpen = event => {
    setAnchorEl(event.currentTarget)
    setMenuOpen(true)
    update ? update() : null
  }

  const handleGroupClose = () => {
    setAnchorEl(null)
    setMenuOpen(false)
  }

  const handleMenuToggleOnClick = event => {
    if (anchorEl) {
      handleGroupClose()
    } else {
      handleGroupOpen(event)
    }
  }
  useEffect(() => {
    handleGroupClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath])
  const icon = item.icon ? item.icon : navSubItemIcon
  const toggleIcon = direction === 'rtl' ? 'mdi:chevron-left' : 'mdi:chevron-right'
  const WrapperCondition = horizontalMenuToggle === 'click'
  const MainWrapper = WrapperCondition ? ClickAwayListener : 'div'
  const ChildWrapper = WrapperCondition ? 'div' : Fragment
  const AnimationWrapper = horizontalMenuAnimation ? Fade : Fragment

  const childMenuGroupStyles = () => {
    if (attributes && attributes.popper) {
      if (direction === 'ltr') {
        if (attributes.popper['data-popper-placement'] === 'right-start') {
          return 'left'
        }
        if (attributes.popper['data-popper-placement'] === 'left-start') {
          return 'right'
        }
      } else {
        if (attributes.popper['data-popper-placement'] === 'right-start') {
          return 'right'
        }
        if (attributes.popper['data-popper-placement'] === 'left-start') {
          return 'left'
        }
      }
    }
  }

  return (
    <>
      {/* @ts-ignore */}
      <MainWrapper {...(WrapperCondition ? { onClickAway: handleGroupClose } : { onMouseLeave: handleGroupClose })}>
        <ChildWrapper>
          <List component='div' sx={{ py: skin === 'bordered' ? 2.625 : 2.75 }}>
            <ListItem
              aria-haspopup='true'
              {...(WrapperCondition ? {} : { onMouseEnter: handleGroupOpen })}
              className={clsx('menu-group', {
                'Mui-selected': hasActiveChild(item, currentURL)
              })}
              {...(horizontalMenuToggle === 'click' ? { onClick: handleMenuToggleOnClick } : {})}
              sx={{
                ...(menuOpen ? { backgroundColor: 'action.hover' } : {}),
                ...(!hasParent
                  ? {
                    borderRadius: '8px',
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      '& .MuiTypography-root, & .MuiListItemIcon-root, & svg': {
                        color: 'common.white'
                      }
                    }
                  }
                  : {})
              }}
            >
              <Box
                sx={{
                  gap: 2,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                ref={setReferenceElement}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    ...(menuTextTruncate && {
                      overflow: 'hidden'
                    })
                  }}
                >
                  <ListItemIcon
                    sx={{
                      mr: hasParent ? 3 : 2.5,
                      color: 'text.primary'
                    }}
                  >
                    <UserIcon icon={icon} fontSize={icon === navSubItemIcon ? '0.5rem' : '1.5rem'} />
                  </ListItemIcon>
                  <Typography
                    {...(menuTextTruncate && {
                      noWrap: true
                    })}
                  >
                    <Translations text={item.title} />
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.secondary'
                  }}
                >
                  {item.badgeContent ? (
                    <Chip
                      size='small'
                      label={item.badgeContent}
                      color={item.badgeColor || 'primary'}
                      sx={{
                        mr: 1.5,
                        '& .MuiChip-label': {
                          px: 2.5,
                          lineHeight: 1.385,
                          textTransform: 'capitalize'
                        }
                      }}
                    />
                  ) : null}
                  <Icon icon={hasParent ? toggleIcon : 'mdi:chevron-down'} />
                </Box>
              </Box>
            </ListItem>
            <AnimationWrapper
              {...(horizontalMenuAnimation && {
                in: menuOpen,
                timeout: { exit: 300, enter: 400 }
              })}
            >
              <Box
                style={styles.popper}
                ref={setPopperElement}
                {...attributes.popper}
                sx={{
                  zIndex: theme.zIndex.appBar,
                  ...(!horizontalMenuAnimation && {
                    display: menuOpen ? 'block' : 'none'
                  }),
                  pl: childMenuGroupStyles() === 'left' ? (skin === 'bordered' ? 1.5 : 1.25) : 0,
                  pr: childMenuGroupStyles() === 'right' ? (skin === 'bordered' ? 1.5 : 1.25) : 0,
                  ...(hasParent
                    ? { position: 'fixed !important' }
                    : {
                      pt: skin === 'bordered' ? 5.25 : 5.5
                    })
                }}
              >
                <NavigationMenu
                  sx={{
                    ...(hasParent
                      ? {
                        overflowX: 'visible',
                        maxHeight: 'calc(100vh - 21rem)'
                      }
                      : {
                        maxHeight: 'calc(100vh - 13rem)'
                      }),
                    ...(skin === 'bordered'
                      ? {
                        boxShadow: 0,
                        border: `1px solid ${theme.palette.divider}`
                      }
                      : { boxShadow: 4 })
                  }}
                >
                  <HorizontalNavItems {...props} hasParent horizontalNavItems={item.children} />
                </NavigationMenu>
              </Box>
            </AnimationWrapper>
          </List>
        </ChildWrapper>
      </MainWrapper>
    </>
  )
}

export default HorizontalNavGroup
