import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { decrypt } from '../../../functions/encryption';
import { ConvertTime } from '../../../functions/TimeConverter';

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
    z-index: 10;
    backdrop-filter: blur(3px);

    .contain {
        padding: 20px;
        border-radius: 20px;
        background-color: white;
        max-height: 600px;
        max-width: 500px;
        width: 90%;
        animation: fade 0.2s;
        margin-top: -10px;
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
        margin-right: 1px;
    }
    .c_name {
        color: gray;
        font-size: 25px;
        margin-top: 30px;
    }
    .phonenumber {
        color: gray;
    }
    .order-stat {
        display: flex;
        justify-content: right;
        font-size: 13px;
        margin-bottom: 20px;
    }
    .order-pen {
        color: darkorange;
        margin-right: 20px;
        margin-bottom: 20px;
        font-weight: bold;
    }
    .order-con {
        color: green;
        margin-right: 20px;
        font-weight: bold;
    }
    .buyer-confirm {
        border: 1px solid green;
        border-radius: 50px;
        padding: 7px;
        font-size: 12px;
        margin-right: 20px;
        cursor: pointer;

        p {
            color: green;
        }
    }
    .confirmation {
        display: flex;
        align-items: center;
    }
`;
const Orderdetails = ({ order, show_order_details, refresh }) => {
    const [loading, setLoading] = useState(false);

    const confirm_order = async (id) => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_APP_ORDERS}confirm_order/`,
                {
                    user_type: 'user',
                    id: id,
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
                refresh();
                show_order_details();
                setLoading(false);
            }
        } catch (error) {
            window.location.reload();
        }
    };

    return (
        <DIV>
            <div className="contain">
                <div className="close-container">
                    <div className="close" onClick={show_order_details}>
                        close
                    </div>
                </div>
                <p className="name">Cylinder: {order.cylinder}kg</p>
                <br />
                <p className="name">
                    Price: ₦{Number(order.price).toLocaleString()}
                </p>
                <br />
                <p className="name">
                    Delivery fee: ₦{Number(order.delivery).toLocaleString()}
                </p>
                <br />
                <p className="phonenumber">
                    Order date/time: {ConvertTime(order.created_at)}
                </p>
                <p className="c_name">{order.company_name}</p>
                <br />
                <div className="order-stat">
                    <p>Dealer: &nbsp;</p>
                    {order.dealer_confirmed === false ? (
                        <div className="order-pen">Pending order</div>
                    ) : (
                        <div className="order-con">Confirmed</div>
                    )}
                </div>
                <div className="order-stat">
                    {order.dealer_confirmed === true && (
                        <div className="confirmation">
                            <p>Buyer: &nbsp;</p>
                            {order.user_confirmed === false ? (
                                <div
                                    className="buyer-confirm"
                                    onClick={() => confirm_order(order.id)}
                                >
                                    {loading ? (
                                        <p>Confirming...</p>
                                    ) : (
                                        <p>confirm</p>
                                    )}
                                </div>
                            ) : (
                                <div className="order-con">Confirmed</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </DIV>
    );
};

export default Orderdetails;
