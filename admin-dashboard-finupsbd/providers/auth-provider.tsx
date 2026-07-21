"use client"

import { getCurrentUser } from "@/services/auth";
import { TUser } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { queryKeys } from "@/hooks/queryKeys";

interface IUserProviderValues {
  user: TUser | null;
  isLoading: boolean;
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined)

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading } = useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: getCurrentUser,
    staleTime: Infinity,
    retry: false,
  });

  return (
    <UserContext.Provider value={{ user: user as TUser | null, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within the User provider context")
  }
  return context
}

export default UserProvider
