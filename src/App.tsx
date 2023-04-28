import { useReducer } from 'react';
import './App.css';
import HomePage from './state-management/HomePage';
import NavBar from './state-management/NavBar';
// import { UserProvider } from './state-management/user';
import { TaskProvider } from './state-management/tasks';
// import PostList from './react-query/PostListInfiniteScroll';
import PostList from './react-query/PostListInfiniteScroll';
import TodoForm from './react-query/TodoForm';
import TodoList from './react-query/TodoList';
import { Counter } from './state-management/counter';

function App() {
    return (
        <TaskProvider>
            <Counter />
            <NavBar />
            <HomePage />
        </TaskProvider>
    );
}

export default App;
