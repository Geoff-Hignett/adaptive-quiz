import { useNavigate, useParams } from "react-router-dom";
import QuestionForm from "../../components/admin/QuestionForm";
import { useAdminQuestion, useUpdateQuestion } from "../../hooks/useAdminQuestions";
import type { CreateQuestionRequest } from "../../types/admin";

export default function EditQuestionPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const questionId = Number(id);

    const { data, isLoading } = useAdminQuestion(questionId);
    const updateQuestion = useUpdateQuestion(questionId);

    const handleSubmit = async (values: CreateQuestionRequest) => {
        await updateQuestion.mutateAsync(values);

        navigate("/admin/questions");
    };

    if (isLoading || !data) {
        return <p className="text-gray-400">Loading question...</p>;
    }

    return (
        <div className="mx-auto max-w-2xl space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Edit Question</h1>
                <p className="text-sm text-gray-400">Update quiz question.</p>
            </div>

            <QuestionForm initialValues={data} submitLabel="Save Changes" isSubmitting={updateQuestion.isPending} onSubmit={handleSubmit} />
        </div>
    );
}
