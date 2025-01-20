import { useState, useEffect } from "react";
import { TaskFormActions, TaskFormChecklist, TaskFormDetails, TaskFormProps } from "@features/task-form";
import { ChecklistItem } from "@features/sidebar";
import "./TaskForm.scss";

const TaskForm: React.FC<TaskFormProps> = ({ initialData, onSave, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [dueDate, setDueDate] = useState(initialData?.dueDate || "");
  const [status, setStatus] = useState<"Open" | "In Progress" | "Completed" | "Overdue">(
    initialData?.status || "Open"
  );
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialData?.checklist || []);
  const [error, setError] = useState("");

  useEffect(() => {
    const now = new Date().toISOString().split("T")[0];
    setChecklist((prev) =>
      prev.map((item) => ({
        ...item,
        isOverdue: item.dueDate ? item.dueDate < now && !item.checked : undefined,
      }))
    );
  }, []);

  const handleChecklistUpdate = (updatedChecklist: ChecklistItem[]) => {
    setChecklist(updatedChecklist);
  };

  const handleSave = () => {
    if (!title.trim() || !description.trim()) {
      setError("Los campos de título y descripción son obligatorios.");
      return;
    }

    const now = new Date().toISOString().split("T")[0];
    const isOverdue = dueDate && dueDate < now;
    setError("");
    onSave({
      id: initialData?.id || Date.now().toString(),
      title,
      description,
      dueDate,
      status: isOverdue ? "Overdue" : status,
      checklist,
    });
  };

  return (
    <div className="task-form">
      {error && <p className="task-form-error">{error}</p>}
      <TaskFormDetails
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        dueDate={dueDate}
        setDueDate={setDueDate}
        status={status}
        setStatus={setStatus}
      />
      <TaskFormChecklist
        checklist={checklist}
        onChecklistUpdate={handleChecklistUpdate}
      />
      <TaskFormActions onCancel={onCancel} onSave={handleSave} />
    </div>
  );
};

export default TaskForm;
