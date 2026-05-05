import { createContext, useContext, useEffect, useState } from "react";
import { useMe } from "../hooks/useQuiz";

type UserContextType = {
    displayName: string | null;
    setDisplayName: (name: string) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [displayName, setDisplayName] = useState<string | null>(null);

    // fetch user
    const { data } = useMe();

    // populate context when data arrives
    useEffect(() => {
        if (data?.displayName) {
            setDisplayName(data.displayName);
        }
    }, [data]);

    return <UserContext.Provider value={{ displayName, setDisplayName }}>{children}</UserContext.Provider>;
}

export function useUser() {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUser must be used within UserProvider");
    return ctx;
}
