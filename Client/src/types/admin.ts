export type AdminQuestion = {
    id: number;
    text: string;
    difficulty: number;
    category: string;
    type: string;
    options: string[];
    correctAnswer: string;
};

export type CreateQuestionRequest = {
    text: string;
    difficulty: number;
    category: string;
    type: string;
    options: string[];
    correctAnswer: string;
};
