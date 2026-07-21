import { z } from 'zod';

// ── ENUMS ─────────────────────────────────────────────
export const Gender = z.enum(['MALE', 'FEMALE', 'OTHER'], {
  required_error: 'Gender is required',
});
export const MaritalStatus = z.enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED'], {
  required_error: 'Marital status is required',
});
export const Religion = z.enum(['ISLAM', 'HINDUISM', 'CHRISTIANITY', 'BUDDHISM', 'OTHER'], {
  required_error: 'Religion is required',
});
export const ResidentialStatus = z.enum(['RESIDENT', 'NONRESIDENT', 'TEMPORARYRESIDENT'], {
  required_error: 'Residential status is required',
});
export const EduLavel = z.enum(
  ['BELOW_SSC', 'SSC', 'HSC', 'GRADUATE', 'POST_GRADUATE', 'PHD', 'OTHER_EDUCATION'],
  { required_error: 'Education level is required' },
);
export const OwnershipStatus = z.enum(['OWNED', 'RENTED', 'FAMILY_OWNED', 'COMPANY_PROVIDED']);
export const LoanStatus = z.enum([
  'SUBMITTED',
  'PENDING',
  'IN_PROGRESS',
  'APPROVED',
  'REJECTED',
  'COMPLETED',
]);
export const LoanType = z.enum([
  'PERSONAL_LOAN',
  'HOME_LOAN',
  'CAR_LOAN',
  'SME_LOAN',
  'INSTANT_LOAN',
]);
export const ProfessionType = z.enum([
  'DOCTOR',
  'ENGINEER',
  'ARCHITECT',
  'ACCOUNTANT',
  'ARTIST',
  'TEACHER',
  'FREELANCER',
  'OTHER',
]);
export const PropertyType = z.enum([
  'RESIDENTIAL',
  'COMMERCIAL',
  'LAND',
  'APARTMENT',
  'HOUSE',
  'OTHER',
]);
export const EmploymentStatus = z.enum(['SALARIED', 'SELF_EMPLOYED', 'BUSINESS_OWNER']);
export const EmploymentType = z.enum(['PERMANENT', 'CONTRACTUAL', 'PARTTIME', 'PROBATION']);

// ── SUB-SCHEMAS ──────────────────────────────────────
const BankAccount = z.object({
  bankName: z.string().min(1, 'Bank name is required'),
  accountNumber: z.string().min(5, 'Account number is too short'),
});

const CreditCardUser = z.object({
  issuerName: z.string().min(1, 'Issuer name is required'),
  cardLimit: z.string().min(1, 'Card limit is required'),
  toBeClosedBeforeDisbursement: z.boolean({
    invalid_type_error: 'Must select an option',
  }),
});

const ExistingLoanUser = z.object({
  loanType: LoanType,
  adjustmentPlan: z.string().min(1, 'Adjustment plan is required'),
  disbursedAmount: z.string().min(1, 'Disbursed amount is required'),
  otherLoanType: z.string().optional(),
  lenderName: z.string().min(1, 'Lender name is required'),
  outstanding: z.string().min(1, 'Outstanding is required'),
  emi: z.string().min(1, 'EMI is required'),
});

const PropertyItem = z.object({
  propertyType: PropertyType.optional(),
  propertyValue: z.string().optional(),
});

const PersonalGuarantor = z.object({
  mobileNumber: z.string().min(11, 'Valid mobile number is required'),
  emailAddress: z.string().email('Valid email required'),
});

const BusinessGuarantor = z.object({
  mobileNumber: z.string().min(11, 'Valid mobile number is required'),
  emailAddress: z.string().email('Valid email required'),
});

const GuarantorInfo = z.object({
  personalGuarantor: PersonalGuarantor.optional(),
  businessGuarantor: BusinessGuarantor.optional(),
});

const LoanRequest = z.object({
  loanAmount: z.string().min(1, 'Loan amount is required'),
  loanTenure: z.number().min(1, 'Loan tenure must be at least 1 month'),
  loanPurpose: z.string().min(1, 'Loan purpose is required'),
  emiStartDate: z.number({
    invalid_type_error: 'Valid EMI start date required',
  }),
});

const LoanInfo = z.object({
  hasCreditCard: z.boolean(),
  hasExistingLoan: z.boolean(),
  bankAccounts: z.array(BankAccount).min(1, 'At least one bank account required'),
  creditCards: z.array(CreditCardUser),
  existingLoans: z.array(ExistingLoanUser),
});

