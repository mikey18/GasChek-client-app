// import { IoSync } from "react-icons/io5";
import styled from 'styled-components';
import { MdBluetooth } from 'react-icons/md';
import { FaWifi } from 'react-icons/fa6';

const DIV = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    animation: up 0.2s;

    @keyframes up {
        0% {
            transform: translateY(10px);
        }
        100% {
            transform: translateY(1px);
        }
    }

    @keyframes rotate {
        0% {
            transform: scale(1);
        }
        30% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(1);
        }
    }
    .icon {
        font-size: 20px;
        animation: rotate 1s linear infinite;
    }
    .sync {
        font-weight: bold;
    }
`;

export const BluetoothSync = () => {
    return (
        <DIV>
            <MdBluetooth className="icon" />
            <p className="sync">Pairing</p>
        </DIV>
    );
};

export const NetworkSync = () => {
    return (
        <DIV>
            <FaWifi className="icon" />
            <p className="sync">Connecting</p>
        </DIV>
    );
};
