import styled from 'styled-components';

const LOADINGDIV = styled.div`
    margin: auto;
    text-align: center;
    display: flex;
    justify-content: right;
    position: absolute;
    width: 87%;
    top: 0;
    margin-top: 20px;

    .spin {
        border-top: 3px solid green;
        border-right: 3px solid green;
        border-bottom: 3px solid #faeafa;
        border-radius: 100px;
        width: 15px;
        height: 15px;
        animation: spin 0.3s linear infinite;
    }
    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }
`;
const ToggleLoading = () => {
    return (
        <LOADINGDIV>
            <div className="spin" />
        </LOADINGDIV>
    );
};

export default ToggleLoading;
