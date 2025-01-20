import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveTaskToDB, getTasksFromDB, deleteTaskFromDB } from './indexedDb';

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  dueDate?: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate?: string;
    createdAt: string; // Fecha de creación
    status: 'Open' | 'In Progress' | 'Completed' | 'Overdue';
    checklist: ChecklistItem[];
  }
  

interface TaskState {
  tasks: Task[];
  selectedTaskId: string | null;
}

const initialState: TaskState = {
  tasks: [],
  selectedTaskId: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      saveTaskToDB(action.payload); // Persistir en IndexedDB
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTaskToDB(action.payload); // Actualizar en IndexedDB
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      deleteTaskFromDB(action.payload); // Eliminar de IndexedDB
    },
    selectTask: (state, action: PayloadAction<string | null>) => {
      state.selectedTaskId = action.payload;
    },
    updateTaskChecklist(
        state,
        action: PayloadAction<{ taskId: string; checklistId: string; checked: boolean }>
      ) {
        const { taskId, checklistId, checked } = action.payload;
        const task = state.tasks.find((t) => t.id === taskId);
        if (task) {
          const checklistItem = task.checklist.find((item) => item.id === checklistId);
          if (checklistItem) {
            checklistItem.checked = checked;
          }
        }
      },
  },
});

export const { setTasks, addTask, updateTask, deleteTask, selectTask, updateTaskChecklist } = taskSlice.actions;
export default taskSlice.reducer;
