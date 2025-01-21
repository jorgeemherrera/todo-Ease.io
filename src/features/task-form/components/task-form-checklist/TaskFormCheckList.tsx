import { ChecklistItem, TaskFormChecklistProps } from "@features/task-form";
import './TaskFormCheckList.scss';
import { TrashIcon } from "@heroicons/react/16/solid";

const TaskFormChecklist: React.FC<TaskFormChecklistProps> = ({
  checklist,
  onChecklistUpdate,
}) => {
  const handleAddItem = () => {
    onChecklistUpdate([
      ...checklist,
      { id: Date.now().toString(), label: "", checked: false, dueDate: "" },
    ]);
  };

  const handleItemChange = (id: string, key: keyof ChecklistItem, value: any) => {
    onChecklistUpdate(
      checklist.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );
  };

  const handleItemDelete = (id: string) => {
    onChecklistUpdate(checklist.filter((item) => item.id !== id));
  };

  return (
    <div className="task-form-checklist">
      <header className="task-form-checklist-header">
        <h3>Checklist</h3>
        <button onClick={handleAddItem} className="add-btn">
          + Añadir Ítem
        </button>
      </header>
      <ul className="task-form-checklist-items">
        {checklist.map((item) => (
          <li
            key={item.id}
            className={`task-form-checklist-item ${item.isOverdue ? "task-form-checklist-item-overdue" : ""}`}
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={(e) => handleItemChange(item.id || '', "checked", e.target.checked)}
            />
            <input
              type="text"
              value={item.label}
              placeholder="Nombre del ítem"
              onChange={(e) => handleItemChange(item.id || '', "label", e.target.value)}
            />
            <input
              type="date"
              value={item.dueDate || ""}
              onChange={(e) => handleItemChange(item.id || '', "dueDate", e.target.value)}
            />
            <TrashIcon onClick={() => handleItemDelete(item.id || '')} className="task-form-delete-btn"/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskFormChecklist;