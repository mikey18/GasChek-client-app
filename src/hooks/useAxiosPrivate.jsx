import { useEffect, useContext } from 'react';
import useRefreshToken from './useRefreshToken';
import { axiosPrivate } from './axios';
import { AuthContext } from '../Contexts/AuthenticationContext';

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { reset_application } = useContext(AuthContext);

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            async (config) => {
                if (!config.headers['Authorization']) {
                    const newAccessToken = await refresh();
                    if (newAccessToken === 403) {
                        reset_application();
                        return;
                    }
                    config.headers['Authorization'] = newAccessToken;
                }
                return config;
            },
            (error) => Promise.reject(error),
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    if (newAccessToken === 403) {
                        reset_application();
                        return;
                    }
                    prevRequest.headers['Authorization'] = newAccessToken;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            },
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [refresh, reset_application]);

    return axiosPrivate;
};

export default useAxiosPrivate;
