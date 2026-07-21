export const ModulesLoans = {
  PERSONAL_LOAN: 'PERSONAL_LOAN',
  HOME_LOAN: 'HOME_LOAN',
  CAR_LOAN: 'CAR_LOAN',
  SME_LOAN: 'SME_LOAN',
  INSTANT_LOAN: 'INSTANT_LOAN',
} as const;

export type TModulesLoans = (typeof ModulesLoans)[keyof typeof ModulesLoans];

export const ModulesCards = {
  PREPAID_CARD: 'PREPAID_CARD',
  DEBIT_CARD: 'DEBIT_CARD',
  CREDIT_CARD: 'CREDIT_CARD',
  TRAVEL_CARD: 'TRAVEL_CARD',
} as const;

export type TModulesCards = (typeof ModulesCards)[keyof typeof ModulesCards];

export type TModules = TModulesLoans | TModulesCards | 'ALL';
