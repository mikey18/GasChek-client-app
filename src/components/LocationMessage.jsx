import styled from 'styled-components';

const DIV = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;

    .message {
        background-color: white;
        width: 90%;
        max-width: 400px;
        padding: 50px 50px 30px 50px;
        border-radius: 20px;
        animation: 0.2s pop;
    }
    @keyframes pop {
        from {
            transform: scale(0.3);
        }
        to {
            transform: scale(1);
        }
    }
    .text {
        text-align: center;
        margin-bottom: 20px;
        font-size: 18px;
    }
    .ok {
        background-color: blue;
        color: white;
        border-radius: 30px;
        width: 100px;
        height: 50px;
        margin: auto;
        text-align: center;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
`;

const LocationMessage = ({ setNotification }) => {
    const ok = () => {
        setNotification(true);
    };

    return (
        <DIV>
            <div className="message">
                <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>
                    Hey
                </h2>
                <p className="text">
                    Make sure you are in your
                    <strong> Gas Station </strong>
                    with your device and your device
                    <strong> Location </strong>is turned on
                </p>
                <div className="ok" onClick={ok}>
                    Ok
                </div>
            </div>
        </DIV>
    );
};

export default LocationMessage;
