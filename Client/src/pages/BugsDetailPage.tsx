import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { formatRelativeDate } from "../utils/date";
import { useUserBug, useUserBugComments, useAddUserBugComment } from "../hooks/useBugs";
import BugConversation from "../components/bug/BugConversation";
import BugStatusBadge from "../components/bug/BugStatusBadge";
import BugSeverityBadge from "../components/bug/BugSeverityBadge";

export default function BugDetailsPage() {
    const { id } = useParams();
    const bugId = Number(id);

    const { data: bug, isLoading } = useUserBug(bugId);
    const { data: comments } = useUserBugComments(bugId);
    const addComment = useAddUserBugComment(bugId);

    const [comment, setComment] = useState("");

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!bug) {
        return <p>Bug not found.</p>;
    }

    return (
        <div className="space-y-8">
            <Link to="/bugs" className="inline-block text-blue-400 hover:underline">
                ← Back to My Bugs
            </Link>

            <h1 className="text-3xl font-bold">Bug #{bug.id}</h1>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                <h2 className="mb-4 text-xl font-semibold">Bug Details</h2>

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <div className="mb-1 text-sm text-gray-400">Status</div>

                        <BugStatusBadge status={bug.status} />
                    </div>

                    <div>
                        <div className="mb-1 text-sm text-gray-400">Severity</div>

                        <BugSeverityBadge severity={bug.severity} />
                    </div>

                    <div className="md:col-span-2">
                        <div className="mb-1 text-sm text-gray-400">Title</div>

                        <div>{bug.title}</div>
                    </div>

                    <div className="md:col-span-2">
                        <div className="mb-1 text-sm text-gray-400">Description</div>

                        <div>{bug.description}</div>
                    </div>

                    <div>
                        <div className="mb-1 text-sm text-gray-400">Reported</div>

                        <div>{formatRelativeDate(bug.createdAt)}</div>
                    </div>
                </div>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                <h2 className="mb-6 text-xl font-semibold">Conversation</h2>

                <BugConversation comments={comments} />
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                <h2 className="mb-4 text-xl font-semibold">Reply</h2>

                <textarea
                    rows={5}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mb-4 w-full rounded border border-gray-700 bg-gray-950 p-3"
                    placeholder="Type your reply..."
                />

                <button
                    onClick={async () => {
                        if (!comment.trim()) {
                            return;
                        }

                        await addComment.mutateAsync(comment);

                        setComment("");
                    }}
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 disabled:opacity-50"
                    disabled={addComment.isPending}>
                    {addComment.isPending ? "Sending..." : "Send Reply"}
                </button>
            </div>
        </div>
    );
}
