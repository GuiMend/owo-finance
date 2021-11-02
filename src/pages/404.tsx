import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

const NotFound: NextPage = () => {
  const { t } = useTranslation('common')
  return (
    <div>
      <main>
        <h1>{t('not-found')}</h1>
        <Link href="/">
          <a>home</a>
        </Link>
      </main>
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

export default NotFound
