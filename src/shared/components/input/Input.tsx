import { useState, useEffect } from "react";
import { InputProps } from "@shared/interfaces";
import "./Input.scss";

const Input: React.FC<InputProps> = ({
  command,
  commandText,
  onCommandChange,
  onCommandExecute,
}) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [helpVisible, setHelpVisible] = useState(false);

  useEffect(() => {
    if (deleteConfirmation) {
      const timeout = setTimeout(() => setDeleteConfirmation(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [deleteConfirmation]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value.trim();
    const action = input.split(" ")[0].toUpperCase();

    if (["CREAR", "EDITAR", "BORRAR"].includes(action)) {
      onCommandChange(action, input);
      setHelpVisible(false);
    } else {
      onCommandChange("", "");
      setHelpVisible(true);
    }

    if (action !== "BORRAR") {
      setDeleteConfirmation(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const input = e.currentTarget as HTMLInputElement;
      const value = input.value.trim();
      if (!value) return;

      const [action, ...args] = value.split(" ");
      const title = args.join(" ");

      if (action.toUpperCase() === "BORRAR") {
        if (!deleteConfirmation) {
          setDeleteConfirmation(true);
          return;
        }
      }

      onCommandExecute(action.toUpperCase(), title);
        input.value = "";

      onCommandChange("", "");
      setDeleteConfirmation(false);
    }
  };

  return (
    <div className="chat-input-container">
      <input
        type="text"
        className={`chat-input ${command.toLowerCase()}`}
        placeholder="Escribe un comando (CREAR, EDITAR, BORRAR)"
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={() => setHelpVisible(true)}
        onBlur={() => setHelpVisible(false)}
      />
      {command && (
        <span className={`chat-command ${command.toLowerCase()}`}>
          {deleteConfirmation && command === "BORRAR"
            ? "Confirme BORRAR"
            : commandText}
        </span>
      )}
      {helpVisible && (
        <div className="chat-help">
          <p>Comandos disponibles:</p>
          <ul>
            <li><strong>CREAR</strong>: Crear una nueva tarea</li>
            <li><strong>EDITAR</strong>: Editar una tarea existente</li>
            <li><strong>BORRAR</strong>: Borrar una tarea (requiere confirmación)</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Input;
