import { useMutation, useQueryClient } from '@tanstack/react-query';
import TodoService, { type Todo } from '../services/TodoService';
import { CACHE_KEY_TODOS } from '../constants';

interface AddTodoContext {
    previousTodos: Todo[];
}

const useAddTodo = (onAdd: () => void) => {
    const queryClient = useQueryClient();

    // Generics for useMutation
    // OUTPUT: 1st Todo is type of data we recieve back from back end
    // ERROR: 2nd  is the type of Error to return if an error occurs
    // INPUT: 3rd Todo is type of data we send to backend
    // CONTEXT: 4th is context type. It is used to define the shape of
    //          the context object we will use to pass data between callbacks
    //          in the mutate function
    //
    // sidenote: you will see a varibles parameter mentioned alot
    // it is just the input we give to back end such as a Todo
    return useMutation<Todo, Error, Todo, AddTodoContext>({
        mutationFn: (todo) => TodoService.post({ data: todo }).request(),
        // onMutate can be used to make an optimistic update
        // i.e update frontend before receiving data from backend
        // if backend request fails then roll back
        // no need to update in onSuccess
        onMutate: (newTodo) => {
            // below line we are creating a getting our previous todos
            // to add to the context object we will return at the
            // end of the onSuccess callback.
            // it will be used by onError callback to roll back our optimistic update
            // NOTE getQueryData could return undefined SO IN THIS CASE return empty array!!!
            const previousTodos =
                queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) ?? [];

            queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos = []) => [
                newTodo,
                ...todos,
            ]);

            // This is a custom callback we pass in from the consumer of this
            // hook. It is how we notifiy the consumer that we have made
            // a change that they can update the ui if neccessary
            // in this case we want to tell the consumer it is ok
            // to clear the search text field.  Maybe this
            // can also be called in onSuccess too??
            onAdd();

            // if (ref.current) ref.current.value = '';

            // return the an object context with previous todos created above
            return { previousTodos };
        },
        onSuccess: (savedTodo, newTodo) => {
            // OPTIONS for updating the cache are...
            // APPROACH 1: Invalidate the cache to initiate a refetch
            // Will not work with JsonPlaceHolder as it is a fake backend that does actually add the new todo
            // queryClient.invalidateQueries({ queryKey: ['todos'] });
            //
            // APPROACH 2: Update the cache directly
            // queryClient.setQueryData<Todo[]>(['todos'], (todos) => [
            //     savedTodo,
            //     ...(todos ?? []),
            // ]);
            // if (ref.current) ref.current.value = '';
            //
            // APPROACH 3:  We have made an optimistic update
            // so now we have a success we will use the data returned
            // by the server to finally complete the optimistic update
            // by using the real data returned by the server
            // savedTodo: what was created on backend
            // newTodo: what was created on the client optimistically. It our fake id=0
            // We map thru the cache to find our optimistic todo and replace it with the real todo from server
            // note we compare objects with strict equality. That is we want to know if its the same exact object
            queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) =>
                todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
            );
        },
        // The third parameter is something called context: unknown
        // but what is that. It is an object we create to pass data
        // between our callbacks
        onError: (error, newTodo, context) => {
            if (!context) return;
            queryClient.setQueryData<Todo[]>(
                CACHE_KEY_TODOS,
                context.previousTodos
            );
        },
    });
};

export default useAddTodo;
