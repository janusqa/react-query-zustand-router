import create from './ApiClient';

export interface Todo {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
}

export default create<Todo>('/todos');
