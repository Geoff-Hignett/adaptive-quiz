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
    const [sort, setSort] = useState("Newest");

    const stats = {
        open: bugs?.filter((x) => x.status === "Open").length ?? 0,
        inProgress: bugs?.filter((x) => x.status === "In Progress").length ?? 0,
        resolved: bugs?.filter((x) => x.status === "Resolved").length ?? 0,
        closed: bugs?.filter((x) => x.status === "Closed").length ?? 0,
    };

    const filteredBugs =
        bugs?.filter((bug) => {
            const matchesStatus = statusFilter === "All" || bug.status === statusFilter;
            const matchesSeverity = severityFilter === "All" || bug.severity === severityFilter;
            const searchLower = search.toLowerCase();
            const matchesSearch = bug.title.toLowerCase().includes(searchLower) || bug.description.toLowerCase().includes(searchLower);

            return matchesStatus && matchesSeverity && matchesSearch;
        }) ?? [];

    const sortedBugs = [...filteredBugs].sort((a, b) => {
        switch (sort) {
            case "Oldest":
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();

            case "Severity": {
                const order = {
                    Critical: 4,
                    High: 3,
                    Medium: 2,
                    Low: 1,
                };

                return order[b.severity as keyof typeof order] - order[a.severity as keyof typeof order];
            }

            case "Status": {
                const order = {
                    Open: 1,
                    "In Progress": 2,
                    Resolved: 3,
                    Closed: 4,
                };

                return order[a.status as keyof typeof order] - order[b.status as keyof typeof order];
            }

            default:
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-5">Manage Bug Reports</h1>
                <div className="mb-8 grid gap-4 md:grid-cols-4">
                    <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
                        <div className="text-sm text-gray-400">Open</div>
                        <div className="mt-2 text-3xl font-bold">{stats.open}</div>
                    </div>

                    <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
                        <div className="text-sm text-gray-400">In Progress</div>
                        <div className="mt-2 text-3xl font-bold">{stats.inProgress}</div>
                    </div>

                    <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
                        <div className="text-sm text-gray-400">Resolved</div>
                        <div className="mt-2 text-3xl font-bold">{stats.resolved}</div>
                    </div>

                    <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
                        <div className="text-sm text-gray-400">Closed</div>
                        <div className="mt-2 text-3xl font-bold">{stats.closed}</div>
                    </div>
                </div>
                <h2 className="mb-2 text-xl font-semibold">Filters</h2>
                <div className="grid gap-4 rounded-xl border border-gray-800 bg-gray-900 p-4 md:grid-cols-4">
                    <div>
                        <label htmlFor="status-filter" className="mb-1 block text-sm text-gray-400">
                            Status
                        </label>

                        <select
                            id="status-filter"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full cursor-pointer rounded border border-gray-700 bg-gray-950 p-2">
                            <option>All</option>
                            <option>Open</option>
                            <option>In Progress</option>
                            <option>Resolved</option>
                            <option>Closed</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="severity-filter" className="mb-1 block text-sm text-gray-400">
                            Severity
                        </label>

                        <select
                            id="severity-filter"
                            value={severityFilter}
                            onChange={(e) => setSeverityFilter(e.target.value)}
                            className="w-full cursor-pointer rounded border border-gray-700 bg-gray-950 p-2">
                            <option>All</option>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                            <option>Critical</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="search-filter" className="mb-1 block text-sm text-gray-400">
                            Search
                        </label>

                        <input
                            id="search-filter"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search bugs..."
                            className="w-full cursor-pointer rounded border border-gray-700 bg-gray-950 p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="sort-filter" className="mb-1 block text-sm text-gray-400">
                            Sort
                        </label>

                        <select
                            id="sort-filter"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="w-full cursor-pointer rounded border border-gray-700 bg-gray-950 p-2">
                            <option>Newest</option>
                            <option>Oldest</option>
                            <option>Severity</option>
                            <option>Status</option>
                        </select>
                    </div>
                </div>
            </div>

            {isLoading && <p>Loading...</p>}
            <p className="text-sm text-gray-400">
                Showing {sortedBugs.length} of {bugs?.length ?? 0} bugs
            </p>
            <div className="grid items-stretch gap-6 lg:grid-cols-2">
                {sortedBugs.map((bug) => (
                    <div key={bug.id} className="flex min-h-[270px] flex-col rounded-xl border border-gray-800 bg-gray-900 p-6">
                        {/* Header */}
                        <h2 className="mb-4 text-xl font-semibold">{bug.title}</h2>

                        <div className="mb-4 flex gap-2">
                            <BugStatusBadge status={bug.status} />
                            <BugSeverityBadge severity={bug.severity} />
                        </div>

                        {/* Description */}
                        <p className="h-[4.5rem] overflow-hidden text-gray-300 leading-6 line-clamp-3">{bug.description}</p>

                        {/* Footer */}
                        <div className="mt-8 flex items-end justify-between">
                            <div className="text-sm text-gray-400">
                                Reported by <span className="text-white">{bug.displayName}</span>
                                {" • "}
                                {formatRelativeDate(bug.createdAt)}
                            </div>

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
