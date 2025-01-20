import { TaskFormActionsProps } from "@features/task-form/interfaces";
import './TaskFormActions.scss';

const TaskFormActions: React.FC<TaskFormActionsProps> = ({ onCancel, onSave }) => (
  <footer className="task-form-actions">
    <button onClick={onCancel} className="task-form-btn cancel">
      Cancelar
    </button>
    <button onClick={onSave} className="task-form-btn save">
      Guardar
    </button>
  </footer>
);

export default TaskFormActions;