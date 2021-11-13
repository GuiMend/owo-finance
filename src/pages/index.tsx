import React from 'react'
import type { NextPage } from 'next'
import { Grid } from '@mui/material'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useReactiveVar } from '@apollo/client'
import { useTranslation } from 'react-i18next'

import { investmentViewPeriodVar } from 'apollo/client-variables'
import StatsCard, { StatsType } from 'components/Cards/Stats'
import { useUsdBrl } from 'context/CurrencyExchangeContext'
import DisplayCard from 'components/Cards/Display'
import Container from 'components/basic/Container'
import { useDrawer } from 'context/DrawerContext'
import useWindowSize from 'hooks/useWindowSize'
import { getLastPeriods } from 'utils/periods'
import Header from 'components/Header'

const Home: NextPage = () => {
  const investmentViewPeriod = useReactiveVar(investmentViewPeriodVar)
  const { usdBrl, loadingExchange } = useUsdBrl()
  const { t } = useTranslation('common')
  const { isDesktop } = useWindowSize()
  const { open } = useDrawer()

  const categories = getLastPeriods(investmentViewPeriod)
  const series = [
    {
      name: t('passive-income'),
      data: [753.15, 490.86, 503.07, 788.42, 467.14, 51.96],
    },
  ]
  const series2 = [
    {
      name: t('total-assets'),
      data: [1000, 1200, 1240, 1300, 1400, 2000],
    },
  ]
  const series3 = [
    {
      name: t('net-worth'),
      data: [132376, 152803, 176104, 200766, 232676, 248058],
    },
  ]

  return (
    <div>
      <Header />
      <Container component="main" hasHeader open={open} isDesktop={isDesktop}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
            <DisplayCard
              title={t('usdbrl')}
              description={`$1 = R$${usdBrl}`}
              loading={loadingExchange}
            />
          </Grid>
          <Grid item xs={12}>
            <StatsCard
              title={t('net-worth')}
              series={series3}
              categories={categories}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <StatsCard
              title={t('passive-income')}
              series={series}
              categories={categories}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <StatsCard
              type={StatsType.number}
              title={t('total-assets')}
              series={series2}
              categories={categories}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default Home
