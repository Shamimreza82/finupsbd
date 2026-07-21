"use client";

import { districts as allDistricts } from "@/_data/districts";
import { divisions as allDivisions } from "@/_data/divisions";
import { thanas as allThanas } from "@/_data/thanas";
import { CheckboxInput } from "@/components/loan-application/checkbox-input";
import {
  ComboBoxInput,
  SelectInput,
  TextInput,
  type SelectOption,
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
import { Separator } from "@/components/ui/separator";
import { useFormContext as useAppFormContext } from "@/context/loan-application-form-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  residentialInfoSchema,
  type ResidentialInfoValues,
} from "../schemas/residential-info-schema";

export default function ResidentialInfoPage() {
  const router = useRouter();
  const { formData, updateFormData, isStepEditable, isDataLoaded } =
    useAppFormContext();
  const [isPermanentSameAsPresent, setIsPermanentSameAsPresent] =
    useState(false);
  const [isDataLoadedState, setIsDataLoadedState] = useState(false);

  const form = useForm<ResidentialInfoValues>({
    resolver: zodResolver(residentialInfoSchema),
    mode: "onTouched",
    defaultValues: {
      presentAddress: "",
      presentDivision: "",
      presentDistrict: "",
      presentThana: "",
      presentPostalCode: "",
      presentLengthOfStay: "",
      presentOwnershipStatus: "",
      isPermanentSameAsPresent: false,
      permanentAddress: "",
      permanentDivision: "",
      permanentDistrict: "",
      permanentThana: "",
      permanentPostalCode: "",
      permanentLengthOfStay: "",
      permanentOwnershipStatus: "",
    },
  });

  const [presentFilteredDistricts, setPresentFilteredDistricts] = useState<
    SelectOption[]
  >([]);
  const [presentFilteredThanas, setPresentFilteredThanas] = useState<
    SelectOption[]
  >([]);
  const [permanentFilteredDistricts, setPermanentFilteredDistricts] = useState<
    SelectOption[]
  >([]);
  const [permanentFilteredThanas, setPermanentFilteredThanas] = useState<
    SelectOption[]
  >([]);

  const divisionOptions: SelectOption[] = allDivisions.map((d) => ({
    label: d.name,
    value: d.name,
  }));
  const ownershipStatusOptions: SelectOption[] = [
    { label: "Owned", value: "OWNED" },
    { label: "Rented", value: "RENTED" },
    { label: "Family Owned", value: "FAMILY_OWNED" },
    { label: "Company Provided", value: "COMPANY_PROVIDED" },
  ];

  const watchPresentDivision = form.watch("presentDivision");
  const watchPresentDistrict = form.watch("presentDistrict");
  const watchPermanentDivision = form.watch("permanentDivision");
  const watchPermanentDistrict = form.watch("permanentDistrict");
  const watchIsPermanentSameAsPresent = form.watch("isPermanentSameAsPresent");

  // Helper function to find division ID by name
  const getDivisionIdByName = (name: string) => {
    const division = allDivisions.find((d) => d.name === name);
    return division?.id || "";
  };

  // Helper function to find district ID by name
  const getDistrictIdByName = (name: string) => {
    const district = allDistricts.find((d) => d.name === name);
    return district?.id || "";
  };

  // Function to populate districts based on division
  const populateDistricts = (divisionName: string) => {
    if (!divisionName) return [];
    const divisionId = getDivisionIdByName(divisionName);
    return allDistricts
      .filter((d) => d.division_id === divisionId)
      .map((d) => ({ label: d.name, value: d.name }));
  };

  // Function to populate thanas based on district
  const populateThanas = (districtName: string) => {
    if (!districtName) return [];
    const districtId = getDistrictIdByName(districtName);
    return allThanas
      .filter((t) => t.district_id === districtId)
      .map((t) => ({ label: t.name, value: t.name }));
  };

  // Load saved data and populate dropdowns - wait for context data to be loaded
  useEffect(() => {
    if (!isDataLoaded) return;

    if (formData.residentialInfo) {
      const savedData = formData?.residentialInfo;

      // First, populate all the dropdown options based on saved data
      if (savedData.presentDivision) {
        const presentDistricts = populateDistricts(savedData.presentDivision);
        setPresentFilteredDistricts(presentDistricts);

        if (savedData.presentDistrict) {
          const presentThanas = populateThanas(savedData.presentDistrict);
          setPresentFilteredThanas(presentThanas);
        }
      }

      if (savedData.permanentDivision && !savedData.isPermanentSameAsPresent) {
        const permanentDistricts = populateDistricts(
          savedData.permanentDivision,
        );
        setPermanentFilteredDistricts(permanentDistricts);

        if (savedData.permanentDistrict) {
          const permanentThanas = populateThanas(savedData.permanentDistrict);
          setPermanentFilteredThanas(permanentThanas);
        }
      }

      // Then set the form values with a delay
      setTimeout(() => {
        form.reset(savedData);
        setIsPermanentSameAsPresent(
          savedData.isPermanentSameAsPresent || false,
        );
        setIsDataLoadedState(true);
      }, 100);
    } else {
      setIsDataLoadedState(true);
    }
  }, [formData.residentialInfo, form, isDataLoaded]);

  // Handle present division changes
  useEffect(() => {
    if (!isDataLoadedState) return;

    if (watchPresentDivision) {
      const districts = populateDistricts(watchPresentDivision);
      setPresentFilteredDistricts(districts);

      // Clear district and thana if they're not valid for the new division
      const currentDistrict = form.getValues("presentDistrict");
      if (
        currentDistrict &&
        !districts.find((d) => d.value === currentDistrict)
      ) {
        form.setValue("presentDistrict", "");
        form.setValue("presentThana", "");
        setPresentFilteredThanas([]);
      }
    } else {
      setPresentFilteredDistricts([]);
      form.setValue("presentDistrict", "");
      form.setValue("presentThana", "");
      setPresentFilteredThanas([]);
    }
  }, [watchPresentDivision, form, isDataLoadedState]);

  // Handle present district changes
  useEffect(() => {
    if (!isDataLoadedState) return;

    if (watchPresentDistrict) {
      const thanas = populateThanas(watchPresentDistrict);
      setPresentFilteredThanas(thanas);

      // Clear thana if it's not valid for the new district
      const currentThana = form.getValues("presentThana");
      if (currentThana && !thanas.find((t) => t.value === currentThana)) {
        form.setValue("presentThana", "");
      }
    } else {
      setPresentFilteredThanas([]);
      form.setValue("presentThana", "");
    }
  }, [watchPresentDistrict, form, isDataLoadedState]);

  // Handle permanent division changes
  useEffect(() => {
    if (!isDataLoadedState || watchIsPermanentSameAsPresent) return;

    if (watchPermanentDivision) {
      const districts = populateDistricts(watchPermanentDivision);
      setPermanentFilteredDistricts(districts);

      // Clear district and thana if they're not valid for the new division
      const currentDistrict = form.getValues("permanentDistrict");
      if (
        currentDistrict &&
        !districts.find((d) => d.value === currentDistrict)
      ) {
        form.setValue("permanentDistrict", "");
        form.setValue("permanentThana", "");
        setPermanentFilteredThanas([]);
      }
    } else {
      setPermanentFilteredDistricts([]);
      form.setValue("permanentDistrict", "");
      form.setValue("permanentThana", "");
      setPermanentFilteredThanas([]);
    }
  }, [
    watchPermanentDivision,
    form,
    isDataLoadedState,
    watchIsPermanentSameAsPresent,
  ]);

  // Handle permanent district changes
  useEffect(() => {
    if (!isDataLoadedState || watchIsPermanentSameAsPresent) return;

    if (watchPermanentDistrict) {
      const thanas = populateThanas(watchPermanentDistrict);
      setPermanentFilteredThanas(thanas);

      // Clear thana if it's not valid for the new district
      const currentThana = form.getValues("permanentThana");
      if (currentThana && !thanas.find((t) => t.value === currentThana)) {
        form.setValue("permanentThana", "");
      }
    } else {
      setPermanentFilteredThanas([]);
      form.setValue("permanentThana", "");
    }
  }, [
    watchPermanentDistrict,
    form,
    isDataLoadedState,
    watchIsPermanentSameAsPresent,
  ]);

  // Handle "same as present" checkbox
  useEffect(() => {
    if (!isDataLoadedState) return;

    const currentFormValues = form.getValues();
    setIsPermanentSameAsPresent(watchIsPermanentSameAsPresent);

    if (watchIsPermanentSameAsPresent) {
      // Copy present address data to permanent
      form.setValue("permanentAddress", currentFormValues.presentAddress);
      form.setValue("permanentDivision", currentFormValues.presentDivision);
      form.setValue("permanentDistrict", currentFormValues.presentDistrict);
      form.setValue("permanentThana", currentFormValues.presentThana);
      form.setValue("permanentPostalCode", currentFormValues.presentPostalCode);
      form.setValue(
        "permanentLengthOfStay",
        currentFormValues.presentLengthOfStay,
      );
      form.setValue(
        "permanentOwnershipStatus",
        currentFormValues.presentOwnershipStatus,
      );

      // Set permanent dropdown options to match present
      setPermanentFilteredDistricts(presentFilteredDistricts);
      setPermanentFilteredThanas(presentFilteredThanas);
    } else {
      // Clear permanent address fields
      form.setValue(
        "permanentAddress",
        formData.residentialInfo?.permanentAddress || "",
      );
      form.setValue(
        "permanentDivision",
        formData.residentialInfo?.permanentDivision || "",
      );
      form.setValue(
        "permanentDistrict",
        formData.residentialInfo?.permanentDistrict || "",
      );
      form.setValue(
        "permanentThana",
        formData.residentialInfo?.permanentThana || "",
      );
      form.setValue(
        "permanentPostalCode",
        formData.residentialInfo?.permanentPostalCode || "",
      );
      form.setValue(
        "permanentLengthOfStay",
        formData.residentialInfo?.permanentLengthOfStay || "",
      );
      form.setValue(
        "permanentOwnershipStatus",
        formData.residentialInfo?.permanentOwnershipStatus || "",
      );

      // Clear permanent dropdown options
      // setPermanentFilteredDistricts([]);
      // setPermanentFilteredThanas([]);
    }
  }, [
    watchIsPermanentSameAsPresent,
    form,
    isDataLoadedState,
    presentFilteredDistricts,
    presentFilteredThanas,
  ]);

  useEffect(() => {
    if (!isStepEditable("residentialInfo")) {
      router.push("/user/loan-application/preview");
    }
  }, [isStepEditable, router]);

  function onSubmit(data: ResidentialInfoValues) {
    updateFormData("residentialInfo", data);
    router.push("/user/loan-application/step-3");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Residential Information</CardTitle>
        <CardDescription>Update your residential details here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Present Address Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Present Address</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <TextInput
                    form={form}
                    name="presentAddress"
                    label="Address"
                    placeholder="e.g., House 123, Road 4, Block B"
                    required
                  />
                </div>
                <SelectInput
                  form={form}
                  name="presentDivision"
                  label="Division"
                  options={divisionOptions}
                  placeholder="Select Division"
                  required
                />
                <ComboBoxInput
                  form={form}
                  name="presentDistrict"
                  label="District"
                  options={presentFilteredDistricts}
                  placeholder="Select District"
                  searchPlaceholder="Search districts..."
                  notFoundText="No district found."
                  required
                  disabled={
                    !watchPresentDivision ||
                    presentFilteredDistricts.length === 0
                  }
                />
                <ComboBoxInput
                  form={form}
                  name="presentThana"
                  label="Thana"
                  options={presentFilteredThanas}
                  placeholder="Select Thana"
                  searchPlaceholder="Search thanas..."
                  notFoundText="No thana found."
                  required
                  disabled={
                    !watchPresentDistrict || presentFilteredThanas.length === 0
                  }
                />
                <TextInput
                  form={form}
                  name="presentPostalCode"
                  label="Postal Code"
                  placeholder="e.g., 1200"
                />
                <TextInput
                  form={form}
                  name="presentLengthOfStay"
                  label="Length of Stay (Present)"
                  placeholder="e.g., 5 years 2 months"
                  required
                />
                <SelectInput
                  form={form}
                  name="presentOwnershipStatus"
                  label="Ownership Status (Present)"
                  options={ownershipStatusOptions}
                  placeholder="Select Ownership Status"
                  required
                />
              </div>
            </div>

            <Separator className="my-6" />

            {/* Permanent Address Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Permanent Address</h3>
              <CheckboxInput
                form={form}
                name="isPermanentSameAsPresent"
                label="Permanent address is the same as Present Address"
              />
              {!watchIsPermanentSameAsPresent && (
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <TextInput
                        form={form}
                        name="permanentAddress"
                        label="Address"
                        placeholder="e.g., House 123, Road 4, Block B"
                        required
                      />
                    </div>
                    <SelectInput
                      form={form}
                      name="permanentDivision"
                      label="Division"
                      options={divisionOptions}
                      placeholder="Select Division"
                      required
                    />
                    <ComboBoxInput
                      form={form}
                      name="permanentDistrict"
                      label="District"
                      options={permanentFilteredDistricts}
                      placeholder="Select District"
                      searchPlaceholder="Search districts..."
                      notFoundText="No district found."
                      required
                      disabled={
                        !watchPermanentDivision ||
                        permanentFilteredDistricts.length === 0
                      }
                    />
                    <ComboBoxInput
                      form={form}
                      name="permanentThana"
                      label="Thana"
                      options={permanentFilteredThanas}
                      placeholder="Select Thana"
                      searchPlaceholder="Search thanas..."
                      notFoundText="No thana found."
                      required
                      disabled={
                        !watchPermanentDistrict ||
                        permanentFilteredThanas.length === 0
                      }
                    />
                    <TextInput
                      form={form}
                      name="permanentPostalCode"
                      label="Postal Code"
                      placeholder="e.g., 1200"
                    />
                    <TextInput
                      form={form}
                      name="permanentLengthOfStay"
                      label="Length of Stay (Permanent)"
                      placeholder="e.g., 10 years"
                      required
                    />
                    <SelectInput
                      form={form}
                      name="permanentOwnershipStatus"
                      label="Ownership Status (Permanent)"
                      options={ownershipStatusOptions}
                      placeholder="Select Ownership Status"
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            <CardFooter className="flex justify-between px-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/user/loan-application/step-1")}
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
