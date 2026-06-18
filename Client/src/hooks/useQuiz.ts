import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../api/client";
import { useAuth } from "../context/AuthContext";
import type { Question, AnswerResponse, ResultsResponse, MeResponse, LeaderboardEntry, StatsResponse } from "../types/quiz";

export function useStartQuiz() {
    return useMutation({
        mutationFn: () => apiFetch<{ id: number; startingLevel: number }>("/quiz/start", { method: "POST" }),
    });
}

export function useNextQuestion(attemptId: number | null) {
    return useQuery<Question>({
        queryKey: ["question", attemptId],
        queryFn: () => apiFetch<Question>(`/quiz/next?attemptId=${attemptId}`),
        enabled: !!attemptId, // don't load a question until user has started quiz
    });
}

export function useAnswer() {
    return useMutation({
        mutationFn: (payload: { attemptId: number; questionId: number; answer: string; timeTakenMs: number }) =>
            apiFetch<AnswerResponse>("/quiz/answer", {
                method: "POST",
                body: JSON.stringify(payload),
            }),
    });
}

export function useResults(attemptId: number | null) {
    return useQuery<ResultsResponse>({
        queryKey: ["results", attemptId],
        queryFn: () => apiFetch<ResultsResponse>(`/quiz/results?attemptId=${attemptId}`),
        enabled: !!attemptId,
        staleTime: Infinity,
    });
}

export function useMe() {
    const { session } = useAuth();

    return useQuery({
        queryKey: ["me", session?.user?.email],
        queryFn: () => {
            console.log("[useMe] fetching");
            return apiFetch<MeResponse>("/quiz/me");
        },
        enabled: !!session,
        retry: false,
        staleTime: 1000 * 60 * 5,
    });
}

export function useLeaderboard() {
    return useQuery<LeaderboardEntry[]>({
        queryKey: ["leaderboard"],
        queryFn: () => apiFetch<LeaderboardEntry[]>("/quiz/leaderboard"),
        staleTime: 1000 * 30, // 30 seconds,
    });
}

export function useStats() {
    return useQuery<StatsResponse>({
        queryKey: ["stats"],
        queryFn: () => apiFetch<StatsResponse>("/quiz/stats"),
        staleTime: 1000 * 60 * 30, // 30 minutes
    });
}

export function useUpdateDisplayName() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (displayName: string) =>
            apiFetch<void>("/quiz/display-name", {
                method: "PUT",
                body: JSON.stringify({ displayName }),
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["me"] });
        },
    });
}
