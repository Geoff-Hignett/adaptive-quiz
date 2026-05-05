import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import QuizPage from "./pages/QuizPage";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import ResultsPage from "./pages/ResultsPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import Header from "./components/Header";

export default function App() {
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return (
        <BrowserRouter>
            {!session ? (
                <Home />
            ) : (
                <>
                    <Header />
                    <Routes>
                        <Route path="/" element={<QuizPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/results" element={<ResultsPage />} />
                        <Route path="/leaderboard" element={<LeaderboardPage />} />
                    </Routes>
                </>
            )}
        </BrowserRouter>
    );
}
