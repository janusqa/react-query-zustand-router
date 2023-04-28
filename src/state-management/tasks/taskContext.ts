import React from 'react';
import { Task, TaskAction } from './taskListReducer';

interface TaskContextType {
    tasks: Task[];
    dispatch: React.Dispatch<TaskAction>;
}

const TaskContext = React.createContext<TaskContextType>({} as TaskContextType);

export default TaskContext;
