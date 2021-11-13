import { styled } from '@mui/material/styles'
import {
  Skeleton as MuiSkeleton,
  SkeletonProps as MuiSkeletonProps,
} from '@mui/material'

import themeModeSelector from 'utils/themeModeSelector'
import colors from 'theme/colors'

interface SkeletonProps extends MuiSkeletonProps {
  contrast?: boolean
}

const Skeleton = styled(MuiSkeleton)<SkeletonProps>(({ theme, contrast }) => ({
  ...(contrast && {
    backgroundColor: themeModeSelector(
      theme.palette.mode,
      colors.backgroundLightTransparent,
      colors.backgroundDarkTransparent
    ),
  }),
}))

export default Skeleton
