/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useApplications.ts
import { getAllApplications } from '@/services/applicationService';
import { TApplicationBaseApiResponce } from '@/types/applicationTypes/allApplication';

import { useQuery } from '@tanstack/react-query';


export const useApplications = (filters?: Record<string, any>) => {

  return useQuery<TApplicationBaseApiResponce, Error>({
    queryKey: ['applications', filters],
    queryFn: () => getAllApplications(filters ?? {}),
    staleTime: Infinity, // never considered stale
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
    // refetchOnReconnect: false,
  });
};