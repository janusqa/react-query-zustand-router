import { useUser } from './';

const LoginStatus = () => {
    const { user, dispatch } = useUser();

    if (user)
        return (
            <>
                <div>
                    <span className="mx-2">{user}</span>
                    <a onClick={() => dispatch({ type: 'LOGOUT' })} href="#">
                        Logout
                    </a>
                </div>
            </>
        );
    return (
        <div>
            <a
                onClick={() =>
                    dispatch({ type: 'LOGIN', payload: 'mosh.hamedani' })
                }
                href="#"
            >
                Login
            </a>
        </div>
    );
};

export default LoginStatus;
