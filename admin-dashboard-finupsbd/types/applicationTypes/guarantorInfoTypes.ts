export type GuarantorDocument = {
  businessGuarantorId: string | null;
  id: string;
  mimeType: string;
  originalName: string;
  personalGuarantorId: string | null;
  url: string;
}

export type TGuarantorInfo = {
  id: string
  fullName: string
  fatherOrHusbandName: string
  motherName: string
  relationWithApplicant: string
  dateOfBirth: string // ISO date string
  emailAddress: string
  mobileNumber: string
  nationalIdNumber: string
  nationality: string
  presentAddress: string
  permanentAddress: string
  workAddress: string
  loanApplicationFormId: string
  document: GuarantorDocument[]
}
