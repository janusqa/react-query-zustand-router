import { useReducer } from 'react';
import taskListReducer from './taskListReducer';
import TaskContext from './taskContext';

interface Props {
    children: React.ReactNode;
}

const TaskProvider = ({ children }: Props) => {
    const [tasks, dispatch] = useReducer(taskListReducer, []);

    return (
        <TaskContext.Provider value={{ tasks, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;
