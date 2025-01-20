import React, { useState, useEffect } from 'react';
import './TasForm.scss';

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  dueDate?: string;
  isOverdue?: boolean;
}

interface TaskFormProps {
  initialData?: {
    id?: string;
    title: string;
    description: string;
    dueDate?: string;
    status: 'Open' | 'In Progress' | 'Completed' | 'Overdue';
    checklist: ChecklistItem[];
  };
  onSave: (task: any) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialData, onSave, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [dueDate, setDueDate] = useState(initialData?.dueDate || '');
  const [status, setStatus] = useState<'Open' | 'In Progress' | 'Completed' | 'Overdue'>(
    initialData?.status || 'Open'
  );
  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    initialData?.checklist || []
  );

  useEffect(() => {
    const now = new Date().toISOString().split('T')[0];
    setChecklist((prev) =>
      prev.map((item) => ({
        ...item,
        isOverdue: item.dueDate ? item.dueDate < now && !item.checked : undefined,
      }))
    );
  }, []);

  const handleAddChecklistItem = () => {
    setChecklist([
      ...checklist,
      { id: Date.now().toString(), label: '', checked: false, dueDate: '' },
    ]);
  };

  const handleChecklistChange = (id: string, key: keyof ChecklistItem, value: any) => {
    setChecklist(
      checklist.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );
  };

  const handleChecklistDelete = (id: string) => {
    setChecklist(checklist.filter((item) => item.id !== id));
  };

  const handleSave = () => {
    const now = new Date().toISOString().split('T')[0];
    const isOverdue = dueDate && dueDate < now;
    onSave({
      id: initialData?.id || Date.now().toString(),
      title,
      description,
      dueDate,
      status: isOverdue ? 'Overdue' : status,
      checklist,
    });
  };

  return (
    <div className="task-form">
      <header className="task-form-header">
        <h2>{initialData ? 'Editar Tarea' : 'Crear Tarea'}</h2>
      </header>

      <div className="task-form-group">
        <label htmlFor="task-title">Título</label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Escribe el título de la tarea"
        />
      </div>

      <div className="task-form-group">
        <label htmlFor="task-desc">Descripción</label>
        <textarea
          id="task-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe los detalles de la tarea"
        />
      </div>

      <div className="task-form-group task-form-inline">
        <div>
          <label htmlFor="task-date">Fecha límite</label>
          <input
            id="task-date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="task-status">Estado</label>
          <select
            id="task-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="task-form-checklist">
        <header className="task-form-checklist-header">
          <h3>Checklist</h3>
          <button onClick={handleAddChecklistItem} className="task-form-add-btn">
            + Añadir Ítem
          </button>
        </header>
        <ul className="task-form-checklist-items">
          {checklist.map((item) => (
            <li
              key={item.id}
              className={`task-form-checklist-item ${item.isOverdue ? 'task-form-checklist-item-overdue' : ''}`}
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={(e) =>
                  handleChecklistChange(item.id, 'checked', e.target.checked)
                }
              />
              <input
                type="text"
                value={item.label}
                placeholder="Nombre del ítem"
                onChange={(e) =>
                  handleChecklistChange(item.id, 'label', e.target.value)
                }
              />
              <input
                type="date"
                value={item.dueDate || ''}
                onChange={(e) =>
                  handleChecklistChange(item.id, 'dueDate', e.target.value)
                }
              />
              <button
                onClick={() => handleChecklistDelete(item.id)}
                className="task-form-delete-btn"
              >
                🗑
              </button>
            </li>
          ))}
        </ul>
      </div>

      <footer className="task-form-actions">
        <button onClick={onCancel} className="task-form-btn task-form-btn-cancel">Cancelar</button>
        <button onClick={handleSave} className="task-form-btn task-form-btn-save">Guardar</button>
      </footer>
    </div>
  );
};

export default TaskForm;
