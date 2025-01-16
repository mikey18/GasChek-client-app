import styled from 'styled-components';

const LOADINGDIV = styled.div`
    margin: auto;
    text-align: center;
    display: flex;
    justify-content: center;
    margin-top: 14rem;
    animation: appear 0.3s;

    .spin {
        border-top: 2px solid darkorange;
        border-right: 2px solid darkorange;
        border-bottom: 2px solid #faeafa;
        border-radius: 100px;
        width: 23px;
        height: 23px;
        animation: spin 0.4s linear infinite;
    }
    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }
    /* @keyframes color-change{ 
        0%{
            border-top: 2px solid darkorange;
            border-right: 2px solid darkorange;
            border-bottom: 2px solid #faeafa;
        }
        50%{
            border-top: 2px solid green;
            border-right: 2px solid green;
            border-bottom: 2px solid #faeafa;
        }
        100%{
            border-top: 2px solid purple;
            border-right: 2px solid purple;
            border-bottom: 2px solid #faeafa;
        }
    } */
`;
const Loading = () => {
    return (
        <LOADINGDIV>
            <div className="spin" />
        </LOADINGDIV>
    );
};
export default Loading;
