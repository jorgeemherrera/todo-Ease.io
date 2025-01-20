import { Key } from "react";

export type Task = {
    id: Key | null | undefined;
    title: string;
    dueDate: string;
    description: string;
    createdAt: string;
    status: string;
    checklist: { checked: boolean }[];
};