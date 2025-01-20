import { Task } from "@features/task-form/task-slice";
import React, { createContext, useReducer, useContext } from "react";


interface TaskState {
  tasks: Task[];
  selectedTaskId: string | null;
}

interface TaskContextProps extends TaskState {
  selectTask: (id: string | null) => void;
  updateTask: (updatedTask: Task) => void;
  updateChecklist: (taskId: string, checklistId: string, checked: boolean) => void;
}

const initialState: TaskState = {
  tasks: [],
  selectedTaskId: null,
};

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

const taskReducer = (state: TaskState, action: any): TaskState => {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    case "SELECT_TASK":
      return { ...state, selectedTaskId: action.payload };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case "UPDATE_CHECKLIST":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? {
                ...task,
                checklist: task.checklist.map((item) =>
                  item.id === action.payload.checklistId
                    ? { ...item, checked: action.payload.checked }
                    : item
                ),
              }
            : task
        ),
      };
    default:
      return state;
  }
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const selectTask = (id: string | null) => dispatch({ type: "SELECT_TASK", payload: id });
  const updateTask = (updatedTask: Task) => dispatch({ type: "UPDATE_TASK", payload: updatedTask });
  const updateChecklist = (taskId: string, checklistId: string, checked: boolean) =>
    dispatch({ type: "UPDATE_CHECKLIST", payload: { taskId, checklistId, checked } });

  return (
    <TaskContext.Provider value={{ ...state, selectTask, updateTask, updateChecklist }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextProps => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTaskContext must be used within a TaskProvider");
  return context;
};
