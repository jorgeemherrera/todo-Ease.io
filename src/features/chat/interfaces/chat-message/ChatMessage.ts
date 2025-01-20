export interface ChatMessage {
    id: string;
    author: string;
    title: string;
    time: string;
    content: string;
    createdAt: string;
    isTaskOverdue: boolean;
    hasOverdueItems: boolean;
}