import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAdminBug, useUpdateBug, useAdminBugComments, useAddBugComment } from "../../hooks/useAdminBugs";

export default function AdminBugDetailsPage() {
    const { id } = useParams();
    const bugId = Number(id);

    const { data: bug, isLoading } = useAdminBug(bugId);
    const { data: comments } = useAdminBugComments(bugId);
    const updateBug = useUpdateBug();
    const addComment = useAddBugComment(bugId);

    const [status, setStatus] = useState("");
    const [severity, setSeverity] = useState("");
    const [comment, setComment] = useState("");

    useEffect(() => {
        if (bug) {
            setStatus(bug.status);
            setSeverity(bug.severity);
        }
    }, [bug]);

    if (isLoading) return <p>Loading...</p>;

    if (!bug) return <p>Bug not found.</p>;

    return (
        <div className="space-y-8">
            <Link to="/admin/bugs" className="inline-block text-blue-400 hover:underline">
                ← Back to Bugs
            </Link>

            <h1 className="text-3xl font-bold">Bug #{bug.id}</h1>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* DETAILS */}

                <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                    <h2 className="mb-4 text-xl font-semibold">Bug Details</h2>

                    <div className="space-y-4">
                        <div>
                            <div className="text-sm text-gray-400">Reporter</div>
                            <div>{bug.displayName}</div>
                        </div>

                        <div>
                            <div className="text-sm text-gray-400">Created</div>
                            <div>{new Date(bug.createdAt).toLocaleString()}</div>
                        </div>

                        <div>
                            <div className="text-sm text-gray-400">Status</div>
                            <div>{bug.status}</div>
                        </div>

                        <div>
                            <div className="text-sm text-gray-400">Severity</div>
                            <div>{bug.severity}</div>
                        </div>

                        <div>
                            <div className="text-sm text-gray-400">Title</div>
                            <div>{bug.title}</div>
                        </div>

                        <div>
                            <div className="text-sm text-gray-400">Description</div>
                            <div>{bug.description}</div>
                        </div>
                    </div>
                </div>

                {/* MANAGE */}

                <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                    <h2 className="mb-4 text-xl font-semibold">Manage</h2>

                    <div className="space-y-5">
                        <div>
                            <label className="mb-1 block text-sm">Status</label>

                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full rounded border border-gray-700 bg-gray-950 p-2">
                                <option>Open</option>
                                <option>In Progress</option>
                                <option>Resolved</option>
                                <option>Closed</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm">Severity</label>

                            <select
                                value={severity}
                                onChange={(e) => setSeverity(e.target.value)}
                                className="w-full rounded border border-gray-700 bg-gray-950 p-2">
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                                <option>Critical</option>
                            </select>
                        </div>

                        <button
                            onClick={() =>
                                updateBug.mutate({
                                    id: bug.id,
                                    status,
                                    severity,
                                })
                            }
                            className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

            {/* CONVERSATION */}

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                <h2 className="mb-6 text-xl font-semibold">Conversation</h2>

                <div className="space-y-4">
                    {comments?.map((c) => (
                        <div key={c.id} className="rounded border border-gray-700 p-4">
                            <div className="mb-2 flex justify-between">
                                <div>
                                    <div className="font-semibold">{c.displayName}</div>

                                    <div className="text-sm text-gray-400">{c.role}</div>
                                </div>

                                <div className="text-sm text-gray-400">{new Date(c.createdAt).toLocaleString()}</div>
                            </div>

                            <p>{c.comment}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ADD COMMENT */}

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                <h2 className="mb-4 text-xl font-semibold">Add Comment</h2>

                <textarea
                    rows={5}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mb-4 w-full rounded border border-gray-700 bg-gray-950 p-3"
                />

                <button
                    onClick={async () => {
                        if (!comment.trim()) return;

                        await addComment.mutateAsync(comment);

                        setComment("");
                    }}
                    className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500">
                    Add Comment
                </button>
            </div>
        </div>
    );
}
