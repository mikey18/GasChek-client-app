import styled from 'styled-components';

const DIV = styled.div`
    overflow-y: auto;
    max-height: 100%;
    border-radius: 20px;
    padding-bottom: 200px;

    ::-webkit-scrollbar {
        display: block;
        width: 10px;
    }
    ::-webkit-scrollbar-track {
        background-color: white;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #b1b1b1;
        border-radius: 100px;
        border: 2px solid transparent;
        background-clip: content-box;
        transition: 7s;
    }
    ::-webkit-scrollbar-thumb:hover {
        background-color: #5e5e5e;
        border: 1px solid transparent;
        background-clip: content-box;
        cursor: pointer;
    }
`;

const Scroller = ({ children }) => {
    return <DIV>{children}</DIV>;
};

export default Scroller;
