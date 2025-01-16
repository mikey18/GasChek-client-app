import { useContext, useState, useEffect, useCallback } from 'react';
import { AuthContext } from '../Contexts/AuthenticationContext';
import { GLOBALCONTEXT } from '../Contexts/GlobalContext';
import User from './User/Dashboard/UserInterface/User';
import GasDealer from './GasDealer/Gasdealer';
import Loading from '../components/Loading';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Profile = () => {
    const axiosPrivate = useAxiosPrivate();
    const [loading, setLoading] = useState(true);
    const { account_type, setAccount_type } = useContext(AuthContext);
    const { access_token } = useContext(GLOBALCONTEXT);

    const check_account = useCallback(async () => {
        setLoading(true);

        try {
            const response = await axiosPrivate.get(
                `${import.meta.env.VITE_APP_ACCOUNTS}account-type/`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: access_token.current,
                    },
                },
            );

            if (response.status === 200) {
                setAccount_type(response.data.account_type);
                setLoading(false);
            }
        } catch (error) {
            // if (error.code === 'ERR_CANCELED') {
            //     return null;
            // }
            // if (error.code === 'ERR_NETWORK') {
            //     setTimeout(() => {
            //         check_account();
            //     }, [3000]);
            // }
        }
    }, [setAccount_type, axiosPrivate, access_token]);

    useEffect(() => {
        if (account_type === null) {
            check_account();
        } else {
            setLoading(false);
        }
    }, [check_account, account_type]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : account_type === 'gas_dealer' ? (
                <GasDealer />
            ) : (
                <User />
            )}
        </>
    );
};

export default Profile;
