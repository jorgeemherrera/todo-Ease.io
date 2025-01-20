import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskForm from "@features/task-form/components/task-form/TaskForm";
import { getTasksFromDB } from "@utils/indexed-db/indexedDb";
import { Chat } from "@features/chat";
import { RootState } from "@store/store";
import {
  addTask,
  setTasks,
  updateTask,
  selectTask,
  deleteTask,
  updateTaskChecklist,
} from "@store/task-slice";
import Modal from "@shared/components/modal/Modal";
import { Header } from "@features/header";
import "./Home.scss";
import SidebarContainer from "@features/sidebar-container/components/SidebarContainer";

const Home = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const selectedTaskId = useSelector((state: RootState) => state.tasks.selectedTaskId);
  const selectedTask = tasks.find((task: { id: number; }) => task.id === selectedTaskId);
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const dbTasks = await getTasksFromDB();
      dispatch(setTasks(dbTasks));
    };
    fetchTasks();
  }, [dispatch]);

  useEffect(() => {
    if (tasks.length === 0) {
      const timeout = setTimeout(() => {
        setModalOpen(true);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [tasks]);
  

  const handleOpenModal = (title?: string, isEdit = false) => {
    setCurrentTitle(title || "");
    setIsEditing(isEdit);
    setModalOpen(true);
  };

  const handleSaveTask = (taskData: any) => {
    const now = new Date().toISOString();

    if (isEditing && selectedTask) {
      dispatch(updateTask({ ...taskData, id: selectedTask.id }));
    } else {
      dispatch(
        addTask({
          ...taskData,
          id: Date.now().toString(),
          title: currentTitle,
          createdAt: now,
        })
      );
    }

    setModalOpen(false);
    setCurrentTitle("");
  };

  const handleChecklistUpdate = (taskId: string, checklistId: string, checked: boolean) => {
    dispatch(updateTaskChecklist({ taskId, checklistId, checked }));
  };

  return (
    <div className="home">
      <Header />
      <div className="home-content">
        <SidebarContainer 
          task={selectedTask}
          onChecklistUpdate={handleChecklistUpdate}
        />
        <Chat
          messages={tasks.map((task) => ({
            id: task.id,
            author: "Tú",
            time: task.dueDate || "Sin fecha",
            createdAt: task.createdAt,
            title: task.title,
            content: task.description || "",
            isTaskOverdue: !!(
              task.dueDate && task.dueDate < new Date().toISOString().split("T")[0]
            ),
            hasOverdueItems: task.checklist.some(
              (item) => item.dueDate && item.dueDate < new Date().toISOString().split("T")[0] && !item.checked
            ),
          }))}
          onEnter={(title) => handleOpenModal(title)}
          onEdit={(taskId) => {
            handleOpenModal("", true);
            dispatch(selectTask(taskId));
          }}
          onDelete={(taskId) => dispatch(deleteTask(taskId))}
          onSelect={(taskId) => dispatch(selectTask(taskId))}
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <TaskForm
          initialData={
            isEditing && selectedTask
              ? selectedTask
              : {
                  title: currentTitle,
                  description: "",
                  dueDate: "",
                  status: "Open",
                  checklist: [],
                }
          }
          onSave={handleSaveTask}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Home;
