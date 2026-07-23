import { useState } from "react";
import type { CreateQuestionRequest } from "../../types/admin";

type Props = {
    initialValues?: CreateQuestionRequest;
    submitLabel: string;
    isSubmitting?: boolean;
    onSubmit: (values: CreateQuestionRequest) => Promise<void>;
};

export default function QuestionForm({ initialValues, submitLabel, isSubmitting, onSubmit }: Props) {
    const [text, setText] = useState(initialValues?.text ?? "");
    const [difficulty, setDifficulty] = useState(initialValues?.difficulty ?? 1);
    const [category, setCategory] = useState(initialValues?.category ?? "");
    const [correctAnswer, setCorrectAnswer] = useState(initialValues?.correctAnswer ?? "");
    const [options, setOptions] = useState(initialValues?.options ?? ["", "", "", ""]);

    const handleOptionChange = (index: number, value: string) => {
        const updated = [...options];

        updated[index] = value;
        setOptions(updated);
    };

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        await onSubmit({
            text,
            difficulty,
            category,
            type: "MCQ", // MVP only includes multiple choice questions
            options,
            correctAnswer,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-gray-800 bg-gray-900 p-6">
            <div className="space-y-2">
                <label className="text-sm text-gray-300">Question</label>
                <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full rounded-lg bg-gray-950 p-3 text-white" rows={3} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm text-gray-300">Difficulty</label>
                    <input
                        type="number"
                        min={1}
                        max={10}
                        value={difficulty}
                        onChange={(e) => setDifficulty(Number(e.target.value))}
                        className="w-full rounded-lg bg-gray-950 p-3 text-white"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-gray-300">Category</label>
                    <input value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-lg bg-gray-950 p-3 text-white" />
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-sm text-gray-300">Options</label>

                {options.map((option, index) => (
                    <input
                        key={index}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="w-full rounded-lg bg-gray-950 p-3 text-white"
                    />
                ))}
            </div>

            <div className="space-y-2">
                <label className="text-sm text-gray-300">Correct Answer</label>
                <input
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    className="w-full rounded-lg bg-gray-950 p-3 text-white"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-white px-5 py-3 font-medium text-black transition hover:bg-gray-200 disabled:opacity-50">
                {isSubmitting ? "Saving..." : submitLabel}
            </button>
        </form>
    );
}
