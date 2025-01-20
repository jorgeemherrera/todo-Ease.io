import { Key, useState } from "react";
import { Input, Message } from "@shared/components";
import { ChatProps } from "../interfaces/chat-props/ChatProps";
import "./Chat.scss";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/16/solid";

const Chat: React.FC<ChatProps> = ({ messages, onEnter, onEdit, onDelete, onSelect }) => {
  const [command, setCommand] = useState("");
  const [commandText, setCommandText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [isFilterOpen, setFilterOpen] = useState(false);

  const handleCommandExecution = (action: string, title: string) => {
    switch (action.toUpperCase()) {
      case "CREAR":
        onEnter(title);
        break;
      case "EDITAR": {
        const task = messages.find((msg) => msg.title === title);
        if (task) onEdit(task.id);
        break;
      }
      case "BORRAR": {
        const task = messages.find((msg) => msg.title === title);
        if (task) onDelete(task.id);
        break;
      }
      default:
        onEnter(`${action} ${title}`);
        break;
    }
  };
 

  // Obtén las tareas desde el store
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const filteredTasks = tasks.filter((task: { title: string; status: string; }) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "overdue" && task.status === "Overdue") ||
      (selectedFilter === "completed" && task.status === "Completed") ||
      (selectedFilter === "in-progress" && task.status === "In Progress") ||
      (selectedFilter === "open" && task.status === "Open");
    return matchesSearch && matchesFilter;
  });
  const handleCommandChange = (newCommand: string, newCommandText: string) => {
    setCommand(newCommand);
    setCommandText(newCommandText);
  };

const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setFilterOpen(false);
  };

  return (
    <div className="chat">
              <div className="chat-header">
        <h1 className="chat-title">Lista de Tareas</h1>
        <div className="chat-actions">
          <div className="search-bar">
            <MagnifyingGlassIcon className="search-icon" />
            <input
              type="text"
              placeholder="Buscar tareas..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
          <div className="filter-container">
            <button
              className="filter-button"
              onClick={() => setFilterOpen(!isFilterOpen)}
            >
              <FunnelIcon className="filter-icon" />
            </button>
            {isFilterOpen && (
              <div className="filter-menu">
                <button onClick={() => handleFilterSelect("all")}>Todas</button>
                <button onClick={() => handleFilterSelect("open")}>Abiertas</button>
                <button onClick={() => handleFilterSelect("in-progress")}>
                  En progreso
                </button>
                <button onClick={() => handleFilterSelect("completed")}>
                  Completadas
                </button>
                <button onClick={() => handleFilterSelect("overdue")}>Vencidas</button>
              </div>
            )}
          </div>
        </div>
      </div>
     <div className="chat-container">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task: { id: Key | null | undefined; title: any; dueDate: any; description: any; createdAt: any; status: string; checklist: { checked: boolean; }[]; }) => (
            <Message
              key={task.id}
              message={{
                id: task.id?.toString() || "" ,
                author: "Sistema", // Reemplaza con el autor si está disponible
                title: task.title,
                time: task.dueDate || "Sin fecha",
                content: task.description,
                createdAt: task.createdAt,
                isTaskOverdue: task.status === "Overdue",
                hasOverdueItems: task.checklist.some((item: { checked: boolean; }) => item.checked === false),
                status: task.status as "Overdue" | "Open" | "In Progress" | "Completed" | undefined, // Estado de la tarea
              }}

              onEdit={onEdit}
              onDelete={onDelete}
              onSelect={onSelect}
            />
          ))
        ) : (
          <p className="chat-empty">No hay tareas que coincidan con la búsqueda.</p>
        )}
      </div>
      <Input
        command={command}
        commandText={commandText}
        onCommandChange={handleCommandChange}
        onCommandExecute={handleCommandExecution}
      />
    </div>
  );
};

export default Chat;
