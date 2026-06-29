import { Link, useParams } from "react-router-dom";
import { useBug } from "../../hooks/useAdminBugs";

export default function AdminBugDetailsPage() {
    const { id } = useParams();

    const { data: bug, isLoading } = useBug(Number(id));

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!bug) {
        return <p>Bug not found.</p>;
    }

    return (
        <div className="space-y-6">
            <Link to="/admin/bugs" className="inline-block text-blue-400 hover:underline">
                ← Back to Bugs
            </Link>

            <h1 className="text-3xl font-bold">Bug #{bug.id}</h1>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                <h2 className="mb-4 text-xl font-semibold">{bug.title}</h2>

                <p>{bug.description}</p>
            </div>
        </div>
    );
}
