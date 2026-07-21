/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { CheckCircle,  Loader2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { TLoanStatusType } from "@/types/sharedTypes"
import { Icon } from "@radix-ui/react-select"

const getSteps = (status: TLoanStatusType) => {
  const steps = [
    { label: "Submitted", key: "SUBMITTED" },
    { label: "Pending", key: "PENDING" },
    { label: "In Progress", key: "IN_PROGRESS" },
    {
      label: status === "REJECTED" ? "Rejected" : "Approved",
      key: status === "REJECTED" ? "REJECTED" : "APPROVED",
    },
  ]

  if (status === "COMPLETED" || status === "APPROVED") {
    steps.push({ label: "Completed", key: "COMPLETED" })
  }

  return steps
}

const statusOrder: Record<TLoanStatusType, number> = {
  SUBMITTED: 1,
  PENDING: 2,
  IN_PROGRESS: 3,
  APPROVED: 4,
  REJECTED: 4,
  COMPLETED: 5,
}

const getColor = (status: TLoanStatusType) => {
  switch (status) {
    case "REJECTED":
      return "bg-red-500"
    case "APPROVED":
    case "COMPLETED":
      return "bg-green-500"
    default:
      return "bg-blue-500"
  }
}

const StatusProgressBar = ({ status }: { status: TLoanStatusType }) => {
  const steps = getSteps(status)
  const currentStepIndex = steps.findIndex((step) => step.key === status)
  const totalSteps = steps.length
  const percent = (currentStepIndex / (totalSteps - 1)) * 100

  return (
    <div className="relative w-full overflow-x-auto py-6 border-2 p-5 rounded-2xl shadow">
      {/* Bar background */}
      <div className="absolute top-9 left-8 right-8 h-1 bg-muted/30 rounded-full z-0" />

      {/* Progress fill */}
      <div
        className={cn(
          "absolute top-9 left-8 h-1 rounded-full transition-all duration-500 z-10",
          getColor(status)
        )}
        style={{ width: `${percent}%` }}
      />

      {/* Steps */}
      <div className="flex items-center justify-between px-4 relative z-20">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStepIndex
          const isCurrent = idx === currentStepIndex

          let icon: React.ReactNode = idx + 1
          if (step.key === "REJECTED") {
            icon = <XCircle className="w-5 h-5 text-red-600" />
          } else if (isCompleted) {
            icon = <CheckCircle className="w-5 h-5 text-green-600" />
          } else if (isCurrent) {
            icon = <Loader2 className="w-5 h-5 animate-spin" />
          }

          return (
            <div key={step.key} className="flex flex-col items-center text-center">
              <div
                className={cn(
                  "flex items-center justify-center w-9 h-9 rounded-full border-2 text-xs font-semibold transition-all duration-300",
                  step.key === "REJECTED"
                    ? "bg-red-100 text-red-700 border-red-500"
                    : isCurrent
                    ? "bg-blue-500 text-white border-blue-600"
                    : isCompleted
                    ? "bg-green-500 text-white border-green-600"
                    : "bg-muted text-muted-foreground border-muted"
                )}
              >
                {icon}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs whitespace-nowrap",
                  step.key === "REJECTED"
                    ? "text-red-600 font-semibold"
                    : isCurrent
                    ? "text-blue-600 font-medium"
                    : isCompleted
                    ? "text-green-600"
                    : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StatusProgressBar
