import { useContext } from 'react';
import styled from 'styled-components';
import { MdBluetooth } from 'react-icons/md';
import { FaWifi } from 'react-icons/fa6';
import { AppContext } from '../../../../Contexts/ApplicationContext';

const DIV = styled.div`
    display: flex;
    background-color: white;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition: 0.2s;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
    box-shadow: 0px 2px 10px 2px #d8d8ff;
    padding: 10px;

    p {
        color: black;
        pointer-events: none;
        font-weight: bold;
    }
    :hover {
        filter: brightness(90%);
        box-shadow: none;
    }
    .content {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }
    .iconn {
        width: 16px;
        height: 16px;
    }
`;

const Connector = ({ setDevice_Modal, connect_bluetooth }) => {
    const { mode, connected, disconnect_network } = useContext(AppContext);

    const show_load = () => {
        setDevice_Modal(true);
    };

    const disconnect_bluetooth = () => {};
    return (
        <DIV
            onClick={
                mode === 'bluetooth'
                    ? connected
                        ? disconnect_bluetooth
                        : connect_bluetooth
                    : connected
                      ? disconnect_network
                      : show_load
            }
        >
            <div className="content">
                {mode === 'bluetooth' ? (
                    <MdBluetooth className="iconn" />
                ) : (
                    <FaWifi className="iconn" />
                )}
                {connected ? <p>Disconnect</p> : <p>Connect</p>}
            </div>
        </DIV>
    );
};

export default Connector;
