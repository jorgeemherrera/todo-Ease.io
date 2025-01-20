import { MessageType } from "@features/chat";

export interface MessageProps {
    message: MessageType;
    onEdit: (taskId: string) => void;
    onDelete: (taskId: string) => void;
    onSelect: (taskId: string) => void;
}