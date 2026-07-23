import type { BugComment } from "../../types/bugs";

interface Props {
    comments?: BugComment[];
}

export default function BugConversation({ comments }: Props) {
    if (!comments || comments.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-gray-700 py-10 text-center">
                <div className="mb-2 text-4xl">💬</div>
                <p className="font-medium">No conversation yet</p>
                <p className="mt-2 text-sm text-gray-400">Messages between you and the administrator will appear here.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {comments.map((comment) => {
                const isAdmin = comment.role === "Admin";

                return (
                    <div
                        key={comment.id}
                        className={`rounded-xl border p-5 ${isAdmin ? "border-slate-700 bg-slate-800" : "border-gray-700 bg-gray-900"}`}>
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="font-semibold">{comment.displayName}</span>

                                <span
                                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                        isAdmin ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"
                                    }`}>
                                    {comment.role.toUpperCase()}
                                </span>
                            </div>

                            <span className="text-sm text-gray-400">{new Date(comment.createdAt).toLocaleString()}</span>
                        </div>

                        <p className="whitespace-pre-wrap text-gray-100">{comment.comment}</p>
                    </div>
                );
            })}
        </div>
    );
}
