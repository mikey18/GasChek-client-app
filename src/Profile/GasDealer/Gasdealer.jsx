import styled from 'styled-components';
import { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { AuthContext } from '../../Contexts/AuthenticationContext';
import Error from '../../components/Error';
import axios from 'axios';
import GasDealerLoading from '../../components/GasDealerLoading';
import Pricing from './Pricing';
import DeliveryFee from './DeliveryFee';
import Loading from '../../components/Loading';
import Ordercomponents from './Orders/Ordercomponents';
import ButtonLoading from '../../components/ButtonLoading';
// import Logout from "../../components/Logout";
import refresh_icon from '../../icons/refresh.png';
import { decrypt } from '../../functions/encryption';

const DIV = styled.div`
    margin: auto;
    max-width: 100%;
    width: 90%;

    .page {
        margin: auto;
        max-width: 700px;
    }
    .header {
        display: flex;
        padding-top: 50px;
        padding-bottom: 50px;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        margin: auto;
    }
    .company-name {
        font-size: 21px;
        font-weight: 400;
        font-weight: 100;
        max-width: 200px;
    }
    .state {
        margin-left: 50px;
        font-size: 14px;
    }
    .location {
        background-color: #f9f9f9;
        height: 200px;
        border-radius: 20px;
        box-shadow: 0px 5px 30px 5px #ececec;
        margin-top: 10px;
        animation: load 0.5s alternate infinite;
        margin-bottom: 50px;
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

    .pending {
        display: flex;
        color: grey;
        margin-right: 20px;
        margin-left: 20px;
        font-size: 14px;
        margin-top: 50px;
        margin-bottom: 20px;
        justify-content: space-between;
        align-items: center;
    }
    @media (max-width: 515px) {
        .pending {
            zoom: 0.7;
        }
    }
    .refresh {
        cursor: pointer;

        img {
            width: 18px;
            height: 18px;
        }
    }
    .scroll {
        border-radius: 15px;
        padding: 10px;
        padding-bottom: 150px;
        height: 700px;
        overflow-y: auto;
        margin-bottom: 100px;
        border: 1px solid #e0dfdf;
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
    .indicators {
        display: flex;
        justify-content: space-around;
        box-shadow: 0px 2px 5px 0px #d8d8ff;
        border-radius: 20px;
        padding: 10px;
        margin-top: 10px;
    }
    .indicators p {
        font-size: 13px;
    }
    .edit-container {
        display: flex;
        justify-content: right;
        display: -webkit-flex;
        -webkit-justify-content: right;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .delivery {
        margin-right: 20px;
        border-radius: 20px;
        padding: 5px 10px 5px 10px;
        background-color: darkorange;
        text-align: center;
        cursor: pointer;
        transition: 0.3s;
        font-size: 13px;
        color: white;
    }
    .pricing {
        margin-right: 20px;
        border-radius: 20px;
        padding: 5px 10px 5px 10px;
        background-color: green;
        text-align: center;
        cursor: pointer;
        transition: 0.3s;
        font-size: 13px;
        color: white;
    }
    .edit {
        margin-right: 20px;
        border-radius: 20px;
        padding: 5px;
        background-color: blue;
        width: 50px;
        text-align: center;
        cursor: pointer;
        transition: 0.3s;
        font-size: 13px;
        color: white;
    }
    .close {
        margin-right: 20px;
        border-radius: 20px;
        padding: 5px;
        background-color: red;
        width: 50px;
        text-align: center;
        cursor: pointer;
        transition: 0.5s;
        font-size: 13px;
        color: white;
    }
    .dropdown {
        position: absolute;
        box-shadow: 0px 1px 40px 0px #d8d8ff;
        margin-top: 40px;
        background-color: white;
        border-radius: 20px;
        margin-right: 20px;
        animation: 0.3s fade;
        padding: 30px;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    .actions {
        margin-top: 10px;
        margin: auto;
        justify-content: space-around;
        display: flex;
        margin-bottom: 15px;
        align-items: center;
    }
    .switch {
        margin-left: 20px;
        position: relative;
        width: 39px;
        height: 23px;
    }
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: 0.2s;
        transition: 0.2s;
        border-radius: 34px;
    }
    .slider::before {
        position: absolute;
        content: '';
        height: 15px;
        width: 15px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: 0.09s;
        transition: 0.09s;
        border-radius: 100px;
    }
    .checked-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        -webkit-transition: 0.2s;
        transition: 0.2s;
        border-radius: 34px;
        background-color: darkorange;
    }
    .checked-slider:before {
        position: absolute;
        content: '';
        height: 15px;
        width: 15px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: 0.09s;
        transition: 0.09s;
        border-radius: 100px;
        -webkit-transform: translateX(15px);
        -ms-transform: translateX(15px);
        transform: translateX(16px);
    }
    .save {
        margin: auto;
        background-color: blue;
        color: white;
        border-radius: 34px;
        max-width: 70px;
        font-size: 15px;
        padding: 5px;
        cursor: pointer;
        margin-top: 20px;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .order {
        text-align: center;
        font-size: 18px;
        margin-top: 80px;
        color: gray;
    }
    .no-orders {
        color: gray;
        text-align: center;
        margin-top: 45%;
    }
`;

const GasDealer = () => {
    const { logout } = useContext(AuthContext);
    const [order_loading, setOrderLoading] = useState(false);
    const [user_pending_orders, set_user_pending_orders] = useState(null);
    const [dealer_pending_orders, set_dealer_pending_orders] = useState(null);
    const [orders, setOrders] = useState(null);
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saveloading, setSaveloading] = useState(false);
    const [dealer_data, setDealer_data] = useState(null);
    const [selling, setSelling] = useState(null);
    const [open, setOpen] = useState(null);
    const [show_dropdown, setShow_dropdown] = useState(false);
    const [show_pricing_dropdown, setShow_pricing_dropdown] = useState(false);
    const [show_delivery_dropdown, setShow_delivery_dropdown] = useState(false);
    const [error, setError] = useState(null);
    const reconnecting_websockets = useRef(false);

    const log_out = useCallback(() => {
        reconnecting_websockets.current = true;
        socket.close();
        logout();
    }, [logout, socket]);

    const toggle_delivery_dropdown = () => {
        setShow_dropdown(false);
        setShow_pricing_dropdown(false);
        setShow_delivery_dropdown(!show_delivery_dropdown);
    };
    const toggle_pricing_dropdown = () => {
        setShow_dropdown(false);
        setShow_delivery_dropdown(false);
        setShow_pricing_dropdown(!show_pricing_dropdown);
    };
    const toggle_dropdown = () => {
        setShow_pricing_dropdown(false);
        setShow_delivery_dropdown(false);

        setShow_dropdown(!show_dropdown);
        setSelling(dealer_data.selling);
        setOpen(dealer_data.open);
    };
    // const successCallback = (position) => {
    //     console.log(position);
    // };
    // const errorCallback = (error) => {
    //     console.log(error);
    // };
    // navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    const toggle = (action) => {
        if (action === 'selling') {
            setSelling(!selling);
        }
        if (action === 'open') {
            setOpen(!open);
        }
    };
    const save = async () => {
        setSaveloading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_APP_ACCOUNTS}update_gas_dealer/`,
                {
                    // "selling": selling,
                    open: open,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('gaschek'),
                    },
                },
            );
            const decrypted_response = JSON.parse(decrypt(response.data));
            if (decrypted_response.status === 200) {
                setDealer_data(decrypted_response.data);
                setSelling(decrypted_response.data.selling);
                setOpen(decrypted_response.data.open);
                toggle_dropdown();
                setSaveloading(false);
            } else {
                setError(true);
            }
        } catch {
            setError(true);
        }
    };
    const refresh_orders = () => {
        if (socket !== null) {
            socket.close();
        }
        load_orders();
    };

    //ORDERS, ARRAY_GENERATOR, LOAD, REAL_TIME
    const get_real_time_orders = useCallback(() => {
        var socket = new WebSocket(import.meta.env.VITE_APP_GAS_DEALER_ORDERS);

        socket.onopen = () => {
            socket.send(
                JSON.stringify({
                    cnt: localStorage.getItem('gaschek'),
                }),
            );
            setSocket(socket);
        };
        socket.onmessage = (e) => {
            var data = JSON.parse(e.data);
            if (data.msg === 400) {
                log_out();
            }

            var decrypted_data = JSON.parse(decrypt(data.msg));
            if (decrypted_data.length > 0) {
                set_user_pending_orders(data.u_p);
                set_dealer_pending_orders(data.d_p);
                setOrders(decrypted_data);
            } else {
                set_user_pending_orders(data.u_p);
                set_dealer_pending_orders(data.d_p);
                setOrders(decrypted_data);
            }
        };
        socket.onclose = () => {
            if (reconnecting_websockets.current === false) {
                setSocket(null);
                get_real_time_orders();
            }
        };
        socket.onerror = () => {
            window.location.reload();
        };
    }, [setSocket, log_out, reconnecting_websockets]);

    const load_orders = useCallback(
        async (signal) => {
            setOrderLoading(true);
            setOrders(null);
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_APP_ORDERS}get_orders/`,
                    {
                        action: 'ordrs',
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: localStorage.getItem('gaschek'),
                        },
                        signal: signal,
                    },
                );
                const decrypted_response = JSON.parse(decrypt(response.data));

                if (decrypted_response.status === 200) {
                    if (decrypted_response.data.length > 0) {
                        set_user_pending_orders(
                            decrypted_response.user_pending,
                        );
                        set_dealer_pending_orders(
                            decrypted_response.dealer_pending,
                        );
                        setOrders(decrypted_response.data);
                    } else {
                        set_user_pending_orders(
                            decrypted_response.user_pending,
                        );
                        set_dealer_pending_orders(
                            decrypted_response.dealer_pending,
                        );
                        setOrders(decrypted_response.data);
                    }
                    get_real_time_orders();
                    setOrderLoading(false);
                }
            } catch {
                if (axios.isCancel) {
                    return;
                } else {
                    // console.log("error")
                }
            }
        },
        [setOrders, get_real_time_orders],
    );
    //ORDERS, ARRAY_GENERATOR, LOAD, REAL_TIME

    useEffect(() => {
        (async () => {
            try {
                if (dealer_data === null) {
                    setLoading(true);
                    const response = await axios.get(
                        `${import.meta.env.VITE_APP_ACCOUNTS}get_dealer_view/`,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: localStorage.getItem('gaschek'),
                            },
                        },
                    );
                    const decrypted_response = JSON.parse(
                        decrypt(response.data),
                    );

                    if (decrypted_response.status === 200) {
                        setDealer_data(decrypted_response.data);
                        setSelling(decrypted_response.data.selling);
                        setOpen(decrypted_response.data.open);
                        setLoading(false);
                    } else {
                        log_out();
                    }
                }
            } catch {
                setError(true);
            }
        })();
    }, [dealer_data, log_out]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        if (orders === null) {
            setOrderLoading(true);
            load_orders(signal);
        }

        return () => {
            controller.abort();
        };
    }, [orders, load_orders]);

    if (error) {
        return <Error />;
    }
    if (loading) {
        return <GasDealerLoading />;
    }
    if (loading === false && dealer_data !== null) {
        return (
            <DIV>
                <div className="page">
                    <div className="header">
                        <p className="company-name">
                            {dealer_data.company_name}
                        </p>
                        {/* <div onClick = {log_out}>
                            <Logout/>
                        </div> */}
                    </div>
                    <p className="state">{dealer_data.state}</p>
                    <div className="location">
                        <iframe
                            title="map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15758.853723346867!2d7.38991307670929!3d9.089849036401176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e7513aabec8d7%3A0x936c57649ed072d3!2sOando%20Petrol%20Station!5e0!3m2!1sen!2sng!4v1711015061870!5m2!1sen!2sng"
                            width="600"
                            height="450"
                            className="map"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            alt="map"
                        />
                    </div>
                    <div className="edit-container">
                        <div
                            className={
                                show_delivery_dropdown === false
                                    ? 'delivery'
                                    : 'close'
                            }
                            onClick={toggle_delivery_dropdown}
                        >
                            {show_delivery_dropdown ? (
                                <>Close</>
                            ) : (
                                <>Delivery</>
                            )}
                        </div>
                        {show_delivery_dropdown && <DeliveryFee />}
                        <div
                            className={
                                show_pricing_dropdown === false
                                    ? 'pricing'
                                    : 'close'
                            }
                            onClick={toggle_pricing_dropdown}
                        >
                            {show_pricing_dropdown ? <>Close</> : <>Pricing</>}
                        </div>

                        {show_pricing_dropdown && <Pricing />}
                        <div
                            className={
                                show_dropdown === false ? 'edit' : 'close'
                            }
                            onClick={toggle_dropdown}
                        >
                            {show_dropdown ? <>Close</> : <>Edit</>}
                        </div>

                        {show_dropdown === true && (
                            <div className="dropdown">
                                {/* <div className="actions">
                                    <p>Selling</p>
                                    <div className="switch" onClick={() => toggle('selling')}>
                                        <span className = {selling === false ? "slider":"checked-slider"} />
                                    </div>                                
                                </div> */}
                                <div className="actions">
                                    <p>Open</p>
                                    <div
                                        className="switch"
                                        onClick={() => toggle('open')}
                                    >
                                        <span
                                            className={
                                                open === false
                                                    ? 'slider'
                                                    : 'checked-slider'
                                            }
                                        />
                                    </div>
                                </div>
                                {saveloading === false ? (
                                    <div className="save" onClick={save}>
                                        Save
                                    </div>
                                ) : (
                                    <div className="save">
                                        <ButtonLoading />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="indicators">
                        {/* {dealer_data.selling === true ? 
                            <p style={{'color':'green'}}>Selling</p>
                            :
                            <p style={{'color':'red'}}>Not selling</p>
                        } */}

                        {dealer_data.open === true ? (
                            <p style={{ color: 'green' }}>Open</p>
                        ) : (
                            <p style={{ color: 'red' }}>Closed</p>
                        )}
                    </div>

                    <p className="order">Orders</p>
                    <div className="pending">
                        <div className="refresh" onClick={refresh_orders}>
                            <img src={refresh_icon} alt="refresh" />
                        </div>
                        <div>
                            Buyer pending confirmation:{' '}
                            <span
                                style={{
                                    color: 'darkorange',
                                    fontWeight: 'bold',
                                }}
                            >
                                {user_pending_orders}
                            </span>
                        </div>
                        <div>
                            Pending orders:{' '}
                            <span
                                style={{
                                    color: 'darkorange',
                                    fontWeight: 'bold',
                                }}
                            >
                                {dealer_pending_orders}
                            </span>
                        </div>
                    </div>
                    <div className="scroll">
                        {order_loading ? (
                            <Loading />
                        ) : orders.length > 0 ? (
                            orders.map((order) => (
                                <Ordercomponents
                                    dealer_data={dealer_data}
                                    order={order}
                                    key={order.id}
                                />
                            ))
                        ) : (
                            <p className="no-orders">No orders</p>
                        )}
                    </div>
                </div>
            </DIV>
        );
    }
};

export default GasDealer;
