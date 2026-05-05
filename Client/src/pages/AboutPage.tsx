import { AdjustmentsHorizontalIcon, ClockIcon, TrophyIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export default function AboutPage() {
    return (
        <div className="space-y-10">
            {/* Title */}
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">How It Works</h1>
                <p className="text-gray-400">A monthly adaptive quiz that adjusts to your skill and rewards speed.</p>
            </div>

            {/* Cards */}
            <div className="space-y-6">
                {/* Rules */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
                    <div className="flex items-center gap-2">
                        <AdjustmentsHorizontalIcon className="w-5 h-5 text-blue-400" />
                        <h2 className="text-lg font-semibold">Quiz Rules</h2>
                    </div>

                    <ul className="text-gray-300 space-y-1 list-disc list-inside">
                        <li>One quiz per calendar month</li>
                        <li>Each quiz contains 10 questions</li>
                        <li>No repeated questions</li>
                        <li>Each attempt is final</li>
                    </ul>
                </div>

                {/* Difficulty */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
                    <div className="flex items-center gap-2">
                        <AdjustmentsHorizontalIcon className="w-5 h-5 text-purple-400" />
                        <h2 className="text-lg font-semibold">Adaptive Difficulty</h2>
                    </div>

                    <p className="text-gray-300">
                        Difficulty increases when you answer correctly and decreases when you don’t, keeping the quiz challenging but fair.
                    </p>
                </div>

                {/* Scoring */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
                    <div className="flex items-center gap-2">
                        <ClockIcon className="w-5 h-5 text-yellow-400" />
                        <h2 className="text-lg font-semibold">Scoring</h2>
                    </div>

                    <ul className="text-gray-300 space-y-1 list-disc list-inside">
                        <li>Correct answers earn points</li>
                        <li>Faster responses earn more points</li>
                        <li>Higher difficulty increases rewards</li>
                    </ul>
                </div>

                {/* Leaderboard */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
                    <div className="flex items-center gap-2">
                        <TrophyIcon className="w-5 h-5 text-green-400" />
                        <h2 className="text-lg font-semibold">Leaderboard</h2>
                    </div>

                    <p className="text-gray-300">Compete with others based on total accumulated score across quizzes.</p>
                </div>

                {/* Stats */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
                    <div className="flex items-center gap-2">
                        <ChartBarIcon className="w-5 h-5 text-pink-400" />
                        <h2 className="text-lg font-semibold">Stats</h2>
                    </div>

                    <ul className="text-gray-300 space-y-1 list-disc list-inside">
                        <li>Total score</li>
                        <li>Accuracy</li>
                        <li>Best performance</li>
                        <li>Progress over time</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
