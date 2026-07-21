"use client"

import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoanFormData, LoanSchema } from "@/lib/schemas/loan-schemas"
import { BankNames } from "@/lib/constant/bankName"
import { useCreateLoan } from "@/hooks/useCreateLoan"
import { formatEnums } from "@/lib/utils"
import ImageUploaderSingle from "@/components/Small-component/ImageUploaderSingle"


const LOAN_TYPES = ["PERSONAL_LOAN", "HOME_LOAN", "CAR_LOAN", "SME_LOAN", "INSTANT_LOAN"]


export function AddLoanForm() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const createLoan = useCreateLoan()




  const form = useForm<LoanFormData>({
    resolver: zodResolver(LoanSchema),
    defaultValues: {
      // bankName: "AB_BANK_PLC",
      // loanType: "PERSONAL_LOAN",
      processingFee: "",
      interestRate: "",
      eligibility: {
        condition: "",
        offer: "",
        minimumIncome: 0,
        minimumExperience: 0,
        ageRequirement: 18,
      },
      feesCharges: {
        processingFee: "",
        earlySettlementFee: "",
        prepaymentFee: "",
        LoanReSchedulingFee: "",
        penalCharge: "",
      },
      features: {
        loanAmount: "",
        minimumAmount: "",
        maximumAmount: "",
        loanTenure: "",
        minimumYear: "",
        maximumYear: "",
      },
    },
  })




  const handleImageUpload = (file: File | null) => {
    setImageFile(file)
    // you can also set this in react-hook-form
    // form.setValue("coverImage", file)
  }




  const onSubmit = async (data: LoanFormData) => {
    const formData = new FormData()

    if (data) {
      formData.append('data', JSON.stringify(data))
    }

    if (imageFile) {
      formData.append('file', imageFile)
    }

    createLoan.mutate(formData, {
      onSuccess: (result) => {
        if (result?.success) {
          form.reset()
          setImageFile(null)
        }
      },
    })
  }

  return (
    <Card className="w-full shadow-lg p-4">
      <CardHeader >
        <CardTitle className="text-2xl" >Add Loan Information</CardTitle>
        <CardDescription>Fill in the loan details below. Fields marked with * are required.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Required Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Required Information</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Bank Name */}
                <FormField
                  control={form.control}
                  name="bankName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Name *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a bank" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {BankNames.map((bank) => (
                            <SelectItem key={bank} value={bank}>
                              {formatEnums(bank)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Loan Type */}
                <FormField
                  control={form.control}
                  name="loanType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loan Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select loan type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {LOAN_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {formatEnums(type)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Processing Fee */}
                <FormField
                  control={form.control}
                  name="processingFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Processing Fee (%) *</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" min="0" max="100" placeholder="e.g., 0.5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Interest Rate */}
                <FormField
                  control={form.control}
                  name="interestRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interest Rate (%) *</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" min="0" max="100" placeholder="e.g., 13.0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Loan Details Section */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-sm font-semibold">Loan Details</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                Loan Amount
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loan Amount</FormLabel>
                      <FormControl>
                        <Input disabled placeholder="e.g., BDT 100,000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Period (Months) */}
                <FormField
                  control={form.control}
                  name="periodMonths"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Period (Months)</FormLabel>
                      <FormControl>
                        <Input disabled placeholder="e.g., 12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Monthly EMI */}
                <FormField
                  control={form.control}
                  name="monthlyEmi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly EMI</FormLabel>
                      <FormControl>
                        <Input disabled placeholder="e.g., 9,000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Total Amount */}
                <FormField
                  control={form.control}
                  name="totalAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Amount</FormLabel>
                      <FormControl>
                        <Input disabled placeholder="e.g., 108,000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Eligible Loan */}
                <FormField
                  control={form.control}
                  name="eligibleLoan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Eligible Loan</FormLabel>
                      <FormControl>
                        <Input disabled placeholder="e.g., Up to 3x monthly income" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Features Section */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-sm font-semibold">Loan Features *</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="features.loanAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loan Amount *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., BDT 100,000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="features.minimumAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Amount *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., BDT 10,000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="features.maximumAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Amount *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., BDT 300,000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="features.loanTenure"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loan Tenure *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 6–12 months" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="features.minimumYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Year *</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" placeholder="e.g., 0.5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="features.maximumYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Year *</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" placeholder="e.g., 1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Eligibility Section */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-sm font-semibold">Eligibility Criteria *</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="eligibility.condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condition *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Salaried employee with payroll account" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eligibility.offer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Offer *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Disbursement within 24 hours" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eligibility.minimumIncome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Income *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 20000"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eligibility.minimumExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Experience (Years) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 6"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eligibility.ageRequirement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age Requirement *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 21"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Fees & Charges Section */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-sm font-semibold">Fees & Charges *</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="feesCharges.processingFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Processing Fee *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 0.5%" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="feesCharges.earlySettlementFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Early Settlement Fee *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 1%" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="feesCharges.prepaymentFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prepayment Fee *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 0.5%" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="feesCharges.LoanReSchedulingFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loan Rescheduling Fee *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., BDT 300" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="feesCharges.penalCharge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Penal Charge *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2% per month on overdue" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Cover Image Section */}
            {/* <div className="space-y-4 border-t pt-6">
              <h3 className="text-sm font-semibold">Cover Image</h3>

              {!imagePreview ? (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-colors ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50 hover:border-gray-400"
                    }`}
                >
                  <input
                    type="file"
                    id="coverImage"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                  <label htmlFor="coverImage" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Drag and drop your image here</p>
                        <p className="text-xs text-gray-500">or click to select a file</p>
                      </div>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="relative inline-block w-full">
                    <Image
                      height={200}
                      width={200}
                      src={imagePreview || "/placeholder.svg"}
                      alt="Cover preview"
                      className="h-48 w-full rounded-lg border border-gray-200 object-cover shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <label htmlFor="coverImage" className="block">
                    <input
                      type="file"
                      id="coverImage"
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                    <span className="inline-block cursor-pointer rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                      Change Image
                    </span>
                  </label>
                </div>
              )}
            </div> */}
        <ImageUploaderSingle label="Loan Image" onChange={handleImageUpload} />


            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={createLoan.isPending} className="flex-1">
                {createLoan.isPending ? "Creating..." : "Create Loan"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset()
                 window.location.reload();
                }}
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
