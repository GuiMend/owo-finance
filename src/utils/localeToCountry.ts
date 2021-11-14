export const COUNTRY_CODES = {
  BR: 'BR',
  US: 'US',
}

export const localeToCountryCode = (locale = 'pt-BR') =>
  ({
    'pt-BR': COUNTRY_CODES.BR,
    en: COUNTRY_CODES.US,
  }[locale])

export const countryCodeToLocale = (country = 'BR') =>
  ({
    [COUNTRY_CODES.BR]: 'pt-BR',
    [COUNTRY_CODES.US]: 'en',
  }[country])
