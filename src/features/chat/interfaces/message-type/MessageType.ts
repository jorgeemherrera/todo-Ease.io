export interface MessageType {
    id: string;
    author: string;
    title: string;
    time: string;
    content: string;
    createdAt: string;
    isTaskOverdue: boolean;
    hasOverdueItems: boolean;
    status?: "Open" | "In Progress" | "Completed" | "Overdue";
}