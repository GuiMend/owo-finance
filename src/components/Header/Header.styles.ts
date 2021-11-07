import { styled } from '@mui/material/styles'
import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
} from '@mui/material'

import themeModeSelector from 'utils/themeModeSelector'
import colors from 'theme/colors'
interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

export const drawerWidth = 280

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}))

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

export const EmptySpace = styled('div')(() => ({
  flexGrow: 1,
}))

export const CalendarWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'end',
  gap: theme.spacing(1),
  justifyContent: 'center',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  border: `2px solid ${themeModeSelector(
    theme.palette.mode,
    colors.backgroundDarkTransparent,
    colors.backgroundLightTransparent
  )}`,
}))
