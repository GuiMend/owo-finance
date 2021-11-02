import Image from 'next/image'
import { Toolbar, IconButton, Drawer } from '@mui/material'
import Brightness2Icon from '@mui/icons-material/Brightness2'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import MenuIcon from '@mui/icons-material/Menu'

import { useColorMode, Modes } from 'context/ColorModeContext'
import withClientOnlyRender from 'utils/withClientOnlyRender'
import LightLogo from 'assets/owo-sqr-logo-light.png'
import DarkLogo from 'assets/owo-sqr-logo-dark.png'
import { useDrawer } from 'context/DrawerContext'

import { AppBar, DrawerHeader, drawerWidth } from './Header.styles'

const Header = () => {
  const { mode, toggleColorMode } = useColorMode()
  const { open, toggleOpen } = useDrawer()

  return (
    <div>
      <AppBar open={open}>
        <Toolbar>
          {!open && (
            <IconButton onClick={toggleOpen}>
              <MenuIcon />
            </IconButton>
          )}
          <IconButton onClick={toggleColorMode}>
            {mode === Modes.light ? <WbSunnyIcon /> : <Brightness2Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Image
            alt="Owo logo"
            src={mode === Modes.light ? DarkLogo : LightLogo}
            height="40"
            width="40"
          ></Image>
          <IconButton onClick={toggleOpen}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
      </Drawer>
    </div>
  )
}

export default withClientOnlyRender(Header)
