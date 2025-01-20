import { Task } from "@features/task-form/task-slice";

export interface SidebarProps {
  task?: Task;
  isTaskOverdue: boolean;
  onChecklistUpdate: (checklistId: string, checked: boolean) => void;
}
