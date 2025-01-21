export interface Task {
    id: string;
    title: string;
    description?: string;
    dueDate?: string;
    createdAt: string;
    checklist: { dueDate?: string; checked: boolean }[];
    status: "Open" | "In Progress" | "Completed" | "Overdue"; 
  }