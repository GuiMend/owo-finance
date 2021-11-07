import { FC } from 'react'
import Flagkit, { Props as FlagProps } from 'react-flagkit'

import { Container, FlagWrapper } from './Flag.styles'

const Flag: FC<FlagProps> = ({ size, ...props }) => (
  <Container>
    <FlagWrapper>
      <Flagkit size={size} {...props} />
    </FlagWrapper>
  </Container>
)

Flag.defaultProps = {
  size: 26,
}

export default Flag
