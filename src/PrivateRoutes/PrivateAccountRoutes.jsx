import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthenticationContext';

const PrivateAccountRoutes = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <>
            {isAuthenticated === false && <Outlet />}
            {isAuthenticated && <Navigate to="/dashboard" />}
        </>
    );
};

export default PrivateAccountRoutes;
