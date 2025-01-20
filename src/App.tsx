import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTasks } from '@features/task-form/task-slice';
import { Home } from '@pages/home';
import { getTasksFromDB } from '@features/task-form/indexedDb';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasksFromDB();
      dispatch(setTasks(tasks));
    };
    fetchTasks();
  }, [dispatch]);

  return <Home />
} 

export default App;
