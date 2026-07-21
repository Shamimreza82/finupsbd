import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "@/services/applicationService";
import { queryKeys } from "./queryKeys";

export const useDashboardData = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.home,
    queryFn: getDashboardData,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    select: (res) => res.success ? res.data : null,
  });
};
