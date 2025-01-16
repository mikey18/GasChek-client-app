import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const DeviceError = () => {
    return (
        <DIV>
            <p className="error">Device Error</p>
            <div className="button-container">
                <div>
                    <Link className="retry" to="/profile">
                        Retry
                    </Link>
                </div>
            </div>
        </DIV>
    );
};

export default DeviceError;
