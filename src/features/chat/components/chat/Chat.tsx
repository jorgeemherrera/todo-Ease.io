import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { Input } from "@shared/components";
import { ChatProps } from "../../interfaces/chat-props/ChatProps";
import { ChatHeader, TaskList } from "@features/chat";
import "./Chat.scss";

const Chat: React.FC<ChatProps> = ({ messages, onEnter, onEdit, onDelete, onSelect }) => {
  const [command, setCommand] = useState("");
  const [commandText, setCommandText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
  
      const isOverdue =
        task.dueDate &&
        new Date(task.dueDate).getTime() < new Date().setHours(0, 0, 0, 0);
  
      const matchesFilter =
        selectedFilter === "all" ||
        (selectedFilter === "overdue" && isOverdue) ||
        (selectedFilter === "completed" && task.status === "Completed") ||
        (selectedFilter === "in-progress" && task.status === "In Progress") ||
        (selectedFilter === "open" && task.status === "Open");
  
      return matchesSearch && matchesFilter;
    });
  }, [tasks, searchQuery, selectedFilter]);
  

  const handleCommandExecution = (action: string, title: string) => {
    const task = messages.find((msg) => msg.title === title);
    const actionsMap: Record<string, () => void> = {
      CREAR: () => onEnter(title),
      EDITAR: () => task && onEdit(task.id),
      BORRAR: () => task && onDelete(task.id),
      DEFAULT: () => onEnter(`${action} ${title}`),
    };
    (actionsMap[action.toUpperCase()] || actionsMap.DEFAULT)();
  };

  return (
    <div className="chat">
      <ChatHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      <TaskList tasks={filteredTasks} onEdit={onEdit} onDelete={onDelete} onSelect={onSelect}/>

      <Input
        command={command}
        commandText={commandText}
        onCommandChange={(cmd, text) => {
          setCommand(cmd);
          setCommandText(text);
        }}
        onCommandExecute={handleCommandExecution}
      />
    </div>
  );
};

export default Chat;