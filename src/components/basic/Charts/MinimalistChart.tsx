import PropTypes, { InferProps } from 'prop-types'
import dynamic from 'next/dynamic'

import { useColorMode } from 'context/ColorModeContext'
import formatDate from 'utils/formatDate'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export type StatsCardType = InferProps<typeof MinimalistChartPropTypes>

const MinimalistChart = ({ categories, series, yFormatter }: StatsCardType) => {
  const { mode } = useColorMode()

  return (
    <Chart
      options={{
        dataLabels: {
          enabled: false,
        },
        chart: {
          id: 'basic-bar',
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        stroke: {
          curve: 'smooth',
        },
        grid: {
          show: false,
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.4,
            opacityTo: 0.1,
            stops: [20, 100],
          },
        },
        xaxis: {
          tooltip: {
            enabled: false,
          },
          labels: {
            show: false,
            format: 'MM yyyy',
            formatter: (value) =>
              formatDate((value as unknown) as Date) as string,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          categories,
        },
        tooltip: {
          y: {
            // eslint-disable-next-line no-unused-vars
            formatter: yFormatter as (val: number) => string,
          },
        },
        theme: {
          mode,
        },
      }}
      series={series}
      type="area"
      width="100%"
      height={200}
    />
  )
}

const MinimalistChartPropTypes = {
  series: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(PropTypes.any).isRequired,
    }).isRequired
  ).isRequired,
  categories: PropTypes.arrayOf(PropTypes.any).isRequired,
  yFormatter: PropTypes.func,
}

MinimalistChart.propTypes = MinimalistChartPropTypes

export default MinimalistChart
