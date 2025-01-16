import { createContext, useState, useRef, useEffect } from 'react';
import { encrypt, decrypt } from '../functions/encryption';
export const AppContext = createContext();

export const empty_cylider_data = {
    battery_level: 0,
    gas_level: 0,
    alarm: 'off',
    call: 'off',
    text: 'off',
    indicator: 'off',
    gas_mass: 0,
    cylinder: 0,
    device_id: 'Not Connected',
    device_update_time: '2024-02-15 21:37:37.283682+00:00',
};

//platform mode to switch to bluetooth or network
if (localStorage.getItem('mode') === null) {
    var mode_from_localstorage = 'bluetooth';
} else {
    try {
        mode_from_localstorage = JSON.parse(
            decrypt(localStorage.getItem('mode')),
        );
    } catch {
        localStorage.clear();
        window.location.reload();
    }
}
//platform mode to switch to bluetooth or network

//platform mode to switch to bluetooth or network
if (localStorage.getItem('device') === null) {
    var device = null;
} else {
    try {
        device = localStorage.getItem('device');
    } catch {
        localStorage.clear();
        window.location.reload();
    }
}
//platform mode to switch to bluetooth or network

const ApplicationContext = ({ children }) => {
    const [state, setUser_State] = useState(null);
    const [userData, setuserData] = useState(null);
    const [cylinderdata, setCylinderData] = useState(empty_cylider_data);
    //CONNECTION
    const [device_token, setDevice_token] = useState(device);
    const [connected, setConnected] = useState(false);
    const [connecting_indicator, setCconnecting_indicator] = useState(false);
    const timeout = useRef(null);

    //SOCKETS
    const socket = useRef(null);
    //SOCKETS

    //toggle
    const allow_toggle = useRef(false);

    //platform mode to switch to bluetooth or network
    const [mode, setMode] = useState(mode_from_localstorage);

    //encrypts mode and sets to localstorage
    useEffect(() => {
        const encrypted_mode = encrypt(JSON.stringify(mode));
        localStorage.setItem('mode', encrypted_mode);
    }, [mode]);
    //platform mode to switch to bluetooth or network

    //sets device token to localstorage
    useEffect(() => {
        if (device_token !== null) {
            localStorage.setItem('device', device_token);
        } else {
            localStorage.removeItem('device');
        }
    }, [device_token]);
    //sets device token to localstorage

    const disconnect_network = () => {
        if (socket.current) {
            socket.current.close();
            socket.current = null;
        }
        setDevice_token(null);
        setCylinderData(empty_cylider_data);
        setConnected(false);
    };
    const switch_to_bluetooth = () => {
        setMode('bluetooth');
        if (socket.current) {
            socket.current.close();
            socket.current = null;
        }
        setCylinderData(empty_cylider_data);
        setConnected(false);
    };

    return (
        <AppContext.Provider
            value={{
                state,
                setUser_State,
                userData,
                setuserData,
                cylinderdata,
                setCylinderData,
                connected,
                setConnected,
                socket,
                allow_toggle,
                connecting_indicator,
                setCconnecting_indicator,
                mode,
                setMode,
                timeout,
                device_token,
                setDevice_token,
                disconnect_network,
                switch_to_bluetooth,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default ApplicationContext;
