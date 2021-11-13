import PropTypes, { InferProps } from 'prop-types'
import { Card, Typography } from '@mui/material'
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import { useReactiveVar } from '@apollo/client'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { investmentViewPeriodVar } from 'apollo/client-variables'
import withClientOnlyRender from 'utils/withClientOnlyRender'
import priceFormatter from 'utils/priceFormatter'

import { InfoWrapper, ChartWrapper, CardContent } from './StatsCard.styles'
import MinimalistChart from 'components/basic/Charts/MinimalistChart'
import { useUsdBrl } from 'context/CurrencyExchangeContext'

export type StatsCardType = InferProps<typeof StatsCardPropTypes>
export enum StatsType {
  // eslint-disable-next-line no-unused-vars
  number,
  // eslint-disable-next-line no-unused-vars
  currency,
}

const StatsCard = ({
  type,
  title,
  value,
  prevValue,
  categories,
  series,
}: StatsCardType) => {
  const { usdBrl } = useUsdBrl()
  const { t } = useTranslation(['stats-card', 'common'])
  const investmentViewPeriod = useReactiveVar(investmentViewPeriodVar)
  const { locale } = useRouter()
  const reversedData = [...series?.[0]?.data].reverse?.()
  const lastValue = value || reversedData?.[0]
  const beforeLastValue = prevValue || reversedData?.[1]

  const [biggerVal, lowerVal] =
    lastValue > beforeLastValue
      ? [lastValue, beforeLastValue]
      : [beforeLastValue, lastValue]

  const valueDiff = lastValue - beforeLastValue
  const percentDiff = (((biggerVal - lowerVal) / biggerVal) * 100).toFixed(1)

  const renderIcon = (diff: number) => {
    if (diff === 0)
      return (
        <Typography component="span" sx={{ fontWeight: 'bold' }}>
          =
        </Typography>
      )
    if (diff > 0)
      return (
        <TrendingUpRoundedIcon
          sx={{
            borderRadius: '50%',
            padding: 0.5,
            backgroundColor: (theme) => theme.success.lightTransparent,
          }}
        />
      )
    return (
      <TrendingDownRoundedIcon
        sx={{
          borderRadius: '50%',
          padding: 0.5,
          backgroundColor: (theme) => theme.error.lightTransparent,
        }}
      />
    )
  }

  const formatValue = (val: number) => ({
    [StatsType.number]: val.toFixed(2),
    [StatsType.currency]: priceFormatter(val, locale, usdBrl),
  })

  return (
    <Card>
      <CardContent>
        <InfoWrapper>
          <Typography variant="body1" component="p">
            {title}
          </Typography>
          <div>
            <Typography variant="h4" component="p" sx={{ marginBottom: 1 }}>
              {formatValue(lastValue)[type!]}
            </Typography>
            <Typography
              sx={{
                color: valueDiff >= 0 ? 'success.main' : 'error.main',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              {formatValue(valueDiff)[type!]} ({percentDiff}%)
              {renderIcon(valueDiff)}
            </Typography>
            <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
              {t(`${investmentViewPeriod}.vs`, { ns: 'common' })}
            </Typography>
          </div>
        </InfoWrapper>
        <ChartWrapper>
          <MinimalistChart
            height="150px"
            series={series}
            categories={categories}
            yFormatter={(val) => formatValue(val)[type!]}
          />
        </ChartWrapper>
      </CardContent>
    </Card>
  )
}

const StatsCardPropTypes = {
  type: PropTypes.oneOf([StatsType.number, StatsType.currency]),
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  value: PropTypes.number,
  prevValue: PropTypes.number,
  series: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(PropTypes.any).isRequired,
    }).isRequired
  ).isRequired,
  categories: PropTypes.arrayOf(PropTypes.any).isRequired,
}

StatsCard.proPTypes = StatsCardPropTypes

StatsCard.defaultProps = { type: StatsType.currency }

export default withClientOnlyRender(StatsCard)
