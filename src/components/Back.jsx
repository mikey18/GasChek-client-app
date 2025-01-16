import styled from 'styled-components';
import arrowleft from '../icons/arrow-left.png';
import { useNavigate } from 'react-router-dom';

const DIV = styled.div`
    margin: auto;
    max-width: 500px;
    width: 90%;

    .back {
        cursor: pointer;
        max-width: 35px;
    }
`;

const Back = () => {
    const navigate = useNavigate();
    const go_back = () => {
        navigate(-1);
    };
    return (
        <DIV>
            <div className="back" onClick={go_back}>
                <img src={arrowleft} alt="back" width="30px" />
            </div>
        </DIV>
    );
};

export default Back;
