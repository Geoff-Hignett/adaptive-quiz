import { useState } from "react";
import { Link } from "react-router-dom";
import { useAdminBugs } from "../../hooks/useAdminBugs";
import { formatRelativeDate } from "../../utils/date";
import BugStatusBadge from "../../components/bug/BugStatusBadge";
import BugSeverityBadge from "../../components/bug/BugSeverityBadge";

export default function AdminBugsPage() {
    const { data: bugs, isLoading } = useAdminBugs();

    const [statusFilter, setStatusFilter] = useState("All");
    const [severityFilter, setSeverityFilter] = useState("All");
    const [search, setSearch] = useState("");

    const filteredBugs =
        bugs?.filter((bug) => {
            const matchesStatus = statusFilter === "All" || bug.status === statusFilter;
            const matchesSeverity = severityFilter === "All" || bug.severity === severityFilter;
            const searchLower = search.toLowerCase();
            const matchesSearch = bug.title.toLowerCase().includes(searchLower) || bug.description.toLowerCase().includes(searchLower);

            return matchesStatus && matchesSeverity && matchesSearch;
        }) ?? [];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-5">Manage Bug Reports</h1>
                <div className="grid gap-4 rounded-xl border border-gray-800 bg-gray-900 p-4 md:grid-cols-3">
                    <div>
                        <label className="mb-1 block text-sm text-gray-400">Status</label>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full rounded border border-gray-700 bg-gray-950 p-2">
                            <option>All</option>
                            <option>Open</option>
                            <option>In Progress</option>
                            <option>Resolved</option>
                            <option>Closed</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm text-gray-400">Severity</label>

                        <select
                            value={severityFilter}
                            onChange={(e) => setSeverityFilter(e.target.value)}
                            className="w-full rounded border border-gray-700 bg-gray-950 p-2">
                            <option>All</option>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                            <option>Critical</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm text-gray-400">Search</label>

                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search bugs..."
                            className="w-full rounded border border-gray-700 bg-gray-950 p-2"
                        />
                    </div>
                </div>
            </div>

            {isLoading && <p>Loading...</p>}
            <p className="text-sm text-gray-400">
                Showing {filteredBugs.length} of {bugs?.length ?? 0} bugs
            </p>
            <div className="grid gap-6 lg:grid-cols-2">
                {filteredBugs.map((bug) => (
                    <div key={bug.id} className="flex min-h-[250px] flex-col rounded-xl border border-gray-800 bg-gray-900 p-6">
                        <h2 className="mb-4 text-xl font-semibold">{bug.title}</h2>

                        <div className="mb-4 flex gap-2">
                            <BugStatusBadge status={bug.status} />
                            <BugSeverityBadge severity={bug.severity} />
                        </div>

                        <p className="mb-6 flex-1 text-gray-300">{bug.description}</p>

                        <div className="space-y-2 text-sm">
                            <div>
                                <span className="font-medium text-gray-400">Reporter</span>

                                <div>{bug.displayName}</div>
                            </div>

                            <div>
                                <span className="font-medium text-gray-400">Reported</span>

                                <div>{formatRelativeDate(bug.createdAt)}</div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <Link
                                to={`/admin/bugs/${bug.id}`}
                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500">
                                Manage →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
