import { Task } from "@store/task-slice";

export interface SidebarProps {
    task?: Task;
    onChecklistUpdate: (checklistId: string, checked: boolean) => void;
    onStatusChange: (status: "Open" | "In Progress" | "Completed" | "Overdue") => void;
}