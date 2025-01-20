import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '@features/task-form/task-slice'; // Importa tu slice de tareas

// Configura el store con los reducers
export const store = configureStore({
  reducer: {
    tasks: taskReducer, // Añade más reducers si tienes otros slices
  },
});

// Define RootState basado en el tipo del store
export type RootState = ReturnType<typeof store.getState>;

// Exporta el tipo de Dispatch si es necesario
export type AppDispatch = typeof store.dispatch;
