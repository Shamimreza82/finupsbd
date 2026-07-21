"use client";

import {
  loanRequestSchema,
  type LoanRequestValues,
} from "@/app/(withApplicationLayout)/user/loan-application/schemas/loan-request-schema";
import {
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
import { useFormContext } from "@/context/loan-application-form-context";
import { TLoanRequest, useLoanRequestData } from "@/hooks/useLoanRequestData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function LoanRequestPage() {
  const router = useRouter();
  const { formData, updateFormData, isStepEditable, isDataLoaded } =
    useFormContext();
  const [loanRequest, setLoanRequest] = useState<TLoanRequest>();
  const [loading, setLoading] = useState(true);
  const { loanRequest: loanRequstData } = useLoanRequestData()

  // Initialize form with react-hook-form
  const form = useForm<LoanRequestValues>({
    resolver: zodResolver(loanRequestSchema),
    defaultValues: {
      loanAmount: "",
      loanTenure: undefined,
      loanPurpose: "",
      emiStartDate: undefined,
    },
  });

  // Load saved data if available
  // useEffect(() => {
  //   if (!isDataLoaded) return;
  //   if (formData.loanRequest) {
  //     form.reset(formData.loanRequest);
  //   }
  // }, [formData.loanRequest, form]);

  useEffect(() => {
    if (!isDataLoaded) return;
    if (formData.loanRequest) {
      setTimeout(() => {
        if (formData.loanRequest) {
          form.reset(formData.loanRequest);
        }
      }, 0);
    }
  }, [isDataLoaded, formData.loanRequest, form]);

  // Redirect if step is not editable
  useEffect(() => {
    if (!isStepEditable("loanRequest")) {
      router.push("/user/loan-application/preview");
    }
  }, [isDataLoaded, isStepEditable, router]);

  // Handle form submission
  function onSubmit(data: LoanRequestValues) {
    updateFormData("loanRequest", data);
    router.push("/user/loan-application/step-6");
  }

  // Loan tenure options
  const tenureOptions: SelectOption[] = [
    { label: "12 Months", value: 12 },
    { label: "24 Months", value: 24 },
    { label: "36 Months", value: 36 },
    { label: "48 Months", value: 48 },
    { label: "60 Months", value: 60 },
    { label: "72 Months", value: 72 },
  ];

  const tenureOptionsForInstantLoan: SelectOption[] = [
    { label: "1 Months", value: 1 },
    { label: "2 Months", value: 2 },
    { label: "3 Months", value: 3 },
  ];

  // EMI start date options
  const emiStartDateOptions: SelectOption[] = [
    { label: "5th", value: 5 },
    { label: "10th", value: 10 },
    { label: "15th", value: 15 },
    { label: "20th", value: 20 },
    { label: "25th", value: 25 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan Request & Specifications</CardTitle>
        <CardDescription>
          Provide details about your loan requirements.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* <TextInput
                form={form}
                name="loanAmount"
                label="Loan Amount Requested (BDT)"
                placeholder="Enter loan amount"
                type="number"
                required
                onChange={(e) => {
                  // Allow only numeric input
                  const value = e.target.value.replace(/\D/g, "");
                  form.setValue("loanAmount", value, { shouldValidate: true });
                }}
              /> */}

              <TextInput
                form={form}
                name="loanAmount"
                label="Loan Amount Requested (BDT)"
                placeholder="Enter loan amount"
                type="number"
                required
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  const numericValue = Number(value);

                  if (numericValue <= Number(loanRequstData?.eligibleLoan)) {
                    form.setValue("loanAmount", value, { shouldValidate: true });
                  } else {
                    form.setError("loanAmount", {
                      type: "manual",
                      message: `You cannot request more than BDT ${loanRequstData?.eligibleLoan}`,
                    });
                  }
                }}
              /> 

              <SelectInput
                form={form}
                name="loanTenure"
                label="Preferred Loan Tenure (years)"
                options={loanRequstData?.loanType === "INSTANT_LOAN" ? tenureOptionsForInstantLoan : tenureOptions}
                required
              />

              <div className="md:col-span-2">
                <TextInput
                  form={form}
                  name="loanPurpose"
                  label="Purpose of Loan"
                  placeholder="Enter the purpose of the loan"
                  required
                />
              </div>

              <SelectInput
                form={form}
                name="emiStartDate"
                label="Proposed EMI Start Date"
                options={emiStartDateOptions}
                required
              />
            </div>

            <CardFooter className="flex justify-between px-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/user/loan-application/step-4")}
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
