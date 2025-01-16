import styled from 'styled-components';
import Switches from './Switches';
import SwitchMode from './SwitchMode';
import { useState, useEffect } from 'react';
import { calculateTimeAgo } from '../../../../components/Timeago';
import ToggleLoading from '../../../../components/ToggleLoading';

const DIV = styled.div`
    .values {
        margin: auto;
        max-width: 400px;
        text-align: center;
        margin-top: 50px;
        box-shadow: 0px 9px 20px 2px #d8d8ff;
        border-radius: 45px;
        padding: 40px 25px 40px 25px;
        width: 87%;
        margin-bottom: 25px;
        position: relative;
        display: grid;
        gap: 19px;
    }
    .values p {
        font-size: 15px;
        padding: 5px;
        letter-spacing: -0.5px;
        color: black;
    }

    .container {
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        display: flex;
        width: 100%;
    }
    .add-gap {
        gap: 10px;
    }
    .key {
        margin-right: 3%;
    }
`;

const Controls = ({
    cylinderdata,
    toggleloading,
    alarm_switch,
    call_switch,
    text_switch,
    indicator_switch,
}) => {
    const [timeAgo, setTimeAgo] = useState('');

    useEffect(() => {
        setTimeAgo(calculateTimeAgo(cylinderdata.device_update_time));

        const intervalId = setInterval(() => {
            setTimeAgo(calculateTimeAgo(cylinderdata.device_update_time));
        }, 60000); // Update every minute

        return () => clearInterval(intervalId);
    }, [cylinderdata.device_update_time]);

    const data = [
        {
            id: 1,
            type: 'mode_switch',
        },
        {
            id: 2,
            label: 'Alarm',
            function: alarm_switch,
            value: cylinderdata.alarm,
        },
        {
            id: 3,
            label: 'Call',
            function: call_switch,
            value: cylinderdata.call,
        },
        {
            id: 4,
            label: 'Text',
            function: text_switch,
            value: cylinderdata.text,
        },
        {
            id: 5,
            label: 'Indicator',
            function: indicator_switch,
            value: cylinderdata.indicator,
        },
    ];

    return (
        <DIV>
            <div key={cylinderdata.id} className="values">
                {toggleloading && <ToggleLoading />}
                {data.map((dat) => (
                    <div className="container" key={dat.id}>
                        <p className="key">{dat.label} </p>
                        {dat.type === 'mode_switch' ? (
                            <SwitchMode />
                        ) : (
                            <Switches click={dat.function} value={dat.value} />
                        )}
                    </div>
                ))}
                <div className="container add-gap">
                    <p>Gas mass: {cylinderdata.gas_mass}kg</p>
                </div>
                <div className="container add-gap">
                    <p>Cylinder: {cylinderdata.cylinder}kg</p>
                </div>
                <div className="container add-gap">
                    <p>Device ID: {cylinderdata.device_id}</p>
                </div>
                <div className="container add-gap">
                    <p>
                        Updated:{' '}
                        {timeAgo === 'Just now' ? timeAgo : `${timeAgo} ago`}
                    </p>
                </div>
            </div>
        </DIV>
    );
};

export default Controls;
