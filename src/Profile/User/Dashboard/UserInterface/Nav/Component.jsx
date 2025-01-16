import styled from 'styled-components';

const DIV = styled.div`
    background-color: white;
    border-radius: 30px;
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    transition: 0.2s;
    width: 120px;

    .icon {
        width: 10px;
        height: 10px;
    }
    .text {
        font-size: 12px;
        width: 100%;
        width: 80px;
    }

    &:hover {
        transform: scale(0.93);
    }
`;

const Component = ({ icon, text, onClick }) => {
    return (
        <DIV onClick={onClick}>
            {icon}
            <div className="text">{text}</div>
        </DIV>
    );
};

export default Component;
