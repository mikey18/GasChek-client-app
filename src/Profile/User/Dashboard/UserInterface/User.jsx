import {
    useEffect,
    useContext,
    useState,
    useCallback,
    createContext,
} from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../../Contexts/ApplicationContext';
import GasCylinder from './GasCylinder';
import Battery from './Battery';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import ProgressBarBattery from './ProgressBarBattery';
import { encrypt, decrypt } from '../../../../functions/encryption';
import Nav from './Nav/Nav';
import { BluetoothSync, NetworkSync } from './Nav/Sync';
import DeviceManager from '../DeviceManager/DeviceManager';
import Loading from '../../../../components/Loading';
import { empty_cylider_data } from '../../../../Contexts/ApplicationContext';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { GLOBALCONTEXT } from '../../../../Contexts/GlobalContext';

const DIV = styled.div`
    background-color: white;

    .dashboard {
        margin: auto;
        max-width: 500px;
        width: 95%;
        padding-top: 30px;
        padding-bottom: 100px;
        position: relative;
        animation: appear 0.3s;
        transition: 1s;
    }
    .top-bar {
        position: relative;
        height: 33px;
    }
    .controls {
        transition: 1s;
        animation: fly-inn 0.5s;
    }
    .off {
        opacity: 0.5;
    }
    @keyframes fly-inn {
        from {
            transform: translateY(30px);
        }
        to {
            transform: translateY(0);
        }
    }

    .gas {
        margin: auto;
        display: flex;
        width: 80%;
        max-width: 1000px;
        justify-content: space-around;
        margin-top: 80px;
        align-items: center;
    }
    //control

    .progressbars {
        margin-top: 50px;
        display: flex;
        justify-content: space-around;

        p {
            margin-bottom: 10px;
        }
    }
    .p-bars {
        text-align: center;

        p {
            color: black;
        }
    }
`;

export const DashboardContext = createContext();

