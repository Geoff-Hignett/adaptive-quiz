import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../api/client";
import type { AdminQuestion, CreateQuestionRequest } from "../types/admin";

export function useAdminQuestions() {
    return useQuery<AdminQuestion[]>({
        queryKey: ["admin-questions"],
        queryFn: () => apiFetch<AdminQuestion[]>("/admin/questions"),
    });
}

export function useCreateQuestion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateQuestionRequest) =>
            apiFetch("/admin/questions", {
                method: "POST",
                body: JSON.stringify(payload),
            }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["admin-questions"],
            });
        },
    });
}

export function useAdminQuestion(id: number) {
    return useQuery<AdminQuestion>({
        queryKey: ["admin-question", id],

        queryFn: () => apiFetch<AdminQuestion>(`/admin/questions/${id}`),

        enabled: !!id,
    });
}

export function useUpdateQuestion(id: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateQuestionRequest) =>
            apiFetch(`/admin/questions/${id}`, {
                method: "PUT",
                body: JSON.stringify(payload),
            }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["admin-questions"],
            });

            queryClient.invalidateQueries({
                queryKey: ["admin-question", id],
            });
        },
    });
}
