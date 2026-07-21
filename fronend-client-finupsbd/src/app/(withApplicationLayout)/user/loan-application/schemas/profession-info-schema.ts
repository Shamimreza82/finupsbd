import { z } from "zod"

// Base schema for profession info
const baseSchema = z.object({
  profession: z.enum(["salaried", "business", "student", "unemployed"], {
    required_error: "Please select your profession.",
  }),
})

// Schema for salaried professionals
const salariedSchema = z.object({
  profession: z.literal("salaried"),
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  designation: z.string().min(2, {
    message: "Designation must be at least 2 characters.",
  }),
  monthlySalary: z.string().min(1, {
    message: "Monthly salary is required.",
  }),
  employmentDuration: z.string().min(1, {
    message: "Employment duration is required.",
  }),
})

// Schema for business professionals
const businessSchema = z.object({
  profession: z.literal("business"),
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  businessType: z.string().min(2, {
    message: "Business type must be at least 2 characters.",
  }),
  annualRevenue: z.string().min(1, {
    message: "Annual revenue is required.",
  }),
  businessDuration: z.string().min(1, {
    message: "Business duration is required.",
  }),
})

// Schema for students
const studentSchema = z.object({
  profession: z.literal("student"),
  institutionName: z.string().min(2, {
    message: "Institution name must be at least 2 characters.",
  }),
  courseOfStudy: z.string().min(2, {
    message: "Course of study must be at least 2 characters.",
  }),
})

// Schema for unemployed
const unemployedSchema = z.object({
  profession: z.literal("unemployed"),
  lastEmployment: z.string().optional(),
  reasonForUnemployment: z.string().min(2, {
    message: "Reason for unemployment must be at least 2 characters.",
  }),
})

// Combined schema with discriminated union
export const professionInfoSchema = z.discriminatedUnion("profession", [
  salariedSchema,
  businessSchema,
  studentSchema,
  unemployedSchema,
])

export type ProfessionInfoValues = z.infer<typeof professionInfoSchema>
