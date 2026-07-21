import { getAllApplications } from '@/services/applicationService';
import { TApplicationBaseApiResponce, TApplicationQuery } from '@/types/applicationTypes/allApplication';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';

export const useApplications = (filters?: TApplicationQuery) => {
  return useQuery<TApplicationBaseApiResponce, Error>({
    queryKey: [...queryKeys.applications.all, filters],
    queryFn: () => getAllApplications(filters ?? {}),
    staleTime: 30 * 1000,
    placeholderData: (previousData) => previousData,
  });
};
