import React from "react";
import "./Message.scss";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";

interface MessageType {
  id: string;
  author: string;
  title: string;
  time: string;
  content: string;
  createdAt: string;
  isTaskOverdue: boolean;
  hasOverdueItems: boolean;
  status?: "Open" | "In Progress" | "Completed" | "Overdue"; // Opcional
}

interface MessageProps {
  message: MessageType;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onSelect: (taskId: string) => void;
}

const Message: React.FC<MessageProps> = ({
  message,
  onEdit,
  onDelete,
  onSelect,
}) => {
  const status = message.status || "Open"; // Valor por defecto si `status` no está definido.
  const statusClass = message.isTaskOverdue
    ? "message-overdue"
    : message.hasOverdueItems
    ? "message-warning"
    : "message-normal";

  const formattedDate = isNaN(Date.parse(message.createdAt))
    ? "Sin fecha"
    : new Date(message.createdAt).toLocaleString();

  return (
    <article
      className={`message ${statusClass}`}
      onClick={() => onSelect(message.id)}
    >
      <div className="message-header">
        <div className="message-title-container">
          <p className="message-title">{message.title}</p>
          <span className="message-time">{formattedDate}</span>
        </div>
        <div className="message-icons">
          <PencilIcon
            className="icon edit-icon"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(message.id);
            }}
          />
          <TrashIcon
            className="icon delete-icon"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(message.id);
            }}
          />
        </div>
      </div>
      <div className="message-content">
        <p className="message-due-date">
          <strong>Vence:</strong> {message.time}
        </p>
        {message.isTaskOverdue && (
          <span className="message-status overdue">Vencido</span>
        )}
        {!message.isTaskOverdue && message.hasOverdueItems && (
          <span className="message-status warning">Checklist vencido</span>
        )}
                  <span className={`message-status-tag ${status.toLowerCase()}`}>
            {status}
          </span>
      </div>
    </article>
  );
};

export default Message;
