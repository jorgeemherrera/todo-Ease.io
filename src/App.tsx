import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTasks } from '@store/task-slice';
import { Home } from '@pages/home';
import { getTasksFromDB } from '@utils/indexed-db/indexedDb';

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
