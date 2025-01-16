import styled from 'styled-components';

const LOADINGDIV = styled.div`
    margin: auto;
    text-align: center;
    display: flex;
    justify-content: center;
    animation: appear 0.1s;

    .spin {
        border-left: 3px solid
            ${(props) => (props.color === undefined ? 'white' : props.color)};
        border-top: 3px solid
            ${(props) => (props.color === undefined ? 'white' : props.color)};
        border-right: 3px solid transparent;
        border-bottom: 3px solid transparent;
        border-radius: 100px;
        width: 15px;
        height: 15px;
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

const ButtonLoading = ({ color }) => {
    return (
        <LOADINGDIV color={color}>
            <div className="spin" />
        </LOADINGDIV>
    );
};

export default ButtonLoading;
