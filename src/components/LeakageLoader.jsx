import styled from 'styled-components';

const DIV = styled.div`
    .pad {
        background-color: #f9f9f9;
        height: 20px;
        border-radius: 20px;
        width: 80%;
        max-width: 480px;
        margin: auto;
        margin-top: 35px;
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

const LeakageLoader = () => {
    return (
        <DIV>
            {[...Array(8)].map((e, i) => (
                <div className="pad" key={i} />
            ))}
        </DIV>
    );
};

export default LeakageLoader;
