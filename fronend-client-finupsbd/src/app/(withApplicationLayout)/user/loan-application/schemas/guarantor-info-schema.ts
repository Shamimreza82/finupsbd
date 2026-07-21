import { z } from "zod";

const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Basic E.164 phone number regex
const nidRegex = /^[0-9]{10,17}$/; // NID format for Bangladesh

// Simplified schema for guarantor with only mobile and email
const guarantorSectionSchema = z.object({
  mobileNumber: z
    .string()
    .regex(phoneRegex, "Invalid mobile number format.")
    .min(1, "Mobile number is required."),
  emailAddress: z
    .string()
    .email("Invalid email address.")
    .min(1, "Email address is required."),
});

// Export the inferred type for GuarantorSectionValues
export type GuarantorSectionValues = z.infer<typeof guarantorSectionSchema>;

// Specific schema for Personal Guarantor
const personalGuarantorSchema = guarantorSectionSchema.extend({});

// Specific schema for Business Guarantor
const businessGuarantorSchema = guarantorSectionSchema.extend({});

// Main schema for the Guarantor Information step
export const guarantorInfoSchema = z
  .object({
    personalGuarantor: personalGuarantorSchema.optional(),
    businessGuarantor: businessGuarantorSchema.optional(),
  })
  .superRefine((data, ctx) => {
    const hasPersonalGuarantorInput =
      data.personalGuarantor &&
      Object.values(data.personalGuarantor).some(
        (val) => val !== undefined && val !== "",
      );
    const hasBusinessGuarantorInput =
      data.businessGuarantor &&
      Object.values(data.businessGuarantor).some(
        (val) => val !== undefined && val !== "",
      );

    // At least one guarantor type must be provided
    if (!hasPersonalGuarantorInput && !hasBusinessGuarantorInput) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least one guarantor type must be provided.",
        path: [],
      });
    }

    if (hasPersonalGuarantorInput) {
      const personalResult = personalGuarantorSchema.safeParse(
        data.personalGuarantor,
      );
      if (!personalResult.success) {
        personalResult.error.errors.forEach((error) => {
          ctx.addIssue({
            ...error,
            path: ["personalGuarantor", ...error.path],
          });
        });
      }
    }

    if (hasBusinessGuarantorInput) {
      const businessResult = businessGuarantorSchema.safeParse(
        data.businessGuarantor,
      );
      if (!businessResult.success) {
        businessResult.error.errors.forEach((error) => {
          ctx.addIssue({
            ...error,
            path: ["businessGuarantor", ...error.path],
          });
        });
      }
    }
  });

export type GuarantorInfoValues = z.infer<typeof guarantorInfoSchema>;
