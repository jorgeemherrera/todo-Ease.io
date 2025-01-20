import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveTaskToDB, deleteTaskFromDB } from '../utils/indexed-db/indexedDb';
import { Task, TaskState } from './interfaces';

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
      saveTaskToDB(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTaskToDB(action.payload); 
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      deleteTaskFromDB(action.payload);
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
