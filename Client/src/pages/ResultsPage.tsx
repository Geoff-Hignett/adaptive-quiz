import { useLocation, Link } from "react-router-dom";
import { useResults } from "../hooks/useQuiz";

type LocationState = {
    attemptId: number;
};

export default function ResultsPage() {
    const location = useLocation() as { state: LocationState };

    const attemptId = location.state?.attemptId;

    const { data, isLoading, isError } = useResults(attemptId);

    if (!attemptId) {
        return <div className="text-white text-center mt-10">No results found</div>;
    }

    if (isLoading) {
        return <div className="text-white text-center mt-10">Loading...</div>;
    }

    if (isError || !data) {
        return <div className="text-red-400 text-center mt-10">Error loading results</div>;
    }

    return (
        <div className="space-y-6 text-center">
            <h1 className="text-3xl font-bold">Results</h1>

            <div className="text-xl">
                Score: <span className="font-semibold">{data.score}</span>
            </div>

            <div>Accuracy: {data.accuracy}%</div>

            <div>
                Correct: {data.correctAnswers} / {data.totalQuestions}
            </div>

            <Link to="/profile" className="block w-full text-center border border-gray-600 py-2 rounded-lg">
                Profile
            </Link>

            <Link to="/leaderboard" className="block w-full text-center border border-gray-600 py-2 rounded-lg">
                View Leaderboard
            </Link>
        </div>
    );
}
