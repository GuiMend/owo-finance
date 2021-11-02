import { PaletteMode } from '@mui/material'

const themeModeSelector = <T>(
  mode: PaletteMode,
  light: string,
  dark: string
): T => ((mode === 'light' ? light : dark) as unknown) as T

export default themeModeSelector
