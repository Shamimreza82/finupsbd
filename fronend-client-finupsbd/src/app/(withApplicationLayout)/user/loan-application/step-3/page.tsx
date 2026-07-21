/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { CheckboxInput } from "@/components/loan-application/checkbox-input";

import { DatePickerInput } from "@/components/form/FormInputs";
import {
  SelectInput,
  TextAreaInput,
  TextInput,
  type SelectOption,
} from "@/components/loan-application/form-inputs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useFormContext as useAppFormContext } from "@/context/loan-application-form-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  employmentInfoSchema,
  type EmploymentInfoValues,
} from "../schemas/employment-info-schema";

export default function EmploymentInfoPage() {
  const router = useRouter();
  const { formData, updateFormData, isStepEditable, isDataLoaded, } =
    useAppFormContext();
  const [employmentStatus, setEmploymentStatus] = useState<string | undefined>(
    undefined,
  );
  const [hasPreviousOrganization, setHasPreviousOrganization] = useState(false);
  const [propertyError, setPropertyError] = useState<string | null>(null);
  const [isFormInitialized, setIsFormInitialized] = useState(false);
  const [professionType, setProfessionType] = useState<string | undefined>(
    undefined,
  );



  const form = useForm<EmploymentInfoValues>({
    resolver: zodResolver(employmentInfoSchema),
    mode: "onTouched",
    defaultValues: {
      employmentStatus: undefined,
      designation: "",
      department: "",
      employeeId: "",
      employmentType: undefined,
      dateOfJoining: new Date(),
      organizationName: "",
      organizationAddress: "",
      serviceYears: "",
      serviceMonths: "",
      eTin: "",
      officialContact: "",
      hasPreviousOrganization: false,
      previousOrganizationName: "",
      previousDesignation: "",
      previousServiceYears: "",
      previousServiceMonths: "",
      totalExperienceYears: "",
      totalExperienceMonths: "",
      businessName: "",
      businessAddress: "",
      businessOwnerType: undefined,
      businessType: undefined,
      sharePortion: "",
      businessRegistrationNumber: "",
      tradeLicenseAge: "",
      properties: [],
      grossMonthlyIncome: "",
      rentIncome: "",
      otherIncome: "",
      sourceOfOtherIncome: "",
      totalIncome: "",
      professionType: undefined,
      otherProfession: "",
      // New self-employed fields
      professionalTitle: "",
      institutionName: "",
      workplaceAddress: "",
      yearsOfExperience: "",
      startedPracticeSince: new Date(),
      tin: "",
      websitePortfolioLink: "",
      professionalRegistrationNumber: "",
    },
  });

  const {
    fields: propertyFields,
    append: appendProperty,
    remove: removeProperty,
  } = useFieldArray({
    control: form.control,
    name: "properties",
  });

  const watchEmploymentStatus = form.watch("employmentStatus");
  const watchHasPreviousOrganization = form.watch("hasPreviousOrganization");
  const watchProfessionType = form.watch("professionType");

  // Watch income fields for automatic calculation
  const watchGrossMonthlyIncome = form.watch("grossMonthlyIncome");
  const watchRentIncome = form.watch("rentIncome");
  const watchOtherIncome = form.watch("otherIncome");

  useEffect(() => {
    setEmploymentStatus(watchEmploymentStatus);
  }, [watchEmploymentStatus]);

  useEffect(() => {
    setHasPreviousOrganization(watchHasPreviousOrganization || false);
  }, [watchHasPreviousOrganization]);

  useEffect(() => {
    setProfessionType(watchProfessionType);
  }, [watchProfessionType]);

  // Auto-calculate total income
  useEffect(() => {
    const grossIncome = Number.parseInt(watchGrossMonthlyIncome || "0", 10);
    const rentIncome = Number.parseInt(watchRentIncome || "0", 10);
    const otherIncome = Number.parseInt(watchOtherIncome || "0", 10);

    const totalIncome = grossIncome + rentIncome + otherIncome;

    form.setValue("totalIncome", totalIncome.toString(), {
      shouldValidate: true,
    });
  }, [watchGrossMonthlyIncome, watchRentIncome, watchOtherIncome, form]);

  useEffect(() => {
    if (employmentStatus === "SALARIED") {
      const currentYears = Number.parseInt(
        form.getValues("serviceYears") || "0",
        10,
      );
      const currentMonths = Number.parseInt(
        form.getValues("serviceMonths") || "0",
        10,
      );
      let totalYears = currentYears;
      let totalMonths = currentMonths;
      if (hasPreviousOrganization) {
        const prevYears = Number.parseInt(
          form.getValues("previousServiceYears") || "0",
          10,
        );
        const prevMonths = Number.parseInt(
          form.getValues("previousServiceMonths") || "0",
          10,
        );
        totalYears += prevYears;
        totalMonths += prevMonths;
      }
      if (totalMonths >= 12) {
        totalYears += Math.floor(totalMonths / 12);
        totalMonths %= 12;
      }
      form.setValue("totalExperienceYears", totalYears.toString(), {
        shouldValidate: true,
      });
      form.setValue("totalExperienceMonths", totalMonths.toString(), {
        shouldValidate: true,
      });
    }
  }, [
    form.watch("serviceYears"),
    form.watch("serviceMonths"),
    form.watch("previousServiceYears"),
    form.watch("previousServiceMonths"),
    hasPreviousOrganization,
    employmentStatus,
    form,
  ]);

  useEffect(() => {
    if (formData.employmentInfo) {
      setEmploymentStatus(formData.employmentInfo.employmentStatus);
      const savedProperties = formData.employmentInfo.properties || [];
      // form.reset({ ...formData.employmentInfo, properties: savedProperties });
      setTimeout(() => {
        if (formData.employmentInfo) {
          form.reset(formData.employmentInfo);
        }
      }, 0);
      setHasPreviousOrganization(
        "hasPreviousOrganization" in formData.employmentInfo
          ? (formData.employmentInfo as any).hasPreviousOrganization || false
          : false,
      );
    } else {
      form.reset();
    }
    setIsFormInitialized(true);
  }, [formData.employmentInfo, form.reset]);

  // useEffect(() => {
  //   if (isFormInitialized) {
  //     const currentProperties = form.getValues("properties");
  //     if (
  //       (!currentProperties || currentProperties.length === 0) &&
  //       propertyFields.length === 0
  //     ) {
  //       appendProperty({ propertyType: "OTHER", propertyValue: undefined });
  //     }
  //   }
  // }, [
  //   isFormInitialized,
  //   form.getValues,
  //   appendProperty,
  //   propertyFields.length,
  // ]);

  useEffect(() => {
    if (!isStepEditable("employmentInfo")) {
      router.push("/user/loan-application/preview");
    }
  }, [isStepEditable, router]);

  function onSubmit(data: EmploymentInfoValues) {
    const dataToSave = { ...data, properties: data.properties || [] };
    updateFormData("employmentInfo", dataToSave);
    router.push("/user/loan-application/step-4");
  }

  const handleAddProperty = () => {
    if (propertyFields.length < 3) {
      appendProperty({ propertyType: "", propertyValue: "" });
      setPropertyError(null);
    } else {
      setPropertyError("You can add a maximum of 3 properties.");
    }
  };

  const employmentStatusOptions: SelectOption[] = [
    { label: "Salaried", value: "SALARIED" },
    { label: "Business Owner", value: "BUSINESS_OWNER" },
    { label: "Self Employed", value: "SELF_EMPLOYED" },
  ];
  const employmentTypeOptions: SelectOption[] = [
    { label: "Permanent", value: "PERMANENT" },
    { label: "Contractual", value: "CONTRACTUAL" },
    { label: "Parttime", value: "PARTTIME" },
    { label: "Probation", value: "PROBATION" },
  ];
  const businessOwnerOptions: SelectOption[] = [
    { label: "Proprietorship", value: "PROPRIETORSHIP" },
    { label: "Partnership", value: "PARTNERSHIP" },
    { label: "Public Limited Company", value: "PUBLIC_LIMITED_COMPANY" },
  ];
  const businessTypeOptions: SelectOption[] = [
    { label: "Retail", value: "RETAIL" },
    { label: "Wholesale", value: "WHOLESALE" },
    { label: "Manufacturing", value: "MANUFACTURING" },
  ];
  const tradeLicenseExperienceOptions: SelectOption[] = Array.from(
    { length: 10 },
    (_, i) => ({
      label: `${i + 1} Year${i === 0 ? "" : "s"}`,
      value: (i + 1).toString(),
    }),
  );
  const propertyTypeOptions: SelectOption[] = [
    { label: "Residential", value: "RESIDENTIAL" },
    { label: "Commercial", value: "COMMERCIAL" },
    { label: "Land", value: "LAND" },
    { label: "Apartment", value: "APARTMENT" },
    { label: "House", value: "HOUSE" },
    { label: "Other", value: "OTHER" },
  ];

  const selfEmploymentTypes: SelectOption[] = [
    { label: "Doctor", value: "DOCTOR" },
    { label: "Engineer", value: "ENGINEER" },
    { label: "Architect", value: "ARCHITECT" },
    { label: "Accountant", value: "ACCOUNTANT" },
    { label: "Artist", value: "ARTIST" },
    { label: "Teacher", value: "TEACHER" },
    { label: "Freelancer", value: "FREELANCER" },
    { label: "Other", value: "OTHER" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employment & Financial Information</CardTitle>
        <CardDescription>
          Provide details about your employment and financial status.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Employment Details Section */}
            <section>
              <h3 className="mb-4 text-xl font-semibold">Employment Details</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <SelectInput
                    form={form}
                    name="employmentStatus"
                    label="Employment Status"
                    options={employmentStatusOptions}
                    placeholder="Select employment status"
                    required
                  />
                </div>
                {employmentStatus === "SALARIED" && (
                  <>
                    <TextInput
                      form={form}
                      name="designation"
                      label="Designation"
                      placeholder="Enter designation"
                      required
                    />
                    <TextInput
                      form={form}
                      name="department"
                      label="Department"
                      placeholder="Enter department"
                      required
                    />
                    <TextInput
                      form={form}
                      name="employeeId"
                      label="Employee ID"
                      placeholder="Enter employee ID"
                      required
                    />
                    <SelectInput
                      form={form}
                      name="employmentType"
                      label="Employment Type"
                      options={employmentTypeOptions}
                      placeholder="Select employment type"
                      required
                    />
                    <DatePickerInput
                      form={form}
                      name="dateOfJoining"
                      label="Date of Joining"
                      placeholder="Select date"
                      required
                    />
                    <TextInput
                      form={form}
                      name="organizationName"
                      label="Organization Name"
                      placeholder="Enter organization name"
                      required
                    />
                    <div className="md:col-span-2">
                      <TextInput
                        form={form}
                        name="organizationAddress"
                        label="Organization Address"
                        placeholder="Enter organization address"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 items-end gap-4">
                      <TextInput
                        form={form}
                        name="serviceYears"
                        label="Length of Service (Years)"
                        placeholder="Years"
                        type="number"
                        required
                      />
                      <TextInput
                        form={form}
                        name="serviceMonths"
                        label="Months"
                        placeholder="Months"
                        type="number"
                        required
                      />
                    </div>
                    <TextInput
                      form={form}
                      name="eTin"
                      label="E-TIN"
                      placeholder="Enter E-TIN"
                      required
                    />
                    <TextInput
                      form={form}
                      name="officialContact"
                      label="Official Contact (if any)"
                      placeholder="Enter official contact"
                    />
                    <div className="md:col-span-2">
                      <CheckboxInput
                        form={form}
                        name="hasPreviousOrganization"
                        label="I have worked in a previous organization"
                      />
                    </div>
                    {hasPreviousOrganization && (
                      <>
                        <TextInput
                          form={form}
                          name="previousOrganizationName"
                          label="Name of Previous Organization"
                          placeholder="Enter organization name"
                          required
                        />
                        <TextInput
                          form={form}
                          name="previousDesignation"
                          label="Previous Designation"
                          placeholder="Enter designation"
                          required
                        />
                        <div className="grid grid-cols-2 items-end gap-4">
                          <TextInput
                            form={form}
                            name="previousServiceYears"
                            label="Length of Service (Years)"
                            placeholder="Years"
                            type="number"
                            required
                          />
                          <TextInput
                            form={form}
                            name="previousServiceMonths"
                            label="Months"
                            placeholder="Months"
                            type="number"
                            required
                          />
                        </div>
                      </>
                    )}
                    <div className="md:col-span-2">
                      <h4 className="text-md mb-2 font-medium">
                        Total Experience
                      </h4>
                      <div className="grid grid-cols-2 items-end gap-4">
                        <TextInput
                          form={form}
                          name="totalExperienceYears"
                          label="Years"
                          placeholder="Years"
                          type="number"
                          required
                          disabled
                        />
                        <TextInput
                          form={form}
                          name="totalExperienceMonths"
                          label="Months"
                          placeholder="Months"
                          type="number"
                          required
                          disabled
                        />
                      </div>
                    </div>
                  </>
                )}
                {employmentStatus === "BUSINESS_OWNER" && (
                  <>
                    <TextInput
                      form={form}
                      name="businessName"
                      label="Business Name"
                      placeholder="Enter business name"
                      required
                    />
                    <div className="md:col-span-2">
                      <TextInput
                        form={form}
                        name="businessAddress"
                        label="Business Address"
                        placeholder="Enter business address"
                        required
                      />
                    </div>
                    <SelectInput
                      form={form}
                      name="businessOwnerType"
                      label="Business Owner Type"
                      options={businessOwnerOptions}
                      placeholder="Select owner type"
                      required
                    />
                    <SelectInput
                      form={form}
                      name="businessType"
                      label="Business Type"
                      options={businessTypeOptions}
                      placeholder="Select business type"
                      required
                    />
                    <TextInput
                      form={form}
                      name="sharePortion"
                      label="Share Portion (%)"
                      placeholder="Enter share portion"
                      type="number"
                      required
                    />
                    <TextInput
                      form={form}
                      name="businessRegistrationNumber"
                      label="Business Registration/Trade License Number"
                      placeholder="Enter registration number"
                      required
                    />
                    <SelectInput
                      form={form}
                      name="tradeLicenseAge"
                      label="Trade License Age"
                      options={tradeLicenseExperienceOptions}
                      placeholder="Select license age"
                      required
                    />
                  </>
                )}
                {employmentStatus === "SELF_EMPLOYED" && (
                  <>
                    <SelectInput
                      form={form}
                      name="professionType"
                      label="Profession Type"
                      options={selfEmploymentTypes}
                      placeholder="Select profession type"
                      required
                    />
                    {professionType === "OTHER" && (
                      <TextInput
                        form={form}
                        name="otherProfession"
                        label="Specify Profession"
                        placeholder="Enter your profession"
                        required
                      />
                    )}
                    <TextInput
                      form={form}
                      name="professionalTitle"
                      label="Professional Title / Designation"
                      placeholder="Enter your professional title"
                      required
                    />
                    <TextInput
                      form={form}
                      name="institutionName"
                      label="Institution / Organization Name"
                      placeholder="Enter institution or organization name"
                      required
                    />
                    <div className="md:col-span-2">
                      <TextAreaInput
                        form={form}
                        name="workplaceAddress"
                        label="Workplace Address"
                        placeholder="Enter your workplace address"
                        required
                      />
                    </div>
                    <TextInput
                      form={form}
                      name="yearsOfExperience"
                      label="Years of Experience"
                      placeholder="Enter years of experience"
                      type="number"
                      required
                    />
                    <DatePickerInput
                      form={form}
                      name="startedPracticeSince"
                      label="Started Practice Since"
                      placeholder="Select date"
                      required
                    />
                    <TextInput
                      form={form}
                      name="tin"
                      label="TIN"
                      placeholder="Enter TIN number"
                      type="number"
                      required
                    />
                    <TextInput
                      form={form}
                      name="websitePortfolioLink"
                      label="Website or Portfolio Link"
                      placeholder="Enter website or portfolio URL"
                    />
                    <TextInput
                      form={form}
                      name="professionalRegistrationNumber"
                      label="Professional Registration Number"
                      placeholder="Enter registration number"
                    />
                  </>
                )}
              </div>
            </section>
            <Separator />
            {/* Property Details Section */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold">Property Details</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddProperty}
                  disabled={propertyFields.length >= 3}
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Property
                </Button>
              </div>
              {propertyError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{propertyError}</AlertDescription>
                </Alert>
              )}
              {propertyFields.map((field, index) => (
                <div
                  key={field.id}
                  className="relative mb-4 space-y-4 rounded-md border p-4"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeProperty(index)}
                    className="absolute right-2 top-2"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                  <h4 className="text-lg font-medium">Property {index + 1}</h4>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <SelectInput
                      form={form}
                      name={`properties.${index}.propertyType`}
                      label="Type of Property"
                      options={propertyTypeOptions}
                      placeholder="Select property type"    
                    />
                    <TextInput
                      form={form}
                      name={`properties.${index}.propertyValue`}
                      label="Approximate Value (in BDT)"
                      placeholder="Enter property value"
                      type="number"
                    />
                  </div>
                </div>
              ))}
              {propertyFields.length === 0 && isFormInitialized && (
                <p className="text-sm text-muted-foreground">
                  No properties added. Click "Add Property" to include details.
                </p>
              )}
            </section>
            <Separator />
            {/* Income Details Section */}
            <section>
              <h3 className="mb-4 text-xl font-semibold">Income Details</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <TextInput
                    form={form}
                    name="grossMonthlyIncome"
                    label="Gross Monthly Salary/Income"
                    placeholder="Enter gross monthly income"
                    type="number"
                    required
                  />
                  <TextInput
                    form={form}
                    name="rentIncome"
                    label="Rent Income (if any)"
                    placeholder="Enter rent income"
                    type="number"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <TextInput
                    form={form}
                    name="otherIncome"
                    label="Other Income (if any)"
                    placeholder="Enter other income"
                    type="number"
                  />
                  <TextInput
                    form={form}
                    name="sourceOfOtherIncome"
                    label="Source of Other Income"
                    placeholder="e.g., FDR, DPS, Sanchaypatra, Shares/Stocks"
                    type="text"
                  />
                </div>
                <div className="md:col-span-2">
                  <TextInput
                    form={form}
                    name="totalIncome"
                    label="Total Income"
                    placeholder="Enter total income"
                    type="number"
                    required
                    disabled
                  />
                </div>
              </div>
            </section>
            <CardFooter className="mt-8 flex justify-between px-0">
              <Button
                type="button"
                variant="outline"
                disabled={isDataLoaded}
                onClick={() => router.push("/user/loan-application/step-2")}
              >
                Back
              </Button>
              <Button type="submit"> Save and Continue</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
