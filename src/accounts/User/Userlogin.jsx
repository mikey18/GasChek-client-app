import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../Contexts/AuthenticationContext';
import ButtonLoading from '../../components/ButtonLoading';
// import ConnectEmail from "./ConnectEmaii";
import FormError from '../../components/Formerror';
import Back from '../../components/Back';
import { GLOBALCONTEXT } from '../../Contexts/GlobalContext';

const DIV = styled.div`
    animation: appear 0.2s;

    .form {
        box-shadow: 0px 3px 38px 0px #eee2cc;
    }
    .create {
        box-shadow: 0px 3px 10px 0px #eee2cc;
        max-width: 400px;
        width: 90%;
        margin: auto;
        padding: 25px;
        border-radius: 50px;
        margin-top: 40px;
        font-weight: bold;
        text-align: center;
        cursor: pointer;
        color: orange;
    }
`;
const Userlogin = () => {
    const { setisAuthenticated } = useContext(AuthContext);
    const { access_token } = useContext(GLOBALCONTEXT);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        axios
            .post(
                `${import.meta.env.VITE_APP_ACCOUNTS}login/`,
                {
                    email: e.target.email.value,
                    password: e.target.password.value,
                    platform: 'web',
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                },
            )
            .then((response) => {
                if (response.status === 200) {
                    access_token.current = response.data.access;
                    localStorage.setItem(0, true);
                    setisAuthenticated(true);
                } else if (response.status === 202) {
                    sessionStorage.setItem(
                        'v*****',
                        JSON.stringify({
                            token: response.data.token,
                            email: e.target.email.value,
                        }),
                    );
                    navigate('/verify');
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    setError(error.response.data.msg);
                } else {
                    setError('Something went wrong, try again later.');
                }
                setLoading(false);
            });
    };

    return (
        <DIV>
            <Back />
            <div className="form">
                <form onSubmit={login}>
                    <p className="header">User log in</p>

                    <label>Email</label>
                    <input
                        className="form-input"
                        type="text"
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

                    {error && <FormError text={error} />}

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Link
                            to="/forgot-password"
                            style={{
                                textDecoration: 'none',
                                color: 'darkorange',
                            }}
                            className="dealer"
                        >
                            Forgot password
                        </Link>
                    </div>
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
            <Link to="/signup" className="link">
                <div className="create">Create GasChek Account</div>
            </Link>
        </DIV>
    );
};

export default Userlogin;
