import styled from 'styled-components';

const LOADINGDIV = styled.div`
    margin: auto;
    text-align: center;
    display: flex;
    justify-content: center;
    animation: appear 0.3s;

    .spin {
        border-width: 1px;
        border-style: solid;
        border-right-color: transparent;
        border-bottom-color: transparent;
        border-radius: 100px;
        width: 10px;
        height: 10px;
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

const LoadMore = ({ color }) => {
    return (
        <LOADINGDIV>
            <div
                className="spin"
                style={{
                    borderLeftColor: color,
                    borderTopColor: color,
                }}
            />
        </LOADINGDIV>
    );
};

export default LoadMore;
