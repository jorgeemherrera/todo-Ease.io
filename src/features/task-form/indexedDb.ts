import { openDB } from "idb";

const dbName = "tasksDB";
const tasksStoreName = "tasks";
const actionsStoreName = "actions";
const settingsStoreName = "settings";

interface ChatMessage {
  id: string;
  author: string;
  time: string;
  content: string;
  createdAt: string;
  isTaskOverdue: boolean;
  hasOverdueItems: boolean;
}

export const initDB = async () => {
    const db = await openDB(dbName, 2, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          // Versión inicial: crear almacenes `tasks` y `actions`
          if (!db.objectStoreNames.contains(tasksStoreName)) {
            db.createObjectStore(tasksStoreName, { keyPath: "id" });
          }
        }
        if (oldVersion < 2) {
          // Versión 2: agregar almacén `settings`
          if (!db.objectStoreNames.contains(settingsStoreName)) {
            db.createObjectStore(settingsStoreName, { keyPath: "key" });
          }
        }
      },
    });
    return db;
  };

export const saveTaskToDB = async (task: any) => {
  const db = await initDB();
  await db.put(tasksStoreName, task);
};

export const getTasksFromDB = async () => {
  const db = await initDB();
  return await db.getAll(tasksStoreName);
};

export const deleteTaskFromDB = async (id: string) => {
  const db = await initDB();
  await db.delete(tasksStoreName, id);
};

export const saveActionToDB = async (action: ChatMessage) => {
  const db = await initDB();
  await db.put(actionsStoreName, action);
};

export const getActionsFromDB = async (): Promise<ChatMessage[]> => {
  const db = await initDB();
  const actions = await db.getAll(actionsStoreName);
  return actions.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1)); // Orden descendente
};

// Guardar el tema en IndexedDB
export const saveThemeToDB = async (theme: "light" | "dark") => {
    const db = await initDB();
    await db.put(settingsStoreName, { key: "theme", value: theme });
  };
  
  export const getThemeFromDB = async (): Promise<"light" | "dark" | undefined> => {
    const db = await initDB();
    const record = await db.get(settingsStoreName, "theme");
    return record?.value;
  };
  