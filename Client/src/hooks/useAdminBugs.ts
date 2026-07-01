import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../api/client";
import type { BugReportResponse, BugComment } from "../types/bugs";

export function useAdminBugs() {
    return useQuery<BugReportResponse[]>({
        queryKey: ["admin-bugs"],
        queryFn: () => apiFetch<BugReportResponse[]>("/admin/bugs"),
    });
}

export function useUpdateBug() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status, severity }: { id: number; status: string; severity: string }) =>
            apiFetch(`/admin/bugs/${id}/status`, {
                method: "PUT",
                body: JSON.stringify({
                    status,
                    severity,
                }),
            }),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["admin-bugs"],
            });

            queryClient.invalidateQueries({
                queryKey: ["bug", variables.id],
            });

            queryClient.invalidateQueries({
                queryKey: ["my-bugs"],
            });
        },
    });
}

export function useAdminBug(id: number) {
    return useQuery<BugReportResponse>({
        queryKey: ["bug", id],
        queryFn: () => apiFetch<BugReportResponse>(`/admin/bugs/${id}`),
        enabled: !!id,
    });
}

export function useAdminBugComments(id: number) {
    return useQuery<BugComment[]>({
        queryKey: ["bug-comments", id],
        queryFn: () => apiFetch<BugComment[]>(`/admin/bugs/${id}/comments`),
        enabled: !!id,
    });
}

export function useAddBugComment(id: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (comment: string) =>
            apiFetch(`/admin/bugs/${id}/comments`, {
                method: "POST",
                body: JSON.stringify({
                    comment,
                }),
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["bug-comments", id],
            });
        },
    });
}
