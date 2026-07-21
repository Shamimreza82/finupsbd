import { getCurrentUser } from "@/services/AuthService";
import { TUser } from "@/types/user";
import { createContext, useContext, useEffect, useState } from "react";

interface IUserProviderValues {
    user: TUser | null;
    isLoading: boolean;
    setUser: (user: TUser | null) => void;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    refetchUser: () => Promise<void>;
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<TUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const refetchUser = async () => {
        setIsLoading(true);
        const user = await getCurrentUser();
        setUser(user as TUser);
        setIsLoading(false);
    };

    useEffect(() => {
        refetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, isLoading, setUser, refetchUser, setIsLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider context");
    }
    return context;
};

export default UserProvider;
