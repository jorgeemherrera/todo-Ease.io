import { TaskFormDetailsProps } from "@features/task-form/interfaces";
import './TaskFormDetails.scss';

const TaskFormDetails: React.FC<TaskFormDetailsProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  dueDate,
  setDueDate,
  status,
  setStatus,
}) => (
  <div>
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
  </div>
);

export default TaskFormDetails;