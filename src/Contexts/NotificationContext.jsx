import { useState, createContext } from 'react';

export const NOTIFICATIONCONTEXT = createContext();

const NotificationContext = ({ children }) => {
    const [notification_succeed, setNotification_succeed] = useState(false);

    return (
        <NOTIFICATIONCONTEXT.Provider
            value={{
                notification_succeed,
                setNotification_succeed,
            }}
        >
            {children}
        </NOTIFICATIONCONTEXT.Provider>
    );
};

export default NotificationContext;
