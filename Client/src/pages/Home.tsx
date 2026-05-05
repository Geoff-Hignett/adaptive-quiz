import { supabase } from "../lib/supabase";
import { useState } from "react";

export default function Home() {
    const [email, setEmail] = useState("");

    const login = async () => {
        await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: import.meta.env.VITE_SUPABASE_REDIRECT_URL,
            },
        });
        alert("Magic link sent!");
    };

    return (
        <div className="space-y-4 text-center">
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" className="p-2 text-black rounded" />

            <button onClick={login} className="bg-white text-black px-4 py-2 rounded">
                Send Magic Link
            </button>
        </div>
    );
}
