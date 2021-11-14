import { sub, endOfMonth, endOfYear } from 'date-fns'

import { InvestmentViewPeriods } from 'apollo/client-variables'

type DateDetails = {
  startDate?: Date
  endDate?: Date
  duration: Duration
}

export const getLastPeriods = (period: InvestmentViewPeriods, number = 6) => {
  const today = new Date()
  const amountOfPeriods = new Array(number)
  const datesDetails: DateDetails = { endDate: today, duration: { months: 1 } }

  switch (period) {
    case InvestmentViewPeriods.ALL:
      // data from start, but show 6 periods of 1 month
      datesDetails.duration = { years: 10 }
      break

    case InvestmentViewPeriods.Y:
      // last 1 year, 6 periods of 1 year prior to that
      datesDetails.duration = { years: 1 }
      break

    case InvestmentViewPeriods.TM:
      // from stat to end of current months, 6 periods of 1 month prior to that
      datesDetails.endDate = endOfMonth(today)
      break

    case InvestmentViewPeriods.TY:
      // from stat to end of current year, 6 prior years
      datesDetails.endDate = endOfYear(today)
      datesDetails.duration = { years: 1 }
      break
  }

  return amountOfPeriods
    .fill(datesDetails.endDate)
    .map((date, index) => {
      const [key, value] = Object.entries(datesDetails.duration)[0]
      return sub(date, { [key]: value * index })
    })
    .reverse()
}
