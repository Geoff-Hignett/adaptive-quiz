export type Question = {
    id: number;
    text: string;
    options: string[];
};

export type AnswerResponse = {
    correct: boolean;
    totalPoints: number;
    newLevel: number;
    isComplete: boolean;
};

export type ResultsResponse = {
    id: number;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    accuracy: number;
};

export type MeResponse = {
    displayName: string;
};

export type LeaderboardEntry = {
    displayName: string;
    totalScore: number;
    attempts: number;
    rank?: number;
};

export type StatsResponse = {
    totalAttempts: number;
    totalScore: number;
    averageScore: number;
    bestScore: number;
    averageAccuracy: number;
};
