import { useState, createContext, useMemo, useContext, useEffect } from 'react'

import { CURRENCY_API_KEY } from 'configs/envs'

interface ICurrencyExchangeContext {
  // TODO: add a way of retrieving range values
  // getRange: (dateFrom: Date, dateTo: Date) => void
  usdBrl: number
  loadingExchange: boolean
  errorExchange: boolean
}

interface ICurrencyExchangeProvider {
  children: JSX.Element
}

const CurrencyExchange = createContext<ICurrencyExchangeContext>({
  usdBrl: 0,
  loadingExchange: false,
  errorExchange: false,
})

const CurrencyExchangeProvider = ({ children }: ICurrencyExchangeProvider) => {
  const [usdBrl, setUsdBrl] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchUsdBrl() {
      try {
        setLoading(true)
        const response = await fetch(
          `https://freecurrencyapi.net/api/v2/latest?apikey=${CURRENCY_API_KEY}`
        )
        const res: { data: { BRL: number } } = await response.json()
        setUsdBrl(Number(res.data.BRL.toFixed(2)))
        setError(false)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(new Error(`Error fetching USD/BRL exchange rate: ${e}`))
        setUsdBrl(0)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchUsdBrl()
  }, [])

  const exchangeRate = useMemo(
    () => ({
      usdBrl,
      loadingExchange: loading,
      errorExchange: error,
    }),
    [error, loading, usdBrl]
  )

  return (
    <CurrencyExchange.Provider value={exchangeRate}>
      {children}
    </CurrencyExchange.Provider>
  )
}

export const useUsdBrl = () => useContext(CurrencyExchange)
export default CurrencyExchangeProvider
