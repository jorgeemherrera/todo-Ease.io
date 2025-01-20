export interface TaskFormDetailsProps {
    title: string;
    setTitle: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
    dueDate: string;
    setDueDate: (value: string) => void;
    status: "Open" | "In Progress" | "Completed" | "Overdue";
    setStatus: (value: "Open" | "In Progress" | "Completed" | "Overdue") => void;
}