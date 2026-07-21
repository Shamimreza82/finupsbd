"use client";

import {
  getApplication,
  updateApplication,
} from "@/actions/loan-application-form-actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFormContext } from "@/context/loan-application-form-context";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditApplicationPage() {
  const router = useRouter();
  const params = useParams();
  const { updateFormData, formData } = useFormContext();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const applicationId = params.id as string;

  // Fetch application data
  useEffect(() => {
    const fetchApplication = async () => {
      setIsLoading(true);
      try {
        const result = await getApplication(applicationId);
        if (result.success && result.data) {
          // Update form context with fetched data
          updateFormData("personalInfo", result.data.personalInfo);
          updateFormData("residentialInfo", result.data.residentialInfo);
          updateFormData("documentInfo", result.data.documentInfo);
        } else {
          setError(result.error || "Failed to fetch application data");
        }
      } catch (error) {
        console.error("Error fetching application:", error);
        setError("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplication();
  }, [applicationId, updateFormData]);

  // Handle update application
  const handleUpdateApplication = async () => {
    setIsLoading(true);
    try {
      const result = await updateApplication(applicationId, formData);
      if (result.success) {
        router.push("/user/loan-application/success");
      } else {
        setError(result.error || "Failed to update application");
      }
    } catch (error) {
      console.error("Error updating application:", error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-center text-muted-foreground">
            Loading application data...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-red-500">Error</CardTitle>
          <CardDescription>
            There was a problem loading the application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
          <Button
            className="mt-4"
            onClick={() => router.push("/user/loan-application")}
          >
            Return to Applications
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Edit Application</CardTitle>
        <CardDescription>
          You can edit your application details using the form steps.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Navigate through the steps using the sidebar to update your
          information.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <Button
            onClick={() => router.push("/user/loan-application/step-1")}
            variant="outline"
          >
            Edit Personal Information
          </Button>
          <Button
            onClick={() => router.push("/user/loan-application/step-2")}
            variant="outline"
          >
            Edit Residential Information
          </Button>
          <Button
            onClick={() => router.push("/user/loan-application/step-3")}
            variant="outline"
          >
            Edit Documents
          </Button>
        </div>
        <div className="mt-6">
          <Button
            onClick={() => router.push("/user/loan-application/preview")}
            className="mr-4"
          >
            Preview Changes
          </Button>
          <Button onClick={handleUpdateApplication} variant="default">
            Update Application
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
