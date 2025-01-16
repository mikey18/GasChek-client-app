import { useState } from 'react';
import styled from 'styled-components';
import DealerPopup from './DealerPopup';

const DIV = styled.div`
    animation: appear 0.2s;

    .card {
        margin: auto;
        max-width: 500px;
        width: 90%;
        margin-top: 30px;
        box-shadow: 0px 3px 5px 5px #ececec;
        border: 1px solid transparent;
        padding: 20px;
        border-radius: 10px;
        cursor: pointer;
        transition: 0.3s;
        display: flex;
        justify-content: space-between;
        background-color: white;
    }
    .company-name {
        font-family: 'Poppins', 'sans-serif';
    }
    .card:hover {
        border: 1px solid darkorange;
    }
`;

const GasDealersComponent = ({ dealer }) => {
    const [popup, setPopup] = useState(false);

    const open_popup = () => {
        setPopup(true);
    };

    return (
        <DIV>
            <div className="card" onClick={open_popup}>
                <p className="company-name">{dealer.company_name}</p>

                <div>
                    {dealer.open === true ? (
                        <p style={{ color: 'green' }}>Open</p>
                    ) : (
                        <p style={{ color: 'red' }}>Closed</p>
                    )}
                </div>
            </div>

            <DealerPopup popup={popup} setPopup={setPopup} id={dealer.id} />
        </DIV>
    );
};

export default GasDealersComponent;
