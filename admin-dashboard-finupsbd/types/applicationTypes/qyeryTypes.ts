
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


export type TModules = TModulesLoans | TModulesCards | "ALL";

export const PRODUCT_TYPES: { value: TModules; label: string }[] = [
  { value: "PERSONAL_LOAN", label: "Personal Loan" },
  { value: "HOME_LOAN", label: "Home Loan" },
  { value: "CAR_LOAN", label: "Car Loan" },
  { value: "SME_LOAN", label: "SME Loan" },
  { value: "INSTANT_LOAN", label: "Instant Loan" },
  { value: "CREDIT_CARD", label: "Credit Card" },
  { value: "PREPAID_CARD", label: "Prepaid Card" },
  { value: "TRAVEL_CARD", label: "Travel Card" },
];

