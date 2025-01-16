import styled from 'styled-components';

const DIV = styled.div`
    position: fixed;
    top: 80px;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    backdrop-filter: blur(0px);
`;

const Blocker = () => {
    return <DIV></DIV>;
};

export default Blocker;
