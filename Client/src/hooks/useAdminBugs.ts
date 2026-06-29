import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../api/client";
import type { BugReport } from "../types/bugs";

export function useAdminBugs() {
    return useQuery<BugReport[]>({
        queryKey: ["admin-bugs"],
        queryFn: () => apiFetch<BugReport[]>("/admin/bugs"),
    });
}

export function useUpdateBugStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status }: { id: number; status: string }) =>
            apiFetch(`/admin/bugs/${id}/status`, {
                method: "PUT",
                body: JSON.stringify({ status }),
            }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["admin-bugs"],
            });

            queryClient.invalidateQueries({
                queryKey: ["my-bugs"],
            });
        },
    });
}

export function useBug(id: number) {
    return useQuery({
        queryKey: ["bug", id],
        queryFn: () => apiFetch(`/admin/bugs/${id}`),
        enabled: !!id,
    });
}

export function useBugComments(id: number) {
    return useQuery({
        queryKey: ["bug-comments", id],
        queryFn: () => apiFetch(`/admin/bugs/${id}/comments`),
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
