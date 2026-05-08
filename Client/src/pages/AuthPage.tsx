import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
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

    // Default magic link request
    const login = async () => {
        if (!email) {
            setError("Please enter your email.");
            return;
        }

        setIsSubmitting(true);
        setError(null);
        setSuccess(null);

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: import.meta.env.VITE_SUPABASE_REDIRECT_URL,
            },
        });

        setIsSubmitting(false);

        if (error) {
            setError(error.message);
            return;
        }

        setSuccess("Magic link sent! Check your email.");
    };

    const loginWithPassword = async () => {
        if (!email || !password) {
            setError("Please enter email and password.");
            return;
        }

        setIsSubmitting(true);
        setError(null);
        setSuccess(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setIsSubmitting(false);

        if (error) {
            setError(error.message);
            return;
        }

        navigate("/quiz");
    };

    const setPasswordHandler = async () => {
        if (!password) {
            setError("Please enter a new password.");
            return;
        }

        setIsSubmitting(true);
        setError(null);
        setSuccess(null);

        const { error } = await supabase.auth.updateUser({
            password,
        });

        setIsSubmitting(false);

        if (error) {
            setError(error.message);
            return;
        }

        setSuccess("Password updated successfully. You can now log in with email and password.");

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

                {isRecovery ? (
                    <form
                        noValidate
                        className="space-y-3"
                        onSubmit={(e) => {
                            e.preventDefault();
                            setPasswordHandler();
                        }}>
                        <div className="space-y-1 text-left">
                            <label htmlFor="new-password" className="text-sm text-gray-300">
                                New Password
                            </label>

                            <input
                                id="new-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="w-full rounded-lg p-3 text-black"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-lg bg-white py-3 font-semibold text-black disabled:opacity-50">
                            {isSubmitting ? "Updating..." : "Set Password"}
                        </button>
                    </form>
                ) : (
                    <form
                        noValidate
                        className="space-y-3"
                        onSubmit={(e) => {
                            e.preventDefault();

                            if (password) {
                                loginWithPassword();
                            } else {
                                login();
                            }
                        }}>
                        <div className="space-y-1 text-left">
                            <label htmlFor="email" className="text-sm text-gray-300">
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full rounded-lg p-3 text-black"
                            />
                        </div>

                        <div className="space-y-1 text-left">
                            <label htmlFor="password" className="text-sm text-gray-300">
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password (optional)"
                                className="w-full rounded-lg p-3 text-black"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-lg bg-white py-3 font-semibold text-black disabled:opacity-50">
                            {isSubmitting ? "Loading..." : password ? "Login" : "Send Magic Link"}
                        </button>
                    </form>
                )}

                <div className="min-h-[20px]">
                    {error && (
                        <p role="alert" className="text-sm text-red-400">
                            {error}
                        </p>
                    )}

                    {success && <p className="text-sm text-green-400">{success}</p>}
                </div>
            </div>
        </div>
    );
}
