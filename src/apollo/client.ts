import { ApolloClient } from '@apollo/client'

import { APOLLO_CLIENT_URI } from 'configs/envs'

import cache from './cache'

const client = new ApolloClient({
  uri: APOLLO_CLIENT_URI,
  cache,
})

export default client
