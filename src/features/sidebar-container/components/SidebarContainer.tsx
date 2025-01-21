import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/store";
import { Sidebar } from "@features/sidebar/components";
import {
  updateTaskChecklist,
  updateTask,
} from "@store/task-slice";
import { Task } from "@features/chat";

const SidebarContainer: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTask = useSelector((state: RootState) =>
    state.tasks.tasks.find(
      (task: Task) => task.id === state.tasks.selectedTaskId
    )
  );

  const handleChecklistUpdate = (checklistId: string, checked: boolean) =>
    selectedTask &&
    dispatch(
      updateTaskChecklist({ taskId: selectedTask.id, checklistId, checked })
    );

  const handleStatusChange = (status: 'Open' | 'In Progress' | 'Completed' | 'Overdue') =>
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

