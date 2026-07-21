/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useApplications.ts
import { getAllUsers } from '@/services/applicationService';

import { useQuery } from '@tanstack/react-query';


export const useUsers = (filters?: Record<string, any>) => {

    return useQuery({
        queryKey: ['users', filters],
        queryFn: () => getAllUsers(filters ?? {}),
        staleTime: Infinity, // never considered stale
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
};