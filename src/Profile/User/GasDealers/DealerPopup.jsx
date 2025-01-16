import styled from 'styled-components';
import { useEffect, useState, useCallback } from 'react';
import Loading from '../../../components/Loading';
import axios from 'axios';
import ButtonLoading from '../../../components/ButtonLoading';
import { decrypt } from '../../../functions/encryption';

const DIV = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;

    .contain {
        padding: 20px;
        border-radius: 20px;
        background-color: white;
        max-height: 800px;
        max-width: 600px;
        height: 100%;
        width: 100%;
        animation: fade 0.2s;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    .close-container {
        display: flex;
        justify-content: right;
    }
    .close {
        background-color: red;
        color: white;
        padding: 7px;
        border-radius: 50px;
        font-size: 13px;
        cursor: pointer;
        margin-top: 10px;
        margin-right: 10px;
    }
    .scroll {
        overflow-y: auto;
        max-height: 680px;
        height: 90%;
        border-radius: 10px;
        padding: 10px 10px 150px 10px;
    }
    .scroll::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
    .scroll::-webkit-scrollbar-track {
        background-color: white;
    }
    .scroll::-webkit-scrollbar-thumb {
        background-color: lightgray;
        border-radius: 100px;
        border: 2px solid transparent;
        background-clip: content-box;
    }
    .scroll::-webkit-scrollbar-thumb:hover {
        background-color: gray;
        border: 1px solid transparent;
        background-clip: content-box;
        cursor: pointer;
    }
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        margin: auto;
        margin-top: 10px;
        margin-bottom: 20px;
    }
    .company-name {
        font-size: 18px;
        font-weight: 400;
        font-weight: 100;
        max-width: 200px;
    }
    .state {
        font-size: 13px;
        margin-left: 50px;
    }
    .location {
        height: 200px;
        border-radius: 20px;
        margin-top: 10px;
        animation: load 0.5s alternate infinite;
    }
    @keyframes load {
        0% {
            background-color: #f9f9f9;
            box-shadow: none;
        }
        100% {
            background-color: #f0f0f0;
            box-shadow: none;
        }
    }
    .map {
        height: 100%;
        width: 100%;
        border-radius: 20px;
        border: none;
    }
    .indicators {
        display: flex;
        justify-content: space-around;
        box-shadow: 0px 2px 5px 0px #d8d8ff;
        border-radius: 20px;
        padding: 10px;
        margin-top: 30px;
    }
    .indicators p {
        font-size: 13px;
    }
    .price {
        margin: auto;
        border-radius: 20px;
        box-shadow: 0px 5px 10px 0px #d8d8ff;
        max-width: 200px;
        width: 90%;
        margin-top: 30px;
        padding: 15px 0px 15px 0px;
    }
    .pr {
        color: gray;
        text-align: center;
    }
    .price-data {
        width: 95%;
        margin: auto;
        text-align: center;
        margin-top: 15px;

        p {
            margin-bottom: 5px;
            color: #4e4d4d;
        }
    }
    .place-order {
        color: gray;
        text-align: center;
        margin-top: 30px;
        margin-bottom: 30px;
        font-size: 15px;
    }
    .form {
        margin: auto;
        box-shadow: 0px 5px 10px 0px #d8d8ff;
    }
    .sub-form {
        margin: auto;
        max-width: 250px;
        margin-bottom: 30px;
    }
    label {
        margin: auto;
    }
    .selector {
        margin: auto;
        width: 100%;
        border: 1px solid lightgray;
        border-radius: 20px;
        padding: 8px 15px 8px 15px;
        font-size: 15px;
        margin-top: 10px;
        background-color: whitesmoke;
        cursor: pointer;
    }
    .selector:focus {
        border: 1px solid darkorange;
        outline: none !important;
    }
    .button-container {
        display: flex;
    }
    .order {
        background-color: darkorange;
        color: white;
        padding: 10px;
        border-radius: 25px;
        margin: auto;
        cursor: pointer;
        transition: 0.3s;
        border: 1px solid transparent;
        font-size: 15px;
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
    }
    .order2 {
        background-color: darkorange;
        color: white;
        padding: 10px;
        width: 100px;
        text-align: center;
        border-radius: 25px;
        margin: auto;
        transition: 0.3s;
        border: 1px solid transparent;
        font-size: 15px;
        opacity: 0.3;
        cursor: not-allowed;
    }
    .error {
        border: 1px solid red;
        font-size: 12px;
        border-radius: 10px;
    }
    .unavailable {
        text-align: center;
        height: 100%;
        color: grey;
        padding: 100px;
    }
