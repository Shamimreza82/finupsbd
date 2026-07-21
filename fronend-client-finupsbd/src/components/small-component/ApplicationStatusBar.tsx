// components/ApplicationStatusBar.tsx
"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle2, XCircle, Clock, Loader2 } from "lucide-react";

export type LoanStatus =
  | "SUBMITTED"
  | "PENDING"
  | "IN_PROGRESS"
  | "APPROVED"
  | "REJECTED"
  | "COMPLETED";

type Step = {
  key: LoanStatus;
  label: string;
};

const STEPS: Step[] = [
  { key: "SUBMITTED",   label: "Submitted" },
  { key: "PENDING",     label: "Pending" },
  { key: "IN_PROGRESS", label: "In Progress" },
  { key: "APPROVED",    label: "Approved" },
  { key: "REJECTED",    label: "Rejected" },
  { key: "COMPLETED",   label: "Completed" },
];

const stepIndex = (status: LoanStatus) => STEPS.findIndex(s => s.key === status);

/**
 * Determines visual state of a step relative to current status.
 * - If status is REJECTED: all steps after 'REJECTED' are inactive. Steps before it are "done".
 * - Normal flow: steps before current are "done", current is "current", after are "upcoming".
 */
function getStepState(step: Step, current: LoanStatus) {
  const currIdx = stepIndex(current);
  const idx = stepIndex(step.key);

  if (current === "REJECTED") {
    const rejIdx = stepIndex("REJECTED");
    if (idx < rejIdx) return "done";
    if (idx === rejIdx) return "rejected";
    return "upcoming";
  }

  if (current === "APPROVED") {
    if (idx < currIdx) return "done";
    if (idx === currIdx) return "approved";
    if (step.key === "REJECTED") return "disabled"; // cannot happen after approved
    return "upcoming";
  }

  if (current === "COMPLETED") {
    if (step.key === "REJECTED") return "disabled";
    if (idx < currIdx) return "done";
    if (idx === currIdx) return "completed";
    return "upcoming";
  }

  // For SUBMITTED/PENDING/IN_PROGRESS
  if (idx < currIdx) return "done";
  if (idx === currIdx) return "current";
  return "upcoming";
}

function StepIcon({ state }: { state: ReturnType<typeof getStepState> }) {
  if (state === "done" || state === "approved" || state === "completed") {
    return <CheckCircle2 className="size-5" />;
  }
  if (state === "rejected") {
    return <XCircle className="size-5" />;
  }
  if (state === "current") {
    return <Loader2 className="size-5 animate-spin" />;
  }
  // upcoming / disabled
  return <Clock className="size-5" />;
}

function stepClasses(state: ReturnType<typeof getStepState>) {
  // circle styles
  const base =
    "flex size-8 items-center justify-center rounded-full border transition-colors";
  switch (state) {
    case "done":
      return cn(base, "border-green-500 text-green-600 bg-green-500/10");
    case "approved":
      return cn(base, "border-emerald-500 text-emerald-600 bg-emerald-500/10");
    case "completed":
      return cn(base, "border-indigo-500 text-indigo-600 bg-indigo-500/10");
    case "rejected":
      return cn(base, "border-red-500 text-red-600 bg-red-500/10");
    case "current":
      return cn(base, "border-blue-500 text-blue-600 bg-blue-500/10");
    case "disabled":
      return cn(base, "border-muted text-muted-foreground/60 bg-muted/30");
    default: // upcoming
      return cn(base, "border-muted text-muted-foreground bg-background");
  }
}

function connectorClasses(leftState: string, rightState: string) {
  // Filled if left is completed-ish
  const filled =
    leftState === "done" ||
    leftState === "approved" ||
    leftState === "completed";
  const rejected = rightState === "rejected" || leftState === "rejected";
  const base = "h-1 w-full rounded-full transition-colors";
  if (rejected) return cn(base, "bg-red-500/50");
  if (filled) return cn(base, "bg-green-500/60");
  return cn(base, "bg-muted");
}

export function ApplicationStatusBar({
  status,
  compact = false,
}: {
  status: LoanStatus;
  /** compact true = smaller labels */
  compact?: boolean;
}) {
  return (
    <TooltipProvider delayDuration={150}>
      <div className="w-full">
        {/* Top badges (optional): show current state prominently */}
        <div className="mb-3 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Status:</span>
          <Badge
            className={cn(
              "text-xs",
              status === "REJECTED" && "bg-red-600 hover:bg-red-600",
              status === "APPROVED" && "bg-emerald-600 hover:bg-emerald-600",
              status === "COMPLETED" && "bg-indigo-600 hover:bg-indigo-600",
              status === "IN_PROGRESS" && "bg-blue-600 hover:bg-blue-600",
              status === "PENDING" && "bg-amber-500 hover:bg-amber-500",
              status === "SUBMITTED" && "bg-slate-700 hover:bg-slate-700"
            )}
          >
            {status.replace("_", " ")}
          </Badge>
        </div>

        {/* Stepper */}
        <ol className="grid grid-cols-6 items-center gap-2 md:gap-3">
          {STEPS.map((step, i) => {
            const s = getStepState(step, status);
            const left = i > 0 ? getStepState(STEPS[i - 1], status) : null;

            return (
              <li key={step.key} className="flex items-center">
                {/* Left connector */}
                {i > 0 && (
                  <div className="mx-2 hidden w-full md:block">
                    <div className={connectorClasses(left!, s)} />
                  </div>
                )}

                {/* Node + label */}
                <div className="flex shrink-0 flex-col items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className={stepClasses(s)} aria-current={s === "current" ? "step" : undefined} />
                    </TooltipTrigger>
                    <TooltipContent className="text-xs">
                      {step.label}
                    </TooltipContent>
                  </Tooltip>
                  <div
                    className={cn(
                      "text-[10px] md:text-xs font-medium",
                      s === "rejected" && "text-red-600",
                      (s === "approved" || s === "completed" || s === "done") &&
                        "text-green-700",
                      s === "current" && "text-blue-700",
                      s === "upcoming" && "text-muted-foreground",
                      s === "disabled" && "text-muted-foreground/60"
                    )}
                  >
                    {compact ? step.label.split(" ")[0] : step.label}
                  </div>
                </div>

                {/* Right connector (rendered by next item) */}
              </li>
            );
          })}
        </ol>

      </div>
    </TooltipProvider>
  );
}
