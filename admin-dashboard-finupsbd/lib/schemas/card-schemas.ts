// // schemas/card.ts
// import { z } from "zod"
// import { BankNames } from "../constant/bankName"

// // ---------- Helpers ----------
// const percentLike = z
//   .string()
//   .trim()
//   .regex(
//     /^(\d+(\.\d+)?)%?$/,
//     "Must be a number or percentage (e.g. '11.5' or '11.5%')"
//   )

// const nonEmptyOptional = z
//   .string()
//   .trim()
//   .min(1, "Required")
//   .optional()

// const numericStringOptional = z
//   .string()
//   .trim()
//   .regex(/^\d+$/, "Must be a whole number")
//   .optional()

// // For BDT amounts like "BDT 3,000", "3000", "৳3000", etc.
// const moneyLikeOptional = z
//   .string()
//   .trim()
//   .regex(
//     /^(BDT|৳)?\s?\d{1,3}(,\d{3})*(\.\d+)?$|^\d+(\.\d+)?$/,
//     "Must look like a currency amount (e.g. 'BDT 3,000' or '3000')"
//   )
//   .optional()

// ---------- Enums ----------


// // ---------- Sub-schemas (match Prisma sub-models) ----------
// export const FeaturesCardSchema = z.object({
//   features1: nonEmptyOptional,
//   features2: nonEmptyOptional,
//   features3: nonEmptyOptional,
//   features4: nonEmptyOptional,
//   features5: nonEmptyOptional,
// })

// export type FeaturesCardInput = z.infer<typeof FeaturesCardSchema>

// export const EligibilityCardSchema = z.object({
//   condition: nonEmptyOptional,
//   offer: nonEmptyOptional,
//   minimumIncome: z.number().int().positive().optional(),
//   minimumExperience: z.number().int().min(0).optional(),
//   ageRequirement: z.number().int().min(18).optional(),
// })

// export type EligibilityCardInput = z.infer<typeof EligibilityCardSchema>

// export const FeesChargesCardSchema = z.object({
//   annualFee: moneyLikeOptional,
//   annualFeeWaived: nonEmptyOptional,
//   latePaymentFee: moneyLikeOptional,
//   interestRate: percentLike.optional(),
//   balanceTransferRate: percentLike.optional(),
// })

// export type FeesChargesCardInput = z.infer<typeof FeesChargesCardSchema>

// // ---------- Main Card schema ----------
// export const CardSchema = z.object({


//   // Required
//   cardName: z.string().trim().min(2, "Card name is required"),
//   bankName: BankNameEnum,
//   currency: CurrencyEnum,
//   cardFeaturesType: CardFeaturesTypeEnum,
//   cardNetwork: CardNetworkEnum,
//   cardType: CardTypesEnum,

//   // Optional financial / descriptive fields (kept as strings to match Prisma)
//   interestPerDay: percentLike.optional(),
//   freeAnnualFee: nonEmptyOptional,        // e.g., "First year free"
//   regularAnnualFee: moneyLikeOptional,    // e.g., "BDT 3,000 per year"
//   interestFreePeriod: nonEmptyOptional,   // e.g., "Up to 50 days"
//   latePaymentFees: moneyLikeOptional,

//   annualFeeWaivedReward: nonEmptyOptional, // e.g., "Spend BDT 200,000 to waive fee"
//   freeSupplementaryCards: numericStringOptional,
//   maxSupplementaryCards: numericStringOptional,

//   balanceTransferAvailability: nonEmptyOptional,
//   ownBankATMFee: moneyLikeOptional,
//   otherBankATMFee: moneyLikeOptional,

//   loungeFacility: nonEmptyOptional,   // e.g., "International + Domestic lounges"
//   loungeVisit: nonEmptyOptional,      // e.g., "8 free visits per year"
//   cardChequeProcessingFee: moneyLikeOptional,
//   processingFeeMinimum: moneyLikeOptional,
//   cashWithdrawalLimit: moneyLikeOptional,

//   isActive: z.boolean().optional().default(true),

//   // Relations
//   userId: z.string().uuid().optional(),

