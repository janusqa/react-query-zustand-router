import { produce } from 'immer';

export interface Task {
    id: number;
    title: string;
}

interface AddTaskAction {
    type: 'ADD';
    payload: Task;
}

interface DeleteTaskAction {
    type: 'DELETE';
    payload: number;
}

export type TaskAction = AddTaskAction | DeleteTaskAction;

const taskListReducer = (state: Task[], action: TaskAction): Task[] => {
    const nextState = produce(state, (draft) => {
        switch (action.type) {
            case 'ADD':
                draft.push(action.payload);
                break;
            case 'DELETE':
                return draft.filter((task) => task.id !== action.payload);
            default:
                return state;
        }
    });
    return nextState;
};

export default taskListReducer;
