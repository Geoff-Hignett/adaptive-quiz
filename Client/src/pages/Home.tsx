import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loadingSend, setLoadingSend] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [isRecovery, setIsRecovery] = useState(false);

    const { session, loading } = useAuth();

    const navigate = useNavigate();

    // detect password recovery flow
    useEffect(() => {
        const hash = window.location.hash;

        if (hash.includes("type=recovery")) {
            setIsRecovery(true);
        }
    }, []);

    // redirect if already logged in
    useEffect(() => {
        if (!loading && session && !isRecovery) {
            navigate("/quiz");
        }
    }, [session, loading, navigate, isRecovery]);

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

    const loginWithPassword = async () => {
        if (!email || !password) return;

        setLoadingSend(true);
        setMessage(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoadingSend(false);

        if (error) {
            setMessage(error.message);
            return;
        }

        navigate("/quiz");
    };

    const setPasswordHandler = async () => {
        if (!password) return;

        setLoadingSend(true);
        setMessage(null);

        const { error } = await supabase.auth.updateUser({
            password,
        });

        setLoadingSend(false);

        if (error) {
            setMessage(error.message);
            return;
        }

        setMessage("Password updated successfully. You can now log in with email and password.");

        setIsRecovery(false);
    };

    if (loading) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 px-3 py-6 text-white sm:px-6">
            <div className="w-full max-w-md space-y-6 text-center">
                <h1 className="text-3xl font-bold">Adaptive Quiz</h1>

                <p className="text-sm text-gray-400">
                    Take a monthly adaptive quiz. Difficulty adjusts to your skill. Faster answers earn more points. Compete on the leaderboard.
                </p>

                <div className="space-y-3">
                    {isRecovery ? (
                        <>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="New password"
                                className="w-full rounded-lg p-3 text-black"
                            />

                            <button
                                onClick={setPasswordHandler}
                                disabled={loadingSend}
                                className="w-full rounded-lg bg-white py-3 font-semibold text-black disabled:opacity-50">
                                {loadingSend ? "Updating..." : "Set Password"}
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full rounded-lg p-3 text-black"
                            />

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password (optional)"
                                className="w-full rounded-lg p-3 text-black"
                            />

                            <button
                                onClick={password ? loginWithPassword : login}
                                disabled={loadingSend}
                                className="w-full rounded-lg bg-white py-3 font-semibold text-black disabled:opacity-50">
                                {loadingSend ? "Loading..." : password ? "Login" : "Send Magic Link"}
                            </button>
                        </>
                    )}
                </div>

                {message && <p className="text-sm text-gray-300">{message}</p>}
            </div>
        </div>
    );
}
