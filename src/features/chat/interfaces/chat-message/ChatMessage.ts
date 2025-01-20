export interface ChatMessage {
    status: string;
    id: string;
    author: string;
    title: string;
    time: string;
    content: string;
    createdAt: string;
    isTaskOverdue: boolean;
    hasOverdueItems: boolean;
}