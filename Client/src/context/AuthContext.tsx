import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Session } from "@supabase/supabase-js";

type AuthContextType = {
    session: Session | null;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        // initial load
        const init = async () => {
            const { data } = await supabase.auth.getSession();

            console.log("[Auth] getSession:", data.session?.user?.email);

            if (isMounted) {
                setSession(data.session);
                setLoading(false);
            }
        };

        init();

        // listen for auth changes
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log("[Auth] onAuthStateChange:", session?.user?.email);

            if (isMounted) {
                setSession(session);
            }
        });

        return () => {
            isMounted = false;
            listener.subscription.unsubscribe();
        };
    }, []);

    return <AuthContext.Provider value={{ session, loading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
