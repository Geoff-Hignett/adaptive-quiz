import { createContext, useContext, useState } from "react";

type UserContextType = {
    displayName: string | null;
    setDisplayName: (name: string) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [displayName, setDisplayName] = useState<string | null>(null);

    return <UserContext.Provider value={{ displayName, setDisplayName }}>{children}</UserContext.Provider>;
}

export function useUser() {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUser must be used within UserProvider");
    return ctx;
}
