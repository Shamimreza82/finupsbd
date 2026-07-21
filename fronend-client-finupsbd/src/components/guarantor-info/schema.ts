import { z } from "zod"




// Zod schema: supportingDocument is an optional array of files
export const guarantorSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    fatherOrHusbandName: z.string().min(1, "Father's/Husband's name is required"),
    motherName: z.string().min(1, "Mother's name is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    nationality: z.string().min(1, "Nationality is required"),
    nationalIdNumber: z.string().min(1, "National ID number is required"),
    mobileNumber: z.string().min(1, "Mobile number is required"),
    emailAddress: z.string().email("Invalid email address").optional().or(z.literal("")),
    relationWithApplicant: z.string().min(1, "Relation with applicant is required"),
    presentAddress: z.string().min(1, "Present address is required"),
    permanentAddress: z.string().min(1, "Permanent & mailing address is required"),
    workAddress: z.string().min(1, "Work address is required"),
    photo: z.any({
        required_error: "Photo is required",
        invalid_type_error: "Photo must be a file",
    }),
    nidFront: z.any({
        required_error: "NID front is required",
        invalid_type_error: "NID front must be a file",
    }),
    nidBack: z.any({
        required_error: "NID back is required",
        invalid_type_error: "NID back must be a file",
    }),
    supportingDocument: z.array(z.any()).optional(),
})

export type GuarantorFormData = z.infer<typeof guarantorSchema>