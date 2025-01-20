import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { MessageProps } from "@features/chat";
import "./Message.scss";

const statusTranslations: Record<string, string> = {
  Open: "Abierto",
  "In Progress": "En Progreso",
  Completed: "Completado",
  Overdue: "Vencido",
};

const Message: React.FC<MessageProps> = ({
  message,
  onEdit,
  onDelete,
  onSelect,
}) => {
  const status = message.status || "Open";
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
        {!message.isTaskOverdue && message.hasOverdueItems && (
          <span className="message-status warning">Checklist vencido</span>
        )}
        <span className={`message-status-tag ${status.toLowerCase()}`}>
          {statusTranslations[status] || status}
        </span>
      </div>
    </article>
  );
};

export default Message;
