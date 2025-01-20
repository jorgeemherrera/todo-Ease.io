import React from "react";
import "./Sidebar.scss";

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  dueDate?: string;
  isOverdue?: boolean;
}

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  checklist: ChecklistItem[];
  status: "Open" | "In Progress" | "Completed" | "Overdue";
}

interface SidebarProps {
  task?: Task;
  onChecklistUpdate: (checklistId: string, checked: boolean) => void;
  onStatusChange: (status: "Open" | "In Progress" | "Completed" | "Overdue") => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  task,
  onChecklistUpdate,
  onStatusChange,
}) => {
  if (!task) {
    return (
      <div className="sidebar">
        <p>Selecciona un ticket para ver los detalles</p>
      </div>
    );
  }

  const handleCheckboxChange = (itemId: string, checked: boolean) => {
    onChecklistUpdate(itemId, checked);
  };

  return (
    <aside className={`sidebar ${task.status.toLowerCase()}`}>
      <header>
        <h2 className="sidebar-header">
          Ticket # <span>{task.id}</span>
        </h2>
        <h3 className="sidebar-title">{task.title}</h3>
      </header>
      <section>
        <p className="sidebar-description">{task.description}</p>
        <p className="sidebar-due-date">
          Fecha límite: {task.dueDate || "Sin fecha"} {" "}
          {task.status === "Overdue" && (
            <span className="sidebar-overdue">(Vencido)</span>
          )}
        </p>
      </section>
      <section>
        <h4 className="sidebar-checklist-title">Estado</h4>
        <div className="sidebar-status-container">
          <span className={`sidebar-status ${task.status.toLowerCase()}`}>
            {task.status}
          </span>
          <select
            className="sidebar-status-selector"
            value={task.status}
            onChange={(e) =>
              onStatusChange(
                e.target.value as "Open" | "In Progress" | "Completed" | "Overdue"
              )
            }
          >
            <option value="Open">Abierto</option>
            <option value="In Progress">En Progreso</option>
            <option value="Completed">Completado</option>
            <option value="Overdue">Vencido</option>
          </select>
        </div>
      </section>

      {task.checklist.length > 0 && (
        <section>
          <h4 className="sidebar-checklist-title">Checklist:</h4>
          <ul className="sidebar-checklist">
            {task.checklist.map((item) => (
              <li key={item.id} className={item.isOverdue ? "overdue" : ""}>
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={(e) =>
                      handleCheckboxChange(item.id, e.target.checked)
                    }
                  />
                  <span className="custom-checkbox-label">{item.label}</span>
                </label>
                {item.dueDate && (
                  <span className="sidebar-checklist-due-date">
                    Fecha límite: {item.dueDate}
                  </span>
                )}
                {item.isOverdue && (
                  <span className="sidebar-overdue">(Vencido)</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </aside>
  );
};

export default Sidebar;