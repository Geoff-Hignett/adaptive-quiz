import { AdjustmentsHorizontalIcon, ClockIcon, TrophyIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export default function AboutPage() {
    return (
        <div className="space-y-10">
            {/* Title */}
            <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">How It Works</h1>

                <p className="mx-auto max-w-2xl text-sm text-gray-400 sm:text-base">
                    A monthly adaptive quiz that adjusts to your skill and rewards speed.
                </p>
            </div>

            {/* Cards */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Rules */}
                <div className="space-y-3 rounded-xl border border-gray-800 bg-gray-900 p-6">
                    <div className="flex items-center gap-2">
                        <AdjustmentsHorizontalIcon className="h-5 w-5 text-blue-400" />

                        <h2 className="text-lg font-semibold">Quiz Rules</h2>
                    </div>

                    <ul className="list-inside list-disc space-y-1 text-gray-300">
                        <li>One quiz per calendar month</li>
                        <li>Each quiz contains 10 questions</li>
                        <li>No repeated questions</li>
                        <li>Each attempt is final</li>
                    </ul>
                </div>

                {/* Difficulty */}
                <div className="space-y-3 rounded-xl border border-gray-800 bg-gray-900 p-6">
                    <div className="flex items-center gap-2">
                        <AdjustmentsHorizontalIcon className="h-5 w-5 text-purple-400" />

                        <h2 className="text-lg font-semibold">Adaptive Difficulty</h2>
                    </div>

                    <p className="text-gray-300">
                        Difficulty increases when you answer correctly and decreases when you don’t, keeping the quiz challenging but fair.
                    </p>
                </div>

                {/* Scoring */}
                <div className="space-y-3 rounded-xl border border-gray-800 bg-gray-900 p-6">
                    <div className="flex items-center gap-2">
                        <ClockIcon className="h-5 w-5 text-yellow-400" />

                        <h2 className="text-lg font-semibold">Scoring</h2>
                    </div>

                    <ul className="list-inside list-disc space-y-1 text-gray-300">
                        <li>Correct answers earn points</li>
                        <li>Faster responses earn more points</li>
                        <li>Higher difficulty increases rewards</li>
                    </ul>
                </div>

                {/* Leaderboard */}
                <div className="space-y-3 rounded-xl border border-gray-800 bg-gray-900 p-6">
                    <div className="flex items-center gap-2">
                        <TrophyIcon className="h-5 w-5 text-green-400" />

                        <h2 className="text-lg font-semibold">Leaderboard</h2>
                    </div>

                    <p className="text-gray-300">Compete with others based on total accumulated score across quizzes.</p>
                </div>

                {/* Stats */}
                <div className="space-y-3 rounded-xl border border-gray-800 bg-gray-900 p-6 md:col-span-2">
                    <div className="flex items-center gap-2">
                        <ChartBarIcon className="h-5 w-5 text-pink-400" />

                        <h2 className="text-lg font-semibold">Stats</h2>
                    </div>

                    <ul className="grid gap-2 text-gray-300 sm:grid-cols-2">
                        <li>• Total score</li>
                        <li>• Accuracy</li>
                        <li>• Best performance</li>
                        <li>• Progress over time</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
