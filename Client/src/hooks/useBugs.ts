import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../api/client";
import type { BugReportResponse, BugComment } from "../types/bugs";

export function useMyBugs() {
    return useQuery<BugReportResponse[]>({
        queryKey: ["bugs"],
        queryFn: () => apiFetch<BugReportResponse[]>("/quiz/bugs"),
    });
}

export function useCreateBug() {
    return useMutation({
        mutationFn: (payload: { title: string; description: string }) =>
            apiFetch<BugReportResponse>("/quiz/bugs", {
                method: "POST",
                body: JSON.stringify(payload),
            }),
    });
}

export function useBugComments(id: number) {
    return useQuery<BugComment[]>({
        queryKey: ["bug-comments", id],
        queryFn: () => apiFetch<BugComment[]>(`/admin/bugs/${id}/comments`),
        enabled: !!id,
    });
}

export function useUserBug(id: number) {
    return useQuery<BugReportResponse>({
        queryKey: ["user-bug", id],
        queryFn: () => apiFetch<BugReportResponse>(`/quiz/bugs/${id}`),
        enabled: !!id,
    });
}

export function useUserBugComments(id: number) {
    return useQuery<BugComment[]>({
        queryKey: ["user-bug-comments", id],
        queryFn: () => apiFetch<BugComment[]>(`/quiz/bugs/${id}/comments`),
        enabled: !!id,
    });
}

export function useAddUserBugComment(id: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (comment: string) =>
            apiFetch(`/quiz/bugs/${id}/comments`, {
                method: "POST",
                body: JSON.stringify({
                    comment,
                }),
            }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user-bug-comments", id],
            });
        },
    });
}
