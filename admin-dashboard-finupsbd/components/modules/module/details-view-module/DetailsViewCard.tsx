"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, DollarSign, Users, CheckCircle2, AlertCircle } from "lucide-react"
import Image from "next/image"
import { ModuleStatusToggleButton } from "@/components/common/ModuleStatusToggleButton"

interface CardData {
  cardName: string
  cardImage: string
  cardNetwork: string
  cardFeaturesType: string
  bankName: string
  isActive: boolean
  currency: string
  features: Record<string, string>
  feesCharges: Record<string, string>
  eligibility: Record<string, string | number>
  [key: string]: any
}

export default function DetailsViewCard({ data }: { data: CardData }) {

 
  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">{data?.cardName }</h1>
            <ModuleStatusToggleButton
            id={data.id}
            isActive={data.isActive}
            />
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="default">{data.cardFeaturesType}</Badge>
            <Badge variant="secondary">{data.cardNetwork}</Badge>
            {data.isActive && <Badge className="bg-green-600">Active</Badge>}
          </div>
        </div>
      </div>

      {/* Card Image and Quick Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="overflow-hidden">
            <div className="relative aspect-video bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data.cardImage}`}
                alt={data.cardName}
                width={320}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Issued by</p>
              <p className="font-semibold text-foreground">{data.bankName}</p>
            </div>
          </Card>
        </div>

        {/* Quick Facts */}
        <div className="">
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Annual Fee</p>
                <p className="font-semibold text-foreground">{data.freeAnnualFee}</p>
                <p className="text-xs text-muted-foreground mt-1">{data.regularAnnualFee}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Interest-Free Period</p>
                <p className="font-semibold text-foreground">{data.interestFreePeriod}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Supplementary Cards</p>
                <p className="font-semibold text-foreground">{data.freeSupplementaryCards} Free</p>
                <p className="text-xs text-muted-foreground mt-1">Up to {data.maxSupplementaryCards}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Currency</p>
                <p className="font-semibold text-foreground">{data.currency}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-primary" />
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(data.features)
            .filter(([key]) => key.startsWith("features"))
            .map(([, value]) => (
              <div key={value} className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-foreground text-sm">{value}</p>
              </div>
            ))}
        </div>
      </Card>

      {/* Fees & Charges */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-destructive" />
          Fees & Charges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(data.feesCharges)
            .filter(([key]) => key !== "cardId" && key !== "id")
            .map(([key, value]) => (
              <div key={key} className="border border-border rounded-lg p-3">
                <p className="text-sm text-muted-foreground capitalize mb-1">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                <p className="font-semibold text-foreground">{value}</p>
              </div>
            ))}
        </div>
      </Card>

      {/* ATM & Limits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-2">Own Bank ATM</p>
          <p className="font-semibold text-foreground text-lg">{data.ownBankATMFee}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-2">Other Bank ATM</p>
          <p className="font-semibold text-foreground text-lg">{data.otherBankATMFee}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-2">Cash Withdrawal Limit</p>
          <p className="font-semibold text-foreground text-lg">{data.cashWithdrawalLimit}</p>
        </Card>
      </div>

      {/* Lounge Access */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-0">
        <h3 className="text-xl font-bold text-foreground mb-4">Lounge Access</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Facility</p>
            <p className="font-semibold text-foreground">{data.loungeFacility}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Annual Visits</p>
            <p className="font-semibold text-foreground">{data.loungeVisit}</p>
          </div>
        </div>
      </Card>

      {/* Eligibility */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">Eligibility Requirements</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-foreground">Minimum Age</span>
            <span className="font-semibold text-foreground">{data.eligibility.ageRequirement} years</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-foreground">Minimum Income</span>
            <span className="font-semibold text-foreground">
              BDT {data.eligibility.minimumIncome?.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-foreground">Work Experience</span>
            <span className="font-semibold text-foreground">{data.eligibility.minimumExperience} months</span>
          </div>
          <div className="pt-2">
            <p className="text-sm text-muted-foreground mb-2">Condition</p>
            <p className="text-foreground font-medium">{data.eligibility.condition}</p>
          </div>
          <div className="pt-3 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">Special Offer</p>
            <p className="text-foreground font-medium">{data.eligibility.offer}</p>
          </div>
        </div>
      </Card>

      {/* Additional Benefits */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">Additional Benefits</h2>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Balance Transfer</p>
            <p className="font-semibold text-foreground">{data.balanceTransferAvailability}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Interest-Free Period</p>
            <p className="font-semibold text-foreground">{data.interestFreePeriod}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Annual Fee Waiver</p>
            <p className="font-semibold text-foreground">{data.annualFeeWaivedReward}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Cheque Processing</p>
            <p className="font-semibold text-foreground">{data.cardChequeProcessingFee}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
