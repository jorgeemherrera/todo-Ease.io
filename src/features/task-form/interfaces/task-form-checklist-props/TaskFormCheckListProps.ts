import { ChecklistItem } from "@features/sidebar";

export interface TaskFormChecklistProps {
    checklist: ChecklistItem[];
    onChecklistUpdate: (updatedChecklist: ChecklistItem[]) => void;
}