import styled from 'styled-components';

const DIV = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
    backdrop-filter: blur(10px);
    animation: 0.2s appear;

    @keyframes appear {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .drop {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        top: 200px;
        width: 200px;
        border: 10px solid red;
    }
`;

const BackBlur = () => {
    return <DIV />;
};

export default BackBlur;
