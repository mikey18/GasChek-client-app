import styled from 'styled-components';
import Bounce from '../../../../components/Bounce';
import { useContext } from 'react';
import { MdBluetooth } from 'react-icons/md';
// import { MdBluetoothConnected } from "react-icons/md";
import { FaWifi } from 'react-icons/fa6';
import { AppContext } from '../../../../Contexts/ApplicationContext';

const DIV = styled.div`
    .main {
        display: flex;
        align-items: center;
        gap: 20px;
        position: relative;
        height: 35px;
    }
    .swiitch {
        display: flex;
        align-items: center;
        width: 45px;
        height: 26.5px;
        background-color: blue;
        transition: 0.2s;
        border-radius: 34px;
        box-shadow: 0px 2px 5px 0px #d8d8ff;
        cursor: pointer;
        position: relative;
    }
    .oon {
        background-color: green;
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
    .icon {
        width: 25px;
        height: 25px;
    }
`;

const SwitchMode = () => {
    const {
        mode,
        setMode,
        setConnected,
        switch_to_bluetooth,
        connecting_indicator,
    } = useContext(AppContext);

    const click = () => {
        if (connecting_indicator === false) {
            if (mode === 'bluetooth') {
                setMode('network');
            } else {
                switch_to_bluetooth();
            }
            setConnected(false);
        }
    };

    return (
        <DIV>
            <div className="main">
                <MdBluetooth className="icon" />
                <Bounce>
                    <div
                        className={
                            mode === 'bluetooth' ? 'swiitch' : 'swiitch oon'
                        }
                        onClick={click}
                    >
                        <div
                            className={
                                mode === 'bluetooth'
                                    ? 'circlee coff'
                                    : 'circlee con'
                            }
                        />
                    </div>
                </Bounce>
                <FaWifi className="icon" />
            </div>
        </DIV>
    );
};

export default SwitchMode;
