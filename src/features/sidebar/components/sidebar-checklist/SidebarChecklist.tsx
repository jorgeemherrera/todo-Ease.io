import { SidebarCheckListProps } from "@features/sidebar/interfaces";
import './SidebarChecklist.scss';

const SidebarChecklist: React.FC<SidebarCheckListProps> = ({ checklist, onChecklistUpdate }) => (
  <section>
    <h4 className="sidebar-checklist-title">Checklist:</h4>
    <ul className="sidebar-checklist">
      {checklist.map((item) => (
        <li key={item.id} className={item.isOverdue ? "overdue" : ""}>
          <label className="custom-checkbox">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={(e) => onChecklistUpdate(item.id || '', e.target.checked)}
            />
            <span className="custom-checkbox-label">{item.label}</span>
          </label>
          {item.dueDate && (
            <span className="sidebar-checklist-due-date">Fecha límite: {item.dueDate}</span>
          )}
          {item.isOverdue && <span className="sidebar-overdue">(Vencido)</span>}
        </li>
      ))}
    </ul>
  </section>
);

export default SidebarChecklist;
