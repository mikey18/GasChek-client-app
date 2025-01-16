import styled from 'styled-components';
import arrowleft from '../../../icons/arrow-left.png';
import { useNavigate } from 'react-router-dom';
import { useState, useCallback, useEffect, useContext } from 'react';
import axios from 'axios';
import Error from '../../../components/Error';
import Search from './Search';
import GasDealersComponent from './GasDealersComponent';
import Loading from '../../../components/Loading';
import { AppContext } from '../../../Contexts/ApplicationContext';
import { decrypt } from '../../../functions/encryption';

const DIV = styled.div`
    .error {
        border: 1px solid red;
        padding: 10px;
        margin-top: 10px;
        color: red;
        text-align: center;
        font-size: 13px;
    }
    .container {
        margin: auto;
        max-width: 500px;
        width: 90%;
        margin-top: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .back {
        cursor: pointer;
        max-width: 35px;
    }
    .no-gas-dealer {
        color: grey;
        text-align: center;
        margin-top: 180px;
    }
    .results {
        max-width: 450px;
        padding-top: 50px;
        font-size: 18px;
        margin: auto;
        width: 90%;
    }
    .prompt {
        max-width: 450px;
        padding-top: 150px;
        font-size: 18px;
        margin: auto;
        text-align: center;
        color: grey;
    }
`;
const GasDealers = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [gas_dealers, SetGas_dealers] = useState(null);
    const { state } = useContext(AppContext);

    const go_back = () => {
        navigate('/dashboard');
    };

    const get_gasdealers = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${import.meta.env.VITE_APP_ORDERS}gasdealers/`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    params: { state: state },
                },
            );
            const decrypted_response = JSON.parse(decrypt(response.data));

            if (decrypted_response.status === 200) {
                SetGas_dealers(decrypted_response.data);
                setLoading(false);
            } else {
                localStorage.clear();
                window.location.reload();
            }
        } catch (error) {
            if (axios.isCancel) {
                return null;
            } else {
                setError(true);
            }
        }
    }, [SetGas_dealers, state]);

    useEffect(() => {
        if (gas_dealers === null && state.length !== 0) {
            const controller = new AbortController();
            const signal = controller.signal;

            get_gasdealers(signal);

            return () => {
                controller.abort();
            };
        }
    }, [get_gasdealers, gas_dealers, state]);

    if (error) {
        return <Error />;
    } else if (state.length === 0) {
        return (
            <DIV>
                <div className="container">
                    <div className="back" onClick={go_back}>
                        <img src={arrowleft} alt="back" width="30px" />
                    </div>
                </div>
                <p className="prompt">Please fill in your profile details.</p>
            </DIV>
        );
    } else {
        return (
            <DIV>
                <div className="container">
                    <div className="back" onClick={go_back}>
                        <img src={arrowleft} alt="back" width="30px" />
                    </div>

                    <Search
                        setLoading={setLoading}
                        SetGas_dealers={SetGas_dealers}
                        setError={setError}
                    />
                </div>

                {loading ? (
                    <Loading />
                ) : (
                    <div>
                        <p className="results">Showing results for {state}</p>
                        {gas_dealers === null || gas_dealers.length === 0 ? (
                            <div className="no-gas-dealer">No gas dealers.</div>
                        ) : (
                            gas_dealers.map((dealer) => (
                                <GasDealersComponent
                                    dealer={dealer}
                                    key={dealer.id}
                                />
                            ))
                        )}
                    </div>
                )}
            </DIV>
        );
    }
};

export default GasDealers;
