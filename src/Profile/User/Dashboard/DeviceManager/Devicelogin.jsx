import { useContext, useState } from 'react';
import styled from 'styled-components';
import ButtonLoading from '../../../../components/ButtonLoading';
import FormError from '../../../../components/Formerror';
import { AppContext } from '../../../../Contexts/ApplicationContext';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { GLOBALCONTEXT } from '../../../../Contexts/GlobalContext';

const DIV = styled.div`
    animation: appear 0.2s;

    .f {
        width: 80%;
        margin: auto;
    }
    .error {
        border: 1px solid red;
        padding: 10px;
        margin-top: 10px;
        color: red;
        text-align: center;
        font-size: 13px;
        border-radius: 5px;
    }
`;
const Devicelogin = ({ close }) => {
    const axiosPrivate = useAxiosPrivate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setDevice_token } = useContext(AppContext);
    const { access_token } = useContext(GLOBALCONTEXT);

    const login = (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        axiosPrivate
            .post(
                `${import.meta.env.VITE_APP_GASCHEK_DEVICE_HTTP}connect-device/`,
                {
                    device_id: e.target.device_id.value,
                    password: e.target.password.value,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: access_token.current,
                    },
                },
            )
            .then((response) => {
                if (response.status === 200) {
                    setDevice_token(response.data.token);
                    close();
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    setError(error.response.data.msg);
                    setLoading(false);
                }
            });
    };

    return (
        <DIV>
            <div className="f">
                <form onSubmit={login}>
                    <p className="header">Connect Device</p>

                    <label>Device ID</label>
                    <input
                        className="form-input"
                        type="text"
                        name="device_id"
                        required
                    />

                    <label>Password</label>
                    <input
                        className="form-input"
                        type="password"
                        name="password"
                        required
                    />

                    {error && <FormError text={error} />}

                    <div className="form-button-div">
                        {loading === false ? (
                            <button type="submit" className="form-button">
                                Connect
                            </button>
                        ) : (
                            <button disabled className="form-button">
                                <ButtonLoading />
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </DIV>
    );
};

export default Devicelogin;
