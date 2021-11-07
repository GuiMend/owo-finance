/* eslint-disable no-unused-vars */
import { makeVar } from '@apollo/client'

export enum InvestmentViewPeriods {
  ALL = 'ALL',
  M = 'M',
  S = 'S',
  Y = 'Y',
  TM = 'TM',
  TS = 'TS',
  TY = 'TY',
}

export const investmentViewPeriodVar = makeVar(InvestmentViewPeriods.ALL)
