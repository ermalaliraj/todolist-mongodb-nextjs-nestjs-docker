import useMediaQuery from '@mui/material/useMediaQuery'
import Layout from 'src/@core/layouts/Layout'
import VerticalNavItems from 'src/navigation/vertical'
import HorizontalNavItems from 'src/navigation/horizontal'
// import ServerSideVerticalNavItems from './components/vertical/ServerSideNavItems' // Uncomment when using server-side menu
// import ServerSideHorizontalNavItems from './components/horizontal/ServerSideNavItems' // Uncomment when using server-side menu
import VerticalAppBarContent from './components/vertical/AppBarContent'
import HorizontalAppBarContent from './components/horizontal/AppBarContent'
import { useSettings } from 'src/@core/hooks/useSettings'

const UserLayout = ({children, contentHeightFixed}) => {
  const {settings, saveSettings} = useSettings()
  // const { menuItems: verticalMenuItems } = ServerSideVerticalNavItems() // Uncomment when using server-side menu
  // const { menuItems: horizontalMenuItems } = ServerSideHorizontalNavItems() // Uncomment when using server-side menu
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg')) //hide the menu at given screen size. See https://mui.com/material-ui/react-use-media-query/,
  if (hidden && settings.layout === 'horizontal') {
    settings.layout = 'vertical'
  }

  return (
    <Layout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      contentHeightFixed={contentHeightFixed}
      verticalLayoutProps={{
        navMenu: {
          navItems: VerticalNavItems()
          // navItems: verticalMenuItems // Uncomment this line when using server-side menu in vertical layout and comment the above line
        },
        appBar: {
          content: props => <VerticalAppBarContent hidden={hidden} settings={settings} saveSettings={saveSettings} toggleNavVisibility={props.toggleNavVisibility}/>
        }
      }}
      {...(settings.layout === 'horizontal' && {
        horizontalLayoutProps: {
          navMenu: {
            navItems: HorizontalNavItems()
            // navItems: horizontalMenuItems // Uncomment this line when using server-side menu in horizontal layout and comment the above line
          },
          appBar: {
            content: () => <HorizontalAppBarContent settings={settings} saveSettings={saveSettings}/>
          }
        }
      })}
    >
      {children}
    </Layout>
  )
}

export default UserLayout
