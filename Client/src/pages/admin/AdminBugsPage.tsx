import { useAdminBugs } from "../../hooks/useAdminBugs";

export default function AdminBugsPage() {
    const { data: bugs, isLoading } = useAdminBugs();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Manage Bug Reports</h1>

                <p className="text-gray-400">View and manage all submitted bugs.</p>
            </div>

            {isLoading && <p>Loading...</p>}

            <div className="space-y-4">
                {bugs?.map((bug) => (
                    <div key={bug.id} className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">{bug.title}</h2>

                            <span className="rounded bg-gray-700 px-3 py-1 text-sm">{bug.status}</span>
                        </div>

                        <p className="mb-4 text-gray-300">{bug.description}</p>

                        <div className="space-y-1 text-sm text-gray-400">
                            <div>
                                <strong>User:</strong> {bug.user.displayName}
                            </div>

                            <div>
                                <strong>Email:</strong> {bug.user.email}
                            </div>

                            <div>
                                <strong>Created:</strong> {new Date(bug.createdAt).toLocaleString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
