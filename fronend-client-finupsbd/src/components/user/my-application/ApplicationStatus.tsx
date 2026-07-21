"use client"

import { Check, Circle, Clock, X } from "lucide-react"
import { cva } from "class-variance-authority"

export enum LoanStatus {
  SUBMITTED = "SUBMITTED",
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  COMPLETED = "COMPLETED", // backend only
}

interface ApplicationTrackerProps {
  status: LoanStatus
  message?: string
}

// Step circle style
const stepStyles = cva(
  "w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300",
  {
    variants: {
      state: {
        completed: "bg-green-500",
        current: "bg-blue-500",
        upcoming: "bg-gray-200 text-gray-500",
        rejected: "bg-red-500",
      },
    },
    defaultVariants: {
      state: "upcoming",
    },
  }
)

// Filter out COMPLETED for user-facing UI
const statusSteps = [
  {
    key: LoanStatus.SUBMITTED,
    label: "Submitted",
    icon: Check,
  },
  {
    key: LoanStatus.PENDING,
    label: "Pending",
    icon: Circle,
  },
  {
    key: LoanStatus.IN_PROGRESS,
    label: "In Progress",
    icon: Clock,
  },
  {
    key: LoanStatus.APPROVED,
    label: "Approved",
    icon: Check,
  },
  {
    key: LoanStatus.REJECTED,
    label: "Rejected",
    icon: X,
  },
]

export default function ApplicationStatus({
  status = LoanStatus.REJECTED,
  message = "Your loan application is under review",
}: ApplicationTrackerProps) {
  const displaySteps = statusSteps.filter(
    (step) => step.key !== LoanStatus.REJECTED || status === LoanStatus.REJECTED
  )

  const currentIndex = displaySteps.findIndex((step) => step.key === status)
  const isRejected = status === LoanStatus.REJECTED
  const isApproved = status === LoanStatus.APPROVED

  const progressPercentage = isRejected ? 100 : (currentIndex / (displaySteps.length - 1)) * 100

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-slate-900 mb-6">Application Status</h1>

        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <div className="flex items-center justify-center mb-8">
            <div
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                isRejected
                  ? "bg-red-100 text-red-700"
                  : isApproved
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {status.replace("_", " ")}
            </div>
          </div>

          <p className="text-center font-medium text-lg mb-10">{message}</p>

          <div className="relative flex justify-between items-center max-w-3xl mx-auto mb-16">
            {/* Background progress line */}
            <div className="absolute left-0 top-1/2 h-1 bg-gray-200 w-full -translate-y-1/2 z-0 rounded-full" />

            {/* Active progress line */}
            <div
              className={`absolute left-0 top-1/2 h-1 rounded-full -translate-y-1/2 z-0 transition-all duration-500 ease-in-out ${
                isRejected ? "bg-red-500" : "bg-green-500"
              }`}
              style={{ width: `${progressPercentage}%` }}
            />

            {/* Steps */}
            {displaySteps.map((step, index) => {
              let state: "completed" | "current" | "upcoming" | "rejected" = "upcoming"

              if (isRejected && step.key === LoanStatus.REJECTED) {
                state = "rejected"
              } else if (index < currentIndex) {
                state = "completed"
              } else if (index === currentIndex) {
                state = "current"
              }

              const Icon = step.icon

              return (
                <div key={step.key} className="relative z-10 flex flex-col items-center">
                  <div className={stepStyles({ state })}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="mt-2 text-sm font-medium">{step.label}</span>
                </div>
              )
            })}
          </div>

          {/* Extra info */}
          {isRejected && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700 text-sm">
              <p className="font-medium">Application Rejected</p>
              <p className="mt-1">
                We're sorry, but your application has been rejected. Please contact our support team for more info.
              </p>
            </div>
          )}

          {isApproved && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 text-green-700 text-sm">
              <p className="font-medium">Application Approved</p>
              <p className="mt-1">
                Congratulations! Your application has been approved. We’ll reach out soon for next steps.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
