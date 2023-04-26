import { useQuery } from '@tanstack/react-query';
import { CACHE_KEY_TODOS } from '../constants';
import TodoService, { type Todo } from '../services/TodoService';

const useTodos = () => {
    return useQuery<Todo[], Error>({
        queryKey: CACHE_KEY_TODOS,
        queryFn: TodoService.getAll().request,
        staleTime: 1000 * 10, // 10 seconds
    });
};

export default useTodos;
