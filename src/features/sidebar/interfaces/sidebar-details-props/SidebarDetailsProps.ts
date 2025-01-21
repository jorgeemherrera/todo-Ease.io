export interface SidebarDetailsProps {
  task: {
    description?: string;
    dueDate?: string;
    status: "Open" | "In Progress" | "Completed" | "Overdue";
  };
  onStatusChange: (status: "Open" | "In Progress" | "Completed" | "Overdue") => void;
}