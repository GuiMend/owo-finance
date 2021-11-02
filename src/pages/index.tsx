import React from 'react'
import type { NextPage } from 'next'
import { Container, Typography, Button } from '@mui/material'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'

import Header from 'components/Header'

const Home: NextPage = () => {
  const { t } = useTranslation('common')
  return (
    <div>
      <Header />
      <Container component="main">
        <Typography variant="h1">{t('welcome')}</Typography>
        <Button>Test</Button>
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
