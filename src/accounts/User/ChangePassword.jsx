import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import arrowleft from '../../icons/arrow-left.png';
import ButtonLoading from '../../components/ButtonLoading';
import { decrypt } from '../../functions/encryption';

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
        border: 1px solid red;
        padding: 10px;
        margin-top: 10px;
        color: red;
        text-align: center;
        font-size: 13px;
        border-radius: 5px;
    }
`;
const ChangePassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState(null);

    const change_password = (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (e.target.password.value !== e.target.password2.value) {
            setError('Password does not match.');
            setLoading(false);
        } else {
            axios
                .post(
                    `${import.meta.env.VITE_APP_ACCOUNTS}change_password/`,
                    {
                        username: username,
                        password: e.target.password.value,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                )
                .then((response) => {
                    if (response.data.status === 200) {
                        navigate('/login');
                    } else if (response.data.status === 500) {
                        setError('User password has already been changed');
                        setTimeout(() => {
                            navigate('/login');
                        }, [2000]);
                    } else {
                        setError(response.data.message);
                        setLoading(false);
                    }
                })
                .catch(() => {
                    setError('Something went wrong, try again later.');
                    setLoading(false);
                });
        }
    };

    const go_back = () => {
        navigate(-1);
    };

    useEffect(() => {
        try {
            var username = decrypt(localStorage.getItem('usr'));
            setUsername(username);
        } catch {
            window.location.reload();
        }

        return () => {
            localStorage.removeItem('usr');
        };
    }, [setUsername]);
    return (
        <DIV>
            <div className="container">
                <div className="back" onClick={go_back}>
                    <img src={arrowleft} alt="back" width="30px" />
                </div>
            </div>
            <div className="form">
                <form onSubmit={change_password}>
                    <p className="header">Change password</p>

                    <input
                        className="form-input"
                        placeholder={username}
                        disabled
                    />

                    <label>Password</label>
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
                                Change passwod
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

export default ChangePassword;
