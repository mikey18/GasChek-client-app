import styled from 'styled-components';
import Modal from '../../../../components/Containers/Modal/Modal';
import Devicelogin from './Devicelogin';
// import DeviceList from "./DeviceList";

const DIV = styled.div``;

const DeviceManager = ({ setDevice_Modal }) => {
    const close = () => {
        setDevice_Modal(false);
    };
    return (
        <Modal maxheight={'500px'} maxWidth={'390px'} run_function={close}>
            <DIV>
                <Devicelogin close={close} />
                {/* <DeviceList /> */}
            </DIV>
        </Modal>
    );
};

export default DeviceManager;
