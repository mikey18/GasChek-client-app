import styled from 'styled-components';
import { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import LoadMore from '../../../components/LoadMore';
import LeakageLoader from '../../../components/LeakageLoader';
import { decrypt } from '../../../functions/encryption';
import { ConvertTime } from '../../../functions/TimeConverter';

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

    .leakage-container {
        height: 90%;
        max-height: 600px;
        max-width: 450px;
        width: 95%;
        background-color: white;
        border-radius: 30px;
        overflow: hidden;
    }
    @keyframes l-animate {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            opacity: 1;
            transform: translateY(0);
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
        height: 90%;
        border-radius: 10px;
        padding-bottom: 50px;
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
    .contain {
        margin: auto;
        padding-left: 30px;
        margin-top: 20px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid lightgray;
        width: 350px;
        animation: appear 0.3s;

        p {
            margin-right: 40px;
            color: grey;
        }
    }
    .date {
        padding: 5px;
        width: 300px;
        font-size: 12px;

        span {
            color: red;
            border-right: 1px solid lightgrey;
            padding-right: 5px;
            margin-right: 2px;
        }
    }
    .load-more {
        border: 1px solid red;
        width: 90px;
        font-size: 11px;
        color: red;
        border-radius: 50px;
        text-align: center;
        margin-top: 10px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
`;

const Leakages = ({ close }) => {
    const [loading, setLoading] = useState(true);
    const [leakages, setLeakages] = useState([]);
    const [next, setNext] = useState(
        `${import.meta.env.VITE_APP_GASCHEK_DEVICE_HTTP}leakage/`,
    );
    const [more_loading, setMore_Loading] = useState(false);

    const load_leakages = useCallback(
        async (signal) => {
            try {
                const response = await axios.get(next, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('device'),
                    },
                    params: {
                        limit: 10,
                    },
                    signal: signal,
                });

                if (response.data.status === 400) {
                    window.location.reload();
                } else {
                    const decrypted_response = JSON.parse(
                        decrypt(response.data.results),
                    );
                    if (decrypted_response.length > 0) {
                        setNext(response.data.next);
                        setLeakages([...leakages, ...decrypted_response]);
                        setLoading(false);
                        setMore_Loading(false);
                    } else {
                        setLeakages([]);
                        setLoading(false);
                    }
                }
            } catch {
                if (axios.isCancel) {
                    return;
                } else {
                    window.location.reload();
                }
            }
        },
        [setLeakages, next, leakages],
    );

    const load_more = () => {
        const controller = new AbortController();
        const signal = controller.signal;

        setMore_Loading(true);
        load_leakages(signal);

        return () => {
            controller.abort();
        };
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        if (loading) {
            load_leakages(signal);
        }

        return () => {
            controller.abort();
        };
    }, [loading, load_leakages]);

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
            <div className="leakage-container" ref={modalRef}>
                <div className="head">Gas and Smoke detection history</div>

                {loading ? (
                    <div className="scroll">
                        <LeakageLoader />
                    </div>
                ) : leakages.length === 0 ? (
                    <p className="no-orders">No history</p>
                ) : (
                    <div className="scroll">
                        {leakages.map((leakage, index) => (
                            <ul key={index} className="contain">
                                <li className="date">
                                    <span>{leakage.action}</span>
                                    {ConvertTime(leakage.created_at)}
                                </li>
                            </ul>
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
                                        <LoadMore color="red" />
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

export default Leakages;
