import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/store";
import { Sidebar } from "@features/sidebar/components";
import { Task, updateTaskChecklist, updateTask } from "@features/task-form/task-slice";

const SidebarContainer: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTask = useSelector((state: RootState) =>
    state.tasks.tasks.find((task: { id: number; }) => task.id === state.tasks.selectedTaskId)
  );

  const handleChecklistUpdate = (checklistId: string, checked: boolean) => {
    if (selectedTask) {
      dispatch(updateTaskChecklist({ taskId: selectedTask.id, checklistId, checked }));
    }
  };

  const handleStatusChange = (status: "Open" | "In Progress" | "Completed" | "Overdue") => {
    if (selectedTask) {
      const updatedTask: Task = { ...selectedTask, status };
      dispatch(updateTask(updatedTask));
    }
  };

  return (
    <Sidebar
      task={selectedTask}
      onChecklistUpdate={handleChecklistUpdate}
      onStatusChange={handleStatusChange}
    />
  );
};

export default SidebarContainer;
