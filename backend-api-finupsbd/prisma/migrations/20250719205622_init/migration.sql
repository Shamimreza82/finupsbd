-- CreateEnum
CREATE TYPE "Category" AS ENUM ('LOAN', 'CREDIT_CARD', 'CREDIT_SCORE', 'CUSTOMER_SUCCESS');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('LOCAL', 'DUAL');

-- CreateEnum
CREATE TYPE "CardNetwork" AS ENUM ('VISA', 'MASTER', 'AMEX');

-- CreateEnum
CREATE TYPE "CardFeaturesType" AS ENUM ('SILVER', 'CLASSIC', 'STANDARD', 'GOLD', 'PLATINUM', 'SIGNATURE', 'TITANIUM');

-- CreateEnum
CREATE TYPE "MainLoanType" AS ENUM ('PERSONAL_LOAN', 'HOME_LOAN', 'CAR_LOAN', 'SME_LOAN', 'INSTANT_LOAN', 'CREDIT_CARD', 'DEBIT_CARD');

-- CreateEnum
CREATE TYPE "EGender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "Profession" AS ENUM ('BUSINESS_OWNER', 'SALARIED', 'SELF_EMPLOYED');

-- CreateEnum
CREATE TYPE "BusinessOwnerType" AS ENUM ('PROPRIETORSHIP', 'PARTNERSHIP', 'PUBLIC_LIMITED_COMPANY');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('CAR_SEDAN', 'CAR_SUV', 'CAR_HATCHBACK', 'BIKE');

-- CreateEnum
CREATE TYPE "ExistingLoanType" AS ENUM ('HOME_LOAN', 'PERSONAL_LOAN', 'CAR_LOAN', 'SME_LOAN', 'CREDIT_CARD', 'OTHER');

-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('PERMANENT', 'CONTRACTUAL', 'PARTTIME', 'PROBATION');

-- CreateEnum
CREATE TYPE "BOwnerType" AS ENUM ('PROPRIETORSHIP', 'PARTNERSHIP', 'PUBLIC_LIMITED_COMPANY');

-- CreateEnum
CREATE TYPE "BusinessTypeEmployment" AS ENUM ('RETAIL', 'WHOLESALE', 'MANUFACTURING');

-- CreateEnum
CREATE TYPE "SelfEmploymentType" AS ENUM ('DOCTOR', 'ENGINEER', 'ARCHITECT', 'ACCOUNTANT', 'ARTIST', 'TEACHER', 'FREELANCER', 'OTHER');

-- CreateEnum
CREATE TYPE "BusinessOwnerTypeLoan" AS ENUM ('PROPRIETORSHIP', 'PARTNERSHIP', 'LLC', 'CORPORATION', 'OTHER');

-- CreateEnum
CREATE TYPE "BusinessType" AS ENUM ('WHOLESALE', 'RETAIL', 'SERVICES', 'MANUFACTURING', 'OTHER');

-- CreateEnum
CREATE TYPE "IdentificationType" AS ENUM ('NID', 'PASSPORT');

-- CreateEnum
CREATE TYPE "ResidentialStatus" AS ENUM ('RESIDENT', 'NONRESIDENT', 'TEMPORARYRESIDENT');

-- CreateEnum
CREATE TYPE "Religion" AS ENUM ('ISLAM', 'HINDUISM', 'CHRISTIANITY', 'BUDDHISM', 'OTHER');

-- CreateEnum
CREATE TYPE "EduLavel" AS ENUM ('BELOW_SSC', 'SSC', 'HSC', 'GRADUATE', 'POST_GRADUATE', 'PHD', 'OTHER_EDUCATION');

-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('SUBMITTED', 'PENDING', 'IN_PROGRESS', 'APPROVED', 'REJECTED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED');

-- CreateEnum
CREATE TYPE "OwnershipStatus" AS ENUM ('OWNED', 'RENTED', 'FAMILY_OWNED', 'COMPANY_PROVIDED');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('RESIDENTIAL', 'COMMERCIAL', 'LAND', 'APARTMENT', 'HOUSE', 'OTHER');

-- CreateEnum
CREATE TYPE "EmploymentStatus" AS ENUM ('SALARIED', 'SELF_EMPLOYED', 'BUSINESS_OWNER');

-- CreateEnum
CREATE TYPE "LoanType" AS ENUM ('PERSONAL_LOAN', 'HOME_LOAN', 'CAR_LOAN', 'SME_LOAN', 'INSTANT_LOAN');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('PASSPORT_PHOTO', 'NATIONAL_ID', 'BIRTH_CERTIFICATE', 'INCOME_PROOF', 'BANK_STATEMENT', 'TIN_CERTIFICATE', 'EMPLOYMENT_PROOF', 'UTILITY_BILL', 'PROPERTY_DOCUMENT', 'SUPPORTING_DOCUMENT');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('INFO', 'SUCCESS', 'WARNING', 'ERROR', 'PROMOTION', 'SYSTEM');

-- CreateEnum
CREATE TYPE "NotificationPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "UserProfileGender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "DocumentTypeKyc" AS ENUM ('NATIONAL_ID', 'PASSPORT', 'DRIVING_LICENSE', 'VOTER_ID');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "UserBankRole" AS ENUM ('BANK_USER');

