import axios from 'axios';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../Contexts/AuthenticationContext';
import arrowleft from '../../icons/arrow-left.png';
import ButtonLoading from '../../components/ButtonLoading';

const DIV = styled.div`
    animation: appear 0.2s;

    .form {
        box-shadow: 0px 3px 38px 0px #d8d8ff;
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
    .container {
        margin: auto;
        max-width: 500px;
        width: 90%;
    }
    .back {
        cursor: pointer;
        max-width: 35px;
    }
    button {
        background: blue;
    }
    .form-input:focus {
        outline: none !important;
        border-color: blue;
    }
    .dealer {
        text-align: center;
        font-size: 14px;
    }
`;
const Gasdealerlogin = () => {
    const { setisAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        axios
            .post(
                `${import.meta.env.VITE_APP_ACCOUNTS}dealer_login/`,
                {
                    email: e.target.email.value,
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
                    localStorage.setItem('gaschek', response.data.token);
                    setisAuthenticated(true);
                }
                if (response.data.status === true) {
                    localStorage.setItem('email', response.data.email);
                    navigate('/verify');
                } else {
                    setError(response.data.message);
                    setLoading(false);
                }
            })
            .catch(() => {
                setError('Something went wrong, try again later.');
                setLoading(false);
            });
    };

    const go_back = () => {
        localStorage.removeItem('type');
        navigate(-1);
    };
    return (
        <DIV>
            <div className="container">
                <div className="back" onClick={go_back}>
                    <img src={arrowleft} alt="back" width="30px" />
                </div>
            </div>
            <div className="form">
                <form onSubmit={login}>
                    <p className="header">Log in</p>

                    <label>Email</label>
                    <input
                        className="form-input"
                        type="email"
                        name="email"
                        required
                    />

                    <label>Password</label>
                    <input
                        className="form-input"
                        type="password"
                        name="password"
                        required
                    />

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <p className="dealer" style={{ marginRight: '5px' }}>
                            Not a dealer yet?
                        </p>
                        <Link
                            to="/gasdealersignup"
                            style={{ textDecoration: 'none', color: 'blue' }}
                            className="dealer"
                        >
                            Create Dealer Account
                        </Link>
                    </div>

                    {error && <p className="error">{error}</p>}

                    <div className="form-button-div">
                        {loading === false ? (
                            <button type="submit" className="form-button">
                                Log in
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

export default Gasdealerlogin;