//   // Sub-documents
//   features: FeaturesCardSchema.optional(),
//   eligibility: EligibilityCardSchema.optional(),
//   feesCharges: FeesChargesCardSchema.optional(),
// })

// // Useful variants
// export type CardFormData = z.infer<typeof CardSchema>



// // Update: everything optional
// export const UpdateCardSchema = CardSchema.deepPartial()
// export type CreateCardInput = z.infer<typeof CardSchema>
// export type UpdateCardInput = z.infer<typeof UpdateCardSchema>

// // ---------- Example safe parse ----------
// // const parsed = CreateCardSchema.safeParse(payload)
// // if (!parsed.success) { /* handle parsed.error */ }






import { z } from "zod"
import { BankNames } from "../constant/bankName"
import { CardFeaturesTypes, CardNetworks, CardTypes, CurrencyTypes } from "../constant/enum"


export const BankNameEnum = z.enum(BankNames)

export const CardTypesEnum = z.enum(CardTypes)

export const CurrencyEnum = z.enum(CurrencyTypes)

export const CardNetworkEnum = z.enum(CardNetworks)

export const CardFeaturesTypeEnum = z.enum(CardFeaturesTypes)



export const creditCardFormSchema = z.object({
  // Card Details
  cardName: z.string().min(1, "Card name is required"),
  bankName: z.string().min(1, "Bank name is required"),
  cardType: CardTypesEnum,
  cardNetwork: CardNetworkEnum,
  cardFeaturesType: CardFeaturesTypeEnum,
  currency: z.string().min(1, "Currency is required"),

  // Interest & Fees
  interestPerDay: z.string().min(1, "Daily interest rate is required"),
  regularAnnualFee: z.string().min(1, "Annual fee is required"),
  freeAnnualFee: z.string().min(1, "Free annual fee terms required"),
  annualFeeWaivedReward: z.string().min(1, "Annual fee waived reward is required"),
  interestFreePeriod: z.string().min(1, "Interest-free period is required"),
  latePaymentFees: z.string().min(1, "Late payment fees are required"),

  // ATM & Other Fees
  ownBankATMFee: z.string().min(1, "Own bank ATM fee is required"),
  otherBankATMFee: z.string().min(1, "Other bank ATM fee is required"),
  cardChequeProcessingFee: z.string().min(1, "Card cheque processing fee is required"),
  processingFeeMinimum: z.string().min(1, "Processing fee minimum is required"),

  // Supplementary Cards
  freeSupplementaryCards: z.string().min(1, "Free supplementary cards count required"),
  maxSupplementaryCards: z.string().min(1, "Max supplementary cards count required"),

  // Lounge Access
  loungeFacility: z.string().min(1, "Lounge facility type is required"),
  loungeVisit: z.string().min(1, "Lounge visits per year is required"),

  // Limits & Balance Transfer
  cashWithdrawalLimit: z.string().min(1, "Cash withdrawal limit is required"),
  balanceTransferAvailability: z.string().min(1, "Balance transfer availability is required"),

  // Features
  features: z.object({
    features1: z.string().min(1, "Feature 1 is required"),
    features2: z.string().min(1, "Feature 2 is required"),
    features3: z.string().min(1, "Feature 3 is required"),
    features4: z.string().min(1, "Feature 4 is required"),
    features5: z.string().min(1, "Feature 5 is required"),
  }),

  // Eligibility
  eligibility: z.object({
    condition: z.string().min(1, "Eligibility condition is required"),
    offer: z.string().min(1, "Eligibility offer is required"),
    minimumIncome: z.number().min(0, "Minimum income must be positive"),
    minimumExperience: z.number().min(0, "Minimum experience must be non-negative"),
    ageRequirement: z.number().min(18, "Minimum age should be 18 or above"),
  }),

  // Fees & Charges
  feesCharges: z.object({
    annualFee: z.string().min(1, "Annual fee is required"),
    annualFeeWaived: z.string().min(1, "Annual fee waived is required"),
    latePaymentFee: z.string().min(1, "Late payment fee is required"),
    interestRate: z.string().min(1, "Interest rate is required"),
    balanceTransferRate: z.string().min(1, "Balance transfer rate is required"),
  }),
})

export type CreditCardFormData = z.infer<typeof creditCardFormSchema>
