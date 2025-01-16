import axios from 'axios';
import { useContext } from 'react';
import { GLOBALCONTEXT } from '../Contexts/GlobalContext';

const useRefreshToken = () => {
    const { access_token } = useContext(GLOBALCONTEXT);

    const refresh = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_APP_ACCOUNTS}refresh/`,
                {
                    platform: 'web',
                },
                {
                    withCredentials: true,
                },
            );
            if (response.status === 200) {
                access_token.current = response.data.access;
            }
            return response.data.access;
        } catch (error) {
            if (error?.response?.status === 403) {
                return 403;
            }
        }
    };

    return refresh;
};

export default useRefreshToken;
