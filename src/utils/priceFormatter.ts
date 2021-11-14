export const CURRENCY: { [index: string]: string } = {
  en: 'USD',
  'pt-BR': 'BRL',
}

const priceFormatter = (
  price: number,
  locale = 'pt-BR',
  exchangeRateUsdBrl: number,
  currentPriceCurrency = 'BRL'
) => {
  let finalPrice = price
  if (currentPriceCurrency !== CURRENCY[locale]) {
    switch (currentPriceCurrency) {
      case 'BRL':
        finalPrice = price / exchangeRateUsdBrl
        break
      case 'USD':
        finalPrice = price * exchangeRateUsdBrl
        break
    }
  }

  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency: CURRENCY[locale],
  }).format(Number(finalPrice.toFixed(2)))
}

export default priceFormatter
