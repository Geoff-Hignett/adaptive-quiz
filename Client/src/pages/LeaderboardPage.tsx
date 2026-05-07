import { useLeaderboard } from "../hooks/useQuiz";
import { useUser } from "../context/UserContext";

export default function LeaderboardPage() {
    const { data, isLoading, isError } = useLeaderboard();
    const { displayName } = useUser();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-center">Leaderboard</h1>

            {isLoading && <p className="text-center text-gray-400">Loading...</p>}

            {data && data.length === 0 && <p className="text-center text-gray-400">No leaderboard entries yet.</p>}

            {isError && <p className="text-center text-red-400">Failed to load leaderboard</p>}

            {data && (
                <div className="space-y-2">
                    {data.map((entry) => (
                        <div
                            key={entry.userId}
                            className={`flex justify-between p-3 rounded-lg ${entry.displayName === displayName ? "bg-green-600" : "bg-gray-800"}`}>
                            <div>
                                <span className="text-gray-400 mr-2">#{entry.rank}</span>
                                {entry.displayName}
                            </div>

                            <div className="font-semibold">{entry.totalScore}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
