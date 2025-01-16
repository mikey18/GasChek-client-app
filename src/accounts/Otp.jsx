import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import arrowleft from '../icons/arrow-left.png';
import ButtonLoading from '../components/ButtonLoading';
import { GLOBALCONTEXT } from '../Contexts/GlobalContext';
import { AuthContext } from '../Contexts/AuthenticationContext';

const DIV = styled.div`
    animation: appear 0.2s;

    .form {
        box-shadow: 0px 3px 38px 0px #d8d8ff;
    }
    .error {
        color: red;
        text-align: center;
        font-size: 13px;
        border: 1px solid red;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 10px;
    }
    .container {
        margin: auto;
        max-width: 500px;
        width: 90%;
    }
    .back {
        cursor: pointer;
        max-width: 35px;
    }
    .form-button {
        background: blue;
    }
    .form-input:focus {
        outline: none !important;
        border-color: blue;
    }
    .resend {
        color: blue;
        cursor: pointer;
    }
`;
const Otp = () => {
    const navigate = useNavigate();
    const { access_token } = useContext(GLOBALCONTEXT);
    const { setisAuthenticated } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [resend, setResend] = useState(false);
    const [timer, setTimer] = useState(60);
    const [error, setError] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        axios
            .post(
                `${import.meta.env.VITE_APP_ACCOUNTS}verify/`,
                {
                    otp: e.target.otp.value,
                    platform: 'web',
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: JSON.parse(
                            sessionStorage.getItem('v*****'),
                        ).token,
                    },
                    withCredentials: true,
                },
            )
            .then((response) => {
                if (response.status === 200) {
                    sessionStorage.removeItem('v*****');
                    access_token.current = response.data.access;
                    localStorage.setItem(0, true);
                    setisAuthenticated(true);
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    setError(error.response.data.msg);
                } else if (error.response.status === 403) {
                    setError('Session timeout, resend otp');
                }
                setLoading(false);
            });
    };

    const resend_otp = (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        var email = JSON.parse(sessionStorage.getItem('v*****')).email;
        axios
            .post(
                `${import.meta.env.VITE_APP_ACCOUNTS}resend-otp/`,
                {
                    email: email,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((response) => {
                if (response.status === 200) {
                    sessionStorage.setItem(
                        'v*****',
                        JSON.stringify({
                            token: response.data.token,
                            email: email,
                        }),
                    );
                    setTimer(60);
                    setResend(false);
                    setLoading(false);
                }
            })
            .catch(() => {
                setError('Something went wrong, try again later.');
                setLoading(false);
            });
    };

    const go_back = () => {
        navigate(-1);
    };

    useEffect(() => {
        setTimeout(() => {
            if (timer > 1) {
                setTimer(timer - 1);
            }
            if (timer === 1) {
                setResend(true);
            }
        }, [1000]);
    }, [timer]);

    return (
        <DIV>
            <div className="container">
                <div className="back" onClick={go_back}>
                    <img src={arrowleft} alt="back" width="30px" />
                </div>
            </div>
            <div className="form">
                <form onSubmit={submit}>
                    <p className="header">Verify your Account</p>

                    <p style={{ marginBottom: '40px', color: 'gray' }}>
                        Check your email for one time password
                    </p>

                    <label>Otp</label>
                    <input
                        className="form-input"
                        type="number"
                        name="otp"
                        required
                        minLength="6"
                    />

                    {error && <p className="error">{error}</p>}

                    {resend === false ? (
                        <p>Resend in {timer}</p>
                    ) : (
                        <div>
                            Click to{' '}
                            <span className="resend" onClick={resend_otp}>
                                resend
                            </span>
                        </div>
                    )}

                    <div className="form-button-div">
                        {loading === false ? (
                            <button type="submit" className="form-button">
                                Submit
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
export default Otp;
