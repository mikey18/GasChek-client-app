import styled from 'styled-components';

const DIV = styled.div`
    margin: auto;
    max-width: 500px;
    padding-top: 2%;

    .error {
        text-align: center;
        margin-top: 150px;
        font-weight: 500;
    }
    .button-container {
        margin-top: 30px;
        display: flex;
        justify-content: center;
    }
    .retry {
        color: white;
        border: 1px solid darkorange;
        background-color: darkorange;
        border-radius: 50px;
        padding: 10px;
        width: 70px;
        font-size: 15px;
        position: relative;
        cursor: pointer;
        transition: 0.2s;
    }
    .retry:hover {
        background-color: white;
        color: orange;
    }
`;

const Error = () => {
    return (
        <DIV>
            <p className="error">Something went wrong</p>
            <div className="button-container">
                <button
                    className="retry"
                    onClick={() => window.location.reload()}
                >
                    Retry
                </button>
            </div>
        </DIV>
    );
};

export default Error;
