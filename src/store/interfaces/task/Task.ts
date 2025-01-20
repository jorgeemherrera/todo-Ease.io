import { ChecklistItem } from "..";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  createdAt: string;
  status: 'Open' | 'In Progress' | 'Completed' | 'Overdue';
  checklist: ChecklistItem[];
}