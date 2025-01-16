import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import arrowleft from '../../icons/arrow-left.png';
import ButtonLoading from '../../components/ButtonLoading';

const DIV = styled.div`
    animation: appear 0.2s;

    .form {
        box-shadow: 0px 3px 38px 0px #eee2cc;
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
    .error {
        border: 1px solid green;
        padding: 10px;
        margin-top: 10px;
        color: green;
        text-align: center;
        font-size: 13px;
        border-radius: 5px;
    }
`;
const Forgotpassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const [type, setType] = useState('email');

    const send_email = (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        axios
            .post(
                `${import.meta.env.VITE_APP_ACCOUNTS}forgot-password/`,
                {
                    email: e.target.email.value,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((response) => {
                if (response.status === 200) {
                    if (
                        Object.prototype.hasOwnProperty.call(
                            response.data,
                            'token',
                        )
                    ) {
                        setToken(response.data.token);
                        setType('otp');
                    } else {
                        setToken(null);
                    }
                    setError('Check your email.');
                    setLoading(false);
                }
            })
            .catch(() => {
                setError('Something went wrong, try again later.');
                setLoading(false);
            });
    };
    const change_password = (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (token === null) {
            setLoading(false);
            setType('email');
        } else if (e.target.password.value !== e.target.password2.value) {
            setError('Password does not match.');
            setLoading(false);
        } else {
            axios
                .post(
                    `${import.meta.env.VITE_APP_ACCOUNTS}change-password/`,
                    {
                        otp: e.target.otp.value,
                        p: e.target.password.value,
                        p2: e.target.password2.value,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: token,
                        },
                    },
                )
                .then((response) => {
                    if (response.status === 200) {
                        navigate('/login');
                    }
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        setError(error.response.data.msg);
                    } else if (error.response.status === 403) {
                        setError('Session timeout');
                    }
                    setLoading(false);
                });
        }
    };

    const go_back = () => {
        navigate(-1);
    };

    const Back = () => {
        return (
            <div className="container">
                <div className="back" onClick={go_back}>
                    <img src={arrowleft} alt="back" width="30px" />
                </div>
            </div>
        );
    };

    return (
        <DIV>
            <Back />
            <div className="form">
                {type === 'email' ? (
                    <form onSubmit={send_email}>
                        <p className="header">Forgot password</p>

                        <label>Email</label>
                        <input
                            className="form-input"
                            type="email"
                            name="email"
                            required
                        />

                        {error && <p className="error">{error}</p>}

                        <div className="form-button-div">
                            {loading === false ? (
                                <button type="submit" className="form-button">
                                    Proceed
                                </button>
                            ) : (
                                <button disabled className="form-button">
                                    <ButtonLoading />
                                </button>
                            )}
                        </div>
                    </form>
                ) : (
                    <form onSubmit={change_password}>
                        <p className="header">Forgot password</p>

                        <label>One time password</label>
                        <input
                            className="form-input"
                            type="number"
                            name="otp"
                            required
                            minLength="6"
                        />

                        <label>New Password</label>
                        <input
                            className="form-input"
                            type="password"
                            name="password"
                            required
                            minLength="8"
                        />

                        <label>Confirm password</label>
                        <input
                            className="form-input"
                            type="password"
                            name="password2"
                            required
                            minLength="8"
                        />

                        {error && <p className="error">{error}</p>}

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
                )}
            </div>
        </DIV>
    );
};

export default Forgotpassword;
