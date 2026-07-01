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
import AdminRoute from "./routes/AdminRoute";
import AdminQuestionsPage from "./pages/admin/AdminQuestionsPage";
import CreateQuestionPage from "./pages/admin/CreateQuestionPage";
import EditQuestionPage from "./pages/admin/EditQuestionPage";
import BugsPage from "./pages/BugsPage";
import AdminBugsPage from "./pages/admin/AdminBugsPage";
import AdminBugDetailsPage from "./pages/admin/AdminBugDetailsPage";
import BugDetailsPage from "./pages/BugsDetailPage";

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

                <Route
                    path="/admin/questions"
                    element={
                        <AdminRoute>
                            <Layout width="wide">
                                <AdminQuestionsPage />
                            </Layout>
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/questions/new"
                    element={
                        <AdminRoute>
                            <Layout width="wide">
                                <CreateQuestionPage />
                            </Layout>
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/questions/:id/edit"
                    element={
                        <AdminRoute>
                            <Layout width="wide">
                                <EditQuestionPage />
                            </Layout>
                        </AdminRoute>
                    }
                />

                <Route
                    path="/bugs"
                    element={
                        <ProtectedRoute>
                            <Layout width="wide">
                                <BugsPage />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/bugs/:id"
                    element={
                        <ProtectedRoute>
                            <Layout width="wide">
                                <BugDetailsPage />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/bugs"
                    element={
                        <AdminRoute>
                            <Layout>
                                <AdminBugsPage />
                            </Layout>
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/bugs/:id"
                    element={
                        <AdminRoute>
                            <Layout width="wide">
                                <AdminBugDetailsPage />
                            </Layout>
                        </AdminRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
