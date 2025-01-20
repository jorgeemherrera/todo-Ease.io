import React from "react";
import './Input.scss';

interface InputProps {
  command: string;
  commandText: string;
  onCommandChange: (command: string, commandText: string) => void;
  onCommandExecute: (action: string, title: string) => void;
}

const Input: React.FC<InputProps> = ({ command, commandText, onCommandChange, onCommandExecute }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const input = e.currentTarget as HTMLInputElement;
      const value = input.value.trim();
      if (!value) return;

      const [action, ...args] = value.split(" ");
      const title = args.join(" ");
      onCommandExecute(action, title);

      input.value = "";
      onCommandChange("", "");
    } else {
      const input = e.currentTarget.value.trim();
      const action = input.split(" ")[0].toUpperCase();

      if (["CREAR", "EDITAR", "BORRAR"].includes(action)) {
        onCommandChange(action, input);
      } else {
        onCommandChange("", "");
      }
    }
  };

  return (
    <div className="chat-input-container">
      <input
        type="text"
        className={`chat-input ${command.toLowerCase()}`}
        placeholder="Escribe un comando (CREAR, EDITAR, BORRAR)"
        onKeyDown={handleKeyDown}
      />
      {command && <span className={`chat-command ${command.toLowerCase()}`}>{commandText}</span>}
    </div>
  );
};

export default Input;