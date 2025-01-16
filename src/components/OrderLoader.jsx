import styled from 'styled-components';

const DIV = styled.div`
    margin-top: 68px;

    .pad {
        background-color: #f4f4f4;
        height: 65px;
        border-radius: 15px;
        width: 90%;
        max-width: 490px;
        margin: auto;
        margin-top: 32px;
        animation: load 0.3s alternate infinite;
    }
    @keyframes load {
        0% {
            background-color: #f9f9f9;
        }
        100% {
            background-color: #f0f0f0;
        }
    }
`;

const OrderLoader = () => {
    return (
        <DIV>
            {[...Array(10)].map((e, i) => (
                <div className="pad" key={i} />
            ))}
        </DIV>
    );
};

export default OrderLoader;
