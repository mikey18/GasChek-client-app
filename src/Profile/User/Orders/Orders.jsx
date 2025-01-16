import styled from 'styled-components';
import { useEffect, useState, useCallback, useContext, useRef } from 'react';
import axios from 'axios';
import Ordercomponent from './OrderComponenet';
import { AuthContext } from '../../../Contexts/AuthenticationContext';
import LoadMore from '../../../components/LoadMore';
import OrderLoader from '../../../components/OrderLoader';
import refresh_icon from '../../../icons/refresh.png';
import { decrypt } from '../../../functions/encryption';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { GLOBALCONTEXT } from '../../../Contexts/GlobalContext';

const DIV = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
    z-index: 2;

    .a {
        height: 800px;
        max-width: 500px;
        margin: auto;
        width: 95%;
        background-color: white;
        border-radius: 30px;
        animation: 0.2s appear;
    }

    @keyframes appear {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    .head {
        text-align: center;
        font-size: 16px;
        margin-top: 20px;
        color: gray;
        margin-bottom: 20px;
        border-radius: 20px;
    }
    .scroll {
        overflow-y: auto;
        height: 85%;
        border-radius: 10px;
        padding-bottom: 50px;
        border-radius: 30px;
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
    .no-orders {
        text-align: center;
        margin-top: 200px;
        color: grey;
    }
    .refresh {
        max-width: 30px;
        margin-left: 28px;
        cursor: pointer;

        img {
            margin-top: 5px;
            margin-left: 5px;
            width: 18px;
            height: 18px;
        }
    }
    .load-more {
        border: 1px solid darkorange;
        width: 90px;
        font-size: 11px;
        color: darkorange;
        border-radius: 50px;
        text-align: center;
        margin-top: 30px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
`;

const Orders = ({ close }) => {
    const axiosPrivate = useAxiosPrivate();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const { logout } = useContext(AuthContext);
    const { access_token } = useContext(GLOBALCONTEXT);
    const [next, setNext] = useState(
        `${import.meta.env.VITE_APP_ORDERS}get_orders/`,
    );
    const [more_loading, setMore_Loading] = useState(false);

    const load_orders = useCallback(
        async (signal) => {
            try {
                const response = await axiosPrivate.post(
                    next,
                    {
                        action: 'orders',
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: access_token.current,
                        },
                        params: { limit: 10 },
                        signal: signal,
                    },
                );

                if (response.data.status === 400) {
                    logout();
                } else {
                    const decrypted_response = JSON.parse(
                        decrypt(response.data.results),
                    );

                    if (decrypted_response.length > 0) {
                        setNext(response.data.next);
                        setOrders([...orders, ...decrypted_response]);
                        setLoading(false);
                        setMore_Loading(false);
                    } else {
                        setOrders([]);
                    }
                    setLoading(false);
                }
            } catch {
                if (axios.isCancel) {
                    return;
                } else {
                    window.location.reload();
                }
            }
        },
        [setOrders, logout, next, orders, access_token, axiosPrivate],
    );

    const load_more = () => {
        const controller = new AbortController();
        const signal = controller.signal;

        setMore_Loading(true);
        load_orders(signal);

        return () => {
            controller.abort();
        };
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        if (loading) {
            load_orders(signal);
        }

        return () => {
            controller.abort();
        };
    });

    const refresh = () => {
        setNext(`${import.meta.env.VITE_APP_ORDERS}get_orders/`);
        setOrders([]);
        setLoading(true);
    };

    const modalRef = useRef();
    useEffect(() => {
        const click = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                close();
            }
        };
        document.addEventListener('mousedown', click);
        return () => {
            document.removeEventListener('mousedown', click);
        };
    }, [close]);

    return (
        <DIV>
            <div className="a" ref={modalRef}>
                <div className="head">Order history</div>
                <div className="refresh" onClick={refresh}>
                    <img src={refresh_icon} alt="refresh" />
                </div>
                {loading ? (
                    <div className="scroll">
                        <OrderLoader />
                    </div>
                ) : orders.length === 0 ? (
                    <p className="no-orders">No orders</p>
                ) : (
                    <div className="scroll">
                        {orders.map((order, index) => (
                            <Ordercomponent
                                key={index}
                                order={order}
                                refresh={refresh}
                            />
                        ))}

                        {next !== null && (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                {more_loading === true ? (
                                    <div className="load-more">
                                        <LoadMore color="darkorange" />
                                    </div>
                                ) : (
                                    <div
                                        onClick={load_more}
                                        className="load-more"
                                    >
                                        load more
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </DIV>
    );
};

export default Orders;
