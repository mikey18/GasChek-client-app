import styled from 'styled-components';
import Modal from '../../../../components/Containers/Modal/Modal';
import { useContext, useState } from 'react';
import { AppContext } from '../../../../Contexts/ApplicationContext';
import ButtonLoading from '../../../../components/ButtonLoading';
import { DashboardContext } from '../UserInterface/User';
import Scroller from '../../../../components/Scroller';
import Data from '../../../../data/data';

const DIV = styled.div`
    .head {
        font-size: 20px;
        font-weight: bold;
    }
    .two {
        margin-top: 50px;
        margin-bottom: 20px;
    }
    .con {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 45px;
        gap: 10px;
    }
    .in {
        width: 100%;
        padding: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius: 50px;
        border: 1px solid #e0dfdf;
        background-color: #fdfcfb;
        font-size: 25px;
    }
    .in::selection {
        background-color: wheat;
    }
    .in:focus {
        outline: none !important;
        border-color: darkorange;
    }
    .kg {
        font-size: 25px;
    }
`;

const DeviceDetails = ({ close, cylinder_change }) => {
    const { cylinderdata } = useContext(AppContext);
    const { phonenumber_network_change } = useContext(DashboardContext);
    const [loading, setLoading] = useState(false);
    const { country_codes } = Data;

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        cylinder_change(e.target.cylinder.value);
        close();
    };

    const phonenumber_submit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Extract phone number parts
        const phonenumber_one = e.target.phonenumber_one.value;
        const phonenumber_two = e.target.phonenumber_two.value;
        const phonenumber_three = e.target.phonenumber_three.value;

        // Remove leading '0' from each part if present
        const formatPhoneNumberPart = (part) =>
            part.startsWith('0') ? part.slice(1) : part;

        const formattedPhoneNumberOne = formatPhoneNumberPart(phonenumber_one);
        const formattedPhoneNumberTwo = formatPhoneNumberPart(phonenumber_two);
        const formattedPhoneNumberThree =
            formatPhoneNumberPart(phonenumber_three);

        // Extract country code
        const country_code = e.target.country_code.value;

        // Construct data object
        const data = {
            country_code,
            number_one: formattedPhoneNumberOne,
            number_two: formattedPhoneNumberTwo,
            number_three: formattedPhoneNumberThree,
        };
        phonenumber_network_change(data);
        close();
    };

    return (
        <Modal run_function={close} maxheight={'630px'} maxWidth={'350px'}>
            <Scroller>
                <DIV>
                    <form onSubmit={submit}>
                        <p className="head">Change Cylinder</p>
                        <div className="con">
                            <input
                                className="in"
                                type="number"
                                min="1"
                                name="cylinder"
                                defaultValue={cylinderdata.cylinder}
                                required
                                autoFocus
                                step="0.1"
                            />
                            <p className="kg">kg</p>
                        </div>
                        <div className="form-button-div">
                            {loading === false ? (
                                <button type="submit" className="form-button">
                                    Change
                                </button>
                            ) : (
                                <button disabled className="form-button">
                                    <ButtonLoading />
                                </button>
                            )}
                        </div>
                    </form>

                    <p className="head two">Phonenumbers</p>
                    <form onSubmit={phonenumber_submit}>
                        <label>Country code</label>
                        <select
                            className="form-input"
                            name="country_code"
                            required
                            defaultValue={
                                cylinderdata.country_code === ''
                                    ? '+234'
                                    : cylinderdata.country_code
                            }
                        >
                            {country_codes.map((mapped_state, id) => (
                                <option key={id + 1} value={mapped_state.code}>
                                    {mapped_state.code} {mapped_state.name}
                                </option>
                            ))}
                        </select>
                        <label>Phone number 1</label>
                        <input
                            className="form-input"
                            type="text"
                            maxLength="11"
                            name="phonenumber_one"
                            defaultValue={cylinderdata.phonenumber_one}
                        />

                        <label>Phone number 2</label>
                        <input
                            className="form-input"
                            type="text"
                            maxLength="11"
                            name="phonenumber_two"
                            defaultValue={cylinderdata.phonenumber_two}
                        />

                        <label>Phone number 3</label>
                        <input
                            className="form-input"
                            type="text"
                            maxLength="11"
                            name="phonenumber_three"
                            defaultValue={cylinderdata.phonenumber_three}
                        />

                        <div className="form-button-div">
                            {loading === false ? (
                                <button type="submit" className="form-button">
                                    Save
                                </button>
                            ) : (
                                <button disabled className="form-button">
                                    <ButtonLoading />
                                </button>
                            )}
                        </div>
                    </form>
                </DIV>
            </Scroller>
        </Modal>
    );
};

export default DeviceDetails;
