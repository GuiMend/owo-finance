import { format as formatFns, isValid } from 'date-fns'
import { enUS, ptBR } from 'date-fns/locale'

export const capitalize = (text: string) =>
  text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

const DATE_LOCALE: { [index: string]: Locale } = {
  en: enUS,
  'pt-BR': ptBR,
}

const formatDate = (
  date: Date,
  format = 'dd/MM/yyyy',
  locale = 'pt-BR',
  // eslint-disable-next-line no-unused-vars
  customFormatter?: (x: string) => string
) => {
  if (isValid(date)) {
    const formattedDate = formatFns(date, format, {
      locale: DATE_LOCALE[locale],
    })
    if (typeof customFormatter === 'function')
      return customFormatter(formattedDate)
    return formattedDate
  }
  return date
}

export default formatDate
