import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ButtonLoading from '../../components/ButtonLoading';
import DeleteLoading from '../../components/DeleteLoading';
import PriceLoading from '../../components/PriceLoading';
import { decrypt } from '../../functions/encryption';

const DIV = styled.div`
    position: absolute;
    box-shadow: 0px 15px 40px 0px #d8d8ff;
    margin-top: 40px;
    background-color: white;
    border-radius: 20px;
    animation: 0.3s fade;
    padding-top: 40px;
    padding-bottom: 40px;
    padding-left: 30px;
    padding-right: 30px;
    max-width: 310px;
    width: 90%;
    z-index: 1;
    margin-right: 20px;

    .cylinder-price {
        display: flex;
        gap: 40px;
        margin-left: 30px;
        font-size: 13px;
    }
    .delete {
        background-color: red;
        border-radius: 50px;
        color: white;
        font-size: 12px;
        text-align: center;
        padding: 8px;
        cursor: pointer;
    }
    .upload {
        background-color: darkorange;
        border-radius: 50px;
        color: white;
        font-size: 12px;
        text-align: center;
        padding: 8px;
        cursor: pointer;
    }
    .cylinder-price-delete {
        display: flex;
        justify-content: space-around;
        margin-bottom: 10px;
        align-items: center;
        border-bottom: 1px solid lightgrey;
        width: 250px;
        padding: 5px;
    }
    .add-cylinder-price {
        display: flex;
        justify-content: space-around;
        margin-bottom: 10px;
        align-items: center;
    }
    .f-in {
        width: 100px;
        border: 1px solid lightgray;
        border-radius: 20px;
        padding: 5px 10px 5px 10px;
        transition: 0.3s;
    }
    .add {
        background-color: darkorange;
        color: white;
        border-radius: 20px;
        width: 50px;
        text-align: center;
        padding: 5px;
        font-size: 13px;
        margin-left: 250px;
        margin-top: 30px;
        cursor: pointer;
    }
    .error {
        border: 1px solid red;
        color: red;
        font-size: 14px;
        text-align: center;
        padding: 10px;
    }
`;

const DeliveryFee = () => {
    const [loading, setLoading] = useState(false);
    const [all_loading, setAll_loading] = useState(true);
    const [del_loading, setdel_loading] = useState(false);
    const [error, setError] = useState(null);
    const [delivery_fee, setDelivery_fee] = useState(null);

    useEffect(() => {
        const fetch = (signal) => {
            axios
                .get(`${import.meta.env.VITE_APP_ORDERS}delivery_fee/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('gaschek'),
                    },
                    signal: signal,
                })
                .then((response) => {
                    const decrypted_response = JSON.parse(
                        decrypt(response.data),
                    );
                    if (decrypted_response.status === 200) {
                        setDelivery_fee(decrypted_response.data);
                        setAll_loading(false);
                    } else {
                        setAll_loading(false);
                    }
                })
                .catch(() => {
                    if (axios.isCancel) {
                        return;
                    }
                });
        };

        if (delivery_fee === null) {
            const controller = new AbortController();
            const signal = controller.signal;

            fetch(signal);

            return () => {
                controller.abort();
            };
        }
    });

    const save = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        axios
            .post(
                `${import.meta.env.VITE_APP_ORDERS}create_delivery_fee/`,
                {
                    price: e.target.price.value,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('gaschek'),
                    },
                },
            )
            .then((response) => {
                const decrypted_response = JSON.parse(decrypt(response.data));

                if (decrypted_response.status === 200) {
                    setDelivery_fee(decrypted_response.data);
                    setLoading(false);
                } else {
                    setError('error');
                    setLoading(false);
                }
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const del = (id) => {
        setdel_loading(true);
        axios
            .patch(
                `${import.meta.env.VITE_APP_ORDERS}create_delivery_fee/`,
                {
                    id: id,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('gaschek'),
                    },
                },
            )
            .then((response) => {
                const decrypted_response = JSON.parse(decrypt(response.data));

                if (decrypted_response.status === 200) {
                    setDelivery_fee(decrypted_response.data);
                    setdel_loading(false);
                } else {
                    setError('Error deleting.');
                    setdel_loading(false);
                }
            })
            .catch(() => {
                setError('Error deleting.');
                setdel_loading(false);
            });
    };

    if (all_loading) {
        return (
            <DIV>
                <PriceLoading />
            </DIV>
        );
    } else {
        return (
            <DIV>
                {delivery_fee.length > 0 && (
                    <div className="cylinder-price">
                        <p style={{ color: 'gray' }}>Delivery fee (NGN)</p>
                        {del_loading && <DeleteLoading />}
                    </div>
                )}

                <div className="scrol">
                    {delivery_fee.length === 0 ? (
                        <form onSubmit={save}>
                            <div className="add-cylinder-price">
                                <p style={{ color: 'gray', fontSize: '12px' }}>
                                    Delivery fee (NGN)
                                </p>
                                <input
                                    className="f-in"
                                    name="price"
                                    placeholder="price"
                                    type="number"
                                    required
                                />
                            </div>

                            {error && <div className="error">{error}</div>}
                            <div className="form-button-div">
                                {loading === false ? (
                                    <button
                                        className="form-button"
                                        type="submit"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button className="form-button" disabled>
                                        <ButtonLoading />
                                    </button>
                                )}
                            </div>
                        </form>
                    ) : (
                        delivery_fee.map((c_p) => {
                            return (
                                <div
                                    className="cylinder-price-delete"
                                    key={c_p.id}
                                >
                                    <p>₦{Number(c_p.price).toLocaleString()}</p>
                                    <div
                                        className="delete"
                                        onClick={() => del(c_p.id)}
                                    >
                                        Delete
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </DIV>
        );
    }
};
export default DeliveryFee;
