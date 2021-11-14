import { styled } from '@mui/material/styles'
import { Card as MuiCard } from '@mui/material'

export const Card = styled(MuiCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.contrastText.main,
}))
