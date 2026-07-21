import { z } from "zod";

// Maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Allowed file types
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_DOCUMENT_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
];

// File object schema
const createFileSchema = (acceptedTypes: string[], fieldName: string) => {
  return z
    .object({
      name: z.string(),
      type: z.string(),
      size: z.number(),
      dataUrl: z.string(),
    })
    .nullable()
    .refine((file) => file !== null, {
      message: `${fieldName} is required`,
    })
    .refine((file) => file && acceptedTypes.includes(file.type), {
      message: `Invalid file type. Please upload ${acceptedTypes.includes("application/pdf") ? "JPEG, JPG, PNG, WEBP, or PDF" : "JPEG, JPG, PNG, or WEBP"} files only`,
    })
    .refine((file) => file && file.size <= MAX_FILE_SIZE, {
      message: `File size must be less than 5MB`,
    });
};

// Schema for document validation
export const documentInfoSchema = z.object({
  passportPhoto: createFileSchema(ACCEPTED_IMAGE_TYPES, "Passport Size Photo"),
  nationalIdOrPassport: createFileSchema(
    ACCEPTED_IMAGE_TYPES,
    "National ID Card or Passport",
  ),
  proofOfIncome: createFileSchema(ACCEPTED_IMAGE_TYPES, "Proof of Income"),
  bankStatements: createFileSchema(ACCEPTED_DOCUMENT_TYPES, "Bank Statements"),
  tinCertificate: createFileSchema(ACCEPTED_DOCUMENT_TYPES, "TIN Certificate"),
  proofOfEmployment: createFileSchema(
    ACCEPTED_DOCUMENT_TYPES,
    "Proof of Employment",
  ),
  utilityBill: createFileSchema(ACCEPTED_IMAGE_TYPES, "Utility Bill"),
  propertyDocuments: z
    .object({
      name: z.string(),
      type: z.string(),
      size: z.number(),
      dataUrl: z.string(),
    })
    .nullable()
    .optional(),

  additionalDocuments: z
    .object({
      name: z.string(),
      type: z.string(),
      size: z.number(),
      dataUrl: z.string(),
    })
    .nullable()
    .optional(),
});

export type DocumentInfoValues = z.infer<typeof documentInfoSchema>;

export type FileWithPreview = {
  name: string;
  type: string;
  size: number;
  dataUrl: string;
};
