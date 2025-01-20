import { ChatMessage } from "../chat-message";

export interface ChatProps {
  messages: ChatMessage[];
  onEnter: (title: string) => void;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onSelect: (taskId: string) => void;
}
