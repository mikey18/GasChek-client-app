import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import arrowleft from '../../icons/arrow-left.png';
import Data from '../../data/data';
import ButtonLoading from '../../components/ButtonLoading';
import LocationMessage from '../../components/LocationMessage';

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
        margin-top: 10px;
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
const Gasdealersignup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(false);
    const [error, setError] = useState(null);
    const { states, banks } = Data;

    const signup = (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const success = (position) => {
            const longitude = position.coords.longitude;
            const latitude = position.coords.latitude;

            if (e.target.password.value !== e.target.password2.value) {
                setError('Password does not match.');
                setLoading(false);
            } else {
                axios
                    .post(
                        `${import.meta.env.VITE_APP_ACCOUNTS}create_dealer/`,
                        {
                            email: e.target.email.value,
                            company_name: e.target.company_name.value,
                            password: e.target.password.value,
                            phonenumber: e.target.phonenumber.value,
                            address: e.target.address.value,
                            state: e.target.state.value,
                            is_dealer: true,
                            account_number: e.target.account_number.value,
                            bank: e.target.bank.value,
                            longitude: longitude,
                            latitude: latitude,
                            is_verified: false,
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        },
                    )
                    .then((response) => {
                        if (response.data.status === 200) {
                            localStorage.setItem('email', response.data.data);
                            navigate('/verify');
                        } else if (response.data.status === 400) {
                            setError(response.data.message);
                            setLoading(false);
                        } else if (response.data.status === 500) {
                            setError(response.data.response.message);
                            setLoading(false);
                        }
                    })
                    .catch(() => {
                        setError('Something went wrong, try again later.');
                        setLoading(false);
                    });
            }
        };
        const error = () => {
            setError('Cannot proceed without location');
            setLoading(false);
        };
        navigator.geolocation.getCurrentPosition(success, error);
    };

    const go_back = () => {
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
                <form onSubmit={signup}>
                    <p className="header">Become a Gas Dealer</p>

                    <label>Company Email</label>
                    <input
                        className="form-input"
                        type="email"
                        name="email"
                        placeholder="Must be a valid company email"
                        required
                    />

                    <label>Company Name</label>
                    <input
                        className="form-input"
                        type="text"
                        name="company_name"
                        placeholder="Must be a unique company name"
                        required
                    />

                    <label>Company Phonenumber</label>
                    <input
                        className="form-input"
                        type="text"
                        name="phonenumber"
                        placeholder="Must be a valid phonenumber"
                        required
                    />

                    <label>Address</label>
                    <textarea
                        className="text-area"
                        type="text"
                        name="address"
                        placeholder="Must be your exact location"
                        required
                    />

                    <label>State</label>
                    <select className="form-input" name="state">
                        {states.map((mapped_state) => (
                            <option key={mapped_state.id}>
                                {mapped_state.state}
                            </option>
                        ))}
                    </select>

                    <label>Account Number</label>
                    <input
                        className="form-input"
                        type="number"
                        name="account_number"
                        placeholder="Must be a valid account number"
                        maxLength="20"
                        required
                    />

                    <label>Bank</label>
                    <select className="form-input" name="bank">
                        {banks.map((mapped_bank) => (
                            <option
                                key={mapped_bank.id}
                                value={mapped_bank.code}
                            >
                                {mapped_bank.name}
                            </option>
                        ))}
                    </select>

                    <label>Password</label>
                    <input
                        className="form-input"
                        type="password"
                        name="password"
                        placeholder="Make it unique and keep it safe"
                        minLength="8"
                        required
                    />

                    <label>Confirm password</label>
                    <input
                        className="form-input"
                        type="password"
                        name="password2"
                        minLength="8"
                        required
                    />

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <p className="dealer" style={{ marginRight: '5px' }}>
                            Already a Gas Dealer?
                        </p>
                        <Link
                            to="/gasdealerlogin"
                            style={{ textDecoration: 'none', color: 'blue' }}
                            className="dealer"
                        >
                            Login
                        </Link>
                    </div>

                    {error && <p className="error">{error}</p>}

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
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            {notification === false && (
                <LocationMessage setNotification={setNotification} />
            )}
        </DIV>
    );
};

export default Gasdealersignup;
