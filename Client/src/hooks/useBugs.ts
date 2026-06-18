import { useMutation, useQuery } from "@tanstack/react-query";
import { apiFetch } from "../api/client";
import type { BugReport } from "../types/bugs";

export function useMyBugs() {
    return useQuery({
        queryKey: ["bugs"],
        queryFn: () => apiFetch<BugReport[]>("/quiz/bugs"),
    });
}

export function useCreateBug() {
    return useMutation({
        mutationFn: (payload: { title: string; description: string }) =>
            apiFetch<BugReport>("/quiz/bugs", {
                method: "POST",
                body: JSON.stringify(payload),
            }),
    });
}