`;
const DealerPopup = ({ popup, setPopup, id }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [unavailable, setUnavailable] = useState(null);

    const [order_loading, setOrder_Loading] = useState(null);
    const [dealer_data, setDealer_data] = useState(null);
    const [cylinder_price, setCylinder_price] = useState(null);
    const [delivery_fee, setDelivery_fee] = useState(null);

    const close_popup = () => {
        setDealer_data(null);
        setError(null);
        setLoading(true);
        setPopup(false);
    };

    const load_data = useCallback(
        async (signal) => {
            const response = await axios.get(
                `${import.meta.env.VITE_APP_ACCOUNTS}get_dealer/`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    params: { id: id },
                    signal: signal,
                },
            );
            const decrypted_response = JSON.parse(decrypt(response.data));
            if (decrypted_response.status === 200) {
                setDealer_data(decrypted_response.data);
                setCylinder_price(decrypted_response.data2);
                setDelivery_fee(decrypted_response.data3);
                setLoading(false);
            } else {
                setUnavailable(decrypted_response.message);
                setLoading(false);
            }
        },
        [id],
    );

    useEffect(() => {
        try {
            if (dealer_data === null && popup === true) {
                const controller = new AbortController();
                const signal = controller.signal;

                load_data(signal);

                return () => {
                    controller.abort();
                };
            }
        } catch {
            window.location.reload();
        }
    }, [dealer_data, popup, load_data]);

    const order = (e) => {
        e.preventDefault();
        setError(null);
        setOrder_Loading(true);

        var controller = new AbortController();
        var signal = controller.signal;

        const timeout = () => {
            setTimeout(() => {
                controller.abort();
                setError('Error processing payment, try again.');
                setOrder_Loading(false);
            }, [120000]);
        };
        timeout();

        axios
            .post(
                `${import.meta.env.VITE_APP_PAYMENT}payment_api/`,
                {
                    cylinder: e.target.cylinder_price.value,
                    dealer: dealer_data.id,
                    callback_url: import.meta.env.VITE_APP_URL,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('gaschek'),
                    },
                    signal: signal,
                },
            )
            .then((response) => {
                if (response.data.status === 200) {
                    clearTimeout(timeout);
                    window.location.replace(response.data.url);
                }
                if (response.data.status === 400) {
                    setError(response.data.message);
                    setOrder_Loading(false);
                    load_data();
                }
            })
            .catch(() => {
                setOrder_Loading(false);
            });
    };

    const Close = () => {
        return (
            <div onClick={close_popup} className="close-container">
                <div className="close">close</div>
            </div>
        );
    };

    if (popup === true) {
        return (
            <DIV>
                <div className="contain">
                    {loading ? (
                        <div>
                            <Close />
                            <Loading />
                        </div>
                    ) : dealer_data !== null ? (
                        <div>
                            <div
                                onClick={close_popup}
                                className="close-container"
                            >
                                <div className="close">close</div>
                            </div>
                            <div className="scroll">
                                <div className="header">
                                    <p className="company-name">
                                        {dealer_data.company_name}
                                    </p>
                                </div>
                                <p className="state">{dealer_data.state}</p>
                                <div className="location">
                                    <iframe
                                        title="map"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31527.59924183787!2d7.414621721949439!3d8.976757147205946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e734cf34786cf%3A0x5b753b86608d6758!2sNIPCO%20Gas%20Station!5e0!3m2!1sen!2sng!4v1676047156148!5m2!1sen!2sng"
                                        width="600"
                                        height="450"
                                        className="map"
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        alt="map"
                                    />
                                </div>
                                <div className="indicators">
                                    {dealer_data.open === true ? (
                                        <p style={{ color: 'green' }}>Open</p>
                                    ) : (
                                        <p style={{ color: 'red' }}>Closed</p>
                                    )}
                                </div>

                                <div className="price">
                                    <p className="pr">Prices</p>
                                    <div className="price-data">
                                        {cylinder_price.map((c_p) => (
                                            <p key={c_p.id}>
                                                {c_p.cylinder}kg - ₦
                                                {Number(
                                                    c_p.price,
                                                ).toLocaleString()}
                                            </p>
                                        ))}
                                    </div>
                                    <br />
                                    <br />
                                    <p className="pr">Delivery Fee</p>
                                    <div className="price-data">
                                        <p>
                                            ₦
                                            {Number(
                                                delivery_fee.price,
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <p className="place-order">Place order</p>

                                <form className="form" onSubmit={order}>
                                    <div className="sub-form">
                                        <label style={{ textAlign: 'center' }}>
                                            Select Cylinder
                                        </label>
                                        <select
                                            className="selector"
                                            name="cylinder_price"
                                            required
                                        >
                                            {cylinder_price.map((c_p) => (
                                                <option
                                                    key={c_p.id}
                                                    value={c_p.cylinder}
                                                >
                                                    {c_p.cylinder}kg - ₦
                                                    {Number(
                                                        c_p.price,
                                                    ).toLocaleString()}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {dealer_data.selling === true &&
                                    dealer_data.open === true ? (
                                        <div className="button-container">
                                            {order_loading ? (
                                                <button
                                                    className="order"
                                                    disabled
                                                >
                                                    <ButtonLoading />
                                                </button>
                                            ) : (
                                                <button
                                                    className="order"
                                                    type="submit"
                                                >
                                                    Order
                                                </button>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="button-container">
                                            <button className="order2" disabled>
                                                Order
                                            </button>
                                        </div>
                                    )}
                                    {error && <p className="error">{error}</p>}
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <Close />
                            <div className="unavailable">{unavailable}</div>
                        </div>
                    )}
                </div>
            </DIV>
        );
    }
};

export default DealerPopup;
