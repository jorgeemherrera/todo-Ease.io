import { useState } from "react";
import { Input, Message } from "@shared/components";
import { ChatProps } from "../interfaces/chat-props/ChatProps";
import "./Chat.scss";

const Chat: React.FC<ChatProps> = ({ messages, onEnter, onEdit, onDelete, onSelect }) => {
  const [command, setCommand] = useState("");
  const [commandText, setCommandText] = useState("");

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

  const handleCommandChange = (newCommand: string, newCommandText: string) => {
    setCommand(newCommand);
    setCommandText(newCommandText);
  };

  return (
    <div className="chat">
      <div className="chat-container">
        {messages.length > 0 ? (
          messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              onEdit={onEdit}
              onDelete={onDelete}
              onSelect={onSelect}
            />
          ))
        ) : (
          <p className="chat-empty">No hay tareas aún. Escribe para agregar una nueva.</p>
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
