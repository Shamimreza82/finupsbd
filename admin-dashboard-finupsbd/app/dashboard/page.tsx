"use client";

import { lazy, Suspense } from "react";
import Mounted from "@/components/Small-component/Mounted";
import { useDashboardData } from "@/hooks/useDashboardData";
import Loading from "@/components/loading/loading";

const DashboardHome = lazy(() => import("@/components/dashboard-home-page/DashboardHome"));

export default function DashboardHomePage() {
  const { data, isLoading, error } = useDashboardData();

  return (
    <Mounted>
      {isLoading && <Loading />}
      {error && <p>Failed to load dashboard. Please try again later.</p>}
      {!isLoading && !error && data && (
        <Suspense fallback={<Loading />}>
          <DashboardHome data={data} />
        </Suspense>
      )}
    </Mounted>
  );
}
