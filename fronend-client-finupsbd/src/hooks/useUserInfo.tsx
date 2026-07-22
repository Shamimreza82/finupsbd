import { useState, useEffect } from "react";
import { userInfo } from "@/services/UserData";

export function useUserInfo() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await userInfo();
        if (!response) throw new Error("Empty response from server");
        const { data } = response;
        setUser(data ?? null);
      } catch (err) {
        setError("Failed to load user profile");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData()
  }, []);

  return { user, isLoading, error, setIsLoading, setError };
}

