import { z } from "zod";

// Schema for a single property entry
const propertyDetailSchema = z.object({
  propertyType: z.string(),
  propertyValue: z
    .string()
    .regex(/^\d*$/, { message: "Property value must be a number if provided." })
})

// Income details schema
const incomeDetailsSchema = z
  .object({
    grossMonthlyIncome: z
      .string()
      .min(1, { message: "Gross monthly income is required." })
      .regex(/^\d+$/, "Must be a number"),
    rentIncome: z
      .string()
      .regex(/^\d*$/, "Must be a number if provided")
      .optional(),
    otherIncome: z
      .string()
      .regex(/^\d*$/, "Must be a number if provided")
      .optional(),
    sourceOfOtherIncome: z.string().optional(),
    totalIncome: z
      .string()
      .min(1, { message: "Total income is required." })
      .regex(/^\d+$/, "Must be a number"),
  })
  .superRefine((data, ctx) => {
    if (
      data.otherIncome &&
      data.otherIncome.trim() !== "" &&
      (!data.sourceOfOtherIncome || data.sourceOfOtherIncome.trim() === "")
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Specify the source of your other income if other income is provided.",
        path: ["sourceOfOtherIncome"],
      });
    }
  });

// Base employment schema with all possible fields
const employmentInfoBaseSchema = z
  .object({
    employmentStatus: z.enum(["SALARIED", "BUSINESS_OWNER", "SELF_EMPLOYED"], {
      required_error: "Please select your employment status.",
    }),
    // Salaried fields
    // jobTitle: z.string().optional(),
    designation: z.string().optional(),
    department: z.string().optional(),
    employeeId: z.string().optional(),
    employmentType: z
      .enum(["PERMANENT", "CONTRACTUAL", "PARTTIME", "PROBATION"])
      .optional(),
    dateOfJoining: z.coerce.date({
      required_error: "Date of Joining is required",
      invalid_type_error: "Date of Joining must be a valid date",
    }).optional(),
    organizationName: z.string().optional(),
    organizationAddress: z.string().optional(),
    serviceYears: z
      .string()
      .regex(/^\d*$/, "Must be a number if provided")
      .optional(),
    serviceMonths: z
      .string()
      .regex(/^([0-9]|1[0-1])?$/, "Must be between 0-11 if provided")
      .optional(),
    eTin: z
      .string()
      .max(12, {
        message: "Enter your E-TIN 12 number.",
      })
      .optional(),
    officialContact: z
      .string()
      .max(11, {
        message: "Phone number not more than 11 digit.",
      })
      .optional(),
    hasPreviousOrganization: z.boolean().default(false),
    previousOrganizationName: z.string().optional(),
    previousDesignation: z.string().optional(),
    previousServiceYears: z
      .string()
      .regex(/^\d*$/, "Must be a number if provided")
      .optional(),
    previousServiceMonths: z
      .string()
      .regex(/^([0-9]|1[0-1])?$/, "Must be between 0-11 if provided")
      .optional(),
    totalExperienceYears: z.string().optional(),
    totalExperienceMonths: z.string().optional(),
    // Business owner fields
    businessName: z.string().optional(),
    businessAddress: z.string().optional(),
    businessOwnerType: z
      .enum(["PROPRIETORSHIP", "PARTNERSHIP", "PUBLIC_LIMITED_COMPANY"])
      .optional(),
    businessType: z.enum(["RETAIL", "WHOLESALE", "MANUFACTURING"]).optional(),
    sharePortion: z
      .string()
      .regex(/^\d*$/, "Must be a number if provided")
      .optional(),
    businessRegistrationNumber: z.string().optional(),
    tradeLicenseAge: z.string().optional(),
    // Self-employed fields
    professionType: z.string().optional(),
    otherProfession: z.string().optional(),
    professionalTitle: z.string().optional(),
    institutionName: z.string().optional(),
    workplaceAddress: z.string().optional(),
    yearsOfExperience: z
      .string()
      .regex(/^\d*$/, "Must be a number if provided")
      .optional(),
    startedPracticeSince: z.coerce.date({
      required_error: "Started practice since is required",
      invalid_type_error: "Started practice since must be a valid date",
    }).optional(),
    tin: z.string().regex(/^\d*$/, "Must be a number if provided").optional(),
    websitePortfolioLink: z.string().optional(),
    professionalRegistrationNumber: z.string().optional(),
    // Property details
    properties: z
      .array(propertyDetailSchema)
      .refine((arr) => arr.length <= 3, {
        message: "You can add a maximum of 3 properties.",
      }).optional(),
  })
  .and(incomeDetailsSchema)
  .superRefine((data, ctx) => {
    // Validate based on employment status
    if (data.employmentStatus === "SALARIED") {
      // Required fields for salaried

      if (!data.designation || data.designation.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Designation must be at least 2 characters.",
          path: ["designation"],
        });
      }
      if (!data.department || data.department.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Department must be at least 2 characters.",
          path: ["department"],
        });
      }
      if (!data.employeeId || data.employeeId.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Employee ID is required.",
          path: ["employeeId"],
        });
      }
      if (!data.employmentType) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select your employment type.",
          path: ["employmentType"],
        });
      }
      if (!data.dateOfJoining || isNaN(data.dateOfJoining.getTime())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Date of joining is required.",
          path: ["dateOfJoining"],
        });
      }
      if (!data.organizationName || data.organizationName.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Organization name must be at least 2 characters.",
          path: ["organizationName"],
        });
      }
      if (!data.organizationAddress || data.organizationAddress.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Organization address must be at least 2 characters.",
          path: ["organizationAddress"],
        });
      }
      if (!data.serviceYears || data.serviceYears.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Years of service is required.",
          path: ["serviceYears"],
        });
      }
      if (!data.serviceMonths || data.serviceMonths.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Months of service is required.",
          path: ["serviceMonths"],
        });
      }
      if (!data.eTin || data.eTin.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "E-TIN is required.",
          path: ["eTin"],
        });
      }

      // Previous organization validation
      if (data.hasPreviousOrganization) {
        if (
          !data.previousOrganizationName ||
          data.previousOrganizationName.trim() === ""
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Previous organization name is required.",
            path: ["previousOrganizationName"],
          });
        }
        if (
          !data.previousDesignation ||
          data.previousDesignation.trim() === ""
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Previous designation is required.",
            path: ["previousDesignation"],
          });
        }
        if (
          !data.previousServiceYears ||
          data.previousServiceYears.trim() === ""
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Previous service years is required.",
            path: ["previousServiceYears"],
          });
        }
        if (
          !data.previousServiceMonths ||
          data.previousServiceMonths.trim() === ""
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Previous service months is required.",
            path: ["previousServiceMonths"],
          });
        }
      }
    }

    if (data.employmentStatus === "BUSINESS_OWNER") {
      // Required fields for business owner
      if (!data.businessName || data.businessName.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Business name must be at least 2 characters.",
          path: ["businessName"],
        });
      }
      if (!data.businessAddress || data.businessAddress.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Business address must be at least 2 characters.",
          path: ["businessAddress"],
        });
      }
      if (!data.businessOwnerType) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select your business owner type.",
          path: ["businessOwnerType"],
        });
      }
      if (!data.businessType) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select your business type.",
          path: ["businessType"],
        });
      }
      if (!data.sharePortion || data.sharePortion.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Share portion is required.",
          path: ["sharePortion"],
        });
      }
      if (
        !data.businessRegistrationNumber ||
        data.businessRegistrationNumber.trim() === ""
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Business registration/trade license number is required.",
          path: ["businessRegistrationNumber"],
        });
      }
      if (!data.tradeLicenseAge || data.tradeLicenseAge.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select trade license age.",
          path: ["tradeLicenseAge"],
        });
      }
    }

    if (data.employmentStatus === "SELF_EMPLOYED") {
      // Required fields for self-employed
      if (!data.professionType || data.professionType.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Profession type is required.",
          path: ["professionType"],
        });
      }
      if (
        data.professionType === "OTHER" &&
        (!data.otherProfession || data.otherProfession.trim() === "")
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please specify your profession.",
          path: ["otherProfession"],
        });
      }
      if (!data.professionalTitle || data.professionalTitle.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Professional title/designation is required.",
          path: ["professionalTitle"],
        });
      }
      if (!data.institutionName || data.institutionName.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Institution/organization name is required.",
          path: ["institutionName"],
        });
      }
      if (!data.workplaceAddress || data.workplaceAddress.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Workplace address is required.",
          path: ["workplaceAddress"],
        });
      }
      if (!data.yearsOfExperience || data.yearsOfExperience.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Years of experience is required.",
          path: ["yearsOfExperience"],
        });
      }
      if (
        !data.startedPracticeSince ||
        isNaN(data.startedPracticeSince.getTime())
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Started practice since date is required.",
          path: ["startedPracticeSince"],
        });
      }
      if (!data.tin || data.tin.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "TIN is required.",
          path: ["tin"],
        });
      }
    }



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   const props = data.properties;

    if (props === undefined || props === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Profession type is required.",
        path: ["properties"],
      });
      return;
    }

    // Empty array is valid
    if (props.length === 0) {
      return;
    }

    // Check if ALL items are empty strings
    const allEmpty = props.every(
      (p) =>
        (p.propertyType?.trim() === "") &&
        (p.propertyValue?.trim() === "")
    );

    if (allEmpty) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Profession type is required.",
        path: ["properties"],
      });
    }
  });

export { employmentInfoBaseSchema as employmentInfoSchema };
export type EmploymentInfoValues = z.infer<typeof employmentInfoBaseSchema>;
export type PropertyDetailValues = z.infer<typeof propertyDetailSchema>;