"use client";

import { CheckboxInput } from "@/components/loan-application/checkbox-input";
import {
  ComboBoxInput,
  SelectInput,
  TextInput,
  type SelectOption,
} from "@/components/loan-application/form-inputs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useFormContext } from "@/context/loan-application-form-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  loanInfoSchema,
  type LoanInfoValues,
} from "../schemas/loan-info-schema";
import { bankLists } from "@/_data/bank_name";

export default function LoanInfoPage() {
  const router = useRouter();
  const { formData, updateFormData, isStepEditable, isDataLoaded } =
    useFormContext();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoanInfoValues>({
    resolver: zodResolver(loanInfoSchema),
    defaultValues: {
      hasExistingLoan: false,
      existingLoans: [],
      hasCreditCard: false,
      creditCards: [],
      bankAccounts: [{ bankName: "", accountNumber: "" }],
    },
  });

  const {
    fields: existingLoanFields,
    append: appendExistingLoan,
    remove: removeExistingLoan,
  } = useFieldArray({ control: form.control, name: "existingLoans" });
  const {
    fields: creditCardFields,
    append: appendCreditCard,
    remove: removeCreditCard,
  } = useFieldArray({ control: form.control, name: "creditCards" });
  const {
    fields: bankAccountFields,
    append: appendBankAccount,
    remove: removeBankAccount,
  } = useFieldArray({ control: form.control, name: "bankAccounts" });

  const watchHasExistingLoan = form.watch("hasExistingLoan");
  const watchHasCreditCard = form.watch("hasCreditCard");

  useEffect(() => {
    if (!isDataLoaded) return;

    if (formData.loanInfo && formData.loanInfo !== null) {
      // Using setTimeout to ensure form is ready for reset, especially with field arrays
      setTimeout(() => {
        form.reset(formData.loanInfo as LoanInfoValues);
      }, 100);
    } else {
      if (bankAccountFields.length === 0) {
        appendBankAccount(
          { bankName: "", accountNumber: "" },
          { shouldFocus: false },
        );
      }
    }
  }, [
    isDataLoaded,
    formData.loanInfo,
    form,
    appendBankAccount,
    bankAccountFields.length,
  ]);

  useEffect(() => {
    if (!watchHasExistingLoan) {
      form.setValue("existingLoans", []);
    } else if (
      watchHasExistingLoan &&
      form.getValues("existingLoans")?.length === 0
    ) {
      appendExistingLoan(
        {
          loanType: "",
          otherLoanType: "",
          lenderName: "",
          disbursedAmount: "",
          outstanding: "",
          emi: "",
          adjustmentPlan: "",
        },
        { shouldFocus: false },
      );
    }
  }, [watchHasExistingLoan, form, appendExistingLoan]);

  useEffect(() => {
    if (!watchHasCreditCard) {
      form.setValue("creditCards", []);
    } else if (
      watchHasCreditCard &&
      form.getValues("creditCards")?.length === 0
    ) {
      appendCreditCard(
        { issuerName: "", cardLimit: "", toBeClosedBeforeDisbursement: false },
        { shouldFocus: false },
      );
    }
  }, [watchHasCreditCard, form, appendCreditCard]);

  useEffect(() => {
    if (!isStepEditable("loanInfo")) {
      router.push("/user/loan-application/preview");
    }
  }, [isStepEditable, router]);

  function onSubmit(data: LoanInfoValues) {
    try {
      updateFormData("loanInfo", data);
      router.push("/user/loan-application/step-5");
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("An error occurred while saving your data. Please try again.");
    }
  }

  const handleAddExistingLoan = () => {
    if (existingLoanFields.length < 3) {
      appendExistingLoan({
        loanType: "",
        otherLoanType: "",
        lenderName: "",
        disbursedAmount: "",
        outstanding: "",
        emi: "",
        adjustmentPlan: "",
      });
      setError(null);
    } else setError("You can add a maximum of 3 existing loans.");
  };
  const handleAddCreditCard = () => {
    if (creditCardFields.length < 5) {
      appendCreditCard({
        issuerName: "",
        cardLimit: "",
        toBeClosedBeforeDisbursement: false,
      });
      setError(null);
    } else setError("You can add a maximum of 5 credit cards.");
  };
  const handleAddBankAccount = () => {
    if (bankAccountFields.length < 3) {
      appendBankAccount({ bankName: "", accountNumber: "" });
      setError(null);
    } else setError("You can add a maximum of 3 bank accounts.");
  };

  const loanTypes: SelectOption[] = [
    { label: "Personal Loan", value: "PERSONAL_LOAN" },
    { label: "Home Loan", value: "HOME_LOAN" },
    { label: "Car Loan", value: "CAR_LOAN" },
    { label: "SME Loan", value: "SME_LOAN" },
    { label: "Other Loan", value: "OTHER_LOAN" },
  ];


  // const bankLists: SelectOption[] = Array.from({ length: 10 }, (_, i) => ({
  //   label: `Bank ${i + 1}`,
  //   value: `bank_${i + 1}`,
  // }));


  const adjustmentPlans: SelectOption[] = [
    { label: "Own Source", value: "OWN_SOURCE" },
    { label: "Take Over", value: "TAKE_OVER" },
    { label: "To Be Continued", value: "TO_BE_CONTINUED" },
    { label: "Top-Up with Adjustment", value: "TOP_UP_WITH_ADJUSTMENT" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Existing Financial Obligations</CardTitle>
        <CardDescription>
          Provide details about your loan requirements and existing financial
          obligations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  Existing Loan Information
                </h3>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="hasExistingLoan"
                    checked={watchHasExistingLoan}
                    onCheckedChange={(checked) => {
                      form.setValue("hasExistingLoan", checked);
                      setError(null);
                    }}
                  />
                  <Label htmlFor="hasExistingLoan">I have existing loans</Label>
                </div>
              </div>
              {watchHasExistingLoan && (
                <div className="space-y-6">
                  {existingLoanFields.map((loan, index) => (
                    <div
                      key={loan.id}
                      className="space-y-4 rounded-md border p-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Loan {index + 1}</h4>
                        {existingLoanFields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeExistingLoan(index)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Remove
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <SelectInput
                          form={form}
                          name={`existingLoans.${index}.loanType`}
                          label="Loan Type"
                          options={loanTypes}
                          required
                        />
                        {form.watch(`existingLoans.${index}.loanType`) ===
                          "OTHER_LOAN" && (
                          <TextInput
                            form={form}
                            name={`existingLoans.${index}.otherLoanType`}
                            label="Please Specify Loan Type"
                            placeholder="Enter loan type"
                            required
                          />
                        )}
                        <SelectInput
                          form={form}
                          name={`existingLoans.${index}.lenderName`}
                          label="Lender's Name"
                          options={bankLists}
                          required
                        />
                        <TextInput
                          form={form}
                          name={`existingLoans.${index}.disbursedAmount`}
                          label="Disbursed Amount"
                          placeholder="Enter amount"
                          type="number"
                          required
                        />
                        <TextInput
                          form={form}
                          name={`existingLoans.${index}.outstanding`}
                          label="Outstanding"
                          placeholder="Enter outstanding amount"
                          type="number"
                          required
                        />
                        <TextInput
                          form={form}
                          name={`existingLoans.${index}.emi`}
                          label="EMI"
                          placeholder="Enter EMI amount"
                          type="number"
                          required
                        />
                        <SelectInput
                          form={form}
                          name={`existingLoans.${index}.adjustmentPlan`}
                          label="Adjustment Plan"
                          options={adjustmentPlans}
                          required
                        />
                      </div>
                    </div>
                  ))}
                  {existingLoanFields.length < 3 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddExistingLoan}
                      className="mt-2"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Another Loan
                    </Button>
                  )}
                </div>
              )}
            </div>
            <Separator className="my-6" />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Credit Card Information</h3>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="hasCreditCard"
                    checked={watchHasCreditCard}
                    onCheckedChange={(checked) => {
                      form.setValue("hasCreditCard", checked);
                      setError(null);
                    }}
                  />
                  <Label htmlFor="hasCreditCard">I have credit cards</Label>
                </div>
              </div>
              {watchHasCreditCard && (
                <div className="space-y-6">
                  {creditCardFields.map((card, index) => (
                    <div
                      key={card.id}
                      className="space-y-4 rounded-md border p-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Card {index + 1}</h4>
                        {creditCardFields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCreditCard(index)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Remove
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <SelectInput
                          form={form}
                          name={`creditCards.${index}.issuerName`}
                          label="Issuer Name"
                          options={bankLists}
                          required
                        />
                        <TextInput
                          form={form}
                          name={`creditCards.${index}.cardLimit`}
                          label="Card Limit"
                          placeholder="Enter card limit"
                          type="number"
                          required
                        />
                        <div className="md:col-span-2">
                          <CheckboxInput
                            form={form}
                            name={`creditCards.${index}.toBeClosedBeforeDisbursement`}
                            label="Card To Be Closed Before Loan Disbursement"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {creditCardFields.length < 5 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddCreditCard}
                      className="mt-2"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Another Card
                    </Button>
                  )}
                </div>
              )}
            </div>
            <Separator className="my-6" />
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Bank Account Details</h3>
              {bankAccountFields.map((account, index) => (
                <div
                  key={account.id}
                  className="space-y-4 rounded-md border p-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Account {index + 1}</h4>
                    {bankAccountFields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeBankAccount(index)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Remove Account
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <ComboBoxInput
                      form={form}
                      name={`bankAccounts.${index}.bankName`}
                      label="Bank Name"
                      options={bankLists}
                      placeholder="Select bank"
                      searchPlaceholder="Search bank..."
                      notFoundText="No bank found."
                      required
                    />
                    <TextInput
                      form={form}
                      name={`bankAccounts.${index}.accountNumber`}
                      label="Account Number"
                      placeholder="Enter account number"
                      type="text"
                      required
                      inputMode="numeric"
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        form.setValue(
                          `bankAccounts.${index}.accountNumber`,
                          value,
                          { shouldValidate: true },
                        );
                      }}
                    />
                  </div>
                </div>
              ))}
              {bankAccountFields.length < 3 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddBankAccount}
                  className="mt-2"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add More Account
                </Button>
              )}
            </div>
            <CardFooter className="mt-8 flex justify-between px-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/user/loan-application/step-3")}
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
