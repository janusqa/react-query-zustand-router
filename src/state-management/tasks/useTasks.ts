import TaskContext from './taskContext';
import { useContext } from 'react';

const useTasks = () => useContext(TaskContext);

export default useTasks;
