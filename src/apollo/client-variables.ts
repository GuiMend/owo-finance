/* eslint-disable no-unused-vars */
import { makeVar } from '@apollo/client'

export enum InvestmentViewPeriods {
  ALL = 'ALL',
  M = 'M',
  Y = 'Y',
  TM = 'TM',
  TY = 'TY',
}

export const investmentViewPeriodVar = makeVar(InvestmentViewPeriods.TM)
