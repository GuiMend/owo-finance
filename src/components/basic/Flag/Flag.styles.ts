import { styled } from '@mui/material/styles'

export const Container = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 24,
  width: 24,
}))

export const FlagWrapper = styled('div')(() => ({
  height: 18,
  width: 24,
  overflow: 'hidden',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))
