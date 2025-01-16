import axios from 'axios';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import arrowleft from '../../icons/arrow-left.png';
import ButtonLoading from '../../components/ButtonLoading';
import { useNavigate } from 'react-router-dom';
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
    .info {
        color: grey;
        text-align: center;
    }
`;
const ConnectEmail = ({ setMode }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState(null);

    const connect_email = (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        axios
            .post(
                `${import.meta.env.VITE_APP_ACCOUNTS}connect_email/`,
                {
                    username: username,
                    email: e.target.email.value.trim(),
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((response) => {
                if (response.data.status === 200) {
                    localStorage.setItem('email', e.target.email.value.trim());
                    navigate('/verify');
                }
                // else if(response.data.status === 500){
                //     setError('User password has already been changed')
                //     setTimeout(() => {
                //         navigate("/userlogin")
                //     }, [2000])
                // }
                else {
                    setError(response.data.msg);
                    setLoading(false);
                }
            })
            .catch((error) => {
                setError('Something went wrong, try again later.');
                setLoading(false);
            });
    };

    const go_back = () => {
        setMode('login');
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
                <form onSubmit={connect_email}>
                    <p className="header">Connect Email</p>
                    <p className="info">
                        You must connect an email to control this account
                    </p>
                    <input
                        className="form-input"
                        placeholder={username}
                        disabled
                    />

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

export default ConnectEmail;
