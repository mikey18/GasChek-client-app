import Orderdetails from './Orderdetails';
import { useState } from 'react';
import styled from 'styled-components';

const DIV = styled.div`
    animation: appear 0.2s;

    .orders {
        box-shadow: 0px 1px 5px 1px lightgray;
        border-radius: 10px;
        display: flex;
        align-items: center;
        padding: 20px;
        justify-content: space-between;
        cursor: pointer;
        position: relative;
    }
    .orders-disabled {
        box-shadow: 0px 1px 5px 1px lightgray;
        border-radius: 10px;
        display: flex;
        align-items: center;
        padding: 20px;
        justify-content: space-between;
        opacity: 0.4;
        position: relative;
    }
    .name {
        font-size: 0.8rem;
    }
    .phonenumber {
        color: gray;
        font-size: 0.8rem;
    }
    .order-status {
        font-size: 10px;
        margin-top: 20px;
        text-align: right;
        padding-left: 10px;
        padding-right: 10px;
        display: flex;
        justify-content: space-between;
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

const Ordercomponents = ({ dealer_data, order }) => {
    const [showOrder, setshowOrder] = useState(false);

    const show_order_details = () => {
        setshowOrder(!showOrder);
    };
    return (
        <DIV>
            <div className="order-status">
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

                <div className="confirmation">
                    <p>Dealer: &nbsp;</p>
                    {order.dealer_confirmed === false ? (
                        <p className="order-pending">Pending order</p>
                    ) : (
                        <p className="order-confirmed">Confirmed</p>
                    )}
                </div>
            </div>
            <div
                className={
                    dealer_data.selling === true && dealer_data.open === true
                        ? 'orders'
                        : 'orders-disabled'
                }
                onClick={show_order_details}
            >
                <p className="name">
                    {order.first_name} {order.last_name}
                </p>
                <p className="phonenumber">{order.created_at}</p>
            </div>
            {showOrder && (
                <Orderdetails
                    order={order}
                    show_order_details={show_order_details}
                />
            )}
        </DIV>
    );
};

export default Ordercomponents;
