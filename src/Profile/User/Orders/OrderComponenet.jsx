import styled from 'styled-components';
import { useState } from 'react';
import Orderdetails from './Orderdetails';

const DIV = styled.div`
    animation: appear 0.2s;
    margin-top: 20px;

    .card {
        margin: auto;
        max-width: 500px;
        width: 90%;
        box-shadow: 0px 3px 5px 5px #ececec;
        border: 1px solid transparent;
        padding: 20px;
        border-radius: 15px;
        cursor: pointer;
        transition: 0.3s;
        display: flex;
        justify-content: space-between;
        background-color: white;
    }
    .order-status {
        text-align: right;
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        max-width: 400px;
        width: 90%;
        padding: 0px 10px 0px 10px;
        margin: auto;
        margin-bottom: 5px;
    }
    .order-pending {
        color: darkorange;
    }
    .order-confirmed {
        color: green;
    }
    .confirmation {
        display: flex;
    }
`;
const Ordercomponent = ({ order, refresh }) => {
    const [showOrder, setshowOrder] = useState(false);

    const show_order_details = () => {
        setshowOrder(!showOrder);
    };

    return (
        <DIV>
            <div className="order-status">
                <div className="confirmation">
                    <p>Dealer: &nbsp;</p>
                    {order.dealer_confirmed === false ? (
                        <p className="order-pending">Pending order</p>
                    ) : (
                        <p className="order-confirmed">Confirmed</p>
                    )}
                </div>
                {order.dealer_confirmed === true ? (
                    <div className="confirmation">
                        <p>Buyer: &nbsp;</p>
                        {order.user_confirmed === false ? (
                            <p className="order-pending">
                                Pending confirmation
                            </p>
                        ) : (
                            <p className="order-confirmed">Confirmed</p>
                        )}
                    </div>
                ) : (
                    <div className="confirmation" />
                )}
            </div>
            <div className="card" onClick={show_order_details}>
                <p>{order.company_name}</p>
                <p>{order.cylinder}kg</p>
                <p>₦{Number(order.price).toLocaleString()}</p>
            </div>
            {showOrder && (
                <Orderdetails
                    order={order}
                    show_order_details={show_order_details}
                    refresh={refresh}
                />
            )}
        </DIV>
    );
};

export default Ordercomponent;
