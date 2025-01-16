import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthenticationContext';

const PrivateRoutes = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <>
            {isAuthenticated && <Outlet />}
            {isAuthenticated === false && <Navigate to="/" />}
        </>
    );
};

export default PrivateRoutes;
