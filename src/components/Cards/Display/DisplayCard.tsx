import { CardContent, Typography } from '@mui/material'
import PropTypes, { InferProps } from 'prop-types'

import withClientOnlyRender from 'utils/withClientOnlyRender'
import Skeleton from 'components/basic/Skeleton'

import { Card } from './DisplayCard.styles'

export type DisplayCardType = InferProps<typeof DisplayCardPropTypes>

const DisplayCard = ({ title, description, loading }: DisplayCardType) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="body1">{title}</Typography>
        <Typography variant="h6">
          {loading ? <Skeleton contrast width={150} /> : description}
        </Typography>
      </CardContent>
    </Card>
  )
}

const DisplayCardPropTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  loading: PropTypes.bool,
}

DisplayCard.propTypes = DisplayCardPropTypes

DisplayCard.defaultProps = { loading: false }

export default withClientOnlyRender(DisplayCard)
