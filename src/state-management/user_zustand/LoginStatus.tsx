import { useUserStore } from './';

const LoginStatus = () => {
    const { user, login, logout } = useUserStore();

    if (user)
        return (
            <>
                <div>
                    <span className="mx-2">{user}</span>
                    <a onClick={() => logout()} href="#">
                        Logout
                    </a>
                </div>
            </>
        );
    return (
        <div>
            <a onClick={() => login('mosh.hamedani')} href="#">
                Login
            </a>
        </div>
    );
};

export default LoginStatus;
