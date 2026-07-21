/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Info, AlertTriangle, Clock, UserCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/Small-component/StatusBadge";

// ---------- Types ----------
type EventItem = {
  id: string;
  eventType: "STATUS_CHANGED" | string;
  description: string | null;
  stateBefore: string | null;
  stateAfter: string | null;
  feedback: string | null;
  severity: "INFO" | "WARN" | "ERROR" | string;
  createdBy: string | null;
  createdRole: string | null;
  createdAt: string; // ISO
  applicationId: string;
};

export function ApplicationEvents({ events }: { events: EventItem[] }) {
  const sorted = useMemo(
    () =>
      [...(events || [])].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [events]
  );

  if (!sorted.length) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex items-center gap-3 p-8 text-muted-foreground">
          <Clock className="h-5 w-5" />
          <span>No activity yet.</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <TooltipProvider>
      <div className="relative">
        {/* vertical rail */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
        <ul className="space-y-4">
          {sorted.map((e) => (
            <li key={e.id} className="relative pl-10">
              {/* node */}
              <div
                className={cn(
                  "absolute left-2 top-2 h-4 w-4 rounded-full ring-4 ring-background",
                  severityDot(e.severity)
                )}
              />

              <Card className="group hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center gap-2">
                    {iconFor(e)}
                    <CardTitle className="text-base">
                     
                    </CardTitle>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={badgeVariant(e.severity)}>{e.severity || "INFO"}</Badge>

                    {e.createdRole ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge variant="outline" className="gap-1">
                            <UserCircle2 className="h-3.5 w-3.5" />
                            {e.createdRole}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>Role that triggered this event</TooltipContent>
                      </Tooltip>
                    ) : null}
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  {/* status before -> after */}
                  {e.eventType === "STATUS_CHANGED" && (e.stateBefore || e.stateAfter) ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge status={e.stateBefore ?? ''} />
                      <ArrowRight className="h-4 w-4 opacity-70" />
                      <StatusBadge status={e.stateAfter ?? ''} className="ring-2 ring-offset-1" />
                    </div>
                  ) : null}

                  {/* feedback / description */}
                  {(e.feedback || e.description) ? (
                    <>
                      <Separator />
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <p className="whitespace-pre-wrap leading-relaxed">
                          {String(e.feedback || e.description || "").trim()}
                        </p>
                      </div>
                    </>
                  ) : null}

                  {/* footer: timestamp + actions */}
                  <div className="flex items-center justify-between pt-2">
                    <time
                      dateTime={e.createdAt}
                      className="text-xs text-muted-foreground"
                      title={new Date(e.createdAt).toLocaleString()}
                    >
                      {formatSmartDate(e.createdAt)}
                    </time>

                    <div className="flex items-center gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 px-2 text-xs"
                            onClick={() => navigator.clipboard.writeText(JSON.stringify(e, null, 2))}
                          >
                            Copy JSON
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Copy this event payload</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </TooltipProvider>
  );
}

// ---------- Helpers / Subcomponents ----------
function iconFor(e: EventItem) {
  const sev = String(e.severity || "INFO").toUpperCase();
  if (sev === "ERROR") return <AlertTriangle className="h-4 w-4 text-destructive" />;
  if (sev === "WARN" || sev === "WARNING") return <AlertTriangle className="h-4 w-4" />;
  if (e.eventType === "STATUS_CHANGED" && (e.stateAfter || "").toUpperCase() === "APPROVED")
    return <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500" />;
  return <Info className="h-4 w-4" />;
}

function badgeVariant(sev: string | null | undefined): "default" | "secondary" | "destructive" | "outline" {
  const s = String(sev || "INFO").toUpperCase();
  if (s === "ERROR") return "destructive";
  if (s === "WARN" || s === "WARNING") return "secondary";
  return "outline";
}

function severityDot(sev: string | null | undefined) {
  const s = String(sev || "INFO").toUpperCase();
  if (s === "ERROR") return "bg-red-500";
  if (s === "WARN" || s === "WARNING") return "bg-yellow-400";
  return "bg-blue-500";
}

function formatSmartDate(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.round(diffMs / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hr${diffHr > 1 ? "s" : ""} ago`;
  return d.toLocaleString();
}
