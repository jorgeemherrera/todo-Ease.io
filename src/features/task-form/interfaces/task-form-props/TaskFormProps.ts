import { ChecklistItem } from "@features/sidebar";

export interface TaskFormProps {
  initialData?: {
    id?: string;
    title: string;
    description: string;
    dueDate?: string;
    status: "Open" | "In Progress" | "Completed" | "Overdue";
    checklist: ChecklistItem[];
  };
  onSave: (task: any) => void;
  onCancel: () => void;
}