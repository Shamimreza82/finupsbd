// components/EmailTrackingDialog.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";






interface EmailTrackingDialogProps {
  submitData: any;
  onResendEmail: () => Promise<void> | void;
  setOpen: (visible: boolean) => void;
  open: boolean;
}

export function EmailTrackingDialog({
  submitData ,
  onResendEmail,
  setOpen,
  open
}: EmailTrackingDialogProps) {
  const [resending, setResending] = useState(false);
  const [canResend, setCanResend] = useState(true);




  useEffect(() => {
    if (!open) {
      setCanResend(false);
      return;
    }
    const timer = setTimeout(() => setCanResend(false), 60000);

    return () => clearTimeout(timer);
  }, [open]);


  const handleResend = async () => {
    setResending(true);
    try {
      await onResendEmail();
    } finally {
      setResending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center mb-3">Verification Sent</DialogTitle>
          <DialogDescription>
           {submitData?.message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {/* <Button
            variant="default"
            onClick={handleResend}
            disabled={canResend}
            className="font-medium"
          >
            {resending ? "Resending..." : "Resend Email"}
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/** e.g. "johndoe@example.com" → "jo****@example.com" */
// function maskEmail(raw: string) {
//   const [local, domain] = raw.split("@");
//   const visible = local.length <= 2 ? local.slice(0, 1) : local.slice(0, 2);
//   return `${visible}****@${domain}`;
// }
