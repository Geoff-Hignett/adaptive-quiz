export interface BugReportResponse {
    id: number;
    title: string;
    description: string;
    status: string;
    severity: string;
    createdAt: string;
    displayName: string;
}

export interface BugComment {
    id: number;
    comment: string;
    createdAt: string;
    displayName: string;
    role: string;
}
