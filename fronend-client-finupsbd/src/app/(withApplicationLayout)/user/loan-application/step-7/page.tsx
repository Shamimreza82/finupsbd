"use client";

import { TextInput } from "@/components/loan-application/form-inputs";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useFormContext } from "@/context/loan-application-form-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  guarantorInfoSchema,
  GuarantorInfoValues,
  GuarantorSectionValues,
} from "../schemas/guarantor-info-schema";

const getDefaultGuarantorSectionValues = () => ({
  mobileNumber: "+880",
  emailAddress: "",
});

export default function Step7Page() {
  const router = useRouter();
  const { formData, updateFormData, isFormSubmitted, isStepEditable } =
    useFormContext();

  const form = useForm<GuarantorInfoValues>({
    resolver: zodResolver(guarantorInfoSchema),
    defaultValues: {
      personalGuarantor: getDefaultGuarantorSectionValues(),
      businessGuarantor: getDefaultGuarantorSectionValues(),
    },
  });

  useEffect(() => {
    if (formData.guarantorInfo) {
      const dataToLoad: GuarantorInfoValues = {
        personalGuarantor:
          formData.guarantorInfo.personalGuarantor ||
          getDefaultGuarantorSectionValues(),
        businessGuarantor:
          formData.guarantorInfo.businessGuarantor ||
          getDefaultGuarantorSectionValues(),
      };
      form.reset(dataToLoad);
    }
  }, [formData.guarantorInfo, form]);

  useEffect(() => {
    if (!isStepEditable("guarantorInfo")) {
      router.push("/user/loan-application/preview");
    }
  }, [isStepEditable, router]);

  function onSubmit(data: GuarantorInfoValues) {
    const isSectionEffectivelyEmpty = (
      section: GuarantorSectionValues | undefined,
    ) => {
      if (!section) return true;
      const defaultSection = getDefaultGuarantorSectionValues();
      return Object.keys(section).every((key) => {
        const K = key as keyof GuarantorSectionValues;
        if (K === "mobileNumber" && section[K] === "+880") return true;
        return (
          section[K] === defaultSection[K] ||
          section[K] === "" ||
          section[K] === undefined ||
          section[K] === null
        );
      });
    };
    const cleanedData: GuarantorInfoValues = {
      personalGuarantor: !isSectionEffectivelyEmpty(data.personalGuarantor)
        ? data.personalGuarantor
        : undefined,
      businessGuarantor: !isSectionEffectivelyEmpty(data.businessGuarantor)
        ? data.businessGuarantor
        : undefined,
    };
    updateFormData("guarantorInfo", cleanedData);
    // router.push("/user/loan-application/preview");
    // If form is already submitted, go back to success page
    if (isFormSubmitted) {
      router.push("/user/loan-application/success");
    } else {
      router.push("/user/loan-application/preview");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Guarantor Information</h2>
          <p className="text-sm text-muted-foreground">
            Provide contact details if you have a personal guarantor, business
            guarantor, or both. If a section is partially filled, all its
            required fields must be completed.
          </p>
        </div>

        <div className="mt-4 space-y-6 rounded-md border p-4">
          <h3 className="text-lg font-medium">Personal Guarantor</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TextInput
              form={form}
              name="personalGuarantor.mobileNumber"
              label="Mobile Number"
              required
              placeholder="+880XXXXXXXXX"
              type="tel"
            />
            <TextInput
              form={form}
              name="personalGuarantor.emailAddress"
              label="Email Address"
              required
              placeholder="Enter email address"
              type="email"
            />
          </div>
        </div>

        <Separator />

        <div className="mt-4 space-y-6 rounded-md border p-4">
          <h3 className="text-lg font-medium">Business Guarantor</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TextInput
              form={form}
              name="businessGuarantor.mobileNumber"
              label="Mobile Number"
              required
              placeholder="+880XXXXXXXXX"
              type="tel"
            />
            <TextInput
              form={form}
              name="businessGuarantor.emailAddress"
              label="Email Address"
              required
              placeholder="Enter email address"
              type="email"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/user/loan-application/step-6")}
          >
            Back
          </Button>
          <Button type="submit">Continue to Preview</Button>
        </div>
      </form>
    </Form>
  );
}
