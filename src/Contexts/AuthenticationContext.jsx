import {
    createContext,
    useState,
    useEffect,
    useContext,
    useCallback,
} from 'react';
import { AppContext, empty_cylider_data } from './ApplicationContext';
import axios from 'axios';
// import { deleteToken } from 'firebase/messaging';
// import { messaging } from '../firebase/firebase';

export const AuthContext = createContext();

const AuthenticationContext = ({ children }) => {
    const {
        setUser_State,
        setuserData,
        setCylinderData,
        setConnected,
        socket,
        allow_toggle,
        setDevice_token,
    } = useContext(AppContext);
    const [isAuthenticated, setisAuthenticated] = useState(null);
    const [account_type, setAccount_type] = useState(null);

    const reset_application = useCallback(() => {
        localStorage.removeItem(0);
        localStorage.removeItem('device');
        setDevice_token(null);
        setAccount_type(null);
        setUser_State(null);
        setuserData(null);
        setCylinderData(empty_cylider_data);
        setConnected(false);
        if (socket.current) {
            socket.current.close();
            socket.current = null;
        }
        if (allow_toggle.current) {
            allow_toggle.current = false;
        }
        setisAuthenticated(false);
        // deleteToken(messaging);
    }, [
        allow_toggle,
        setConnected,
        setCylinderData,
        setUser_State,
        setuserData,
        socket,
        setDevice_token,
    ]);

    const logout = useCallback(async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_APP_ACCOUNTS}logout/`,
                {
                    platform: 'web',
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                },
            );
            if (response.status === 200) {
                reset_application();
            }
        } catch (error) {
            console.log(error);
        }
    }, [reset_application]);

    useEffect(() => {
        if (localStorage.getItem(0) === null) {
            setisAuthenticated(false);
        } else {
            setisAuthenticated(true);
        }
    }, [setisAuthenticated]);

    return (
        <AuthContext.Provider
            value={{
                logout,
                isAuthenticated,
                setisAuthenticated,
                account_type,
                setAccount_type,
                reset_application,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthenticationContext;
