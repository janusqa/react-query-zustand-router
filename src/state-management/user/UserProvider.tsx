import { useReducer } from 'react';
import loginStatusReducer from './loginStatusReducer';
import UserContext from './userContext';

interface Props {
    children: React.ReactNode;
}

const UserProvider = ({ children }: Props) => {
    const [user, dispatch] = useReducer(loginStatusReducer, '');

    return (
        <UserContext.Provider value={{ user, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
