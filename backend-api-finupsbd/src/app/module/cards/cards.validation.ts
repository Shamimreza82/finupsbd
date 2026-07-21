import { BankName } from '@prisma/client';
import { z } from 'zod';

export const CardTypeEnum = z.enum(['CREDIT_CARD', 'PREPAID_CARD', 'TRAVEL_CARD']);
export const CurrencyEnum = z.enum(['LOCAL', 'DUAL', 'FOREIGN']);
export const CardNetworkEnum = z.enum([
  'VISA',
  'MASTERCARD',
  'AMEX',
  'UNIONPAY',
  'NPSB',
  'QCASH',
  'DBBL_NEXUS',
  'OTHER',
]);
export const CardFeaturesTypeEnum = z.enum([
  'SILVER',
  'CLASSIC',
  'STANDARD',
  'GOLD',
  'PLATINUM',
  'SIGNATURE',
  'TITANIUM',
  'PREMIUM',
]);

export const optionalTrimmed = z
  .string()
  .trim()
  .min(1)
  .optional()
  .or(z.literal('').transform(() => undefined)); // treat empty as undefined

export const optionalURL = z
  .string()
  .url()
  .optional()
  .or(z.literal('').transform(() => undefined));

export const optionalBoolean = z
  .boolean()
  .optional()
  .or(z.enum(['true', 'false']).transform((v) => v === 'true'))
  .optional();

/** Coerce number from input (string/number), ensure non-negative by default */
export const coercePositiveInt = z.coerce.number().int().nonnegative();
export const coercePositiveNumber = z.coerce.number().nonnegative();

export const FeaturesCardCreateSchema = z.object({
  features1: optionalTrimmed,
  features2: optionalTrimmed,
  features3: optionalTrimmed,
  features4: optionalTrimmed,
  features5: optionalTrimmed,
});

export const EligibilityCardCreateSchema = z.object({
  condition: optionalTrimmed,
  offer: optionalTrimmed,
  minimumIncome: coercePositiveInt.optional(),
  minimumExperience: coercePositiveInt.optional(),
  ageRequirement: coercePositiveInt.optional(),
});

export const FeesChargesCardCreateSchema = z.object({
  annualFee: optionalTrimmed,
  annualFeeWaived: optionalTrimmed,
  latePaymentFee: optionalTrimmed,
  interestRate: optionalTrimmed,
  balanceTransferRate: optionalTrimmed,
});

export const FeaturesCardUpdateSchema = FeaturesCardCreateSchema.partial();
export const EligibilityCardUpdateSchema = EligibilityCardCreateSchema.partial();
export const FeesChargesCardUpdateSchema = FeesChargesCardCreateSchema.partial();

export const BankNameSchema = z.enum(Object.values(BankName) as [string, ...string[]]);

export const CardCreateSchema = z.object({
  // IDs are generated server-side; allow optional in case of admin create

  cardName: z.string().trim().min(2, 'Card name is too short'),
  bankName: BankNameSchema,

  cardImage: optionalURL,
  coverImage: optionalURL,

  interestPerDay: optionalTrimmed,
  freeAnnualFee: optionalTrimmed,
  regularAnnualFee: optionalTrimmed,
  interestFreePeriod: optionalTrimmed,
  latePaymentFees: optionalTrimmed,

  currency: CurrencyEnum,
  cardFeaturesType: CardFeaturesTypeEnum,
  cardNetwork: CardNetworkEnum,

  annualFeeWaivedReward: optionalTrimmed,
  freeSupplementaryCards: optionalTrimmed,
  maxSupplementaryCards: optionalTrimmed,
  balanceTransferAvailability: optionalTrimmed,

  ownBankATMFee: optionalTrimmed,
  otherBankATMFee: optionalTrimmed,

  loungeFacility: optionalTrimmed,
  loungeVisit: optionalTrimmed,

  cardChequeProcessingFee: optionalTrimmed,
  processingFeeMinimum: optionalTrimmed,
  cashWithdrawalLimit: optionalTrimmed,

  cardType: CardTypeEnum,
  isActive: optionalBoolean.default(true),

  // Nested creates (optional)
  features: FeaturesCardCreateSchema.optional(),
  eligibility: EligibilityCardCreateSchema.optional(),
  feesCharges: FeesChargesCardCreateSchema.optional(),
});

export const CardUpdateSchema = CardCreateSchema.partial().extend({
  // Allow nested partial updates
  features: FeaturesCardUpdateSchema.optional(),
  eligibility: EligibilityCardUpdateSchema.optional(),
  feesCharges: FeesChargesCardUpdateSchema.optional(),
});

export type TCardCreateInput = z.infer<typeof CardCreateSchema>;
export type TCardUpdateInput = z.infer<typeof CardUpdateSchema>;
export type TCardTypeEnum = z.infer<typeof CardTypeEnum>;
