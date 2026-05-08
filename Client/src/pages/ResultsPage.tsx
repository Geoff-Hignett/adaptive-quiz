import { useLocation, Link } from "react-router-dom";
import { TrophyIcon, ChartBarIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useResults } from "../hooks/useQuiz";

type LocationState = {
    attemptId: number;
};

export default function ResultsPage() {
    const location = useLocation() as {
        state: LocationState;
    };

    const attemptId = location.state?.attemptId;

    const { data, isLoading, isError } = useResults(attemptId);

    if (!attemptId) {
        return <div className="mt-10 text-center text-white">No results found</div>;
    }

    if (isLoading) {
        return <div className="mt-10 text-center text-white">Loading...</div>;
    }

    if (isError || !data) {
        return <div className="mt-10 text-center text-red-400">Error loading results</div>;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">Results</h1>

                <p className="text-sm text-gray-400">Your latest quiz performance</p>
            </div>

            {/* Summary */}
            <div className="space-y-5 rounded-2xl border border-gray-800 bg-gray-900 p-6">
                <div className="text-center">
                    <div className="text-sm text-gray-400">Total Score</div>

                    <div className="text-4xl font-bold">{data.score}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-gray-800 p-4 text-center">
                        <div className="text-sm text-gray-400">Accuracy</div>

                        <div className="mt-1 text-xl font-semibold">{data.accuracy}%</div>
                    </div>

                    <div className="rounded-xl bg-gray-800 p-4 text-center">
                        <div className="text-sm text-gray-400">Correct</div>

                        <div className="mt-1 text-xl font-semibold">
                            {data.correctAnswers} / {data.totalQuestions}
                        </div>
                    </div>
                </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-3">
                <h2 className="text-lg font-semibold">Question Breakdown</h2>

                <div className="grid gap-3 xl:grid-cols-2">
                    {data.breakdown.map((item, index) => (
                        <div
                            key={item.questionId}
                            className={`rounded-xl border p-4 ${
                                item.correct ? "border-green-500/30 bg-green-500/10" : "border-red-500/30 bg-red-500/10"
                            }`}>
                            <div className="flex items-start justify-between gap-3">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        {item.correct ? (
                                            <CheckCircleIcon className="h-5 w-5 text-green-400" />
                                        ) : (
                                            <XCircleIcon className="h-5 w-5 text-red-400" />
                                        )}

                                        <span className="font-medium">Question {index + 1}</span>
                                    </div>

                                    <p className="text-sm text-gray-200">{item.text}</p>

                                    <div className="space-y-1 text-sm">
                                        <div className="text-gray-300">
                                            Your answer: <span className="font-medium">{item.answerGiven || "No answer"}</span>
                                        </div>

                                        {!item.correct && (
                                            <div className="text-green-300">
                                                Correct answer: <span className="font-medium">{item.correctAnswer}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-2 text-xs">
                                        <span className="rounded bg-gray-800 px-2 py-1 text-gray-300">Level {item.difficultyAtTime}</span>

                                        <span className="rounded bg-gray-800 px-2 py-1 text-gray-300">{item.pointsAwarded} pts</span>

                                        {!item.correct && <span className="rounded bg-red-500/20 px-2 py-1 text-red-300">Incorrect</span>}
                                    </div>
                                </div>

                                <div className={`text-sm font-semibold ${item.correct ? "text-green-300" : "text-red-300"}`}>
                                    {item.correct ? "Correct" : "Wrong"}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="grid gap-3 sm:grid-cols-2">
                <Link
                    to="/leaderboard"
                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-700 py-3 transition hover:border-gray-500 hover:bg-gray-800">
                    <TrophyIcon className="h-5 w-5" />
                    Leaderboard
                </Link>

                <Link
                    to="/stats"
                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-700 py-3 transition hover:border-gray-500 hover:bg-gray-800">
                    <ChartBarIcon className="h-5 w-5" />
                    Stats
                </Link>
            </div>
        </div>
    );
}
