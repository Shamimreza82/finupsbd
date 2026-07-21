"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ShieldCheck, AlertCircle } from "lucide-react"

type ConfirmSubmitDialogProps = {
  buttonText?: string
  confirmText?: string
  title?: string
  description?: string
  onConfirm?: () => Promise<void> | void
}

export default function ConfirmSubmitDialog({
  buttonText = "Submit application",
  confirmText = "Confirm",
  title = "Confirm submission",
  description = "Please confirm you want to submit your application. You must agree to the Privacy Policy before continuing.",
  onConfirm = async () => {
    // Default demo handler
    alert("Your application has been submitted.")
  },
}: ConfirmSubmitDialogProps) {
  const [open, setOpen] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleConfirm() {
    try {
      setSubmitting(true)
      await onConfirm()
      setOpen(false)
      setAgreed(false)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v)
        if (!v) setAgreed(false)
      }}
    >
      <DialogTrigger asChild>
        <Button aria-label={buttonText}>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent aria-describedby="confirm-description">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            {title}
          </DialogTitle>
          <DialogDescription id="confirm-description">{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-md border p-3">
            <Checkbox
              id="agree"
              checked={agreed}
              onCheckedChange={(v) => setAgreed(Boolean(v))}
              aria-describedby="agree-helper"
            />
            <div className="grid gap-1">
              <Label htmlFor="agree" className="font-medium cursor-pointer">
                I have read and agree to the Privacy Policy
              </Label>
              <p id="agree-helper" className="text-sm text-muted-foreground">
                You must agree before submitting.{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Privacy Policy
                </Link>
              </p>
            </div>
          </div>

          {!agreed && (
            <div className="flex items-start gap-2 text-amber-600">
              <AlertCircle className="h-4 w-4 mt-0.5" aria-hidden="true" />
              <p className="text-sm">Please check the box to continue.</p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!agreed || submitting}>
            {submitting ? "Submitting..." : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
