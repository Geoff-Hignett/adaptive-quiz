import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import AboutPage from "./pages/AboutPage";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ProfilePage from "./pages/ProfilePage";
import StatsPage from "./pages/StatsPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/Layout";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public */}
                <Route path="/" element={<AuthPage />} />

                {/* Protected */}
                <Route
                    path="/about"
                    element={
                        <ProtectedRoute>
                            <Layout width="wide">
                                <AboutPage />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/quiz"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <QuizPage />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/results"
                    element={
                        <ProtectedRoute>
                            <Layout width="wide">
                                <ResultsPage />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/leaderboard"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <LeaderboardPage />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <ProfilePage />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/stats"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <StatsPage />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
