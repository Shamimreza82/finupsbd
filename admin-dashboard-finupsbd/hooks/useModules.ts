/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllModules, TQueryPayloadType } from '@/services/modules/modulesService';
import { useQuery } from '@tanstack/react-query';

export const useModules = (filters?: Record<string, any>) => {
  return useQuery({
    queryKey: ['module', filters],
    queryFn: () => getAllModules(filters ?? ({} as TQueryPayloadType)),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
