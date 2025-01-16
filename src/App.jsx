import Navbar from './Navbar/Navbar';
import Profile from './Profile/Profile';
import Home from './Pages/Home';
import GasDealers from './Profile/User/GasDealers/GasDealers';
import NotFound from './Pages/NotFound';
import UserSignup from './accounts/User/UserSignup';
import Userlogin from './accounts/User/Userlogin';
import ForgotPassword from './accounts/User/ForgotPassword';
import ChangePassword from './accounts/User/ChangePassword';
import Gasdealerlogin from './accounts/Dealer/Gasdealerlogin';
import Gasdealersignup from './accounts/Dealer/Gasdealersignup';
import Otp from './accounts/Otp';
import PrivateRoutes from './PrivateRoutes/PrivateRoutes';
import PrivateAccountRoutes from './PrivateRoutes/PrivateAccountRoutes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DeviceError from './components/DeviceError';
import { createContext } from 'react';
import { Providers } from './Contexts/BuildProviderTree';
// import Firebase from './firebase/firebase';
// import InternetConnection from './Contexts/InternetConnection';

export const GlobalContext = createContext();

const App = () => {
    const private_account_routes = [
        { path: '/', element: <Home /> },
        { path: '/login', element: <Userlogin /> },
        { path: '/signup', element: <UserSignup /> },
        { path: '/forgot-password', element: <ForgotPassword /> },
        { path: '/change-password', element: <ChangePassword /> },
        { path: '/gasdealerlogin', element: <Gasdealerlogin /> },
        { path: '/gasdealersignup', element: <Gasdealersignup /> },
        { path: '/verify', element: <Otp /> },
    ];
    const private_routes = [
        { path: '/dashboard', element: <Profile /> },
        { path: '/gasdealers', element: <GasDealers /> },
        { path: '/disconnected', element: <DeviceError /> },
        { path: '*', element: <NotFound /> },
    ];
    return (
        <div className="App">
            <BrowserRouter>
                <Providers>
                    {/* <InternetConnection> */}
                    {/* <Firebase /> */}
                    <Navbar />
                    <Routes>
                        <Route element={<PrivateAccountRoutes />}>
                            {private_account_routes.map((route) => (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={route.element}
                                />
                            ))}
                        </Route>
                        <Route element={<PrivateRoutes />}>
                            {private_routes.map((route) => (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={route.element}
                                />
                            ))}
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    {/* </InternetConnection> */}
                </Providers>
            </BrowserRouter>
        </div>
    );
};

export default App;
