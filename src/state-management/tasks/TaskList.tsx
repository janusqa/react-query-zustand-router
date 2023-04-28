import { useTasks } from './';
import { useUserStore } from '../user_zustand';

const TaskList = () => {
    const { tasks, dispatch } = useTasks();
    const { user } = useUserStore();

    return (
        <>
            <p>User: {user}</p>
            <button
                onClick={() =>
                    dispatch({
                        type: 'ADD',
                        payload: {
                            id: Date.now(),
                            get title() {
                                return 'Task ' + this.id;
                            },
                        },
                    })
                }
                className="btn btn-primary my-3"
            >
                Add Task
            </button>
            <ul className="list-group">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <span className="flex-grow-1">{task.title}</span>
                        <button
                            className="btn btn-outline-danger"
                            onClick={() =>
                                dispatch({ type: 'DELETE', payload: task.id })
                            }
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default TaskList;
