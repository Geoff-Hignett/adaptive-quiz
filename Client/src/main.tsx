import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { supabase } from "./lib/supabase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";

const queryClient = new QueryClient();

supabase.auth.onAuthStateChange((_event, session) => {
    if (session) {
        console.log("Logged in:", session.user.email);
    }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <UserProvider>
                <App />
            </UserProvider>
        </AuthProvider>
    </QueryClientProvider>,
);
