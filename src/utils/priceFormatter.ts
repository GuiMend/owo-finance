export const CURRENCY: { [index: string]: string } = {
  en: 'USD',
  'pt-BR': 'BRL',
}

const priceFormatter = (price: number, locale = 'pt-BR') =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: CURRENCY[locale],
  }).format(price)

export default priceFormatter
