import { useCallback, useRef } from 'react'
import { Toolbar, IconButton, Drawer, Typography } from '@mui/material'
import TodayRoundedIcon from '@mui/icons-material/TodayRounded'
import Brightness2Icon from '@mui/icons-material/Brightness2'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import MenuIcon from '@mui/icons-material/Menu'
import { useReactiveVar } from '@apollo/client'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import Image from 'next/image'

import {
  countryCodeToLocale,
  localeToCountryCode,
  COUNTRY_CODES,
} from 'utils/localeToCountry'
import {
  investmentViewPeriodVar,
  InvestmentViewPeriods,
} from 'apollo/client-variables'
import { useColorMode, Modes } from 'context/ColorModeContext'
import withClientOnlyRender from 'utils/withClientOnlyRender'
import formatDate, { capitalize } from 'utils/formatDate'
import LightLogo from 'assets/owo-sqr-logo-light.png'
import DarkLogo from 'assets/owo-sqr-logo-dark.png'
import { useDrawer } from 'context/DrawerContext'
import useWindowSize from 'hooks/useWindowSize'
import Flag from 'components/basic/Flag'
import Menu from 'components/Menu'

import {
  AppBar,
  DrawerHeader,
  EmptySpace,
  CalendarWrapper,
  drawerWidth,
} from './Header.styles'

const Header = () => {
  const ref = useRef(null)
  const { isDesktop } = useWindowSize()
  const { t } = useTranslation('common')
  const investmentViewPeriod = useReactiveVar(investmentViewPeriodVar)
  const { mode, toggleColorMode } = useColorMode()
  const { open, toggleOpen } = useDrawer()
  const router = useRouter()

  const changePeriod = useCallback((period: InvestmentViewPeriods) => {
    investmentViewPeriodVar(period)
  }, [])

  const changeLanguage = useCallback(
    (country: string) => {
      router.push(router.pathname, router.pathname, {
        locale: countryCodeToLocale(country),
      })
    },
    [router]
  )

  return (
    <>
      <AppBar open={open}>
        <Toolbar>
          {!open && (
            <IconButton onClick={toggleOpen} sx={{ marginRight: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <CalendarWrapper>
            <TodayRoundedIcon />
            <Typography variant="body2">
              {formatDate(new Date(), 'PP', router.locale, capitalize)}
            </Typography>
          </CalendarWrapper>
          <Menu
            ariaLabel="Language selector menu"
            items={(Object.keys(InvestmentViewPeriods) as Array<
              keyof typeof InvestmentViewPeriods
            >).map((period) => ({
              name: period,
              value: (
                <Typography variant="body1">
                  {t(`${period}.short`)}{' '}
                  <Typography component="span" variant="body2">
                    - {t(`${period}.long`)}
                  </Typography>
                </Typography>
              ),
            }))}
            onClick={changePeriod}
          >
            {(toggleLanguageMenu: () => void) => (
              <IconButton
                sx={{ minHeight: 48, minWidth: 48, marginLeft: 1 }}
                onClick={toggleLanguageMenu}
              >
                <Typography component="p" variant="h6">
                  {t(`${investmentViewPeriod}.short`)}
                </Typography>
              </IconButton>
            )}
          </Menu>
          <EmptySpace />
          <Menu
            ariaLabel="Language selector menu"
            items={Object.values(COUNTRY_CODES).map((country) => ({
              name: country,
              value: <Flag country={country} />,
            }))}
            onClick={changeLanguage}
          >
            {(toggleLanguageMenu: () => void) => (
              <IconButton onClick={toggleLanguageMenu}>
                <Flag country={localeToCountryCode(router.locale)} />
              </IconButton>
            )}
          </Menu>
          <IconButton onClick={toggleColorMode}>
            {mode === Modes.light ? <WbSunnyIcon /> : <Brightness2Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        ref={ref}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant={isDesktop ? 'persistent' : 'temporary'}
        anchor="left"
        open={open}
        onClose={toggleOpen}
      >
        <DrawerHeader>
          <Image
            alt="Owo logo"
            src={mode === Modes.light ? DarkLogo : LightLogo}
            height="40"
            width="40"
          ></Image>
          <IconButton onClick={toggleOpen}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
      </Drawer>
    </>
  )
}

export default withClientOnlyRender(Header)
