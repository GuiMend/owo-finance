export const CURRENCY: { [index: string]: string } = {
  en: 'USD',
  'pt-BR': 'BRL',
}

const priceFormatter = (price: number, locale = 'pt-BR') =>
  Intl.NumberFormat(locale, {
    style: 'currency',
    currency: CURRENCY[locale],
  }).format(Number(price.toFixed(2)))

export default priceFormatter
