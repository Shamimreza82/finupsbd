import { calculateAge } from "@/utils";
import { z } from "zod";

export const personalInfoSchema = z
  .object({
    fullName: z.string().min(2, {
      message: "Full name must be at least 2 characters.",
    }),
    fatherName: z.string().min(2, {
      message: "Father's/Husband's name must be at least 2 characters.",
    }),
    motherName: z.string().min(2, {
      message: "Mother's name must be at least 2 characters.",
    }),
    gender: z.string().min(1, {
      // Changed from z.string({ required_error: ... })
      message: "Please select your gender.",
    }),
    dateOfBirth: z.preprocess(
      (val) => (typeof val === "string" ? new Date(val) : val),
      z.date().refine(
        (dob) => {
          const age = calculateAge(dob);
          return age >= 22 && age <= 65;
        },
        { message: "Your age must be between 22 and 65 years old." },
      ),
    ),
    placeOfBirth: z.string().min(2, {
      message: "Place of birth must be at least 2 characters.",
    }),
    nationality: z.string().min(2, {
      message: "Nationality must be at least 2 characters.",
    }),
    educationalLevel: z.string().min(1, {
      // Changed from z.string({ required_error: ... })
      message: "Please select your educational level.",
    }),
    NIDNumber: z
      .string()
      .min(10, {
        message: "Enter your NID 10 digits or 17 digit identification number.",
      })
      .max(17, {
        message: "Enter your NID 10 digits or 17 digit identification number.",
      }),
    passportNumber: z.string().optional(),
    maritalStatus: z.string().min(1, {
      // Changed from z.string({ required_error: ... })
      message: "Please select your marital status.",
    }),
    spouseName: z.string().optional(),
    residentialStatus: z.string().min(1, {
      // Changed from z.string({ required_error: ... })
      message: "Please select your residential status.",
    }),
    religion: z.string().min(1, {
      // Changed from z.string({ required_error: ... })
      message: "Please select your religion.",
    }),
    mobileNumber: z
      .string()
      .max(11, {
        message: "Phone number not more than 11 digit.",
      })
      .regex(/^(\+880\s?|0)1[3-9]\d{2}-?\d{6}$/, "Invalid phone number."),
    alternateMobileNumber: z
      .string()
      .optional()
      .refine((val) => !val || /^(\+880\s?|0)1[3-9]\d{2}-?\d{6}$/.test(val), {
        message: "Invalid phone number.",
      }),
    emailAddress: z.string().email({
      message: "Please enter a valid email address.",
    }),
    socialMediaProfiles: z.array(z.string()).optional().default([]), // Made optional before default
  })

  // Conditional validation for spouseName based on maritalStatus
  .superRefine((data, ctx) => {
    if (
      data.maritalStatus === "MARRIED" &&
      (!data.spouseName || data.spouseName.trim().length < 2)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Spouse's name is required for married individuals.",
        path: ["spouseName"],
      });
    }
  });

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;
