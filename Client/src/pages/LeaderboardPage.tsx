import { useLeaderboard } from "../hooks/useQuiz";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function LeaderboardPage() {
    const { data, isLoading, isError } = useLeaderboard();
    const { displayName } = useUser();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
            <div className="max-w-md w-full space-y-6">
                <h1 className="text-3xl font-bold text-center">Leaderboard</h1>

                {isLoading && <p className="text-center text-gray-400">Loading...</p>}

                {isError && <p className="text-center text-red-400">Failed to load leaderboard</p>}

                {data && (
                    <div className="space-y-2">
                        {data.map((entry, index) => (
                            <div
                                key={index}
                                className={`flex justify-between p-3 rounded-lg ${
                                    entry.displayName === displayName ? "bg-green-600" : "bg-gray-800"
                                }`}>
                                <div>
                                    <span className="text-gray-400 mr-2">#{index + 1}</span>
                                    {entry.displayName}
                                </div>

                                <div className="font-semibold">{entry.totalScore}</div>
                            </div>
                        ))}
                    </div>
                )}

                <Link to="/" className="block w-full text-center bg-white text-black py-3 rounded-lg font-semibold">
                    Back
                </Link>
            </div>
        </div>
    );
}
