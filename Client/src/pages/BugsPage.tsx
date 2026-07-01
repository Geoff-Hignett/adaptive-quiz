import { useState } from "react";
import { Link } from "react-router-dom";
import { useCreateBug, useMyBugs } from "../hooks/useBugs";
import { getStatusClasses } from "../utils/bugStatus";

export default function BugsPage() {
    const { data: bugs, isLoading, refetch } = useMyBugs();

    const createBug = useCreateBug();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title.trim() || !description.trim()) {
            return;
        }

        try {
            await createBug.mutateAsync({
                title,
                description,
            });

            setTitle("");
            setDescription("");

            refetch();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Bug Reports</h1>

                <p className="text-gray-400">Found an issue? Let us know and track its progress.</p>
            </div>

            {/* Main Content */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Report Form */}
                <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                    <h2 className="mb-4 text-xl font-semibold">Report a Bug</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium">Title</label>

                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2"
                                placeholder="Brief summary of the issue"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">Description</label>

                            <textarea
                                rows={8}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2"
                                placeholder="Describe what happened..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={createBug.isPending}
                            className="rounded bg-blue-600 px-4 py-2 font-medium hover:bg-blue-500 disabled:opacity-50">
                            {createBug.isPending ? "Submitting..." : "Submit Bug"}
                        </button>
                    </form>
                </div>

                {/* Bug List */}
                <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                    <h2 className="mb-4 text-xl font-semibold">My Bug Reports</h2>

                    {isLoading && <p className="text-gray-400">Loading...</p>}

                    {!isLoading && bugs?.length === 0 && <p className="text-gray-400">No bug reports yet.</p>}

                    <div className="space-y-3">
                        {bugs?.map((bug) => (
                            <div key={bug.id} className="rounded-lg border border-gray-700 bg-gray-800 p-4">
                                <div className="mb-2 flex items-start justify-between gap-4">
                                    <h3 className="font-semibold">{bug.title}</h3>

                                    <span className={`rounded px-2 py-1 text-xs whitespace-nowrap ${getStatusClasses(bug.status)}`}>
                                        {bug.status}
                                    </span>
                                </div>

                                <p className="mb-3 text-sm text-gray-300">{bug.description}</p>

                                <p className="text-xs text-gray-500">{new Date(bug.createdAt).toLocaleString()}</p>
                                <div className="mt-4 flex justify-end">
                                    <Link to={`/bugs/${bug.id}`} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
