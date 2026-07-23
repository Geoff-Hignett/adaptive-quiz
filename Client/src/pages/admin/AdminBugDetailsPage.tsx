import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatRelativeDate } from "../../utils/date";
import { useAdminBug, useUpdateBug, useAdminBugComments, useAddBugComment } from "../../hooks/useAdminBugs";
import BugConversation from "../../components/bug/BugConversation";
import BugStatusBadge from "../../components/bug/BugStatusBadge";
import BugSeverityBadge from "../../components/bug/BugSeverityBadge";

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

    const dirty = status !== bug?.status || severity !== bug?.severity;

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

            <div className="grid gap-6 lg:grid-cols-3">
                {/* DETAILS */}

                <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 lg:col-span-2">
                    <h2 className="mb-6 text-xl font-semibold">Bug Details</h2>
                    <h3 className="mb-3 text-2xl font-semibold">{bug.title}</h3>
                    <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-gray-400">
                        <BugSeverityBadge severity={bug.severity} />

                        <BugStatusBadge status={bug.status} />

                        <span>•</span>

                        <span>{formatRelativeDate(bug.createdAt)}</span>

                        <span>•</span>

                        <span>
                            Reported by <span className="text-white">{bug.displayName}</span>
                        </span>
                    </div>
                    <div>
                        <h4 className="mb-2 font-medium">Description</h4>
                        <p className="whitespace-pre-wrap leading-7 text-gray-200">{bug.description}</p>
                    </div>
                </div>

                {/* MANAGE */}

                <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 lg:col-span-1">
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
                            disabled={!dirty || updateBug.isPending}
                            onClick={() =>
                                updateBug.mutate({
                                    id: bug.id,
                                    status,
                                    severity,
                                })
                            }
                            className={`
                                w-full rounded px-4 py-2 font-medium transition
                                ${dirty ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-gray-700 text-gray-400 cursor-not-allowed"}
                            `}>
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

            {/* CONVERSATION */}

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                <h2 className="mb-6 text-xl font-semibold">Conversation</h2>
                <div className="space-y-4">
                    <BugConversation comments={comments} />
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
