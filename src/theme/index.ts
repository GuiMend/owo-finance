import { createTheme, PaletteMode } from '@mui/material'

import themeModeSelector from 'utils/themeModeSelector'

import colors from './colors'

const theme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      background: {
        default: themeModeSelector(
          mode,
          colors.backgroundLight,
          colors.backgroundDark
        ),
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: themeModeSelector(
              mode,
              colors.backgroundLightOpaque,
              colors.backgroundDarkOpaque
            ),
            backdropFilter: 'blur(6px)',
            backgroundImage: 'none',
            boxShadow: 'none',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            background: themeModeSelector(
              mode,
              colors.backgroundLight,
              colors.backgroundDark
            ),
          },
        },
      },
    },
  })

export default theme
