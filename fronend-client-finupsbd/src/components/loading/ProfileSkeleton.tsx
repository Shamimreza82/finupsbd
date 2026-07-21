"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";

export default function ProfileSkeleton() {
  return (
    <Card className="mx-auto w-full max-w-3xl animate-pulse shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-44 rounded-md" />
              <Skeleton className="h-4 w-64 rounded-md" />
            </div>
          </div>
          <Skeleton className="h-10 w-28 rounded-md" />
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-6 space-y-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <Skeleton className="h-4 w-48 rounded" />
            <Skeleton className="h-4 w-40 rounded" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