const User = () => {
    const { access_token } = useContext(GLOBALCONTEXT);
    const {
        setUser_State,
        setuserData,
        cylinderdata,
        setCylinderData,
        connected,
        setConnected,
        socket,
        allow_toggle,
        connecting_indicator,
        setCconnecting_indicator,
        mode,
        device_token,
        setDevice_token,
    } = useContext(AppContext);

    const axiosPrivate = useAxiosPrivate();
    const [toggleloading, setToggleLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user_loaded, setUserLoaded] = useState(false);
    const [device_modal, setDevice_Modal] = useState(false);
    //indicators
    const [battery_color, setBattery_color] = useState(null);
    const [gas_zero, setGasZero] = useState(null);
    const [gas_hundred, setGasHundred] = useState(null);
    const [battery_zero, setBatteryZero] = useState(null);
    const [battery_hundred, setBatteryHundred] = useState(null);
    //indicators

    //NETWORK
    const encode = useCallback((encrypted_data) => {
        const encoder = new TextEncoder();
        return encoder.encode(encrypted_data);
    }, []);

    //load user
    const load_user = useCallback(async () => {
        try {
            const response = await axiosPrivate.post(
                `${import.meta.env.VITE_APP_ACCOUNTS}get_user/`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: access_token.current,
                    },
                },
            );
            if (response.status === 200) {
                var decrypted_response = JSON.parse(
                    decrypt(response.data.data),
                );
                setUser_State(decrypted_response.state);
                setuserData(decrypted_response);
                setUserLoaded(true);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }, [setUser_State, setuserData, axiosPrivate, access_token]);
    //load user

    //gascheck websockets
    //real time cylinder data
    const get_realtime_cylinder_data = useCallback(async () => {
        setCconnecting_indicator(true);

        if (device_token === null) {
            return null;
        } else {
            if (socket.current !== null) {
                socket.current.close();
            }
            var gk_socket = new WebSocket(
                `${import.meta.env.VITE_APP_GASCHEK_DEVICE}gk/?${device_token}`,
            );

            gk_socket.onopen = async () => {
                gk_socket.send(
                    encode(
                        encrypt(
                            JSON.stringify({
                                action: 0,
                            }),
                        ),
                    ),
                );
                socket.current = gk_socket;
                setConnected(true);
                // setLoading(false)
            };
            gk_socket.onmessage = async (e) => {
                setCconnecting_indicator(false);
                const blob = e.data;
                const encrypted_data = await blob.text();
                var data = JSON.parse(decrypt(encrypted_data));
                if (data.msg === 400) {
                    gk_socket.close();
                } else {
                    setCylinderData(JSON.parse(decrypt(data.msg)));
                    allow_toggle.current = true;
                    setToggleLoading(false);
                }
            };
            gk_socket.onclose = async (e) => {
                if (e.code !== 1000 && e.wasClean === false) {
                    // socket.current = null;

                    // setTimeout(() => {
                    //     get_realtime_cylinder_data();
                    // }, [3000])
                    setDevice_token(null);
                    setCylinderData(empty_cylider_data);
                    setConnected(false);
                    setCconnecting_indicator(false);
                }
            };
            gk_socket.onerror = async () => {
                return null;
            };
            window.addEventListener('offline', () => {
                if (socket.current) {
                    socket.current.close();
                    setConnected(false);
                }
            });
        }
    }, [
        setDevice_token,
        device_token,
        setCylinderData,
        socket,
        allow_toggle,
        encode,
        setConnected,
        setCconnecting_indicator,
        setToggleLoading,
    ]);
    //gascheck websockets

    useEffect(() => {
        if (cylinderdata !== null) {
            if (cylinderdata.gas_level <= 15) {
                setGasZero('rgb(253, 44, 56)');
                setGasHundred('rgb(176, 2, 12)');
            }
            if (cylinderdata.gas_level > 15) {
                setGasZero('#C25AFF');
                setGasHundred('#2465FD');
            }
            if (cylinderdata.battery_level <= 15) {
                setBattery_color(
                    'linear-gradient(108.4deg, rgb(253, 44, 56) 3.3%, rgb(176, 2, 12) 98.4%)',
                );
                setBatteryZero('rgb(253, 44, 56)');
                setBatteryHundred('rgb(176, 2, 12)');
            }
            if (cylinderdata.battery_level > 15) {
                setBattery_color('#1f9c25');
                setBatteryZero('rgb(34, 126, 34)');
                setBatteryHundred('rgb(99, 162, 17)');
            }
        }
    }, [cylinderdata]);

    //toggle switches
    const toggle = (action, type) => {
        if (
            device_token !== null &&
            mode === 'network' &&
            allow_toggle.current === true
        ) {
            allow_toggle.current = false;

            if (type === 'cylinder_weight') {
                var data = JSON.stringify({
                    cylinder: action,
                });
            } else if (type === 'phonenumbers') {
                data = JSON.stringify({
                    numbers: action,
                });
            } else {
                setToggleLoading(true);
                data = JSON.stringify({
                    action: action,
                });
            }
            socket.current.send(encode(encrypt(data)));
            setTimeout(() => {
                allow_toggle.current = true;
            }, [500]);
        }
    };
    const alarm_network_switch = () => {
        toggle('a');
    };
    const call_network_switch = () => {
        toggle('c');
    };
    const text_network_switch = () => {
        toggle('t');
    };
    const indicator_network_switch = () => {
        toggle('i');
    };
    const cylinder_network_change = (data) => {
        toggle(data, 'cylinder_weight');
    };
    const phonenumber_network_change = (data) => {
        toggle(data, 'phonenumbers');
    };
    //toggle switches
    //NETWORK

    //BLUETOOTH
    const [characteristic, setCharacteristic] = useState(null);
    const handleBlueToothNotifications = useCallback((event) => {
        const value = event.target.value;
        const text = new TextDecoder().decode(value);
        // setCylinderData(text)
        console.log('Received value:', text);
    }, []);

    const connect_bluetooth = useCallback(async () => {
        console.log('switched to bluetooth');
        const device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            // filters: [
            //     { namePrefix: "GasChekG1" },
            //     { namePrefix: "GasChekG1 pro" },
            //     { namePrefix: "GasChekG1 prise" },
            //     { namePrefix: "M" }
            // ],
            // optionalServices: ["932c32bd-0000-47a2-835a-a8d455b859dd"],
        });

        const server = await device.gatt?.connect();
        const services = await server.getPrimaryServices();

        const character_istic = await services[0].getCharacteristics()[0];
        character_istic.addEventListener(
            'characteristicvaluechanged',
            handleBlueToothNotifications,
        );
        await character_istic.startNotifications();

        setCharacteristic(character_istic);
        setConnected(true);
    }, [setConnected, handleBlueToothNotifications]);

    const handleWriteDatatoBluetooth = async (data) => {
        try {
            if (!characteristic) {
                console.error('Characteristic is not available');
                return;
            }
            const encoder = new TextEncoder();
            const value = encoder.encode(data);
            await characteristic.writeValue(value);
        } catch (error) {
            console.error('Error writing data:', error);
        }
    };

    const manipulateProperties = async (action, type) => {
        const { alarm, call, text, indicator, cylinder } = cylinderdata;
        let manipulatedObject = {
            alarm,
            call,
            text,
            indicator,
            cylinder,
        };
        if (type === 'float') {
            manipulatedObject.cylinder = action;
        } else {
            switch (action) {
                case 'a':
                    manipulatedObject.alarm = alarm === 'on' ? 'off' : 'on';
                    break;
                case 'c':
                    manipulatedObject.call = call === 'on' ? 'off' : 'on';
                    break;
                case 't':
                    manipulatedObject.text = text === 'on' ? 'off' : 'on';
                    break;
                case 'i':
                    manipulatedObject.indicator =
                        indicator === 'on' ? 'off' : 'on';
                    break;
                default:
                    break;
            }
        }
        handleWriteDatatoBluetooth(manipulatedObject);
    };

    const alarm_bluetooth_switch = () => {
        manipulateProperties('a');
    };
    const call_bluetooth_switch = () => {
        manipulateProperties('c');
    };
    const text_bluetooth_switch = () => {
        manipulateProperties('t');
    };
    const indicator_bluetooth_switch = () => {
        manipulateProperties('i');
    };
    const cylinder_bluetooth_change = (data) => {
        manipulateProperties(data, 'float');
    };
    //BLUETOOTH

    useEffect(() => {
        const run = () => {
            allow_toggle.current = false;
        };
        if (user_loaded === false) {
            load_user();
        }
        if (
            user_loaded &&
            connected === false &&
            mode === 'bluetooth' &&
            connecting_indicator === false
        ) {
            run();
        }
        if (
            user_loaded &&
            connected === false &&
            mode === 'network' &&
            device_token !== null &&
            connecting_indicator === false
        ) {
            run();
            get_realtime_cylinder_data();
        }
    }, [
        user_loaded,
        connected,
        mode,
        device_token,
        allow_toggle,
        load_user,
        get_realtime_cylinder_data,
        connecting_indicator,
    ]);

    if (loading) {
        return <Loading />;
    }
    if (loading === false && cylinderdata !== null) {
        return (
            <DashboardContext.Provider
                value={{
                    phonenumber_network_change,
                }}
            >
                <DIV>
                    <div className="dashboard">
                        <div className="top-bar">
                            <Nav
                                user_loaded={user_loaded}
                                setDevice_Modal={setDevice_Modal}
                                connect_bluetooth={connect_bluetooth}
                                cylinder_change={
                                    mode === 'network'
                                        ? cylinder_network_change
                                        : cylinder_bluetooth_change
                                }
                            />
                            {mode === 'network' &&
                                device_token !== null &&
                                connecting_indicator && <NetworkSync />}
                            {mode === 'bluetooth' && connecting_indicator && (
                                <BluetoothSync />
                            )}
                        </div>

                        <div
                            className={
                                connecting_indicator === true
                                    ? 'controls off'
                                    : 'controls'
                            }
                        >
                            <div className="gas">
                                <GasCylinder cylinderdata={cylinderdata} />
                                <Battery
                                    cylinderdata={cylinderdata}
                                    battery_color={battery_color}
                                />
                            </div>

                            <Controls
                                cylinderdata={cylinderdata}
                                toggleloading={toggleloading}
                                alarm_switch={
                                    mode === 'network'
                                        ? alarm_network_switch
                                        : alarm_bluetooth_switch
                                }
                                call_switch={
                                    mode === 'network'
                                        ? call_network_switch
                                        : call_bluetooth_switch
                                }
                                text_switch={
                                    mode === 'network'
                                        ? text_network_switch
                                        : text_bluetooth_switch
                                }
                                indicator_switch={
                                    mode === 'network'
                                        ? indicator_network_switch
                                        : indicator_bluetooth_switch
                                }
                            />
                            <div className="progressbars">
                                <div className="p-bars">
                                    <p>Gas level</p>
                                    <ProgressBar
                                        percentage={cylinderdata.gas_level}
                                        zero={gas_zero}
                                        hundred={gas_hundred}
                                    />
                                </div>
                                <div className="p-bars">
                                    <p>Battery</p>
                                    <ProgressBarBattery
                                        percentage={cylinderdata.battery_level}
                                        zero={battery_zero}
                                        hundred={battery_hundred}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {device_modal && (
                        <DeviceManager setDevice_Modal={setDevice_Modal} />
                    )}
                </DIV>
            </DashboardContext.Provider>
        );
    }
};

export default User;