-- CreateEnum
CREATE TYPE "BankName" AS ENUM ('AGRANI_BANK_PLC', 'JANATA_BANK_PLC', 'SONALI_BANK_PLC', 'RUPALI_BANK_PLC', 'BANGLADESH_DEVELOPMENT_BANK_PLC', 'BASIC_BANK_LIMITED', 'BANGLADESH_KRISHI_BANK', 'RAJSHAHI_KRISHI_UNNAYAN_BANK', 'PROBASHI_KALLYAN_BANK', 'AB_BANK_PLC', 'BANGLADESH_COMMERCE_BANK_LIMITED', 'BANK_ASIA_PLC', 'BENGAL_COMMERCIAL_BANK_LIMITED', 'BRAC_BANK_PLC', 'CITY_BANK_PLC', 'COMMUNITY_BANK_BANGLADESH_PLC', 'CITIZENS_BANK_PLC', 'DHAKA_BANK_PLC', 'DHAKA_MERCANTILE_CO_OPERATIVE_BANK_LIMITED', 'DUTCH_BANGLA_BANK_PLC', 'EASTERN_BANK_PLC', 'IFIC_BANK_PLC', 'JAMUNA_BANK_LIMITED', 'MEGHNA_BANK_PLC', 'MERCANTILE_BANK_PLC', 'MIDLAND_BANK_LIMITED', 'MODHUMOTI_BANK_LIMITED', 'MUTUAL_TRUST_BANK_PLC', 'NATIONAL_CREDIT_AND_COMMERCE_BANK_PLC', 'NRB_BANK_LIMITED', 'NRBC_BANK_PLC', 'ONE_BANK_PLC', 'PREMIER_BANK_PLC', 'PRIME_BANK_PLC', 'PUBALI_BANK_PLC', 'SHIMANTO_BANK_LIMITED', 'SOUTHEAST_BANK_LIMITED', 'SOUTH_BANGLA_AGRICULTURE_AND_COMMERCE_BANK_LIMITED', 'TRUST_BANK_PLC', 'UNITED_COMMERCIAL_BANK_PLC', 'UTTARA_BANK_PLC', 'EXIM_BANK_PLC', 'AL_AARAFAH_ISLAMI_BANK_PLC', 'FIRST_SECURITY_ISLAMI_BANK_PLC', 'GLOBAL_ISLAMI_BANK_PLC', 'ICB_ISLAMIC_BANK_PLC', 'ISLAMI_BANK_BANGLADESH_PLC', 'SHAHJALAL_ISLAMI_BANK_PLC', 'SOCIAL_ISLAMI_BANK_PLC', 'STANDARD_BANK_PLC', 'UNION_BANK_PLC', 'BANK_AL_FALAH_LIMITED', 'CITIBANK_N_A', 'COMMERCIAL_BANK_OF_CEYLON_PLC', 'HABIB_BANK_LIMITED', 'HSBC', 'NATIONAL_BANK_OF_PAKISTAN', 'STANDARD_CHARTERED_BANK', 'STATE_BANK_OF_INDIA', 'WOORI_BANK', 'ANSAR_VDP_UNNAYAN_BANK', 'KARMASHANGOSTHAN_BANK', 'GRAMEEN_BANK', 'JUBILEE_BANK', 'PALLI_SANCHAY_BANK');

