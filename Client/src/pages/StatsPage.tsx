import { useStats } from "../hooks/useQuiz";
import { ChartBarIcon, TrophyIcon, CheckCircleIcon, FireIcon } from "@heroicons/react/24/outline";

export default function StatsPage() {
    const { data, isLoading, isError } = useStats();

    if (isLoading) {
        return <p className="text-center text-gray-400">Loading stats...</p>;
    }

    if (isError || !data) {
        return <p className="text-center text-red-400">Failed to load stats</p>;
    }

    return (
        <div className="space-y-8">
            {/* Title */}
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Your Stats</h1>
                <p className="text-gray-400">Track your performance and improvement over time</p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-4">
                {/* Total Attempts */}
                <StatCard icon={<ChartBarIcon className="w-5 h-5 text-blue-400" />} label="Attempts" value={data.totalAttempts} />

                {/* Total Score */}
                <StatCard icon={<TrophyIcon className="w-5 h-5 text-yellow-400" />} label="Total Score" value={data.totalScore} />

                {/* Avg Score */}
                <StatCard icon={<FireIcon className="w-5 h-5 text-orange-400" />} label="Avg Score" value={data.averageScore} />

                {/* Accuracy */}
                <StatCard icon={<CheckCircleIcon className="w-5 h-5 text-green-400" />} label="Accuracy" value={`${data.averageAccuracy}%`} />
            </div>

            {/* Best Score Highlight */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center space-y-2">
                <h2 className="text-lg font-semibold text-gray-300">Best Performance</h2>

                <div className="text-3xl font-bold text-white">{data.bestScore}</div>

                <p className="text-gray-400 text-sm">Your highest scoring quiz</p>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number | string }) {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-2 text-center hover:border-gray-700 transition">
            <div className="flex justify-center">{icon}</div>

            <div className="text-sm text-gray-400">{label}</div>

            <div className="text-xl font-semibold text-white">{value}</div>
        </div>
    );
}
