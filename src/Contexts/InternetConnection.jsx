import { useState, useEffect, createContext } from 'react';
import styled from 'styled-components';
import logo from '../icons/logo.png';

const DIV = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    .internet_conn {
        display: flex;
        width: 80%;
        justify-content: center;
        align-items: center;
        gap: 10px;
        font-weight: bold;
        font-size: 18px;
    }
`;

export const InternetContext = createContext();

const InternetConnection = ({ children }) => {
    // state variable holds the state of the internet connection
    const [isOnline, setIsOnline] = useState(null);
    // On initization set the isOnline state.
    useEffect(() => {
        setIsOnline(navigator.onLine);
    }, [setIsOnline]);
    // event listeners to update the state
    window.addEventListener('online', () => {
        setIsOnline(true);
    });
    window.addEventListener('offline', () => {
        setIsOnline(false);
    });

    // if user is online, return the child component else return a custom component
    if (isOnline === true) {
        return (
            <InternetContext.Provider value={{ isOnline }}>
                {children}
            </InternetContext.Provider>
        );
    }
    if (isOnline === false) {
        return (
            <DIV>
                <p className="internet_conn">
                    <img
                        src={logo}
                        alt="logo"
                        width="60px"
                        height="60px"
                        className="i"
                    />
                    Please connect to the internet.
                </p>
            </DIV>
        );
    }
};

export default InternetConnection;
