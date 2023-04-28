import { LoginStatus } from './user_zustand';
import { useTasks } from './tasks';
import { useCounterStore } from './counter';

const NavBar = () => {
    const { tasks } = useTasks();

    // we can tell zustand to only re-render
    // when a specific part of state changes
    // in this case only when value changes
    // but not max. note we can return parts
    // of the object  and not only single values
    // example: const {value, max} = useCounterStore((state) => ({value:state.value, max:state.max}));
    // in case below component only reneders when value changes
    // but not when max changes
    const value = useCounterStore((state) => state.value);

    console.log('render nav bar');

    return (
        <nav className="navbar d-flex justify-content-between">
            <span className="badge text-bg-secondary">{tasks.length}</span>
            <span className="badge text-bg-secondary">{value}</span>
            <LoginStatus />
        </nav>
    );
};

export default NavBar;
