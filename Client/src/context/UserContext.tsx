import { createContext, useContext, useEffect, useState } from "react";
import { useMe } from "../hooks/useQuiz";

type UserContextType = {
    id: number | null;
    displayName: string | null;
    role: "User" | "Tester" | "Admin" | null;
    canPlay: boolean;
    canManageQuestions: boolean;
    canEnterLeaderboard: boolean;
    setDisplayName: (name: string) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const { data } = useMe();

    const [displayName, setDisplayName] = useState<string | null>(null);

    useEffect(() => {
        if (data?.displayName) {
            setDisplayName(data.displayName);
        }
    }, [data]);

    return (
        <UserContext.Provider
            value={{
                id: data?.id ?? null,
                displayName,
                role: data?.role ?? null,
                canPlay: data?.canPlay ?? false,
                canManageQuestions: data?.canManageQuestions ?? false,
                canEnterLeaderboard: data?.canEnterLeaderboard ?? true,
                setDisplayName,
            }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUser must be used within UserProvider");
    return ctx;
}
