import styled from 'styled-components';

const DIV = styled.div`
    width: 100%;
    position: absolute;
    justify-content: right;
    display: flex;
    margin-top: 80px;

    .message {
        background-color: orange;
        padding: 8px;
        color: white;
        border-radius: 10px;
        max-width: 150px;
        text-align: center;
        font-size: 12px;
        font-weight: bold;
        backdrop-filter: blur(10px);
        margin-right: 30px;
        color: white;
        animation: 1.5s flash linear infinite;
    }

    @keyframes flash {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
`;

const LeakageError = ({ message }) => {
    return (
        <DIV>
            <div className="message">{message}</div>
        </DIV>
    );
};

export default LeakageError;
