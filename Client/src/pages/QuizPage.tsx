import { useState, useEffect } from "react";
import { useStartQuiz, useNextQuestion, useAnswer } from "../hooks/useQuiz";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function QuizPage() {
    const [attemptId, setAttemptId] = useState<number | null>(null);
    const [selected, setSelected] = useState<string>("");
    const [startTime, setStartTime] = useState<number>(0);

    const startQuiz = useStartQuiz();
    const answerMutation = useAnswer();
    const navigate = useNavigate();
    const { displayName } = useUser();

    const { data: question, isLoading, isError, refetch } = useNextQuestion(attemptId);

    const handleStart = async () => {
        const res = await startQuiz.mutateAsync();
        setAttemptId(res.id);
    };

    const handleAnswer = async () => {
        if (!question || !attemptId) return;

        const timeTakenMs = Date.now() - startTime;

        const res = await answerMutation.mutateAsync({
            attemptId,
            questionId: question.id,
            answer: selected,
            timeTakenMs,
        });

        setSelected("");
        setStartTime(0);

        if (res.isComplete) {
            navigate("/results", { state: { attemptId } });
        } else {
            refetch();
        }
    };

    // start timer when question changes
    useEffect(() => {
        if (question) {
            setStartTime(Date.now());
        }
    }, [question]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
            <div className="w-full max-w-md space-y-6">
                {displayName && (
                    <div className="text-center text-gray-300">
                        Hi, <span className="font-semibold text-white">{displayName}</span>
                    </div>
                )}
                {/* Start */}
                {!attemptId && (
                    <>
                        <button
                            onClick={handleStart}
                            className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:opacity-90 transition">
                            Start Quiz
                        </button>
                        <Link to="/profile" className="block w-full text-center border border-gray-600 py-2 rounded-lg">
                            Profile
                        </Link>

                        <Link to="/leaderboard" className="block w-full text-center border border-gray-600 py-2 rounded-lg">
                            View Leaderboard
                        </Link>
                    </>
                )}

                {/* Loading */}
                {isLoading && <p className="text-center text-gray-400">Loading question...</p>}

                {/* Error */}
                {isError && <p className="text-center text-red-400">Something went wrong</p>}

                {/* Question */}
                {question && (
                    <>
                        <h2 className="text-xl font-semibold text-center">{question.text}</h2>

                        <div className="space-y-2">
                            {question.options?.map((opt: string) => (
                                <button
                                    key={opt}
                                    onClick={() => setSelected(opt)}
                                    className={`w-full p-3 rounded-lg border transition ${
                                        selected === opt ? "bg-white text-black" : "border-gray-600 hover:border-gray-400"
                                    }`}>
                                    {opt}
                                </button>
                            ))}
                        </div>

                        <button
                            disabled={!selected || answerMutation.isPending}
                            onClick={handleAnswer}
                            className="w-full bg-green-500 py-3 rounded-lg font-semibold disabled:opacity-50 hover:opacity-90 transition">
                            {answerMutation.isPending ? "Submitting..." : "Submit Answer"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
