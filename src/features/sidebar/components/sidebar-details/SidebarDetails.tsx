import { SidebarDetailsProps } from "@features/sidebar";
import './SidebarDetails.scss';

const SidebarDetails: React.FC<SidebarDetailsProps> = ({ task, onStatusChange }) => (
  <section>
    <p className="sidebar-description">{task.description}</p>
    <p className="sidebar-due-date">
      Fecha límite: {task.dueDate || "Sin fecha"} {" "}
      {task.status === "Overdue" && <span className="sidebar-overdue">(Vencido)</span>}
    </p>
    <h4 className="sidebar-checklist-title">Estado</h4>
    <div className="sidebar-status-container">
      <span className={`sidebar-status ${task.status.toLowerCase()}`}>{task.status}</span>
      <select
        className="sidebar-status-selector"
        value={task.status}
        onChange={(e) =>
          onStatusChange(e.target.value as "Open" | "In Progress" | "Completed" | "Overdue")
        }
      >
        <option value="Open">Abierto</option>
        <option value="In Progress">En Progreso</option>
        <option value="Completed">Completado</option>
        <option value="Overdue">Vencido</option>
      </select>
    </div>
  </section>
);

export default SidebarDetails;