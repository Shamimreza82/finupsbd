"use client"

import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface SuccessModalProps {
  isOpen?: boolean
  onClose?: () => void
  trackingNumber?: string
}




export default function SuccessModal({
  isOpen,
  onClose,
  trackingNumber,
}: SuccessModalProps) {

  const router = useRouter()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-8 gap-6">
        {/* Close button */}
        <DialogHeader>
          <DialogTitle className="sr-only">Success</DialogTitle>
        </DialogHeader>
        <button
          onClick={() => router.push("/")}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {/* Success icon */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Radiating lines */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 relative">
                {/* Top lines */}
                <div className="absolute top-0 left-1/2 w-0.5 h-3 bg-green-500 -translate-x-1/2"></div>
                <div className="absolute top-1 right-3 w-0.5 h-2 bg-green-500 rotate-45 origin-bottom"></div>
                <div className="absolute top-1 left-3 w-0.5 h-2 bg-green-500 -rotate-45 origin-bottom"></div>

                {/* Side lines */}
                <div className="absolute top-1/2 right-0 w-3 h-0.5 bg-green-500 -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-0 w-3 h-0.5 bg-green-500 -translate-y-1/2"></div>

                {/* Bottom lines */}
                <div className="absolute bottom-0 left-1/2 w-0.5 h-3 bg-green-500 -translate-x-1/2"></div>
                <div className="absolute bottom-1 right-3 w-0.5 h-2 bg-green-500 -rotate-45 origin-top"></div>
                <div className="absolute bottom-1 left-3 w-0.5 h-2 bg-green-500 rotate-45 origin-top"></div>
              </div>
            </div>

            {/* Check icon background */}
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" strokeWidth={3} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">Congratulations!</h2>
            <p className="text-gray-700 font-medium">Your Application is Submitted Successfully</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-900">Tracking Number: {trackingNumber}</p>
            <div className="text-sm text-gray-600">
              We have reviewing your application. Use the tracking number to monitor your status.
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-2">
          <Link href={"/"}>
            <Button
              variant="outline"
              className="flex-1 bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              onClick={onClose}
            >
              Explore More Products
            </Button>
          </Link>

          <Link href={"/track-application/track-application-public"}>
            <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white" onClick={onClose}>
              Track My Application
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}
