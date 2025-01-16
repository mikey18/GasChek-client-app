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
    max-width: 400px;
    width: 90%;
    z-index: 1;

    .scrol {
        overflow-y: auto;
        max-height: 330px;
        padding: 20px 0px 20px 0px;
    }
    .scrol::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
    .scrol::-webkit-scrollbar-track {
        background-color: white;
    }
    .scrol::-webkit-scrollbar-thumb {
        background-color: lightgray;
        border-radius: 100px;
        border: 2px solid transparent;
        background-clip: content-box;
    }
    .scrol::-webkit-scrollbar-thumb:hover {
        background-color: gray;
        border: 1px solid transparent;
        background-clip: content-box;
        cursor: pointer;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    .no-cylinders {
        text-align: center;
        color: gray;
        padding: 30px;
    }
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
        width: 320px;
        padding: 5px;
    }
    .add-cylinder-price {
        display: flex;
        justify-content: space-around;
        margin-bottom: 10px;
        align-items: center;
        margin-top: 40px;
    }
    .f-in {
        width: 130px;
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

const Pricing = () => {
    const [loading, setLoading] = useState(false);
    const [all_loading, setAll_loading] = useState(true);
    const [del_loading, setdel_loading] = useState(false);
    const [error, setError] = useState(null);
    const [cylinder_price, setCylinder_price] = useState(null);

    useEffect(() => {
        const fetch = (signal) => {
            axios
                .get(`${import.meta.env.VITE_APP_ORDERS}cylinder_price/`, {
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
                        setCylinder_price(decrypted_response.data);
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

        if (cylinder_price === null) {
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
                `${import.meta.env.VITE_APP_ORDERS}create_cylinder_price/`,
                {
                    cylinder: e.target.cylinder.value,
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
                    setCylinder_price(decrypted_response.data);
                    e.target.cylinder.value = '';
                    e.target.price.value = '';
                    setLoading(false);
                } else {
                    setError('Cannot have duplicate cylinders');
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
                `${import.meta.env.VITE_APP_ORDERS}create_cylinder_price/`,
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
                    setCylinder_price(decrypted_response.data);
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
                {cylinder_price.length > 0 && (
                    <div className="cylinder-price">
                        <p style={{ color: 'gray' }}>Cylinder (kg)</p>
                        <p style={{ color: 'gray' }}>Price (NGN)</p>
                        {del_loading && <DeleteLoading />}
                    </div>
                )}

                <div className="scrol">
                    {cylinder_price.length === 0 ? (
                        <div className="no-cylinders">No cylinders</div>
                    ) : (
                        cylinder_price.map((c_p, index) => {
                            return (
                                <div
                                    className="cylinder-price-delete"
                                    key={c_p.id}
                                >
                                    <p style={{ color: 'gray' }}>
                                        {index + 1}.
                                    </p>
                                    <p>{c_p.cylinder}kg</p>
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
                <form onSubmit={save}>
                    <div className="add-cylinder-price">
                        <input
                            className="f-in"
                            name="cylinder"
                            placeholder="cylinder (kg)"
                            type="number"
                            step=".01"
                            required
                        />
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
                            <button className="form-button" type="submit">
                                Add
                            </button>
                        ) : (
                            <button className="form-button" disabled>
                                <ButtonLoading />
                            </button>
                        )}
                    </div>
                </form>
            </DIV>
        );
    }
};
export default Pricing;
