import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export default function Home() {
    const [email, setEmail] = useState("");
    const [loadingSend, setLoadingSend] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const { session, loading } = useAuth();
    const navigate = useNavigate();

    // redirect if already logged in
    useEffect(() => {
        if (!loading && session) {
            navigate("/quiz");
        }
    }, [session, loading, navigate]);

    const login = async () => {
        if (!email) return;

        setLoadingSend(true);
        setMessage(null);

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: import.meta.env.VITE_SUPABASE_REDIRECT_URL,
            },
        });

        setLoadingSend(false);

        if (error) {
            setMessage(error.message);
            return;
        }

        setMessage("Magic link sent! Check your email.");
    };

    if (loading) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
            <div className="w-full max-w-md space-y-6 text-center">
                <h1 className="text-3xl font-bold">Adaptive Quiz</h1>

                <p className="text-gray-400 text-sm">
                    Take a monthly adaptive quiz. Difficulty adjusts to your skill. Faster answers earn more points. Compete on the leaderboard.
                </p>

                <div className="space-y-3">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full p-3 rounded text-black"
                    />

                    <button
                        onClick={login}
                        disabled={loadingSend}
                        className="w-full bg-white text-black py-3 rounded-lg font-semibold disabled:opacity-50">
                        {loadingSend ? "Sending..." : "Send Magic Link"}
                    </button>
                </div>

                {message && <p className="text-sm text-gray-300">{message}</p>}
            </div>
        </div>
    );
}
