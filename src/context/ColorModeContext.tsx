import { createContext, useState, useMemo, useContext, useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { PaletteMode } from '@mui/material'
import { useCookies } from 'react-cookie'

import theme from 'theme'

export enum Modes {
  // eslint-disable-next-line no-unused-vars
  light = 'light',
  // eslint-disable-next-line no-unused-vars
  dark = 'dark',
}

interface IColorModeContext {
  toggleColorMode: () => void
  mode: PaletteMode
}

interface IColorModeContextProvider {
  children: JSX.Element
}

const ColorModeContext = createContext<IColorModeContext>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleColorMode: () => {},
  mode: Modes.light,
})

const ColorModeContextProvider = ({ children }: IColorModeContextProvider) => {
  const [cookie, setCookie] = useCookies(['mode'])
  const [mode, setMode] = useState<PaletteMode>(
    [Modes.light, Modes.dark].includes(cookie.mode) ? cookie.mode : Modes.light
  )

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) =>
          prevMode === Modes.light ? Modes.dark : Modes.light
        )
      },
      mode,
    }),
    [mode]
  )

  useEffect(() => {
    setCookie('mode', mode, { path: '/' })
  }, [mode, setCookie])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme(mode)}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export const useColorMode = () => useContext(ColorModeContext)
export default ColorModeContextProvider
