import { styled } from '@mui/material/styles'
import {
  Container as MuiContainer,
  ContainerProps as MuiContainerProps,
} from '@mui/material'

import { drawerWidth } from 'components/Header/Header.styles'

interface ContainerProps extends MuiContainerProps {
  component?: string
  hasHeader?: boolean
  open?: boolean
  isDesktop?: boolean
}

const Container = styled(MuiContainer)<ContainerProps>(
  ({ theme, hasHeader, open, isDesktop }) => ({
    '&': {
      maxWidth: `max(80vw, 1200px)`,
    },
    ...(hasHeader && { paddingTop: theme.spacing(14) }),
    ...(open &&
      isDesktop && {
        marginLeft: drawerWidth,
        '&': {
          maxWidth: `calc(100% - ${drawerWidth}px)`,
        },
      }),
  })
)

export default Container
