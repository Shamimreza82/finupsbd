"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFormContext } from "@/context/loan-application-form-context";
import { AlertCircle, CheckCircle2, Upload } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isFormSubmitted, resetForm, enableDocumentEditing } =
    useFormContext();
  const [error, setError] = useState<string | null>(null);

  // Get application ID from URL query parameter
  const applicationId = searchParams.get("id") || "Unknown";

  // Redirect if form is not submitted
  useEffect(() => {
    if (!isFormSubmitted) {
      router.push("/user/loan-application");
    }
  }, [isFormSubmitted, router]);

  // Handle starting a new application
  const handleNewApplication = () => {
    resetForm();
    router.push("/user/loan-application");
  };

  // Handle document update
  const handleDocumentUpdate = () => {
    try {
      enableDocumentEditing();
      router.push(`/loan-application/step-6?id=${applicationId}`);
    } catch (error) {
      console.error("Error enabling document editing:", error);
      setError("Failed to enable document editing. Please try again.");
    }
  };

  return (
    <Card className="w-full">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl">
          Application Submitted Successfully!
        </CardTitle>
        <CardDescription>
          Thank you for completing your application. We have received your
          information.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="mb-4">
          Your application has been submitted and is now being processed. You
          will receive a confirmation email shortly.
        </p>
        <p className="text-sm text-muted-foreground">
          Application ID: {applicationId}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex w-full justify-center gap-4">
          <Button variant="outline" onClick={handleNewApplication}>
            Start New Application
          </Button>
          <Button onClick={() => router.push("/")}>Return to Home</Button>
        </div>
        <div className="w-full border-t pt-4">
          <p className="mb-2 text-sm text-muted-foreground">
            Need to update your documents?
          </p>
          <Button
            variant="outline"
            onClick={handleDocumentUpdate}
            className="flex gap-2"
          >
            <Upload className="h-4 w-4" />
            Update Documents
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
