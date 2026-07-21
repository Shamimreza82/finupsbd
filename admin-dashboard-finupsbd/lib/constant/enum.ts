export const CardTypes = ["CREDIT_CARD", "PREPAID_CARD", "TRAVEL_CARD"] as const;
export const CurrencyTypes = ["LOCAL", "DUAL", "FOREIGN"] as const;
export const CardNetworks = [
  "VISA",
  "MASTERCARD",
  "AMEX",
  "UNIONPAY",
  "NPSB",
  "QCASH",
  "DBBL_NEXUS",
  "OTHER",
] as const;
export const CardFeaturesTypes = [
  "SILVER",
  "CLASSIC",
  "STANDARD",
  "GOLD",
  "PLATINUM",
  "SIGNATURE",
  "TITANIUM",
  "PREMIUM",
] as const;

// Optional: Types for TypeScript
export type TCardType = (typeof CardTypes)[number];
export type TCurrencyType = (typeof CurrencyTypes)[number];
export type TCardNetwork = (typeof CardNetworks)[number];
export type TCardFeaturesType = (typeof CardFeaturesTypes)[number];
