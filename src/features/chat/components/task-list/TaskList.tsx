import { TaskListProps } from "@features/chat";
import { Message } from "../chat/message";
import './TaskList.scss';

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, onSelect }) => {
  return (
    <main className="chat-container">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Message
            key={task.id}
            message={{
              id: task.id?.toString() || "",
              author: "Sistema",
              title: task.title,
              time: task.dueDate || "Sin fecha",
              content: task.description,
              createdAt: task.createdAt,
              isTaskOverdue: task.status === "Overdue",
              hasOverdueItems: task.checklist.some(({ checked }) => !checked),
              status: task.status as "Overdue" | "Open" | "In Progress" | "Completed",
            }}
            onEdit={onEdit}
            onDelete={onDelete}
            onSelect={onSelect}
          />
        ))
      ) : (
        <p className="chat-empty">No hay tareas que coincidan con la búsqueda.</p>
      )}
    </main>
  );
};

export default TaskList;
