/* eslint-disable no-unused-vars */

export type TLoanApplicationForm = {
  status: LoanStatus;
  isActive: boolean;
  isDeleted: boolean;
  adminNotes?: string;
  applicationId?: string;
  userId: string;
  personalInfo?: PersonalInfo;
  residentialInfo?: ResidentialInformation;
  employmentInfo?: EmploymentInformation;
  loanInfo?: LoanInfo;
  loanRequest?: LoanRequest;
  guarantorInfo?: GuarantorInfo;
  personalGuarantor?: PersonalGuarantor;
  businessGuarantor?: BusinessGuarantor;
};

export type PersonalInfo = {
  fullName: string;
  fatherName: string;
  motherName: string;
  spouseName?: string;
  dateOfBirth: string;
  placeOfBirth: string;
  nationality: string;
  gender: Gender;
  maritalStatus: MaritalStatus;
  educationalLevel: EduLavel;
  NIDNumber: string;
  passportNumber?: string;
  religion: Religion;
  residentialStatus: ResidentialStatus;
  mobileNumber: string;
  alternateMobileNumber?: string;
  emailAddress: string;
  socialMediaProfiles: string[];
};

export type ResidentialInformation = {
  presentAddress: string;
  presentDistrict: string;
  presentDivision: string;
  presentLengthOfStay: string;
  presentOwnershipStatus: OwnershipStatus;
  presentPostalCode: string;
  presentThana: string;
  isPermanentSameAsPresent: boolean;
  permanentAddress?: string;
  permanentDistrict?: string;
  permanentDivision?: string;
  permanentLengthOfStay?: string;
  permanentOwnershipStatus?: OwnershipStatus;
  permanentThana?: string;
  permanentPostalCode?: string;
};

export type EmploymentInformation = {
  employmentStatus: EmploymentStatus;
  jobTitle: string;
  designation: string;
  department: string;
  employeeId: string;
  employmentType: string;
  dateOfJoining: string; // ISO Date string
  organizationName: string;
  organizationAddress: string;
  serviceYears: number;
  serviceMonths: number;
  eTin: string;
  officialContact: string;

  hasPreviousOrganization: boolean;
  previousOrganizationName?: string;
  previousDesignation?: string;
  previousServiceYears?: number;
  previousServiceMonths?: number;

  totalExperienceYears: number;
  totalExperienceMonths: number;

  // Business-related
  businessName?: string;
  businessAddress?: string;
  sharePortion?: string;
  businessRegistrationNumber?: string;
  tradeLicenseAge?: string;
  businessOwnerType: BOwnerType;
  businessType: BusinessType;

  // Professional-related
  professionType?: string;
  otherProfession?: string;
  professionalTitle?: string;
  institutionName?: string;
  workplaceAddress?: string;
  yearsOfExperience?: number;
  startedPracticeSince?: string; // ISO Date string
  tin?: string;
  websitePortfolioLink?: string;
  professionalRegistrationNumber?: string;

  // Property
  properties: Properties[];
  // Income

  grossMonthlyIncome: string;
  rentIncome?: string;
  otherIncome?: string;
  sourceOfOtherIncome?: string;
  totalIncome: string;
};

export type LoanInfo = {
  hasCreditCard: boolean;
  hasExistingLoan: boolean;
  bankAccounts: BankAccount[];
  creditCards: CreditCardUser[];
  existingLoans: ExistingLoanUser[];
};

export type BankAccount = {
  bankName: string;
  accountNumber: string;
};

export type CreditCardUser = {
  issuerName: string;
  cardLimit: string;
  toBeClosedBeforeDisbursement: boolean;
};

export type ExistingLoanUser = {
  loanType: LoanType; // Assuming `LoanType` is an enum in TypeScript
  adjustmentPlan: string;
  disbursedAmount: string;
  otherLoanType?: string;
  lenderName: string;
  outstanding: string;
  emi: string;
  loanInfoId: string;
};

export type LoanRequest = {
  loanAmount: string;
  loanTenure: number;
  loanPurpose: string;
  emiStartDate: number;
};

export type GuarantorInfo = {
  personalGuarantor: PersonalGuarantor;
  businessGuarantor: BusinessGuarantor;
};

export type BusinessGuarantor = {
  mobileNumber: string;
  emailAddress: string;
};

export type PersonalGuarantor = {
  mobileNumber: string;
  emailAddress: string;
};

export type Properties = {
  propertyType: PropertyType;
  propertyValue: string;
};

export enum PropertyType {
  RESIDENTIAL = 'RESIDENTIAL',
  COMMERCIAL = 'COMMERCIAL',
  LAND = 'LAND',
  APARTMENT = 'APARTMENT',
  HOUSE = 'HOUSE',
  OTHER = 'OTHER',
}

enum EmploymentStatus {
  SALARIED = 'SALARIED',
  SELF_EMPLOYED = 'SELF_EMPLOYED',
  BUSINESS_OWNER = 'BUSINESS_OWNER',
}

enum BOwnerType {
  PROPRIETORSHIP = 'PROPRIETORSHIP',
  PARTNERSHIP = 'PARTNERSHIP',
  PUBLIC_LIMITED_COMPANY = 'PUBLIC_LIMITED_COMPANY',
}

enum BusinessType {
  WHOLESALE = 'WHOLESALE',
  RETAIL = 'RETAIL',
  SERVICES = 'SERVICES',
  MANUFACTURING = 'MANUFACTURING',
  OTHER = 'OTHER',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum MaritalStatus {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  DIVORCED = 'DIVORCED',
  WIDOWED = 'WIDOWED',
}

export enum EduLavel {
  BELOW_SSC = 'BELOW_SSC',
  SSC = 'SSC',
  HSC = 'HSC',
  GRADUATE = 'GRADUATE',
  POST_GRADUATE = 'POST_GRADUATE',
  PHD = 'PHD',
  OTHER_EDUCATION = 'OTHER_EDUCATION',
}

export enum Religion {
  ISLAM = 'ISLAM',
  HINDUISM = 'HINDUISM',
  CHRISTIANITY = 'CHRISTIANITY',
  BUDDHISM = 'BUDDHISM',
  OTHER = 'OTHER',
}

export enum ResidentialStatus {
  RESIDENT = 'RESIDENT',
  NONRESIDENT = 'NONRESIDENT',
  TEMPORARYRESIDENT = 'TEMPORARYRESIDENT',
}

export enum OwnershipStatus {
  RENTED = 'RENTED',
  FAMILY_OWNED = 'FAMILY_OWNED',
  COMPANY_PROVIDED = 'COMPANY_PROVIDED',
}

export enum LoanStatus {
  SUBMITTED = 'SUBMITTED',
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
}

export enum LoanType {
  PERSONAL_LOAN = 'PERSONAL_LOAN',
  HOME_LOAN = 'HOME_LOAN',
  CAR_LOAN = 'CAR_LOAN',
  SME_LOAN = 'SME_LOAN',
  INSTANT_LOAN = 'INSTANT_LOAN',
}