export const employmentInformationSchema = z.object({
  employmentStatus: EmploymentStatus,
  designation: z.string().optional(),
  department: z.string().optional(),
  employeeId: z.string().optional(),
  employmentType: EmploymentType.optional(),
  dateOfJoining: z.string().optional(),
  organizationName: z.string().optional(),
  organizationAddress: z.string().optional(),
  serviceYears: z.string().optional(),
  serviceMonths: z.string().optional(),
  eTin: z.string().optional(),
  officialContact: z.string().optional(),
  hasPreviousOrganization: z.boolean().optional(),
  previousOrganizationName: z.string().optional(),
  previousDesignation: z.string().optional(),
  previousServiceYears: z.string().optional(),
  previousServiceMonths: z.string().optional(),
  totalExperienceYears: z.string().optional(),
  totalExperienceMonths: z.string().optional(),

  // Business-related
  businessName: z.string().optional(),
  businessAddress: z.string().optional(),
  sharePortion: z.string().optional(),
  businessRegistrationNumber: z.string().optional(),
  tradeLicenseAge: z.string().optional(),

  // Professional-related
  professionType: ProfessionType.optional(),
  otherProfession: z.string().optional(),
  professionalTitle: z.string().optional(),
  institutionName: z.string().optional(),
  workplaceAddress: z.string().optional(),
  yearsOfExperience: z.string().optional(),
  startedPracticeSince: z.string().datetime().optional(),
  tin: z.string().optional(),
  websitePortfolioLink: z.string().optional(),
  professionalRegistrationNumber: z.string().optional(),

  // Income
  grossMonthlyIncome: z.string().min(1),
  rentIncome: z.string().optional(),
  otherIncome: z.string().optional(),
  sourceOfOtherIncome: z.string().optional(),
  totalIncome: z.string().min(1),

  // Property
  properties: z.array(PropertyItem).optional(),
});

const ResidentialInformation = z.object({
  presentAddress: z
    .string()
    .min(5, { message: 'Present address must be at least 5 characters long.' }),

  presentDistrict: z.string().min(2, { message: 'Present district is required.' }),

  presentDivision: z.string().min(2, { message: 'Present division is required.' }),

  presentLengthOfStay: z.string().min(1, { message: 'Length of stay must be specified.' }),
  presentOwnershipStatus: OwnershipStatus,
  presentPostalCode: z.string(),

  presentThana: z.string().min(2, { message: 'Present thana is required.' }),

  isPermanentSameAsPresent: z.boolean(),
  permanentAddress: z.string().optional(),
  permanentDistrict: z.string().optional(),
  permanentDivision: z.string().optional(),
  permanentLengthOfStay: z.string().optional(),
  permanentOwnershipStatus: OwnershipStatus.optional(),
  permanentThana: z.string().optional(),
  permanentPostalCode: z.string().optional(),
});

const PersonalInfo = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  fatherName: z.string().min(1, 'Father or Husband name is required'),
  motherName: z.string().min(1, 'Mother name is required'),
  spouseName: z.string().optional(),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  placeOfBirth: z.string(),
  nationality: z.string(),
  gender: Gender,
  maritalStatus: MaritalStatus,
  educationalLevel: EduLavel,
  NIDNumber: z.string(),
  passportNumber: z.string().optional(),
  religion: Religion,
  residentialStatus: ResidentialStatus,
  mobileNumber: z.string(),
  alternateMobileNumber: z.string().optional(),
  emailAddress: z.string().email(),
  socialMediaProfiles: z.array(z.string()),
});

// ── MAIN FORM SCHEMA ────────────────────────────────
export const LoanApplicationFormSchema = z.object({
  personalInfo: PersonalInfo.optional(),
  residentialInfo: ResidentialInformation.optional(),
  employmentInfo: employmentInformationSchema.optional(),
  loanInfo: LoanInfo.optional(),
  loanRequest: LoanRequest.optional(),
  guarantorInfo: GuarantorInfo.optional(), // casing aligned to match frontend
});

// ── TYPE INFERENCES ────────────────────────────────
export type TLoanApplicationForm = z.infer<typeof LoanApplicationFormSchema>;
export type TPersonalInfo = z.infer<typeof PersonalInfo>;
export type TResidentialInformation = z.infer<typeof ResidentialInformation>;
export type TEmploymentInfo = z.infer<typeof employmentInformationSchema>;
export type TLoanInfo = z.infer<typeof LoanInfo>;
export type TLoanRequest = z.infer<typeof LoanRequest>;
export type TGuarantorInfo = z.infer<typeof GuarantorInfo>;
export type TPropertyItem = z.infer<typeof PropertyItem>;
