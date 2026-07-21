"use client";

import { Progress } from "@/components/ui/progress";
import { useFormContext } from "@/context/loan-application-form-context";
import { usePathname } from "next/navigation";

export function FormProgress() {
  const { isStepCompleted } = useFormContext();
  const pathname = usePathname();

  // Update the getCurrentStep function
  const getCurrentStep = (): number => {
    if (pathname.includes("step-1")) return 1;
    if (pathname.includes("step-2")) return 2;
    if (pathname.includes("step-3")) return 3;
    if (pathname.includes("step-4")) return 4;
    if (pathname.includes("step-5")) return 5;
    if (pathname.includes("step-6")) return 6;
    if (pathname.includes("step-7")) return 7;
    if (pathname.includes("preview")) return 8;
    return 0;
  };

  // Update the totalSteps
  const totalSteps = 8; // Updated to include the new step

  // Update the calculateProgress function
  const calculateProgress = (): number => {
    const completedSteps = [
      isStepCompleted("personalInfo"),
      isStepCompleted("residentialInfo"),
      isStepCompleted("employmentInfo"),
      isStepCompleted("loanInfo"),
      isStepCompleted("loanRequest"),
      isStepCompleted("documentInfo"),
      isStepCompleted("guarantorInfo"),
    ].filter(Boolean).length;

    // If on preview page, count it as a step
    const progress =
      currentStep === 8
        ? ((completedSteps + 1) / totalSteps) * 100
        : (completedSteps / totalSteps) * 100;

    return Math.max(progress, (currentStep / totalSteps) * 100);
  };

  const currentStep = getCurrentStep();

  return (
    <div className="mb-6 w-full space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          Step {currentStep}/{totalSteps}
        </span>
        <span className="text-sm text-muted-foreground">
          {Math.round(calculateProgress())}% Complete
        </span>
      </div>
      <Progress value={calculateProgress()} className="h-2" />
    </div>
  );
}
