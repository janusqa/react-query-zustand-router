import { createBrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';
import ContactPage from './ContactPage';
import UserDetail from './UserDetail';
import Layout from './Layout';
import UsersPage from './UsersPage';
import ErrorPage from './ErrorPage';
import LoginPage from './LoginPage';
import PrivateRoutes from './PrivateRoutes';

const router = createBrowserRouter([
    // Root Route
    {
        path: '/',
        element: <Layout />,
        // The errorElement is rendered when an error occurs, not only routing errors
        // BUT APPLICATION ERRORS AS WELL!!!
        //  we cand use the useRouteError hook in the loaded ErrorPage below to get more details of error
        // Note that ErrorPage is just a regular function component
        errorElement: <ErrorPage />,
        //The children below are rendered into the outlet componet in Layout component
        // the path of the children is relative to the parent path. So no need to  specify the full path
        // to render a default component in the outlet change path to index and set to true
        // NOTE: nothing wrong with leaving path as an empty string either
        // eg path:"" both perform the same.
        children: [
            { index: true, element: <HomePage /> },
            { path: 'contact', element: <ContactPage /> },
            { path: 'login', element: <LoginPage /> },
        ],
    },
    // Protected Routes implemented via a Layout route/Layout component
    // note since this is a layout route no need to provide a path
    // its purpose is simply to group routes or enforce business rules
    //
    // Private Routes
    {
        element: <PrivateRoutes />,
        children: [
            {
                path: '/users',
                element: <UsersPage />,
                children: [{ path: ':id', element: <UserDetail /> }],
            },
        ],
    },
]);

export default router;
