import { Task } from "../task";

export interface TaskState {
  tasks: Task[];
  selectedTaskId: string | null;
}