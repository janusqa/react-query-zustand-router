import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
    return (
        <>
            <NavBar />
            <div id="main">
                {/**Outlet components are like placeholders for other components */}
                {/**At runtime depending on the users location etc. different it will render different child components */}
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
