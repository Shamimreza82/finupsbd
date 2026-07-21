"use client";

import { FileUpload } from "@/components/loan-application/file-upload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "@/context/loan-application-form-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  documentInfoSchema,
  type DocumentInfoValues,
} from "../schemas/document-info-schema";

export default function DocumentsPage() {
  const router = useRouter();
  const { formData, updateFormData, isFormSubmitted, isStepEditable } =
    useFormContext();

  // Initialize form with react-hook-form
  const form = useForm<DocumentInfoValues>({
    resolver: zodResolver(documentInfoSchema),
    defaultValues: {
      passportPhoto: null as any,
      nationalIdOrPassport: null as any,
      proofOfIncome: null as any,
      bankStatements: null as any,
      tinCertificate: null as any,
      proofOfEmployment: null as any,
      utilityBill: null as any,
      propertyDocuments: null as any,
      additionalDocuments: null as any,
    },
  });

  // Load saved data if available
  useEffect(() => {
    if (formData.documentInfo) {
      form.reset(formData.documentInfo);
    }
  }, [formData.documentInfo, form]);

  // Check if this step is editable
  const isEditable = isStepEditable("documentInfo");

  // Handle form submission
  function onSubmit(data: DocumentInfoValues) {
    updateFormData("documentInfo", data);
    router.push("/user/loan-application/step-7");
    // If form is already submitted, go back to success page
    // if (isFormSubmitted) {
    //   router.push("/user/loan-application/success");
    // } else {
    //   router.push("/user/loan-application/preview");
    // }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Verification</CardTitle>
        <CardDescription>
          {isFormSubmitted
            ? "Update your documents for verification."
            : "Please upload the required documents for verification."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="passportPhoto"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      Passport Size Photo{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormDescription>
                      Upload a clear passport-sized photo of yourself
                    </FormDescription>
                    <FormControl>
                      <FileUpload
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        value={field.value ?? null}
                        onChange={field.onChange}
                        error={fieldState.error?.message}
                        fieldName="Passport Size Photo"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nationalIdOrPassport"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      National ID Card or Passport{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormDescription>
                      Upload a copy of your national ID card or passport
                    </FormDescription>
                    <FormControl>
                      <FileUpload
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        value={field.value ?? null}
                        onChange={field.onChange}
                        error={fieldState.error?.message}
                        fieldName="National ID Card or Passport"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="proofOfIncome"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      Proof of Income <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormDescription>
                      Upload your latest salary slip, business income statement,
                      etc.
                    </FormDescription>
                    <FormControl>
                      <FileUpload
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error?.message}
                        fieldName="Proof of Income"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bankStatements"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      Bank Statements (Last 6 months){" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormDescription>
                      Upload your bank statements from the last 6 months
                    </FormDescription>
                    <FormControl>
                      <FileUpload
                        accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error?.message}
                        fieldName="Bank Statements"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tinCertificate"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      TIN Certificate <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormDescription>
                      Upload your Tax Identification Number certificate
                    </FormDescription>
                    <FormControl>
                      <FileUpload
                        accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error?.message}
                        fieldName="TIN Certificate"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="proofOfEmployment"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      Proof of Employment{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormDescription>
                      Upload your employer's letter or employment contract
                    </FormDescription>
                    <FormControl>
                      <FileUpload
                        accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error?.message}
                        fieldName="Proof of Employment"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="utilityBill"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      Utility Bill for Address Verification{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormDescription>
                      Upload an electricity, water, or gas bill from the last 3
                      months
                    </FormDescription>
                    <FormControl>
                      <FileUpload
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error?.message}
                        fieldName="Utility Bill"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="propertyDocuments"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Property Documents</FormLabel>
                    <FormDescription>
                      Upload documents related to the property (for home or
                      secured loans)
                    </FormDescription>
                    <FormControl>
                      <FileUpload
                        accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
                        value={field.value ?? null}
                        onChange={field.onChange}
                        error={fieldState.error?.message}
                        fieldName="Property Documents"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="additionalDocuments"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      Additional Supporting Documents (if applicable)
                    </FormLabel>
                    <FormDescription>
                      Upload any additional documents that may support your
                      application
                    </FormDescription>
                    <FormControl>
                      <FileUpload
                        accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
                        value={field.value ?? null}
                        onChange={field.onChange}
                        error={fieldState.error?.message}
                        fieldName="Additional Documents"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="text-sm text-muted-foreground">
              <p>All documents must be:</p>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                <li>Clear and legible</li>
                <li>Less than 5MB in size</li>
                <li>In the correct format for each field</li>
              </ul>
            </div>

            <CardFooter className="flex justify-between px-0">
              {isFormSubmitted ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/user/loan-application/success")}
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/user/loan-application/step-5")}
                >
                  Back
                </Button>
              )}
              <Button type="submit">Upload Documents and Continue</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
