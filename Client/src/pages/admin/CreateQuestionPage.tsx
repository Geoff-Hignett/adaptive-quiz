import { useNavigate } from "react-router-dom";
import QuestionForm from "../../components/admin/QuestionForm";
import { useCreateQuestion } from "../../hooks/useAdminQuestions";

export default function CreateQuestionPage() {
    const navigate = useNavigate();

    const createQuestion = useCreateQuestion();

    const handleSubmit = async (values: any) => {
        await createQuestion.mutateAsync(values);

        navigate("/admin/questions");
    };

    return (
        <div className="mx-auto max-w-2xl space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Create Question</h1>
                <p className="text-sm text-gray-400">Add a new quiz question.</p>
            </div>

            <QuestionForm submitLabel="Create Question" isSubmitting={createQuestion.isPending} onSubmit={handleSubmit} />
        </div>
    );
}
