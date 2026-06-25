import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../api/client";
import type { BugReport } from "../types/bugs";

export function useAdminBugs() {
    return useQuery<BugReport[]>({
        queryKey: ["admin-bugs"],
        queryFn: () => apiFetch<BugReport[]>("/admin/bugs"),
    });
}
