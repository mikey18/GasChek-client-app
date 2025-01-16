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

    .contain {
        padding: 20px;
        border-radius: 20px;
        background-color: white;
        max-height: 600px;
        max-width: 500px;
        width: 90%;
        animation: fade 0.3s;
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
    .order-stat {
        display: flex;
        justify-content: right;
        align-items: center;
        margin-bottom: 20px;
        font-size: 13px;
    }
    .order-pen {
        border: 1px solid green;
        max-width: 120px;
        font-size: 12px;
        text-align: center;
        padding: 10px;
        border-radius: 50px;
        color: white;
        background-color: green;
        cursor: pointer;
    }
    .order-pen2 {
        color: darkorange;
        font-weight: bold;
    }
    .order-con {
        max-width: 120px;
        font-size: 12px;
        text-align: center;
        padding: 10px;
        border-radius: 50px;
        color: green;
        background-color: white;
        font-weight: bold;
        cursor: not-allowed;
    }
    .confirmation {
        display: flex;
        align-items: center;
    }
`;
const Orderdetails = ({ order, show_order_details }) => {
    const [loading, setLoading] = useState(false);

    const confirm_order = async (id) => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_APP_ORDERS}confirm_order/`,
                {
                    user_type: 'dealer',
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
                setLoading(false);
            }
        } catch {
            // console.log("error")
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
                    Name: {order.first_name} {order.last_name}
                </p>
                <br />
                <p className="phonenumber">Phonenumber: {order.phonenumber}</p>
                <br />
                <p className="phonenumber">Address: {order.address}</p>
                <br />
                <p className="phonenumber">
                    Order date/time: {ConvertTime(order.created_at)}
                </p>
                <div className="order-stat">
                    <p>Dealer: &nbsp;</p>
                    {order.dealer_confirmed === false ? (
                        loading ? (
                            <div className="order-pen">Confirming...</div>
                        ) : (
                            <div
                                className="order-pen"
                                onClick={() => confirm_order(order.id)}
                            >
                                Confirm order
                            </div>
                        )
                    ) : (
                        <div className="order-con">Confirmed</div>
                    )}
                </div>
                <div className="order-stat">
                    {order.dealer_confirmed === true && (
                        <div className="confirmation">
                            <p>Buyer: &nbsp;</p>
                            {order.user_confirmed === false ? (
                                <div className="order-pen2">
                                    Pending confirmation
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
