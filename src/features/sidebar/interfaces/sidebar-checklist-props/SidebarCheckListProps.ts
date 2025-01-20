import { ChecklistItem } from "@features/sidebar";

export interface SidebarCheckListProps {
    checklist: ChecklistItem[];
    onChecklistUpdate: (checklistId: string, checked: boolean) => void;
}