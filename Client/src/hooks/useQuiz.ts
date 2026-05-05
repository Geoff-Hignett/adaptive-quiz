import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../api/client";
import type { Question, AnswerResponse, ResultsResponse, MeResponse, LeaderboardEntry, StatsResponse } from "../types/quiz";

export function useStartQuiz() {
    return useMutation({
        mutationFn: () => apiFetch<{ id: number }>("/start", { method: "POST" }),
    });
}

export function useNextQuestion(attemptId: number | null) {
    return useQuery<Question>({
        queryKey: ["question", attemptId],
        queryFn: () => apiFetch<Question>(`/next?attemptId=${attemptId}`),
        enabled: !!attemptId, // don't execute query if user hasn't started quiz
    });
}

export function useAnswer() {
    return useMutation({
        mutationFn: (payload: { attemptId: number; questionId: number; answer: string; timeTakenMs: number }) =>
            apiFetch<AnswerResponse>("/answer", {
                method: "POST",
                body: JSON.stringify(payload),
            }),
    });
}

export function useResults(attemptId: number | null) {
    return useQuery<ResultsResponse>({
        queryKey: ["results", attemptId],
        queryFn: () => apiFetch<ResultsResponse>(`/results?attemptId=${attemptId}`),
        enabled: !!attemptId,
    });
}

export function useMe() {
    return useQuery({
        queryKey: ["me"],
        queryFn: () => {
            console.log("[useMe] fetching");
            return apiFetch<MeResponse>("/me");
        },
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
}

export function useLeaderboard() {
    return useQuery<LeaderboardEntry[]>({
        queryKey: ["leaderboard"],
        queryFn: () => apiFetch<LeaderboardEntry[]>("/leaderboard"),
    });
}

export function useStats() {
    return useQuery<StatsResponse>({
        queryKey: ["stats"],
        queryFn: () => apiFetch<StatsResponse>("/stats"),
    });
}

export function useUpdateDisplayName() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (displayName: string) =>
            apiFetch<void>("/display-name", {
                method: "PUT",
                body: JSON.stringify({ displayName }),
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["me"] });
        },
    });
}
