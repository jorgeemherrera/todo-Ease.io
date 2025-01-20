
import { SidebarDetails, SidebarHeader, SidebarCheckList, SidebarProps } from "@features/sidebar";
import "./Sidebar.scss";

const Sidebar: React.FC<SidebarProps> = ({ task, onChecklistUpdate, onStatusChange }) => {
  if (!task) {
    return (
      <div className="sidebar">
        <p>Selecciona un ticket para ver los detalles</p>
      </div>
    );
  }

  return (
    <aside className={`sidebar ${task.status.toLowerCase()}`}>
      <SidebarHeader task={task} />
      <SidebarDetails task={task} onStatusChange={onStatusChange} />
      {task.checklist.length > 0 && (
        <SidebarCheckList checklist={task.checklist} onChecklistUpdate={onChecklistUpdate} />
      )}
    </aside>
  );
};

export default Sidebar;