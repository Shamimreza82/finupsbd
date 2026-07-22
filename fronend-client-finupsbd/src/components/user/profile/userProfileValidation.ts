import { z } from "zod";

const VALID_CITIES = ["dhaka", "gazipur", "chittagong", "khulna", "rajshahi", "sylhet"] as const;

export const userProfileSchema = z.object({
  nameAsNid: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),

  nationalIdNumber: z
    .string()
    .trim()
    .regex(/^\d{10}$|^\d{17}$/, "NID must be exactly 10 or 17 digits"),

  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    required_error: "Please select your gender",
    invalid_type_error: "Please select a valid gender",
  }),

  dateOfBirth: z
    .date({
      required_error: "Please select your date of birth",
      invalid_type_error: "Please select a valid date",
    })
    .refine((date) => date <= new Date(), "Date of birth cannot be in the future")
    .refine(
      (date) => {
        const minAge = new Date();
        minAge.setFullYear(minAge.getFullYear() - 120);
        return date >= minAge;
      },
      "Please enter a valid date of birth",
    ),

  address: z
    .string()
    .trim()
    .max(500, "Address must not exceed 500 characters")
    .optional()
    .or(z.literal("")),

  city: z
    .string({
      required_error: "Please select your city",
    })
    .refine((val) => VALID_CITIES.includes(val as typeof VALID_CITIES[number]), {
      message: "Please select a valid city",
    }),
});
