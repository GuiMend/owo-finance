import { createTheme, PaletteMode } from '@mui/material'

import themeModeSelector from 'utils/themeModeSelector'

import colors from './colors'

declare module '@mui/material/styles' {
  interface Theme {
    contrastText: {
      main?: string
    }
    success: {
      lightTransparent?: string
    }
    error: {
      lightTransparent?: string
    }
  }
}

const defaultTheme = (mode: PaletteMode) =>
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
      secondary: {
        main: themeModeSelector(
          mode,
          colors.secondaryLight,
          colors.secondaryDark
        ),
      },
    },
  })

const theme = (mode: PaletteMode) =>
  createTheme(defaultTheme(mode), {
    shape: {
      borderRadius: 10,
    },
    contrastText: {
      main: themeModeSelector(
        mode,
        defaultTheme(mode).palette.grey[50],
        colors.backgroundDark
      ),
    },
    success: {
      lightTransparent: `${defaultTheme(mode).palette.success.light}20`,
    },
    error: {
      lightTransparent: `${defaultTheme(mode).palette.error.light}20`,
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
            color: themeModeSelector(
              mode,
              defaultTheme(mode).palette.grey[700],
              defaultTheme(mode).palette.grey.A100
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
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: themeModeSelector(
              mode,
              colors.backgroundLight,
              colors.cardBackgroundColorDark
            ),
            boxShadow: themeModeSelector(
              mode,
              colors.boxShadowLight,
              colors.boxShadowDark
            ),
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            ':last-child': {
              padding: 16,
            },
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            boxShadow: themeModeSelector(
              mode,
              colors.boxShadowLight,
              colors.boxShadowDark
            ),
            backgroundColor: themeModeSelector(
              mode,
              colors.backgroundLight,
              colors.cardBackgroundColorDark
            ),
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            ':hover': {
              color: defaultTheme(mode).palette.primary.main,
            },
          },
        },
      },
    },
  })

export default theme
