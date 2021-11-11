import { Story, Meta } from '@storybook/react'

import StatusCard, { StatsCardType } from './StatsCard'

export default {
  title: 'Components/Cards/StatusCard',
  component: StatusCard,
} as Meta<StatsCardType>

const Template: Story<StatsCardType> = (args) => <StatusCard {...args} />

export const Primary = Template.bind({})

Primary.args = {
  title: 'passive-income',
  value: 40,
}
