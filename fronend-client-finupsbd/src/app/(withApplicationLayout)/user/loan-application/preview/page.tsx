"use client";

import { submitApplication } from "@/actions/loan-application-form-actions";
import SuccessModal from "@/components/loan-application/success-modal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  useFormContext,
  type FormData as AppFormData,
} from "@/context/loan-application-form-context"; // Updated import path
import { useLoanRequestData } from "@/hooks/useLoanRequestData";
import {
  AlertCircle,
  FileText,
  ImageIcon,
  Loader2,
  PenSquare,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import type { PropertyDetailValues } from "../schemas/employment-info-schema";
import type { GuarantorSectionValues } from "../schemas/guarantor-info-schema";

export default function PreviewPage() {
  const router = useRouter();
  const {
    formData,
    setIsFormSubmitted,
    setSubmittedData,
    setAllStepsToNonDraft,
    resetForm,
  } = useFormContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { loanRequest } = useLoanRequestData();
  const [modalOpen, setModalOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");

  const isFormComplete =
    formData.personalInfo &&
    formData.residentialInfo &&
    formData.employmentInfo &&
    formData.loanInfo &&
    formData.loanRequest &&
    formData.documentInfo &&
    formData.guarantorInfo;



//// handel submit button

  const handleSubmit = async () => {
    if (!isFormComplete) {
      toast.error("Please complete all required steps before submitting.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      setAllStepsToNonDraft();

      if (!loanRequest) {
        toast.error(
          "Loan request data is missing. Please complete the loan request step.",
        );
        setIsSubmitting(false);
        return;
      }
      const result = await submitApplication(
        formData as AppFormData,
        loanRequest,
      );
      if (result.success) {
        toast.success(result.message || "Application create successfully");
        setModalOpen(true);
        setTrackingNumber(result?.data?.applicationId);
        // setIsFormSubmitted(true);
        // setSubmittedData(formData as AppFormData);
        // localStorage.removeItem("loanApplicationForm");
        // localStorage.removeItem("loanApplicationDocuments");
        // localStorage.removeItem("loanRequest");
      } else {
        console.error("Error submitting application:", result);
        toast.error(result.message || "Faild to create data");
      }
    } catch (err) {
      console.error("Error submitting application:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };





  const navigateToStep = (step: string) => {
    router.push(`/user/loan-application/${step}`);
  };




  const renderPersonalInfo = () => {
    const info = formData.personalInfo;
    if (!info)
      return (
        <p className="text-sm text-muted-foreground">
          Personal information not completed.
        </p>
      );
    return (
      <div className="space-y-2">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium">Full Name</p>
            <p className="text-sm">{info.fullName}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Father's Name</p>
            <p className="text-sm">{info.fatherName}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Mother's Name</p>
            <p className="text-sm">{info.motherName}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Gender</p>
            <p className="text-sm capitalize">{info.gender}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Date of Birth</p>
            <p className="text-sm">
              {typeof info.dateOfBirth === "string"
                ? info.dateOfBirth
                : info.dateOfBirth
                  ? info.dateOfBirth.toLocaleDateString()
                  : ""}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Place of Birth</p>
            <p className="text-sm">{info.placeOfBirth}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Nationality</p>
            <p className="text-sm">{info.nationality}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Educational Level</p>
            <p className="text-sm capitalize">{info.educationalLevel}</p>
          </div>
          <div>
            <p className="text-sm font-medium">NID Number</p>
            <p className="text-sm">{info.NIDNumber}</p>
          </div>
          {info.passportNumber && (
            <div>
              <p className="text-sm font-medium">Passport Number</p>
              <p className="text-sm">{info.passportNumber}</p>
            </div>
          )}
          <div>
            <p className="text-sm font-medium">Marital Status</p>
            <p className="text-sm capitalize">{info.maritalStatus}</p>
          </div>
          {info.maritalStatus === "MARRIED" && info.spouseName && (
            <div>
              <p className="text-sm font-medium">Spouse's Name</p>
              <p className="text-sm">{info.spouseName}</p>
            </div>
          )}
          <div>
            <p className="text-sm font-medium">Residential Status</p>
            <p className="text-sm capitalize">{info.residentialStatus}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Religion</p>
            <p className="text-sm capitalize">{info.religion}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Mobile Number</p>
            <p className="text-sm">{info.mobileNumber}</p>
          </div>
          {info.alternateMobileNumber && (
            <div>
              <p className="text-sm font-medium">Alternate Mobile Number</p>
              <p className="text-sm">{info.alternateMobileNumber}</p>
            </div>
          )}
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-sm">{info.emailAddress}</p>
          </div>
          {info.socialMediaProfiles && info.socialMediaProfiles.length > 0 && (
            <div className="md:col-span-2">
              <p className="text-sm font-medium">Social Media</p>
              <div className="space-y-1">
                {info.socialMediaProfiles.map((link, index) => (
                  <p key={index} className="break-all text-sm">
                    {link || "N/A"}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderResidentialInfo = () => {
    const info = formData.residentialInfo;
    if (!info)
      return (
        <p className="text-sm text-muted-foreground">
          Residential information not completed.
        </p>
      );
    return (
      <div className="space-y-4">
        <div>
          <h4 className="text-md mb-1 font-medium">Present Address</h4>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div className="md:col-span-2">
              <p className="text-sm font-medium">Address</p>
              <p className="text-sm">{info.presentAddress}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Division</p>
              <p className="text-sm capitalize">{info.presentDivision}</p>
            </div>
            <div>
              <p className="text-sm font-medium">District</p>
              <p className="text-sm capitalize">{info.presentDistrict}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Thana</p>
              <p className="text-sm capitalize">{info.presentThana}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Postal Code</p>
              <p className="text-sm">{info.presentPostalCode}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Length of Stay</p>
              <p className="text-sm">{info.presentLengthOfStay}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Ownership Status</p>
              <p className="text-sm capitalize">
                {info.presentOwnershipStatus}
              </p>
            </div>
          </div>
        </div>
        <Separator />
        <div>
          <h4 className="text-md mb-1 font-medium">Permanent Address</h4>
          {info.isPermanentSameAsPresent ? (
            <p className="text-sm">Same as present address</p>
          ) : (
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <div className="md:col-span-2">
                <p className="text-sm font-medium">Address</p>
                <p className="text-sm">{info.permanentAddress}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Division</p>
                <p className="text-sm capitalize">{info.permanentDivision}</p>
              </div>
              <div>
                <p className="text-sm font-medium">District</p>
                <p className="text-sm capitalize">{info.permanentDistrict}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Thana</p>
                <p className="text-sm capitalize">{info.permanentThana}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Postal Code</p>
                <p className="text-sm">{info.permanentPostalCode}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Length of Stay</p>
                <p className="text-sm">{info.permanentLengthOfStay}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Ownership Status</p>
                <p className="text-sm capitalize">
                  {info.permanentOwnershipStatus}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderEmploymentInfo = () => {
    const info = formData.employmentInfo;
    if (!info)
      return (
        <p className="text-sm text-muted-foreground">
          Employment & Financial information not completed.
        </p>
      );
    return (
      <div className="space-y-4">
        <div>
          <h4 className="text-md mb-1 font-medium">Employment Details</h4>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium">Employment Status</p>
              <p className="text-sm capitalize">
                {info.employmentStatus?.replace(/_/g, " ").toLowerCase()}
              </p>
            </div>
            {info.employmentStatus === "SALARIED" && (
              <>
                <div>
                  <p className="text-sm font-medium">Employment Type</p>
                  <p className="text-sm capitalize">
                    {info.employmentType?.replace(/_/g, " ").toLowerCase()}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium">Designation</p>
                  <p className="text-sm">{info.designation}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Department</p>
                  <p className="text-sm">{info.department}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Employee ID</p>
                  <p className="text-sm">{info.employeeId}</p>
                </div>

                <div>
                  <p className="text-sm font-medium">Date of Joining</p>
                  <p className="text-sm">
                    {typeof info.dateOfJoining === "string"
                      ? info.dateOfJoining
                      : info.dateOfJoining
                        ? info.dateOfJoining.toLocaleDateString()
                        : ""}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Organization Name</p>
                  <p className="text-sm">{info.organizationName}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium">Organization Address</p>
                  <p className="text-sm">{info.organizationAddress}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Length of Service</p>
                  <p className="text-sm">
                    {info.serviceYears} years, {info.serviceMonths} months
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">E-TIN</p>
                  <p className="text-sm">{info.eTin}</p>
                </div>
                {info.officialContact && (
                  <div>
                    <p className="text-sm font-medium">Official Contact</p>
                    <p className="text-sm">{info.officialContact}</p>
                  </div>
                )}
                {info.hasPreviousOrganization && (
                  <>
                    <div className="mt-2 md:col-span-2">
                      <h5 className="text-sm font-medium">
                        Previous Organization
                      </h5>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Organization Name</p>
                      <p className="text-sm">{info.previousOrganizationName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Designation</p>
                      <p className="text-sm">{info.previousDesignation}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Length of Service</p>
                      <p className="text-sm">
                        {info.previousServiceYears} years,{" "}
                        {info.previousServiceMonths} months
                      </p>
                    </div>
                  </>
                )}
                <div className="mt-2 md:col-span-2">
                  <h5 className="text-sm font-medium">Total Experience</h5>
                  <p className="text-sm">
                    {info.totalExperienceYears} years,{" "}
                    {info.totalExperienceMonths} months
                  </p>
                </div>
              </>
            )}
            {info.employmentStatus === "BUSINESS_OWNER" && (
              <>
                <div>
                  <p className="text-sm font-medium">Business Name</p>
                  <p className="text-sm">{info.businessName}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium">Business Address</p>
                  <p className="text-sm">{info.businessAddress}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Business Owner Type</p>
                  <p className="text-sm capitalize">
                    {info.businessOwnerType?.replace(/_/g, " ").toLowerCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Business Type</p>
                  <p className="text-sm capitalize">
                    {info.businessType?.replace(/_/g, " ").toLowerCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Share Portion</p>
                  <p className="text-sm">{info.sharePortion}%</p>
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Business Registration Number
                  </p>
                  <p className="text-sm">{info.businessRegistrationNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Trade License Age</p>
                  <p className="text-sm">
                    {info.tradeLicenseAge}{" "}
                    {Number.parseInt(info.tradeLicenseAge || "0") === 1
                      ? "year"
                      : "years"}
                  </p>
                </div>
              </>
            )}
            {info.employmentStatus === "SELF_EMPLOYED" && (
              <>
                <div>
                  <p className="text-sm font-medium">Profession Type</p>
                  <p className="text-sm capitalize">
                    {info.professionType === "OTHER"
                      ? info.otherProfession
                      : info.professionType?.replace(/_/g, " ").toLowerCase()}
                  </p>
                </div>
                {info.professionalTitle && (
                  <div>
                    <p className="text-sm font-medium">
                      Professional Title/Designation
                    </p>
                    <p className="text-sm">{info.professionalTitle}</p>
                  </div>
                )}
                {info.institutionName && (
                  <div>
                    <p className="text-sm font-medium">
                      Institution/Organization Name
                    </p>
                    <p className="text-sm">{info.institutionName}</p>
                  </div>
                )}
                {info.workplaceAddress && (
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium">Workplace Address</p>
                    <p className="text-sm">{info.workplaceAddress}</p>
                  </div>
                )}
                {info.yearsOfExperience && (
                  <div>
                    <p className="text-sm font-medium">Years of Experience</p>
                    <p className="text-sm">{info.yearsOfExperience} years</p>
                  </div>
                )}
                {info.startedPracticeSince && (
                  <div>
                    <p className="text-sm font-medium">
                      Started Practice Since
                    </p>
                    <p className="text-sm">
                      {typeof info.startedPracticeSince === "string"
                        ? info.startedPracticeSince
                        : info.startedPracticeSince
                          ? info.startedPracticeSince.toLocaleDateString()
                          : ""}
                    </p>
                  </div>
                )}
                {info.tin && (
                  <div>
                    <p className="text-sm font-medium">TIN</p>
                    <p className="text-sm">{info.tin}</p>
                  </div>
                )}
                {info.websitePortfolioLink && (
                  <div>
                    <p className="text-sm font-medium">
                      Website/Portfolio Link
                    </p>
                    <p className="break-all text-sm">
                      {info.websitePortfolioLink}
                    </p>
                  </div>
                )}
                {info.professionalRegistrationNumber && (
                  <div>
                    <p className="text-sm font-medium">
                      Professional Registration Number
                    </p>
                    <p className="text-sm">
                      {info.professionalRegistrationNumber}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <Separator />
        <div>
          <h4 className="text-md mb-1 font-medium">Property Details</h4>
          {info.properties && info.properties.length > 0 ? (
            <div className="space-y-3">
              {info.properties.map(
                (property: PropertyDetailValues, index: number) => (
                  <div key={index} className="rounded-md border p-3">
                    <h5 className="mb-1 text-sm font-semibold">
                      Property {index + 1}
                    </h5>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                      {property.propertyType && (
                        <div>
                          <p className="text-sm font-medium">
                            Type of Property
                          </p>
                          <p className="text-sm capitalize">
                            {property.propertyType
                              .replace(/_/g, " ")
                              .toLowerCase()}
                          </p>
                        </div>
                      )}
                      {property.propertyValue && (
                        <div>
                          <p className="text-sm font-medium">
                            Approximate Value (BDT)
                          </p>
                          <p className="text-sm">{property.propertyValue}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ),
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No properties added.
            </p>
          )}
        </div>
        <Separator />
        <div>
          <h4 className="text-md mb-1 font-medium">Income Details</h4>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium">Gross Monthly Income</p>
              <p className="text-sm">{info.grossMonthlyIncome}</p>
            </div>
            {info.rentIncome && (
              <div>
                <p className="text-sm font-medium">Rent Income</p>
                <p className="text-sm">{info.rentIncome}</p>
              </div>
            )}
            {info.otherIncome && (
              <div>
                <p className="text-sm font-medium">Other Income</p>
                <p className="text-sm">{info.otherIncome}</p>
              </div>
            )}
            {info.sourceOfOtherIncome && (
              <div>
                <p className="text-sm font-medium">Source of Other Income</p>
                <p className="text-sm">{info.sourceOfOtherIncome}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium">Total Income</p>
              <p className="text-sm">{info.totalIncome}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderLoanInfo = () => {
    const info = formData.loanInfo;
    if (!info)
      return (
        <p className="text-sm text-muted-foreground">
          Existing Financial Obligations not completed.
        </p>
      );
    return (
      <div className="space-y-4">
        <div>
          <h4 className="text-md mb-1 font-medium">Existing Loans</h4>
          {info.hasExistingLoan ? (
            <div className="space-y-4">
              {info.existingLoans?.map((loan, index) => (
                <div key={index} className="rounded-md border p-3">
                  <h5 className="mb-2 text-sm font-medium">Loan {index + 1}</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm font-medium">Loan Type</p>
                      <p className="text-sm capitalize">
                        {loan.loanType === "OTHER_LOAN"
                          ? loan.otherLoanType
                          : loan.loanType.replace(/_/g, " ").toLowerCase()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Lender's Name</p>
                      <p className="text-sm">{loan.lenderName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Disbursed Amount</p>
                      <p className="text-sm">{loan.disbursedAmount}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Outstanding</p>
                      <p className="text-sm">{loan.outstanding}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">EMI</p>
                      <p className="text-sm">{loan.emi}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Adjustment Plan</p>
                      <p className="text-sm capitalize">
                        {loan.adjustmentPlan.replace(/_/g, " ")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm">No existing loans</p>
          )}
        </div>
        <Separator />
        <div>
          <h4 className="text-md mb-1 font-medium">Credit Cards</h4>
          {info.hasCreditCard ? (
            <div className="space-y-4">
              {info.creditCards?.map((card, index) => (
                <div key={index} className="rounded-md border p-3">
                  <h5 className="mb-2 text-sm font-medium">Card {index + 1}</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm font-medium">Issuer Name</p>
                      <p className="text-sm">{card.issuerName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Card Limit</p>
                      <p className="text-sm">{card.cardLimit}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-medium">
                        To Be Closed Before Disbursement
                      </p>
                      <p className="text-sm">
                        {card.toBeClosedBeforeDisbursement ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm">No credit cards</p>
          )}
        </div>
        <Separator />
        <div>
          <h4 className="text-md mb-1 font-medium">Bank Account Details</h4>
          {info.bankAccounts && info.bankAccounts.length > 0 ? (
            <div className="space-y-4">
              {info.bankAccounts.map((account, index) => (
                <div key={index} className="rounded-md border p-3">
                  <h5 className="mb-2 text-sm font-medium">
                    Bank Account {index + 1}
                  </h5>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm font-medium">Bank Name</p>
                      <p className="text-sm">{account.bankName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Account Number</p>
                      <p className="text-sm">{account.accountNumber}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm">No bank accounts provided.</p>
          )}
        </div>
      </div>
    );
  };

  const renderLoanRequest = () => {
    const info = formData.loanRequest;
    if (!info)
      return (
        <p className="text-sm text-muted-foreground">
          Loan Request & Specifications not completed.
        </p>
      );
    return (
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <div>
          <p className="text-sm font-medium">Loan Amount Requested (BDT)</p>
          <p className="text-sm">{info.loanAmount}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Preferred Loan Tenure</p>
          <p className="text-sm">{info.loanTenure} Months</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm font-medium">Purpose of Loan</p>
          <p className="text-sm">{info.loanPurpose}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Proposed EMI Start Date</p>
          <p className="text-sm">{info.emiStartDate}th of the month</p>
        </div>
      </div>
    );
  };

  const renderDocumentInfo = () => {
    const info = formData.documentInfo;
    if (!info)
      return (
        <p className="text-sm text-muted-foreground">
          Documents not completed.
        </p>
      );
    const documents = [
      {
        key: "passportPhoto",
        label: "Passport Size Photo",
        value: info.passportPhoto,
      },
      {
        key: "nationalIdOrPassport",
        label: "National ID Card or Passport",
        value: info.nationalIdOrPassport,
      },
      {
        key: "proofOfIncome",
        label: "Proof of Income",
        value: info.proofOfIncome,
      },
      {
        key: "bankStatements",
        label: "Bank Statements",
        value: info.bankStatements,
      },
      {
        key: "tinCertificate",
        label: "TIN Certificate",
        value: info.tinCertificate,
      },
      {
        key: "proofOfEmployment",
        label: "Proof of Employment",
        value: info.proofOfEmployment,
      },
      { key: "utilityBill", label: "Utility Bill", value: info.utilityBill },
      {
        key: "propertyDocuments",
        label: "Property Documents",
        value: info.propertyDocuments,
      },
      {
        key: "additionalDocuments",
        label: "Additional Documents",
        value: info.additionalDocuments,
      },
    ].filter((doc) => doc.value);

    if (documents.length === 0) {
      return (
        <p className="text-sm text-muted-foreground">No documents uploaded.</p>
      );
    }
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {documents.map((doc) => (
          <div key={doc.key} className="space-y-1">
            <p className="text-sm font-medium">{doc.label}</p>
            <div className="flex h-32 items-center justify-center overflow-hidden rounded-md border bg-slate-50 p-2">
              {doc.value && doc.value.type === "application/pdf" ? (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <FileText className="mb-1 h-8 w-8" />
                  <p className="w-28 truncate text-center text-xs">
                    {doc.value.name}
                  </p>
                </div>
              ) : doc.value &&
                doc.value.type &&
                doc.value.type.startsWith("image/") ? (
                <img
                  src={doc.value.dataUrl || "/placeholder.svg"}
                  alt={doc.label}
                  className="max-h-full max-w-full object-contain"
                />
              ) : doc.value ? (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <ImageIcon className="mb-1 h-8 w-8" />
                  <p className="w-28 truncate text-center text-xs">
                    {doc.value.name}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <ImageIcon className="mb-1 h-8 w-8" />
                  <p className="w-28 truncate text-center text-xs">No file</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderGuarantorDetails = (
    guarantor: GuarantorSectionValues | undefined,
    title: string,
  ) => {
    const isDataProvided =
      guarantor &&
      Object.values(guarantor).some(
        (val) => val !== "" && val !== undefined && val !== null,
      );

    if (!isDataProvided) {
      return (
        <p className="text-sm text-muted-foreground">
          {title} details not provided.
        </p>
      );
    }

    return (
      <div className="space-y-3">
        <h4 className="text-md mb-2 font-semibold">{title}</h4>
        <div className="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium">Mobile Number</p>
            <p className="text-sm">{guarantor.mobileNumber}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Email Address</p>
            <p className="text-sm">{guarantor.emailAddress}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderGuarantorInfo = () => {
    const guarantorInfo = formData.guarantorInfo;
    const personalGuarantorData = guarantorInfo?.personalGuarantor;
    const businessGuarantorData = guarantorInfo?.businessGuarantor;
    const isPersonalProvided =
      personalGuarantorData &&
      Object.values(personalGuarantorData).some(
        (val) => val !== "" && val !== undefined && val !== null,
      );
    const isBusinessProvided =
      businessGuarantorData &&
      Object.values(businessGuarantorData).some(
        (val) => val !== "" && val !== undefined && val !== null,
      );

    if (!isPersonalProvided && !isBusinessProvided) {
      return (
        <p className="text-sm text-muted-foreground">
          Guarantor information not provided.
        </p>
      );
    }
    return (
      <div className="space-y-6">
        {isPersonalProvided &&
          renderGuarantorDetails(personalGuarantorData, "Personal Guarantor")}
        {isPersonalProvided && isBusinessProvided && (
          <Separator className="my-4" />
        )}
        {isBusinessProvided &&
          renderGuarantorDetails(businessGuarantorData, "Business Guarantor")}
      </div>
    );
  };



  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Application Preview</CardTitle>
          <CardDescription>
            Review your application details before submission.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateToStep("step-1")}
              >
                <PenSquare className="mr-2 h-4 w-4" /> Edit
              </Button>
            </div>
            {renderPersonalInfo()}
          </section>
          <Separator />
          <section>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Residential Information</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateToStep("step-2")}
              >
                <PenSquare className="mr-2 h-4 w-4" /> Edit
              </Button>
            </div>
            {renderResidentialInfo()}
          </section>
          <Separator />
          <section>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Employment & Financial Information
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateToStep("step-3")}
              >
                <PenSquare className="mr-2 h-4 w-4" /> Edit
              </Button>
            </div>
            {renderEmploymentInfo()}
          </section>
          <Separator />
          <section>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Existing Financial Obligations
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateToStep("step-4")}
              >
                <PenSquare className="mr-2 h-4 w-4" /> Edit
              </Button>
            </div>
            {renderLoanInfo()}
          </section>
          <Separator />
          <section>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Loan Request & Specifications
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateToStep("step-5")}
              >
                <PenSquare className="mr-2 h-4 w-4" /> Edit
              </Button>
            </div>
            {renderLoanRequest()}
          </section>
          <Separator />
          <section>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Document Verification</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateToStep("step-6")}
              >
                <PenSquare className="mr-2 h-4 w-4" /> Edit
              </Button>
            </div>
            {renderDocumentInfo()}
          </section>
          <Separator />
          <section>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Guarantor Information</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateToStep("step-7")}
              >
                <PenSquare className="mr-2 h-4 w-4" /> Edit
              </Button>
            </div>
            {renderGuarantorInfo()}
          </section>
        </CardContent>
        <CardFooter className="mt-6 flex justify-between space-x-2">
          <Button
            variant="outline"
            onClick={() => router.push("/user/loan-application/step-7")}
          >
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isFormComplete || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </CardFooter>
      </Card>
      <SuccessModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(true)}
        trackingNumber={trackingNumber}
      />
    </div>
  );
}
