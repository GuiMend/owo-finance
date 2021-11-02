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
}

const Container = styled(MuiContainer)<ContainerProps>(
  ({ theme, hasHeader = false, open }) => ({
    ...(hasHeader && { paddingTop: theme.spacing(14) }),
    ...(open && {
      marginLeft: drawerWidth,
      '&': {
        maxWidth: `calc(100% - ${drawerWidth}px)`,
      },
    }),
  })
)

export default Container
