import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { ModuleStatusToggleButton } from "@/components/common/ModuleStatusToggleButton"
import { formatEnums } from "@/lib/utils"
import { formatError } from "zod/v4/core"

interface Eligibility {
  condition: string
  offer: string
  minimumIncome: number
  minimumExperience: number
  ageRequirement: number
}

interface Features {
  loanAmount: string
  minimumAmount: string
  maximumAmount: string
  loanTenure: string
  minimumYear: string
  maximumYear: string
}

interface FeesCharges {
  processingFee: string
  earlySettlementFee: string
  prepaymentFee: string
  LoanReSchedulingFee: string
  penalCharge: string
}

interface TLoanData {
  id: string
  bankName: string
  amount: number | null
  coverImage: string
  periodMonths: number | null
  processingFee: string
  interestRate: string
  monthlyEmi: number | null
  totalAmount: number | null
  eligibleLoan: number | null
  loanType: string
  isActive: boolean
  eligibility: Eligibility
  features: Features
  feesCharges: FeesCharges
}

export default function DetailsViewLoan({ data }: { data: TLoanData }) {


  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <Card className="overflow-hidden shadow-lg border-2">
        {/* Header with image and bank info */}
        <div className="relative h-56 overflow-hidden">
          <Image 
             src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data.coverImage}`} 
            alt={data.bankName} 
            fill 
            className="object-cover" 
          />
          <div className="absolute inset-0 flex items-end p-8">
            <div className="w-full">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{formatEnums(data.bankName)}</h2>
                  <p className="text-white/90 text-lg">{formatEnums(data.loanType)}</p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <ModuleStatusToggleButton
                    id={data.id}
                    isActive={data.isActive}
                  />
                  <Badge 
                    variant={data.isActive ? "default" : "secondary"} 
                    className="text-base px-4 py-1.5 font-semibold"
                  >
                    {data.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-8 space-y-8">
          {/* Key Metrics - Enhanced */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200 shadow-sm">
              <p className="text-sm font-medium text-green-700 mb-1">Processing Fee</p>
              <p className="text-3xl font-bold text-green-900">{data.processingFee}%</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 shadow-sm">
              <p className="text-sm font-medium text-blue-700 mb-1">Interest Rate</p>
              <p className="text-3xl font-bold text-blue-900">{data.interestRate}%</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200 shadow-sm">
              <p className="text-sm font-medium text-purple-700 mb-1">Loan Tenure</p>
              <p className="text-3xl font-bold text-purple-900">{data.features.loanTenure}</p>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Two Column Layout for Better Visibility */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Eligibility Requirements */}
            <div className="bg-slate-50 p-6 rounded-xl border-2 border-slate-200">
              <h3 className="font-bold text-xl mb-5 text-slate-800 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded"></span>
                Eligibility Requirements
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Minimum Income</span>
                  <p className="text-2xl font-bold text-slate-900 mt-1">₹{data.eligibility.minimumIncome.toLocaleString()}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Minimum Experience</span>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{data.eligibility.minimumExperience} years</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Age Requirement</span>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{data.eligibility.ageRequirement} years</p>
                </div>
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-lg shadow-md">
                  <p className="text-xs font-semibold text-white/80 uppercase tracking-wide mb-1">Special Offer</p>
                  <p className="text-sm font-medium text-white leading-relaxed">
                    {data.eligibility.offer}
                  </p>
                </div>
              </div>
            </div>

            {/* Loan Features */}
            <div className="bg-slate-50 p-6 rounded-xl border-2 border-slate-200">
              <h3 className="font-bold text-xl mb-5 text-slate-800 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-green-600 rounded"></span>
                Loan Features
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Loan Amount Range</span>
                  <p className="text-xl font-bold text-slate-900 mt-1">
                    {data.features.minimumAmount} - {data.features.maximumAmount}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Tenure Range</span>
                  <p className="text-xl font-bold text-slate-900 mt-1">
                    {data.features.minimumYear} - {data.features.maximumYear}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Fees & Charges - Full Width with Grid */}
          <div className="bg-amber-50 p-6 rounded-xl border-2 border-amber-200">
            <h3 className="font-bold text-xl mb-5 text-slate-800 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-amber-600 rounded"></span>
              Fees & Charges
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-lg border border-amber-200 text-center">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Early Settlement</p>
                <p className="text-2xl font-bold text-slate-900">{data.feesCharges.earlySettlementFee}</p>
              </div>
              <div className="bg-white p-5 rounded-lg border border-amber-200 text-center">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Prepayment</p>
                <p className="text-2xl font-bold text-slate-900">{data.feesCharges.prepaymentFee}</p>
              </div>
              <div className="bg-white p-5 rounded-lg border border-amber-200 text-center">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Rescheduling</p>
                <p className="text-2xl font-bold text-slate-900">{data.feesCharges.LoanReSchedulingFee}</p>
              </div>
              <div className="bg-white p-5 rounded-lg border border-amber-200 text-center">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Penal Charge</p>
                <p className="text-2xl font-bold text-slate-900">{data.feesCharges.penalCharge}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}