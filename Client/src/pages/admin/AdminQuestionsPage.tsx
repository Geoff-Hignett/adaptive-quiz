import { Link } from "react-router-dom";
import { useAdminQuestions } from "../../hooks/useAdminQuestions";

export default function AdminQuestionsPage() {
    const { data, isLoading, error } = useAdminQuestions();

    if (isLoading) {
        return <p className="text-gray-400">Loading questions...</p>;
    }

    if (error) {
        return <p className="text-red-400">Failed to load questions.</p>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Manage Questions</h1>
                    <p className="text-sm text-gray-400">Create, edit and manage quiz questions.</p>
                </div>

                <Link to="/admin/questions/new" className="rounded-lg bg-white px-4 py-2 font-medium text-black transition hover:bg-gray-200">
                    Create Question
                </Link>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-800">
                <table className="min-w-full divide-y divide-gray-800 bg-gray-900">
                    <thead className="bg-gray-950">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Question</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Difficulty</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Category</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Type</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-800">
                        {data?.map((question) => (
                            <tr key={question.id}>
                                <td className="px-4 py-3 text-white">{question.text}</td>
                                <td className="px-4 py-3 text-gray-300">{question.difficulty}</td>
                                <td className="px-4 py-3 text-gray-300">{question.category}</td>
                                <td className="px-4 py-3 text-gray-300">{question.type}</td>
                                <td className="px-4 py-3">
                                    <Link to={`/admin/questions/${question.id}/edit`} className="text-sm text-blue-400 hover:text-blue-300">
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
