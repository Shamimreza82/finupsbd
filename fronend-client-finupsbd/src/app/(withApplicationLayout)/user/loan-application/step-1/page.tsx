"use client";

import { districts } from "@/_data/districts";
import { DatePickerInput } from "@/components/form/FormInputs";
import {
  ComboBoxInput,
  SelectInput,
  TextInput,
} from "@/components/loan-application/form-inputs";
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
import { useFormContext } from "@/context/loan-application-form-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  personalInfoSchema,
  type PersonalInfoValues,
} from "../schemas/personal-info-schema";

export default function PersonalInfoPage() {
  const router = useRouter();
  const { formData, updateFormData, isStepEditable, isDataLoaded } =
    useFormContext();
  const [showSpouseField, setShowSpouseField] = useState(false);

  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: "",
      fatherName: "",
      motherName: "",
      gender: "",
      dateOfBirth: new Date("January 01, 1985"),
      placeOfBirth: "",
      nationality: "Bangladeshi",
      educationalLevel: "",
      NIDNumber: "",
      passportNumber: "",
      maritalStatus: "",
      spouseName: "",
      residentialStatus: "",
      religion: "",
      mobileNumber: "",
      alternateMobileNumber: "",
      emailAddress: "",
      socialMediaProfiles: [""],
    },
  });

  const maritalStatus = form.watch("maritalStatus");
  const socialMediaProfiles = form.watch("socialMediaProfiles");

  useEffect(() => {
    const isMarried = maritalStatus === "MARRIED";
    setShowSpouseField(isMarried);
    if (!isMarried) {
      form.setValue("spouseName", "", { shouldValidate: true });
    }
  }, [maritalStatus, form]);

  // Load saved data when context data is loaded
  useEffect(() => {
    if (!isDataLoaded) return;

    if (formData.personalInfo) {
      const currentData = formData.personalInfo;
      const formattedData = {
        ...currentData,
        fatherName: currentData.fatherName || "",
        spouseName: currentData.spouseName || "",
        socialMediaProfiles:
          Array.isArray(currentData.socialMediaProfiles) &&
          currentData.socialMediaProfiles.length > 0
            ? currentData.socialMediaProfiles
            : [""],
        educationalLevel: currentData.educationalLevel || "",
        NIDNumber: currentData.NIDNumber || "",
        passportNumber: currentData.passportNumber || "",
        mobileNumber: currentData.mobileNumber || "+880",
        alternateMobileNumber: currentData.alternateMobileNumber || "+880",
        placeOfBirth: currentData.placeOfBirth || "",
      };

      // Use setTimeout to ensure proper timing
      setTimeout(() => {
        form.reset(formattedData);
        setShowSpouseField(currentData.maritalStatus === "MARRIED");
      }, 100); // Small delay to ensure components are ready
    }
  }, [formData.personalInfo, form, isDataLoaded]);

  useEffect(() => {
    if (!isStepEditable("personalInfo")) {
      router.push("/user/loan-application/preview");
    }
  }, [isStepEditable, router]);

  function onSubmit(data: PersonalInfoValues) {
    const cleanedSocialMediaProfiles =
      data.socialMediaProfiles?.filter((link) => link && link.trim() !== "") ||
      [];
    const submittedData = {
      ...data,
      socialMediaProfiles:
        cleanedSocialMediaProfiles.length > 0 ? cleanedSocialMediaProfiles : [],
    };
    if (data.maritalStatus !== "MARRIED") {
      submittedData.spouseName = undefined;
    }
    updateFormData("personalInfo", submittedData);
    router.push("/user/loan-application/step-2");
  }

  const addSocialMediaField = () => {
    const currentLinks = form.getValues("socialMediaProfiles") || [];
    form.setValue("socialMediaProfiles", [...currentLinks, ""]);
  };

  const removeSocialMediaField = (index: number) => {
    const currentLinks = form.getValues("socialMediaProfiles") || [];
    if (currentLinks.length > 0) {
      const newLinks = [...currentLinks];
      newLinks.splice(index, 1);
      form.setValue(
        "socialMediaProfiles",
        newLinks.length > 0 ? newLinks : [""],
      );
    }
  };

  const genderOptions = [
    { label: "Male", value: "MALE" },
    { label: "Female", value: "FEMALE" },
    { label: "Other", value: "OTHER" },
  ];

  const educationalLevelOptions = [
    { label: "Below SSC", value: "BELOW_SSC" },
    { label: "SSC/Equivalent", value: "SSC" },
    { label: "HSC/Equivalent", value: "HSC" },
    { label: "Graduate", value: "GRADUATE" },
    { label: "Post Graduate", value: "POST_GRADUATE" },
    { label: "PhD", value: "PHD" },
    { label: "Other", value: "OTHER_EDUCATION" },
  ];

  const maritalStatusOptions = [
    { label: "Single", value: "SINGLE" },
    { label: "Married", value: "MARRIED" },
    { label: "Divorced", value: "DIVORCED" },
    { label: "Widowed", value: "WIDOWED" },
  ];

  const residentialStatusOptions = [
    { label: "Resident", value: "RESIDENT" },
    { label: "Non-Resident", value: "NONRESIDENT" },
    { label: "Temporary Resident", value: "TEMPORARYRESIDENT" },
  ];

  const religionOptions = [
    { label: "Islam", value: "ISLAM" },
    { label: "Hinduism", value: "HINDUISM" },
    { label: "Christianity", value: "CHRISTIANITY" },
    { label: "Buddhism", value: "BUDDHISM" },
    { label: "Other", value: "OTHER" },
  ];

  const socialMediaLabels = [
    "Facebook",
    "Twitter",
    "Instagram",
    "LinkedIn",
    "Other",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Please fill in your personal details accurately.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TextInput
                form={form}
                name="fullName"
                label="Full Name (as per National ID)"
                placeholder="Enter your full name"
                required
              />
              <TextInput
                form={form}
                name="fatherName"
                label="Father's Name"
                placeholder="Enter your father's name"
                required
              />
              <TextInput
                form={form}
                name="motherName"
                label="Mother's Name"
                placeholder="Enter your mother's name"
                required
              />
              <SelectInput
                form={form}
                name="gender"
                label="Gender"
                options={genderOptions}
                required
              />
              <DatePickerInput
                form={form}
                name="dateOfBirth"
                label="Date of Birth (DD/MM/YYYY)"
                placeholder="Select your date of birth"
                required
              />

              <ComboBoxInput
                form={form}
                name="placeOfBirth"
                label="Place of Birth (District)"
                options={districts.map((d) => ({
                  label: d.name,
                  value: d.name,
                }))}
                placeholder="Select District"
                searchPlaceholder="Search districts..."
                notFoundText="No district found."
                required
              />
              <TextInput
                form={form}
                name="nationality"
                label="Applicant Nationality"
                placeholder="Enter your nationality"
                required
              />
              <SelectInput
                form={form}
                name="educationalLevel"
                label="Educational Level"
                options={educationalLevelOptions}
                required
              />
              <TextInput
                form={form}
                name="NIDNumber"
                label="National Identification Number (NID)"
                placeholder="Enter your NID number"
                required
              />
              <TextInput
                form={form}
                name="passportNumber"
                label="Passport Number (Optional)"
                placeholder="Enter your passport number"
              />
              <SelectInput
                form={form}
                name="maritalStatus"
                label="Marital Status"
                options={maritalStatusOptions}
                required
              />
              {showSpouseField && (
                <TextInput
                  form={form}
                  name="spouseName"
                  label="Spouse's Name"
                  placeholder="Enter your spouse's name"
                  required={maritalStatus === "MARRIED"}
                />
              )}
              <SelectInput
                form={form}
                name="residentialStatus"
                label="Residential Status"
                options={residentialStatusOptions}
                required
              />
              <SelectInput
                form={form}
                name="religion"
                label="Religion"
                options={religionOptions}
                required
              />
              <TextInput
                form={form}
                name="mobileNumber"
                label="Mobile Number"
                type="tel"
                placeholder="01XXXXXXXXX"
                required
              />
              <TextInput
                form={form}
                name="alternateMobileNumber"
                label="Alternate Mobile Number (Optional)"
                type="tel"
                placeholder="01XXXXXXXXX"
              />
              <TextInput
                form={form}
                name="emailAddress"
                label="Email Address"
                placeholder="Enter your email"
                type="email"
                required
              />
            </div>
            <div className="w-full">
              <div className="mb-2">
                <label className="text-sm font-medium">
                  Social Media Profiles (optional)
                </label>
              </div>

              {socialMediaProfiles.map((link, index) => (
                <div
                  key={index}
                  className="mb-2 flex w-full items-center gap-2"
                >
                  <div className="w-11/12">
                    <TextInput
                      form={form}
                      name={`socialMediaProfiles.${index}`}
                      label=""
                      placeholder={`Enter your ${socialMediaLabels[index % socialMediaLabels.length]} profile link`}
                    />
                  </div>

                  {index > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="mt-1"
                      onClick={() => removeSocialMediaField(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={addSocialMediaField}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Social Media Profile
              </Button>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              All identity information is encrypted in transit and at rest,
              accessible only to authorized personnel for verification.
            </div>
            <CardFooter className="flex justify-between px-0 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/user/loan-application")}
              >
                Back
              </Button>
              <Button type="submit">Save and Continue</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
