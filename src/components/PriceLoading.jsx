import styled from 'styled-components';

const LOADINGDIV = styled.div`
    margin: auto;
    text-align: center;
    display: flex;
    justify-content: center;
    animation: appear 0.3s;

    .spin {
        border: 3px solid blue;
        border-top: 3px solid blue;
        border-right: 3px solid transparent;
        border-bottom: 3px solid transparent;
        border-radius: 100px;
        width: 20px;
        height: 20px;
        animation:
            appear 0.3s,
            spi 0.4s linear infinite;
    }

    @keyframes spi {
        100% {
            transform: rotate(360deg);
        }
    }
    @keyframes appear {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;

const PriceLoading = () => {
    return (
        <LOADINGDIV>
            <div className="spin" />
        </LOADINGDIV>
    );
};

export default PriceLoading;
