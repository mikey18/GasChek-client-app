import styled from 'styled-components';
import Bounce from '../../../../components/Bounce';

const DIV = styled.div`
    .swiitch {
        display: flex;
        align-items: center;
        width: 45px;
        height: 26.5px;
        background-color: #ccc;
        transition: 0.2s;
        border-radius: 34px;
        box-shadow: 0px 2px 5px 0px #d8d8ff;
        cursor: pointer;
        position: relative;
    }
    .oon {
        background-color: darkorange;
    }
    .circlee {
        width: 16px;
        height: 16px;
        border-radius: 50px;
        background-color: white;
        transition: 0.09s;
    }
    .coff {
        transform: translateX(4px);
    }
    .con {
        transform: translateX(25px);
    }
`;

const Switches = ({ click, value }) => {
    return (
        <Bounce>
            <DIV>
                <div
                    className={value === 'off' ? 'swiitch' : 'swiitch oon'}
                    onClick={click}
                >
                    <div
                        className={
                            value === 'off' ? 'circlee coff' : 'circlee con'
                        }
                    />
                </div>
            </DIV>
        </Bounce>
    );
};

export default Switches;
