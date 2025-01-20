import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/store";
import { Sidebar } from "@features/sidebar/components";
import {
  updateTaskChecklist,
  updateTask,
} from "@store/task-slice";

const SidebarContainer: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTask = useSelector((state: RootState) =>
    state.tasks.tasks.find(
      (task: { id: number }) => task.id === state.tasks.selectedTaskId
    )
  );

  const handleChecklistUpdate = (checklistId: string, checked: boolean) =>
    selectedTask &&
    dispatch(
      updateTaskChecklist({ taskId: selectedTask.id, checklistId, checked })
    );

  const handleStatusChange = (status: string) =>
    selectedTask && dispatch(updateTask({ ...selectedTask, status }));

  return (
    <Sidebar
      task={selectedTask}
      onChecklistUpdate={handleChecklistUpdate}
      onStatusChange={handleStatusChange}
    />
  );
};

export default SidebarContainer;
