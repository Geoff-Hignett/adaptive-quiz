export type BugReport = {
    id: number;
    userId: number;

    title: string;
    description: string;
    status: string;
    createdAt: string;

    user: {
        id: number;
        email: string;
        displayName: string;
    };
};
