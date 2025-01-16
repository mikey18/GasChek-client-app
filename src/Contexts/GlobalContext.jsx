import { createContext, useRef } from 'react';

export const GLOBALCONTEXT = createContext();

const GlobalContext = ({ children }) => {
    const access_token = useRef(null);

    return (
        <GLOBALCONTEXT.Provider
            value={{
                access_token,
            }}
        >
            {children}
        </GLOBALCONTEXT.Provider>
    );
};

export default GlobalContext;
