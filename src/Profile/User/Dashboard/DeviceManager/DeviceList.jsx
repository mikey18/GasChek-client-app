import { useState } from 'react';
import styled from 'styled-components';

const DIV = styled.div`
    border: 1px solid black;

    .device {
        border: 1px solid black;
        padding: 20px;
        display: flex;
    }
`;

const DeviceList = () => {
    const [devices, setDevices] = useState([
        {
            id: 1,
            device_id: 'Gasshhhdh',
            password: '00000000',
        },
    ]);
    return (
        <DIV>
            {devices.map((device) => {
                <div className="device"></div>;
            })}
        </DIV>
    );
};

export default DeviceList;
