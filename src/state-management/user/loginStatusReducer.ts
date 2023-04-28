interface LoginAction {
    type: 'LOGIN';
    payload: string;
}

interface LogOutAction {
    type: 'LOGOUT';
}

export type AuthAction = LoginAction | LogOutAction;

const loginStatusReducer = (state: string, action: AuthAction): string => {
    switch (action.type) {
        case 'LOGIN':
            return action.payload;
        case 'LOGOUT':
            return '';
        default:
            return state;
    }
};

export default loginStatusReducer;
