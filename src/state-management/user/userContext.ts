import React from 'react';
import { AuthAction } from './loginStatusReducer';

interface UserContextType {
    user: string;
    dispatch: React.Dispatch<AuthAction>;
}

const UserContext = React.createContext<UserContextType>({} as UserContextType);

export default UserContext;
