import React from "react";
import { Message } from "@shared/components";

interface Task {
  id: string;
  title: string;
  dueDate: string;
  description: string;
  createdAt: string;
  status: string;
  checklist: { checked: boolean }[];
}

interface TaskListProps {
  tasks: Task[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, onSelect }) => {
    return (
      <div className="chat-container">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Message
              key={task.id}
              message={{
                id: task.id,
                title: task.title,
                time: task.dueDate || "Sin fecha",
                content: task.description,
                isTaskOverdue: task.status === "Overdue",
                hasOverdueItems: task.checklist.some((item) => !item.checked),
                status: task.status as "Overdue" | "Open" | "In Progress" | "Completed",
                author: "Unknown", // Add appropriate value for author
                createdAt: task.createdAt,
              }}
              onEdit={(id) => onEdit(id)} // Pasar correctamente el callback
              onDelete={(id) => onDelete(id)} // Pasar correctamente el callback
              onSelect={(id) => onSelect(id)} // Pasar correctamente el callback
            />
          ))
        ) : (
          <p className="chat-empty">No hay tareas que coincidan con la búsqueda.</p>
        )}
      </div>
    );
  };
  

export default TaskList;
