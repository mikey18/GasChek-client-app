import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import ButtonLoading from '../../components/ButtonLoading';
import FormError from '../../components/Formerror';
import Back from '../../components/Back';
import { decrypt } from '../../functions/encryption';

const DIV = styled.div`
    animation: appear 0.2s;

    .form {
        box-shadow: 0px 3px 38px 0px #eee2cc;
    }
`;
const UserSignup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const signup = (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (
            e.target.email.value.trim() === '' ||
            e.target.first_name.value.trim() === '' ||
            e.target.last_name.value.trim() === '' ||
            e.target.password.value.trim() === ''
        ) {
            setError('Fields cannot be empty.');
            setLoading(false);
        } else if (e.target.password.value !== e.target.password2.value) {
            setError("Password dosen't match");
            setLoading(false);
        } else {
            axios
                .post(
                    `${import.meta.env.VITE_APP_ACCOUNTS}signup/`,
                    {
                        first_name: e.target.first_name.value,
                        last_name: e.target.last_name.value,
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
                    if (response.status === 200) {
                        const decrypted_response = JSON.parse(
                            decrypt(response.data),
                        );
                        sessionStorage.setItem(
                            'v*****',
                            JSON.stringify({
                                token: decrypted_response.token,
                                email: e.target.email.value,
                            }),
                        );
                        navigate('/verify');
                    }
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        const decrypted_response = JSON.parse(
                            decrypt(error.response.data),
                        );
                        setError(decrypted_response.msg);
                        setLoading(false);
                    }
                });
        }
    };

    return (
        <DIV>
            <Back />
            <div className="form">
                <form onSubmit={signup}>
                    <p className="header">Create an account</p>

                    <label>Firstname</label>
                    <input
                        className="form-input"
                        type="text"
                        name="first_name"
                        required
                    />

                    <label>Lastname</label>
                    <input
                        className="form-input"
                        type="text"
                        name="last_name"
                        required
                    />

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

                    <label>Confirm Password</label>
                    <input
                        className="form-input"
                        type="password"
                        name="password2"
                        required
                    />

                    {error && <FormError text={error} />}

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Link
                            to="/login"
                            style={{ color: 'darkorange' }}
                            className="link"
                        >
                            Already have an account
                        </Link>
                    </div>
                    <div className="form-button-div">
                        {loading === false ? (
                            <button type="submit" className="form-button">
                                Sign up
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

export default UserSignup;
