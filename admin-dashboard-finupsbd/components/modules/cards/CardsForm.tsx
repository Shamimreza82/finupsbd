/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CreditCardFormData, creditCardFormSchema } from "@/lib/schemas/card-schemas"
import ImageUploaderSingle from "@/components/Small-component/ImageUploaderSingle"
import { BankNames } from "@/lib/constant/bankName"
import { CardFeaturesTypes, CardNetworks, CardTypes, CurrencyTypes } from "@/lib/constant/enum"
import { formatEnums } from "@/lib/utils"
import { useCreateCard } from "@/hooks/useCreateCard"




export function AddCardForm() {

     const [imageFile, setImageFile] = useState<File | null>(null)
     const createCard = useCreateCard()


  const form = useForm<CreditCardFormData>({
    resolver: zodResolver(creditCardFormSchema),
    defaultValues: {
      cardName: "",
      bankName: "",
      // cardType: "CREDIT_CARD",
      // cardNetwork: "AMEX",
      // cardFeaturesType: "CLASSIC",
      currency: "",
      interestPerDay: "",
      regularAnnualFee: "",
      freeAnnualFee: "",
      annualFeeWaivedReward: "",
      interestFreePeriod: "",
      latePaymentFees: "",
      ownBankATMFee: "",
      otherBankATMFee: "",
      cardChequeProcessingFee: "",
      processingFeeMinimum: "",
      freeSupplementaryCards: "",
      maxSupplementaryCards: "",
      loungeFacility: "",
      loungeVisit: "",
      cashWithdrawalLimit: "",
      balanceTransferAvailability: "",
      features: {
        features1: "",
        features2: "",
        features3: "",
        features4: "",
        features5: "",
      },
      eligibility: {
        condition: "",
        offer: "",
        minimumIncome: 0,
        minimumExperience: 0,
        ageRequirement: 0,
      },
      feesCharges: {
        annualFee: "",
        annualFeeWaived: "",
        latePaymentFee: "",
        interestRate: "",
        balanceTransferRate: "",
      },
    }
  })

  const handleImageUpload = (file: File | null) => {
    setImageFile(file)
  }

  async function onSubmit(data: CreditCardFormData) {
    const formData = new FormData()

    if (data) {
      formData.append('data', JSON.stringify(data))
    }

    if (imageFile) {
      formData.append('file', imageFile)
    }

    createCard.mutate(formData, {
      onSuccess: (result) => {
        if (result?.success) {
          form.reset()
          setImageFile(null)
        }
      },
    })
  }



  //// update from section ////////////////////////////////////////////////////////////////////////////////////////////





  return (
    <div className="w-full p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* {submitSuccess && (
            <Alert className="border-green-200 bg-green-50 text-green-900">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>Credit card details submitted successfully!</AlertDescription>
            </Alert>
          )} */}

          {/* Card Details Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl" >Add Card Information</CardTitle>
              <CardDescription>Enter the  card information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="cardName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., EBL Platinum Credit Card" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Eastern Bank PLC" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                  control={form.control}
                  name="bankName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Name</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Banks" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {BankNames.map((bank, idx) => (
                            <SelectItem key={idx} value={bank}>{formatEnums(bank)}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="cardType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select card type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           {CardTypes.map((card, idx) => (
                            <SelectItem key={idx} value={card}>{formatEnums(card)}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cardNetwork"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Network</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select card network" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CardNetworks.map((cardN, idx) => (
                            <SelectItem key={idx} value={cardN}>{formatEnums(cardN)}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="cardFeaturesType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Tier</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select card tier" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CardFeaturesTypes.map((cardF, idx) => (
                            <SelectItem key={idx} value={cardF}>{formatEnums(cardF)}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           {CurrencyTypes.map((currency, idx) => (
                            <SelectItem key={idx} value={currency}>{formatEnums(currency)}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., DUAL, USD, BDT" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </div>
            </CardContent>
          </Card>

          {/* Interest & Annual Fee Section */}
          <Card>
            <CardHeader>
              <CardTitle>Interest & Annual Fees</CardTitle>
              <CardDescription>Configure interest rates and annual fee structure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="interestPerDay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Daily Interest Rate</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 0.055%" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="interestFreePeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interest-Free Period</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Up to 50 days" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="regularAnnualFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Regular Annual Fee</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., BDT 3,000 per year" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="freeAnnualFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Free Annual Fee Terms</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., First year free" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="annualFeeWaivedReward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Fee Waived Reward</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Spend BDT 200,000 annually to waive next year's fee" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="latePaymentFees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Late Payment Fees</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., BDT 500 or 2% of due, whichever is higher" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* ATM & Fees Section */}
          <Card>
            <CardHeader>
              <CardTitle>ATM & Transaction Fees</CardTitle>
              <CardDescription>Set ATM withdrawal and processing fees</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="ownBankATMFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Own Bank ATM Fee</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Free" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="otherBankATMFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Other Bank ATM Fee</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., BDT 100 per withdrawal" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cardChequeProcessingFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Cheque Processing Fee</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., BDT 300 per cheque" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="processingFeeMinimum"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Processing Fee Minimum</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., BDT 500 or 2%, whichever is higher" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cashWithdrawalLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cash Withdrawal Limit</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 50% of credit limit" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="balanceTransferAvailability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Balance Transfer Availability</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Available up to 80% of limit" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Supplementary Cards & Lounge Section */}
          <Card>
            <CardHeader>
              <CardTitle>Supplementary Cards & Benefits</CardTitle>
              <CardDescription>Configure supplementary cards and lounge access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="freeSupplementaryCards"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Free Supplementary Cards</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxSupplementaryCards"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Supplementary Cards</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="loungeFacility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lounge Facility</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., International + Domestic lounges" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="loungeVisit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lounge Visits per Year</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 8 free visits per year" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Features Section */}
          <Card>
            <CardHeader>
              <CardTitle>Card Features</CardTitle>
              <CardDescription>List the key features of this card</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[1, 2, 3, 4, 5].map((num) => (
                <FormField
                  key={num}
                  control={form.control}
                  name={`features.features${num}` as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feature {num}</FormLabel>
                      <FormControl>
                        <Textarea placeholder={`Enter feature ${num}`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </CardContent>
          </Card>

          {/* Eligibility Section */}
          <Card>
            <CardHeader>
              <CardTitle>Eligibility Requirements</CardTitle>
              <CardDescription>Specify the eligibility criteria for cardholders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="eligibility.condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Eligibility Condition</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Bangladeshi citizens with stable income" {...field} />
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
                    <FormLabel>Special Offer</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Priority processing for salaried professionals" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="eligibility.minimumIncome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Income (BDT)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 40000"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
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
                      <FormLabel>Minimum Experience (Years)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 12"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
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
                      <FormLabel>Minimum Age (Years)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 21"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Fees & Charges Section */}
          <Card>
            <CardHeader>
              <CardTitle>Fees & Charges</CardTitle>
              <CardDescription>Summary of all fees and charges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="feesCharges.annualFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Fee</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., BDT 3,000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="feesCharges.annualFeeWaived"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Fee Waived Condition</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Spend BDT 200,000 annually to waive next year's fee" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="feesCharges.latePaymentFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Late Payment Fee</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., BDT 500 or 2% of due, whichever is higher" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="feesCharges.interestRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interest Rate (per annum)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 20% per annum" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="feesCharges.balanceTransferRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Balance Transfer Rate (per annum)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 12% per annum" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <ImageUploaderSingle label="Card Image" onChange={handleImageUpload} />

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => form.reset()} disabled={createCard.isPending}>
              Reset
            </Button>
            <Button type="submit" disabled={createCard.isPending}>
              {createCard.isPending ? "Submitting..." : "Submit Card Details"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
