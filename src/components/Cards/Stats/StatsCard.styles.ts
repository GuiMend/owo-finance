import { styled } from '@mui/material/styles'
import { CardContent as MuiCardContent } from '@mui/material'

export const CardContent = styled(MuiCardContent)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    gridTemplate: '1fr auto / 1fr',
  },
}))

export const InfoWrapper = styled('div')(() => ({
  display: 'grid',
  gridTemplate: '1fr auto / 1fr',
}))

export const ChartWrapper = styled('div')(({ theme }) => ({
  margin: theme.spacing(-2, -1, -2, -2.25),
}))
