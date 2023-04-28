import { Navigate, Outlet } from 'react-router-dom';
import useAuth from './hooks/useAuth';

const PrivateRoutes = () => {
    const { user } = useAuth();

    // if user not logged in redirect to login page.
    // we cannot use useNavigate as it has side effect
    // and we must ensure that our components remain pure
    // by only runing side effects in event handlers or hooks
    // Like useEffect
    // That is never call side effects via render phases ONLY
    // after the render phase is complete.

    // What we can do though is return a navigate component
    // which is a wrapper around the navigate function
    // so the Navigate component is loaded and this component
    // does the redirect safely for us when it is rendered.
    if (!user) return <Navigate to="/login" />;

    return <Outlet />;
};

export default PrivateRoutes;
