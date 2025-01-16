import styled from 'styled-components';
import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import BackBlur from './BackBlur';
import Component from './Component';
import { HiDotsHorizontal } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { MdModeEdit } from 'react-icons/md';
import { GiGasStove } from 'react-icons/gi';
import { TiThList } from 'react-icons/ti';
import { FaHistory } from 'react-icons/fa';
import { FaPowerOff } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import EditProfile from '../../EditProfile';
import Leakages from '../../Leakages';
import Orders from '../../../Orders/Orders';
import ButtonLoading from '../../../../../components/ButtonLoading';
import { AuthContext } from '../../../../../Contexts/AuthenticationContext';
import { AppContext } from '../../../../../Contexts/ApplicationContext';
import Connector from '../Connector';
import { FaPencil } from 'react-icons/fa6';
import DeviceDetails from '../../DeviceManager/DeviceDetails';

const DIV = styled.div`
    z-index: 2;
    position: absolute;
    display: grid;
    gap: 30px;
    width: 100%;

    .round {
        background-color: white;
        box-shadow: 0px 2px 10px 2px #d8d8ff;
        border-radius: 50px;
        width: 40px;
        height: 40px;
        cursor: pointer;
        position: relative;
    }
    .icon {
        width: 26px;
        height: 26px;
        transition: 0.2s;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        animation: clock 0.3s;
    }
    @keyframes clock {
        from {
            transform: rotate(60deg);
        }
        to {
            transform: rotate(0deg);
        }
    }
    .no-shadow {
        box-shadow: none;
    }
    .options {
        display: grid;
        gap: 15px;
        animation: fly-in 0.2s;
    }
    @keyframes fly-in {
        from {
            transform: translateX(-15px);
        }
        to {
            transform: translateX(0);
        }
    }
    .top-panel {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .right {
        display: flex;
        gap: 20px;
        align-items: center;
    }
    .change {
        font-size: 15px;
        box-shadow: 0px 2px 5px 1px #d8d8ff;
        background-color: white;
        width: 35px;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        border-radius: 50px;
        cursor: pointer;
    }
`;

const Nav = ({
    user_loaded,
    setDevice_Modal,
    connect_bluetooth,
    cylinder_change,
}) => {
    const navigate = useNavigate();
    const [showDrop, setShowDrop] = useState(false);
    const modalRef = useRef();
    const [edit_profile, setEdit_profile] = useState(false);
    const [orders, setOrders] = useState(false);
    const [leakages, setLeakages] = useState(false);
    const { logout } = useContext(AuthContext);
    const { mode, connected, connecting_indicator } = useContext(AppContext);
    const [device_details, setdevice_details] = useState(false);

    const onClick = useCallback(() => {
        setShowDrop(!showDrop);
    }, [showDrop]);

    useEffect(() => {
        const click = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClick();
            }
        };

        if (sessionStorage.getItem('drop')) {
            onClick();
            sessionStorage.removeItem('drop');
        }

        document.addEventListener('mousedown', click);
        return () => {
            document.removeEventListener('mousedown', click);
        };
    }, [onClick]);

    const go_to_gasdealers = () => {
        sessionStorage.setItem('drop', 1);
        navigate('/gasdealers');
    };
    const showOrders = () => {
        setOrders(!orders);
        onClick();
    };
    const showLeakages = () => {
        setLeakages(!leakages);
        onClick();
    };
    const editProfile = () => {
        setEdit_profile(!edit_profile);
        onClick();
    };

    const change = () => {
        setdevice_details((prev) => !prev);
    };
    return (
        <>
            <DIV>
                <div className="top-panel">
                    <div
                        className={showDrop ? 'round no-shadow' : 'round'}
                        onClick={onClick}
                    >
                        {showDrop ? (
                            <IoClose className="icon a" />
                        ) : (
                            <HiDotsHorizontal className="icon" />
                        )}
                    </div>

                    {!connecting_indicator && (
                        <div className="right">
                            {connected && (
                                <div className="change" onClick={change}>
                                    <FaPencil />
                                </div>
                            )}
                            <div className="out">
                                <Connector
                                    setDevice_Modal={setDevice_Modal}
                                    connect_bluetooth={connect_bluetooth}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {showDrop && (
                    <div className="options" ref={modalRef}>
                        <Component
                            text={
                                user_loaded ? (
                                    'Edit profile'
                                ) : (
                                    <ButtonLoading color={'black'} />
                                )
                            }
                            icon={<MdModeEdit />}
                            onClick={user_loaded ? editProfile : null}
                        />
                        <Component
                            text={'Order gas'}
                            icon={<GiGasStove />}
                            onClick={go_to_gasdealers}
                        />
                        <Component
                            text={'Order history'}
                            icon={<TiThList />}
                            onClick={showOrders}
                        />
                        {mode === 'network' && connected && (
                            <Component
                                text={'Leakage history'}
                                icon={<FaHistory />}
                                onClick={showLeakages}
                            />
                        )}
                        <Component
                            text={'Log out'}
                            icon={<FaPowerOff />}
                            onClick={logout}
                        />
                    </div>
                )}
            </DIV>
            {edit_profile && <EditProfile close={editProfile} />}
            {leakages && <Leakages close={showLeakages} />}
            {orders && <Orders close={showOrders} />}
            {showDrop && <BackBlur />}
            {device_details && connected && (
                <DeviceDetails
                    close={change}
                    cylinder_change={cylinder_change}
                />
            )}
        </>
    );
};

export default Nav;