-- CreateTable
CREATE TABLE "blogs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "publishedDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "status" "PostStatus" NOT NULL DEFAULT 'DRAFT',
    "excerpt" TEXT,
    "category" "Category" NOT NULL,
    "tags" TEXT[],
    "coverImage" TEXT,
    "readingTime" INTEGER,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "language" TEXT NOT NULL DEFAULT 'en',
    "permissions" TEXT NOT NULL DEFAULT 'public',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isEdited" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carLoan" (
    "id" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "coverImage" TEXT,
    "periodMonths" TEXT NOT NULL,
    "processingFee" TEXT NOT NULL,
    "interestRate" TEXT NOT NULL,
    "monthlyEmi" TEXT NOT NULL,
    "totalAmount" TEXT NOT NULL,
    "eligibleLoan" TEXT NOT NULL,
    "loanType" TEXT NOT NULL DEFAULT 'CAR_LOAN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eligibilityId" TEXT,
    "feesChargesId" TEXT,
    "featuresId" TEXT,
    "userId" TEXT,

    CONSTRAINT "carLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturesCarLoan" (
    "id" TEXT NOT NULL,
    "loanAmount" TEXT NOT NULL,
    "minimumAmount" TEXT NOT NULL,
    "maximumAmount" TEXT NOT NULL,
    "loanTenure" TEXT NOT NULL,
    "minimumYear" TEXT NOT NULL,
    "maximumYear" TEXT NOT NULL,
    "carLoanId" TEXT NOT NULL,

    CONSTRAINT "FeaturesCarLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EligibilityCarLoan" (
    "id" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "offer" TEXT NOT NULL,
    "minimumIncome" INTEGER NOT NULL,
    "minimumExperience" INTEGER NOT NULL,
    "ageRequirement" INTEGER NOT NULL,
    "carLoanId" TEXT NOT NULL,

    CONSTRAINT "EligibilityCarLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeesChargesCarLoan" (
    "id" TEXT NOT NULL,
    "processingFee" TEXT NOT NULL,
    "earlySettlementFee" TEXT NOT NULL,
    "prepaymentFee" TEXT NOT NULL,
    "LoanReSchedulingFee" TEXT NOT NULL,
    "penalCharge" TEXT NOT NULL,
    "carLoanId" TEXT NOT NULL,

    CONSTRAINT "FeesChargesCarLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creditCards" (
    "id" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "interestPerDay" TEXT NOT NULL,
    "freeAnnualFee" TEXT NOT NULL,
    "regularAnnualFee" TEXT NOT NULL,
    "interestFreePeriod" TEXT NOT NULL,
    "latePaymentFees" TEXT NOT NULL,
    "currency" "Currency" NOT NULL,
    "cardFeaturesType" "CardFeaturesType" NOT NULL,
    "cardNetwork" "CardNetwork" NOT NULL,
    "annualFeeWaivedReward" TEXT NOT NULL,
    "freeSupplementaryCards" TEXT NOT NULL,
    "maxSupplementaryCards" TEXT NOT NULL,
    "balanceTransferAvailability" TEXT NOT NULL,
    "ownBankATMFee" TEXT NOT NULL,
    "otherBankATMFee" TEXT NOT NULL,
    "loungeFacility" TEXT NOT NULL,
    "loungeVisit" TEXT NOT NULL,
    "cardChequeProcessingFee" TEXT NOT NULL,
    "processingFeeMinimum" TEXT NOT NULL,
    "cashWithdrawalLimit" TEXT NOT NULL,
    "cardType" TEXT NOT NULL DEFAULT 'CREDIT_CARD',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "coverImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "creditCards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturesCreditCard" (
    "id" TEXT NOT NULL,
    "features1" TEXT,
    "features2" TEXT,
    "features3" TEXT,
    "features4" TEXT,
    "features5" TEXT,
    "creditCardId" TEXT,

    CONSTRAINT "FeaturesCreditCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EligibilityCreditCard" (
    "id" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "offer" TEXT NOT NULL,
    "minimumIncome" INTEGER NOT NULL,
    "minimumExperience" INTEGER NOT NULL,
    "ageRequirement" INTEGER NOT NULL,
    "creditCardId" TEXT,

    CONSTRAINT "EligibilityCreditCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeesChargesCreditCard" (
    "id" TEXT NOT NULL,
    "annualFee" TEXT NOT NULL,
    "annualFeeWaived" TEXT NOT NULL,
    "latePaymentFee" TEXT NOT NULL,
    "interestRate" TEXT NOT NULL,
    "balanceTransferRate" TEXT NOT NULL,
    "creditCardId" TEXT,

    CONSTRAINT "FeesChargesCreditCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eligibilityCheck" (
    "id" TEXT NOT NULL,
    "loanType" "MainLoanType" NOT NULL,
    "gender" "EGender" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "profession" "Profession" NOT NULL,
    "businessOwnerType" "BusinessOwnerType",
    "businessType" TEXT,
    "sharePortion" INTEGER,
    "tradeLicenseAge" INTEGER,
    "vehicleType" "VehicleType",
    "expectedLoanTenure" INTEGER,
    "monthlyIncome" INTEGER,
    "jobLocation" TEXT,
    "haveAnyRentalIncome" BOOLEAN,
    "rentalArea" TEXT,
    "rentalIncome" INTEGER,
    "haveAnyLoan" BOOLEAN DEFAULT false,
    "haveAnyCreditCard" BOOLEAN,
    "numberOfCreditCards" INTEGER,
    "numberOfLoans" INTEGER,
    "cardType" "CardType",
    "cardLimitBDT" INTEGER,
    "secondaryApplicant" BOOLEAN,
    "termsAccepted" BOOLEAN,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "isAppliedLoan" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "eligibilityCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "existingLoans" (
    "id" TEXT NOT NULL,
    "existingLoanType" "ExistingLoanType" NOT NULL,
    "emiAmountBDT" INTEGER NOT NULL,
    "interestRate" DECIMAL(5,2) NOT NULL,
    "eligibilityCheckId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "existingLoans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "homeLoan" (
    "id" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "coverImage" TEXT,
    "periodMonths" TEXT NOT NULL,
    "processingFee" TEXT NOT NULL,
    "interestRate" TEXT NOT NULL,
    "monthlyEmi" TEXT NOT NULL,
    "totalAmount" TEXT NOT NULL,
    "eligibleLoan" TEXT NOT NULL,
    "loanType" TEXT NOT NULL DEFAULT 'HOME_LOAN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "homeLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturesHomeLoan" (
    "id" TEXT NOT NULL,
    "loanAmount" TEXT NOT NULL,
    "minimumAmount" TEXT NOT NULL,
    "maximumAmount" TEXT NOT NULL,
    "loanTenure" TEXT NOT NULL,
    "minimumYear" TEXT NOT NULL,
    "maximumYear" TEXT NOT NULL,
    "homeLoanId" TEXT NOT NULL,

    CONSTRAINT "FeaturesHomeLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EligibilityHomeLoan" (
    "id" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "offer" TEXT NOT NULL,
    "minimumIncome" INTEGER NOT NULL,
    "minimumExperience" INTEGER NOT NULL,
    "ageRequirement" INTEGER NOT NULL,
    "homeLoanId" TEXT NOT NULL,

    CONSTRAINT "EligibilityHomeLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeesChargesHomeLoan" (
    "id" TEXT NOT NULL,
    "processingFee" TEXT NOT NULL,
    "earlySettlementFee" TEXT NOT NULL,
    "prepaymentFee" TEXT NOT NULL,
    "LoanReSchedulingFee" TEXT NOT NULL,
    "penalCharge" TEXT NOT NULL,
    "homeLoanId" TEXT NOT NULL,

    CONSTRAINT "FeesChargesHomeLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instantLoans" (
    "id" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "amount" TEXT,
    "coverImage" TEXT,
    "periodMonths" TEXT,
    "processingFee" TEXT NOT NULL,
    "interestRate" TEXT NOT NULL,
    "monthlyEmi" TEXT,
    "totalAmount" TEXT,
    "eligibleLoan" TEXT,
    "loanType" TEXT NOT NULL DEFAULT 'INSTANT_LOAN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "instantLoans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturesInstantLoan" (
    "id" TEXT NOT NULL,
    "loanAmount" TEXT NOT NULL,
    "minimumAmount" TEXT NOT NULL,
    "maximumAmount" TEXT NOT NULL,
    "loanTenure" TEXT NOT NULL,
    "minimumYear" TEXT NOT NULL,
    "maximumYear" TEXT NOT NULL,
    "InstantLoanId" TEXT NOT NULL,

    CONSTRAINT "FeaturesInstantLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EligibilityInstantLoan" (
    "id" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "offer" TEXT NOT NULL,
    "minimumIncome" INTEGER NOT NULL,
    "minimumExperience" DECIMAL(65,30) NOT NULL,
    "ageRequirement" INTEGER NOT NULL,
    "InstantLoanId" TEXT NOT NULL,

    CONSTRAINT "EligibilityInstantLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeesChargesInstantLoan" (
    "id" TEXT NOT NULL,
    "processingFee" TEXT NOT NULL,
    "earlySettlementFee" TEXT NOT NULL,
    "prepaymentFee" TEXT NOT NULL,
    "LoanReSchedulingFee" TEXT NOT NULL,
    "penalCharge" TEXT NOT NULL,
    "InstantLoanId" TEXT NOT NULL,

    CONSTRAINT "FeesChargesInstantLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loanApplicationForm" (
    "id" TEXT NOT NULL,
    "status" "LoanStatus" NOT NULL DEFAULT 'SUBMITTED',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "adminNotes" TEXT,
    "applicationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "loanApplicationForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalInfo" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "spouseName" TEXT,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "placeOfBirth" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "maritalStatus" "MaritalStatus" NOT NULL,
    "educationalLevel" "EduLavel" NOT NULL,
    "NIDNumber" TEXT NOT NULL,
    "passportNumber" TEXT,
    "religion" "Religion" NOT NULL,
    "residentialStatus" "ResidentialStatus" NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "alternateMobileNumber" TEXT,
    "emailAddress" TEXT NOT NULL,
    "socialMediaProfiles" TEXT[],
    "loanApplicationFormId" TEXT NOT NULL,

    CONSTRAINT "PersonalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResidentialInformation" (
    "id" TEXT NOT NULL,
    "presentAddress" TEXT NOT NULL,
    "presentDistrict" TEXT NOT NULL,
    "presentDivision" TEXT NOT NULL,
    "presentLengthOfStay" TEXT NOT NULL,
    "presentOwnershipStatus" "OwnershipStatus" NOT NULL,
    "presentPostalCode" TEXT NOT NULL,
    "presentThana" TEXT NOT NULL,
    "isPermanentSameAsPresent" BOOLEAN NOT NULL DEFAULT false,
    "permanentAddress" TEXT,
    "permanentDistrict" TEXT,
    "permanentDivision" TEXT,
    "permanentLengthOfStay" TEXT,
    "permanentOwnershipStatus" "OwnershipStatus",
    "permanentThana" TEXT,
    "permanentPostalCode" TEXT,
    "loanApplicationFormId" TEXT NOT NULL,

    CONSTRAINT "ResidentialInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmploymentInformation" (
    "id" TEXT NOT NULL,
    "employmentStatus" "EmploymentStatus",
    "designation" TEXT,
    "department" TEXT,
    "employeeId" TEXT,
    "dateOfJoining" TIMESTAMP(3),
    "organizationName" TEXT,
    "organizationAddress" TEXT,
    "serviceYears" TEXT,
    "serviceMonths" TEXT,
    "eTin" TEXT,
    "officialContact" TEXT,
    "hasPreviousOrganization" BOOLEAN,
    "previousOrganizationName" TEXT,
    "previousDesignation" TEXT,
    "previousServiceYears" TEXT,
    "previousServiceMonths" TEXT,
    "totalExperienceYears" TEXT,
    "totalExperienceMonths" TEXT,
    "employmentType" "EmploymentType",
    "businessName" TEXT,
    "businessAddress" TEXT,
    "businessOwnerType" "BOwnerType",
    "businessType" "BusinessType",
    "sharePortion" TEXT,
    "businessRegistrationNumber" TEXT,
    "tradeLicenseAge" TEXT,
    "professionalTitle" TEXT,
    "institutionName" TEXT,
    "workplaceAddress" TEXT,
    "yearsOfExperience" TEXT,
    "startedPracticeSince" TEXT,
    "tin" TEXT,
    "websitePortfolioLink" TEXT,
    "professionalRegistrationNumber" TEXT,
    "grossMonthlyIncome" TEXT,
    "rentIncome" TEXT,
    "otherIncome" TEXT,
    "sourceOfOtherIncome" TEXT,
    "totalIncome" TEXT,
    "professionType" "SelfEmploymentType",
    "otherProfession" TEXT,
    "loanApplicationFormId" TEXT NOT NULL,

    CONSTRAINT "EmploymentInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Properties" (
    "id" TEXT NOT NULL,
    "propertyType" "PropertyType",
    "propertyValue" TEXT,
    "employmentInformationId" TEXT,

    CONSTRAINT "Properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanInfo" (
    "id" TEXT NOT NULL,
    "hasCreditCard" BOOLEAN NOT NULL,
    "hasExistingLoan" BOOLEAN NOT NULL,
    "loanApplicationFormId" TEXT NOT NULL,

    CONSTRAINT "LoanInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCardUser" (
    "id" TEXT NOT NULL,
    "issuerName" TEXT NOT NULL,
    "cardLimit" TEXT NOT NULL,
    "toBeClosedBeforeDisbursement" BOOLEAN NOT NULL,
    "loanInfoId" TEXT NOT NULL,

    CONSTRAINT "CreditCardUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExistingLoanUser" (
    "id" TEXT NOT NULL,
    "loanType" "LoanType" NOT NULL,
    "adjustmentPlan" TEXT NOT NULL,
    "disbursedAmount" TEXT NOT NULL,
    "otherLoanType" TEXT,
    "lenderName" TEXT NOT NULL,
    "outstanding" TEXT NOT NULL,
    "emi" TEXT NOT NULL,
    "loanInfoId" TEXT NOT NULL,

    CONSTRAINT "ExistingLoanUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankAccount" (
    "id" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "loanInfoId" TEXT NOT NULL,

    CONSTRAINT "BankAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanRequest" (
    "id" TEXT NOT NULL,
    "loanAmount" DECIMAL(10,2) NOT NULL,
    "loanTenure" INTEGER NOT NULL,
    "loanPurpose" TEXT NOT NULL,
    "emiStartDate" INTEGER NOT NULL,
    "loanApplicationFormId" TEXT NOT NULL,

    CONSTRAINT "LoanRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuarantorInfo" (
    "id" TEXT NOT NULL,
    "businessGurantorEmail" TEXT NOT NULL,
    "businessGurantorPhone" TEXT NOT NULL,
    "personalGurantorEmail" TEXT NOT NULL,
    "personalGurantorphone" TEXT NOT NULL,
    "isEmailSend" BOOLEAN NOT NULL DEFAULT false,
    "loanApplicationFormId" TEXT NOT NULL,

    CONSTRAINT "GuarantorInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessGuarantor" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "fatherOrHusbandName" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "emailAddress" TEXT,
    "mobileNumber" TEXT NOT NULL,
    "nationalIdNumber" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "permanentAddress" TEXT NOT NULL,
    "presentAddress" TEXT NOT NULL,
    "relationWithApplicant" TEXT NOT NULL,
    "workAddress" TEXT NOT NULL,
    "loanApplicationFormId" TEXT NOT NULL,

    CONSTRAINT "BusinessGuarantor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalGuarantor" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "fatherOrHusbandName" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "emailAddress" TEXT,
    "mobileNumber" TEXT NOT NULL,
    "nationalIdNumber" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "permanentAddress" TEXT NOT NULL,
    "presentAddress" TEXT NOT NULL,
    "relationWithApplicant" TEXT NOT NULL,
    "workAddress" TEXT NOT NULL,
    "loanApplicationFormId" TEXT NOT NULL,

    CONSTRAINT "PersonalGuarantor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuarantorInfoDocument" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "personalGuarantorId" TEXT,
    "businessGuarantorId" TEXT,

    CONSTRAINT "GuarantorInfoDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "loanApplicationFormId" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdditionalDocument" (
    "id" TEXT NOT NULL,
    "fieldName" TEXT,
    "url" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "loanApplicationFormId" TEXT NOT NULL,

    CONSTRAINT "AdditionalDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EligibleLoanOffer" (
    "id" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "bankImage" TEXT,
    "loanType" "LoanType" NOT NULL,
    "amount" TEXT NOT NULL,
    "eligibleLoan" TEXT NOT NULL,
    "interestRate" TEXT NOT NULL,
    "periodMonths" INTEGER NOT NULL,
    "processingFee" TEXT NOT NULL,
    "loanApplicationFormId" TEXT NOT NULL,

    CONSTRAINT "EligibleLoanOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsLetter" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "newsLetter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL DEFAULT 'INFO',
    "actionUrl" TEXT,
    "icon" TEXT,
    "priority" "NotificationPriority" NOT NULL DEFAULT 'NORMAL',
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "scheduledAt" TIMESTAMP(3),
    "sentAt" TIMESTAMP(3),
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personalLoans" (
    "id" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "amount" TEXT,
    "coverImage" TEXT,
    "periodMonths" TEXT,
    "processingFee" TEXT NOT NULL,
    "interestRate" TEXT NOT NULL,
    "monthlyEmi" TEXT,
    "totalAmount" TEXT,
    "eligibleLoan" TEXT,
    "loanType" TEXT NOT NULL DEFAULT 'PERSONAL_LOAN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "personalLoans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Features" (
    "id" TEXT NOT NULL,
    "loanAmount" TEXT NOT NULL,
    "minimumAmount" TEXT NOT NULL,
    "maximumAmount" TEXT NOT NULL,
    "loanTenure" TEXT NOT NULL,
    "minimumYear" TEXT NOT NULL,
    "maximumYear" TEXT NOT NULL,
    "personalLoanId" TEXT NOT NULL,

    CONSTRAINT "Features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Eligibility" (
    "id" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "offer" TEXT NOT NULL,
    "minimumIncome" INTEGER NOT NULL,
    "minimumExperience" INTEGER NOT NULL,
    "ageRequirement" INTEGER NOT NULL,
    "personalLoanId" TEXT NOT NULL,

    CONSTRAINT "Eligibility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeesCharges" (
    "id" TEXT NOT NULL,
    "processingFee" TEXT NOT NULL,
    "earlySettlementFee" TEXT NOT NULL,
    "prepaymentFee" TEXT NOT NULL,
    "LoanReSchedulingFee" TEXT NOT NULL,
    "penalCharge" TEXT NOT NULL,
    "personalLoanId" TEXT NOT NULL,

    CONSTRAINT "FeesCharges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompthHistory" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userPrompth" TEXT NOT NULL,
    "aiResponce" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prompthHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "smeLoan" (
    "id" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "coverImage" TEXT,
    "periodMonths" TEXT NOT NULL,
    "processingFee" TEXT NOT NULL,
    "interestRate" TEXT NOT NULL,
    "monthlyEmi" TEXT NOT NULL,
    "totalAmount" TEXT NOT NULL,
    "eligibleLoan" TEXT NOT NULL,
    "loanType" TEXT NOT NULL DEFAULT 'SME_LOAN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eligibilityId" TEXT,
    "feesChargesId" TEXT,
    "featuresId" TEXT,
    "userId" TEXT,

    CONSTRAINT "smeLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturesSMELoan" (
    "id" TEXT NOT NULL,
    "loanAmount" TEXT NOT NULL,
    "minimumAmount" TEXT NOT NULL,
    "maximumAmount" TEXT NOT NULL,
    "loanTenure" TEXT NOT NULL,
    "minimumYear" TEXT NOT NULL,
    "maximumYear" TEXT NOT NULL,
    "smeLoanId" TEXT NOT NULL,

    CONSTRAINT "FeaturesSMELoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EligibilitySMELoan" (
    "id" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "offer" TEXT NOT NULL,
    "minimumIncome" INTEGER NOT NULL,
    "minimumExperience" INTEGER NOT NULL,
    "ageRequirement" INTEGER NOT NULL,
    "smeLoanId" TEXT NOT NULL,

    CONSTRAINT "EligibilitySMELoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeesChargesSMELoan" (
    "id" TEXT NOT NULL,
    "processingFee" TEXT NOT NULL,
    "earlySettlementFee" TEXT NOT NULL,
    "prepaymentFee" TEXT NOT NULL,
    "LoanReSchedulingFee" TEXT NOT NULL,
    "penalCharge" TEXT NOT NULL,
    "smeLoanId" TEXT NOT NULL,

    CONSTRAINT "FeesChargesSMELoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "pin" TEXT,
    "pinExpiry" TIMESTAMP(3),
    "verificationToken" TEXT,
    "resetPasswordToken" TEXT,
    "resetPasswordExpiry" TIMESTAMP(3),
    "role" "Role" NOT NULL DEFAULT 'USER',
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLogin" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "nameAsNid" TEXT NOT NULL,
    "nationalIdNumber" TEXT NOT NULL,
    "gender" "UserProfileGender" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "avatar" TEXT,
    "address" TEXT,
    "city" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KycVerification" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "fatherName" TEXT,
    "motherName" TEXT,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" "UserProfileGender" NOT NULL,
    "nationality" TEXT NOT NULL,
    "occupation" TEXT,
    "documentType" "DocumentTypeKyc" NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "documentFrontUrl" TEXT NOT NULL,
    "documentBackUrl" TEXT,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "addressProofUrl" TEXT NOT NULL,
    "selfieUrl" TEXT NOT NULL,
    "verificationStatus" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "remarks" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KycVerification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" TEXT,
    "device" TEXT,
    "browser" TEXT,
    "location" TEXT,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageView" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "duration" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "referrer" TEXT,
    "os" TEXT,

    CONSTRAINT "PageView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userBanks" (
    "id" TEXT NOT NULL,
    "bankName" "BankName" NOT NULL,
    "loginId" TEXT NOT NULL DEFAULT '123456789',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "bankCode" TEXT NOT NULL,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "failedLoginAttempts" INTEGER NOT NULL DEFAULT 0,
    "blockedAt" TIMESTAMP(3),
    "role" "UserBankRole" NOT NULL DEFAULT 'BANK_USER',
    "isMEOSingnedIn" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userBanks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeaturesCarLoan_carLoanId_key" ON "FeaturesCarLoan"("carLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "EligibilityCarLoan_carLoanId_key" ON "EligibilityCarLoan"("carLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "FeesChargesCarLoan_carLoanId_key" ON "FeesChargesCarLoan"("carLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "FeaturesCreditCard_creditCardId_key" ON "FeaturesCreditCard"("creditCardId");

-- CreateIndex
CREATE UNIQUE INDEX "EligibilityCreditCard_creditCardId_key" ON "EligibilityCreditCard"("creditCardId");

-- CreateIndex
CREATE UNIQUE INDEX "FeesChargesCreditCard_creditCardId_key" ON "FeesChargesCreditCard"("creditCardId");

-- CreateIndex
CREATE INDEX "eligibilityCheck_loanType_name_email_phone_isAppliedLoan_idx" ON "eligibilityCheck"("loanType", "name", "email", "phone", "isAppliedLoan");

-- CreateIndex
CREATE INDEX "existingLoans_eligibilityCheckId_idx" ON "existingLoans"("eligibilityCheckId");

-- CreateIndex
CREATE UNIQUE INDEX "FeaturesHomeLoan_homeLoanId_key" ON "FeaturesHomeLoan"("homeLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "EligibilityHomeLoan_homeLoanId_key" ON "EligibilityHomeLoan"("homeLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "FeesChargesHomeLoan_homeLoanId_key" ON "FeesChargesHomeLoan"("homeLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "FeaturesInstantLoan_InstantLoanId_key" ON "FeaturesInstantLoan"("InstantLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "EligibilityInstantLoan_InstantLoanId_key" ON "EligibilityInstantLoan"("InstantLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "FeesChargesInstantLoan_InstantLoanId_key" ON "FeesChargesInstantLoan"("InstantLoanId");

-- CreateIndex
CREATE INDEX "loanApplicationForm_applicationId_status_isActive_isDeleted_idx" ON "loanApplicationForm"("applicationId", "status", "isActive", "isDeleted");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalInfo_loanApplicationFormId_key" ON "PersonalInfo"("loanApplicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "ResidentialInformation_loanApplicationFormId_key" ON "ResidentialInformation"("loanApplicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "EmploymentInformation_loanApplicationFormId_key" ON "EmploymentInformation"("loanApplicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "LoanInfo_loanApplicationFormId_key" ON "LoanInfo"("loanApplicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "LoanRequest_loanApplicationFormId_key" ON "LoanRequest"("loanApplicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "GuarantorInfo_loanApplicationFormId_key" ON "GuarantorInfo"("loanApplicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessGuarantor_loanApplicationFormId_key" ON "BusinessGuarantor"("loanApplicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalGuarantor_loanApplicationFormId_key" ON "PersonalGuarantor"("loanApplicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "EligibleLoanOffer_loanApplicationFormId_key" ON "EligibleLoanOffer"("loanApplicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "newsLetter_email_key" ON "newsLetter"("email");

-- CreateIndex
CREATE INDEX "notifications_userId_idx" ON "notifications"("userId");

-- CreateIndex
CREATE INDEX "notifications_isRead_idx" ON "notifications"("isRead");

-- CreateIndex
CREATE INDEX "notifications_expiresAt_idx" ON "notifications"("expiresAt");

-- CreateIndex
CREATE INDEX "notifications_scheduledAt_idx" ON "notifications"("scheduledAt");

-- CreateIndex
CREATE UNIQUE INDEX "Features_personalLoanId_key" ON "Features"("personalLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "Eligibility_personalLoanId_key" ON "Eligibility"("personalLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "FeesCharges_personalLoanId_key" ON "FeesCharges"("personalLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "FeaturesSMELoan_smeLoanId_key" ON "FeaturesSMELoan"("smeLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "EligibilitySMELoan_smeLoanId_key" ON "EligibilitySMELoan"("smeLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "FeesChargesSMELoan_smeLoanId_key" ON "FeesChargesSMELoan"("smeLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_phone_idx" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_isActive_idx" ON "users"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "KycVerification_userId_key" ON "KycVerification"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "userBanks_bankName_key" ON "userBanks"("bankName");

-- CreateIndex
CREATE UNIQUE INDEX "userBanks_loginId_key" ON "userBanks"("loginId");

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carLoan" ADD CONSTRAINT "carLoan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturesCarLoan" ADD CONSTRAINT "FeaturesCarLoan_carLoanId_fkey" FOREIGN KEY ("carLoanId") REFERENCES "carLoan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EligibilityCarLoan" ADD CONSTRAINT "EligibilityCarLoan_carLoanId_fkey" FOREIGN KEY ("carLoanId") REFERENCES "carLoan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeesChargesCarLoan" ADD CONSTRAINT "FeesChargesCarLoan_carLoanId_fkey" FOREIGN KEY ("carLoanId") REFERENCES "carLoan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creditCards" ADD CONSTRAINT "creditCards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturesCreditCard" ADD CONSTRAINT "FeaturesCreditCard_creditCardId_fkey" FOREIGN KEY ("creditCardId") REFERENCES "creditCards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EligibilityCreditCard" ADD CONSTRAINT "EligibilityCreditCard_creditCardId_fkey" FOREIGN KEY ("creditCardId") REFERENCES "creditCards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeesChargesCreditCard" ADD CONSTRAINT "FeesChargesCreditCard_creditCardId_fkey" FOREIGN KEY ("creditCardId") REFERENCES "creditCards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "existingLoans" ADD CONSTRAINT "existingLoans_eligibilityCheckId_fkey" FOREIGN KEY ("eligibilityCheckId") REFERENCES "eligibilityCheck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "homeLoan" ADD CONSTRAINT "homeLoan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturesHomeLoan" ADD CONSTRAINT "FeaturesHomeLoan_homeLoanId_fkey" FOREIGN KEY ("homeLoanId") REFERENCES "homeLoan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EligibilityHomeLoan" ADD CONSTRAINT "EligibilityHomeLoan_homeLoanId_fkey" FOREIGN KEY ("homeLoanId") REFERENCES "homeLoan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeesChargesHomeLoan" ADD CONSTRAINT "FeesChargesHomeLoan_homeLoanId_fkey" FOREIGN KEY ("homeLoanId") REFERENCES "homeLoan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instantLoans" ADD CONSTRAINT "instantLoans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturesInstantLoan" ADD CONSTRAINT "FeaturesInstantLoan_InstantLoanId_fkey" FOREIGN KEY ("InstantLoanId") REFERENCES "instantLoans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EligibilityInstantLoan" ADD CONSTRAINT "EligibilityInstantLoan_InstantLoanId_fkey" FOREIGN KEY ("InstantLoanId") REFERENCES "instantLoans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeesChargesInstantLoan" ADD CONSTRAINT "FeesChargesInstantLoan_InstantLoanId_fkey" FOREIGN KEY ("InstantLoanId") REFERENCES "instantLoans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loanApplicationForm" ADD CONSTRAINT "loanApplicationForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalInfo" ADD CONSTRAINT "PersonalInfo_loanApplicationFormId_fkey" FOREIGN KEY ("loanApplicationFormId") REFERENCES "loanApplicationForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResidentialInformation" ADD CONSTRAINT "ResidentialInformation_loanApplicationFormId_fkey" FOREIGN KEY ("loanApplicationFormId") REFERENCES "loanApplicationForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmploymentInformation" ADD CONSTRAINT "EmploymentInformation_loanApplicationFormId_fkey" FOREIGN KEY ("loanApplicationFormId") REFERENCES "loanApplicationForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "Properties_employmentInformationId_fkey" FOREIGN KEY ("employmentInformationId") REFERENCES "EmploymentInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanInfo" ADD CONSTRAINT "LoanInfo_loanApplicationFormId_fkey" FOREIGN KEY ("loanApplicationFormId") REFERENCES "loanApplicationForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditCardUser" ADD CONSTRAINT "CreditCardUser_loanInfoId_fkey" FOREIGN KEY ("loanInfoId") REFERENCES "LoanInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExistingLoanUser" ADD CONSTRAINT "ExistingLoanUser_loanInfoId_fkey" FOREIGN KEY ("loanInfoId") REFERENCES "LoanInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_loanInfoId_fkey" FOREIGN KEY ("loanInfoId") REFERENCES "LoanInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanRequest" ADD CONSTRAINT "LoanRequest_loanApplicationFormId_fkey" FOREIGN KEY ("loanApplicationFormId") REFERENCES "loanApplicationForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuarantorInfo" ADD CONSTRAINT "GuarantorInfo_loanApplicationFormId_fkey" FOREIGN KEY ("loanApplicationFormId") REFERENCES "loanApplicationForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessGuarantor" ADD CONSTRAINT "BusinessGuarantor_loanApplicationFormId_fkey" FOREIGN KEY ("loanApplicationFormId") REFERENCES "loanApplicationForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalGuarantor" ADD CONSTRAINT "PersonalGuarantor_loanApplicationFormId_fkey" FOREIGN KEY ("loanApplicationFormId") REFERENCES "loanApplicationForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuarantorInfoDocument" ADD CONSTRAINT "GuarantorInfoDocument_personalGuarantorId_fkey" FOREIGN KEY ("personalGuarantorId") REFERENCES "PersonalGuarantor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuarantorInfoDocument" ADD CONSTRAINT "GuarantorInfoDocument_businessGuarantorId_fkey" FOREIGN KEY ("businessGuarantorId") REFERENCES "BusinessGuarantor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_loanApplicationFormId_fkey" FOREIGN KEY ("loanApplicationFormId") REFERENCES "loanApplicationForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdditionalDocument" ADD CONSTRAINT "AdditionalDocument_loanApplicationFormId_fkey" FOREIGN KEY ("loanApplicationFormId") REFERENCES "loanApplicationForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EligibleLoanOffer" ADD CONSTRAINT "EligibleLoanOffer_loanApplicationFormId_fkey" FOREIGN KEY ("loanApplicationFormId") REFERENCES "loanApplicationForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personalLoans" ADD CONSTRAINT "personalLoans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Features" ADD CONSTRAINT "Features_personalLoanId_fkey" FOREIGN KEY ("personalLoanId") REFERENCES "personalLoans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eligibility" ADD CONSTRAINT "Eligibility_personalLoanId_fkey" FOREIGN KEY ("personalLoanId") REFERENCES "personalLoans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeesCharges" ADD CONSTRAINT "FeesCharges_personalLoanId_fkey" FOREIGN KEY ("personalLoanId") REFERENCES "personalLoans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "smeLoan" ADD CONSTRAINT "smeLoan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturesSMELoan" ADD CONSTRAINT "FeaturesSMELoan_smeLoanId_fkey" FOREIGN KEY ("smeLoanId") REFERENCES "smeLoan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EligibilitySMELoan" ADD CONSTRAINT "EligibilitySMELoan_smeLoanId_fkey" FOREIGN KEY ("smeLoanId") REFERENCES "smeLoan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeesChargesSMELoan" ADD CONSTRAINT "FeesChargesSMELoan_smeLoanId_fkey" FOREIGN KEY ("smeLoanId") REFERENCES "smeLoan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KycVerification" ADD CONSTRAINT "KycVerification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageView" ADD CONSTRAINT "PageView_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
