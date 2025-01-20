import { Task } from "@features/chat";

export interface TaskListProps {
    tasks: Task[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onSelect: (id: string) => void;
}