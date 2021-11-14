import { InMemoryCache } from '@apollo/client'
import { investmentViewPeriodVar } from './client-variables'

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // reactive variables
        investmentViewPeriod: {
          read() {
            return investmentViewPeriodVar()
          },
        },
      },
    },
  },
})

export default cache
