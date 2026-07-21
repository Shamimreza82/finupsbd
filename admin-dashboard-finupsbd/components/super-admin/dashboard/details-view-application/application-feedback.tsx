/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { TLoanStatusType } from "@/types/sharedTypes";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useApplicationFeedback } from "@/hooks/useApplicationFeedback";



// ✅ Zod schema with conditional validation
const feedbackSchema = z.object({
  status: z.custom<TLoanStatusType>(
    (val) => typeof val === "string" && val.length > 0,
    { message: "Status is required" }
  ),
  adminNote: z.string().min(5, "Admin Note must be at least 5 characters"),
  additionalDocRequired: z.boolean(),
}).refine(
  (data) => data.status !== "PENDING" || data.additionalDocRequired === true,
  {
    message: "Please confirm that additional documents are required for PENDING status",
    path: ["additionalDocRequired"],
  }
);

type FeedbackFormValues = z.infer<typeof feedbackSchema>;



export function ApplicationFeedBackForm({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const feedbackMutation = useApplicationFeedback()


  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      status: undefined,
      adminNote: "",
      additionalDocRequired: false,
    },
  });



  const onSubmit: SubmitHandler<FeedbackFormValues> = (values) => {
    feedbackMutation.mutate(
      {
        id,
        payload: {
          status: values.status,
          adminNote: values.adminNote,
          additionalDocuments: values.additionalDocRequired,
        },
      },
      {
        onSuccess: (result) => {
          if (result?.success) {
            form.reset()
            setOpen(false);
          }
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold shadow-lg hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition-all duration-300 ease-in-out"
        >
          Feedback
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Application Feedback
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Update the application status and provide necessary feedback.
          </DialogDescription>
        </DialogHeader>

        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-base font-medium">Feedback Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

              {/* Status */}
              <div className="space-y-2">
                <Label>Status <span className="text-red-500">*</span></Label>
                <Select
                  value={form.watch("status")}
                  onValueChange={(value) =>
                    form.setValue("status", value as TLoanStatusType, { shouldValidate: true })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SUBMITTED">SUBMITTED</SelectItem>
                    <SelectItem value="PENDING">PENDING</SelectItem>
                    <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                    <SelectItem value="APPROVED">APPROVED</SelectItem>
                    <SelectItem value="REJECTED">REJECTED</SelectItem>
                    <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.status && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.status.message as string}
                  </p>
                )}
              </div>

              {/* Admin Note */}
              <div className="space-y-2">
                <Label>Admin Note <span className="text-red-500">*</span></Label>
                <Textarea
                  className="min-h-[120px] resize-none border-2 border-gray-200 focus:border-purple-400 transition-colors"
                  placeholder="Write a detailed note for the applicant, including reasons, instructions, or next steps..."
                  {...form.register("adminNote")}
                />
                {form.formState.errors.adminNote && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.adminNote.message}
                  </p>
                )}
              </div>

              {/* Additional Document Required */}
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={form.watch("additionalDocRequired")}
                  onCheckedChange={(checked) =>
                    form.setValue("additionalDocRequired", checked === true, { shouldValidate: true })
                  }
                />
                <Label className="text-sm font-medium">
                  Additional Document Required {form.watch("status") === "PENDING" && <span className="text-red-500">*</span>}
                </Label>
              </div>
              {form.formState.errors.additionalDocRequired && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.additionalDocRequired.message}
                </p>
              )}

              <Button type="submit" disabled={feedbackMutation.isPending} className="w-full">
                {feedbackMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  "Submit Feedback"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
