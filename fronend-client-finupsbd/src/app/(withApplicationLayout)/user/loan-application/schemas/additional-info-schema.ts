import { z } from "zod"

export const additionalInfoSchema = z.object({
  incomeSource: z.string().min(2, {
    message: "Income source must be at least 2 characters.",
  }),
  maritalStatus: z.enum(["single", "married", "divorced", "widowed"], {
    required_error: "Please select your marital status.",
  }),
  dependents: z.string().min(1, {
    message: "Number of dependents is required.",
  }),
  educationLevel: z.enum(["highSchool", "bachelor", "master", "phd", "other"], {
    required_error: "Please select your education level.",
  }),
  references: z
    .array(
      z.object({
        name: z.string().min(2, {
          message: "Reference name must be at least 2 characters.",
        }),
        relationship: z.string().min(2, {
          message: "Relationship must be at least 2 characters.",
        }),
        contact: z.string().min(10, {
          message: "Contact number must be at least 10 digits.",
        }),
      }),
    )
    .min(1, {
      message: "At least one reference is required.",
    }),
})

export type AdditionalInfoValues = z.infer<typeof additionalInfoSchema>
