import styled from 'styled-components';
import { useState, useContext } from 'react';
import Data from '../../../data/data';
import ButtonLoading from '../../../components/ButtonLoading';
import { AppContext } from '../../../Contexts/ApplicationContext';
import { decrypt } from '../../../functions/encryption';
import Modal from '../../../components/Containers/Modal/Modal';
import Scroller from '../../../components/Scroller';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { GLOBALCONTEXT } from '../../../Contexts/GlobalContext';

const DIV = styled.div`
    .head {
        text-align: center;
        font-size: 16px;
        color: gray;
        margin-bottom: 20px;
    }
    .error {
        color: red;
        border: 1px solid red;
        text-align: center;
        padding: 10px;
        font-size: 14px;
        border-radius: 5px;
    }
`;

const EditProfile = ({ close }) => {
    const axiosPrivate = useAxiosPrivate();
    const { access_token } = useContext(GLOBALCONTEXT);
    const { setUser_State, userData, setuserData } = useContext(AppContext);
    const [saveloading, setSaveloading] = useState(false);
    const [error, setError] = useState(null);
    const { states, country_codes } = Data;

    const containsSpecialChars = (input) => {
        const specialChars = /[a-zA-Z!@#$%^&*()+_\-=\]{};':"\\|,.<>/?]/;
        return specialChars.test(input);
    };

    const save = async (e) => {
        try {
            e.preventDefault();
            setSaveloading(true);
            setError(null);

            var phonenumber = e.target.phonenumber.value;
            // var phonenumber_gaschek_device_1 = e.target.phonenumber_gaschek_device_1.value
            // var phonenumber_gaschek_device_2 = e.target.phonenumber_gaschek_device_2.value
            // var phonenumber_gaschek_device_3 = e.target.phonenumber_gaschek_device_3.value

            if (
                e.target.email.value.length > 40 ||
                e.target.first_name.value.length > 40 ||
                e.target.last_name.value.length > 40 ||
                e.target.state.value.length > 40
            ) {
                setError('Fields must not be more than 40 characters.');
                setSaveloading(false);
            } else if (
                containsSpecialChars(e.target.phonenumber.value)

                // || containsSpecialChars(e.target.phonenumber_gaschek_device_1.value)
                //     || containsSpecialChars(e.target.phonenumber_gaschek_device_2.value)
                //     || containsSpecialChars(e.target.phonenumber_gaschek_device_3.value)
            ) {
                setError('Cannot include special characters and letters.');
                setSaveloading(false);
            } else if (e.target.address.value.length > 100) {
                setError('Addresss must not be more than 100 characters.');
                setSaveloading(false);
            } else {
                if (phonenumber[0] === '0') {
                    phonenumber = phonenumber.slice(1);
                }
                // if (phonenumber_gaschek_device_1[0] === "0") {
                //     phonenumber_gaschek_device_1 = phonenumber_gaschek_device_1.slice(1)
                // }
                // if (phonenumber_gaschek_device_2[0] === "0") {
                //     phonenumber_gaschek_device_2 = phonenumber_gaschek_device_2.slice(1)
                // }
                // if (phonenumber_gaschek_device_3[0] === "0") {
                //     phonenumber_gaschek_device_3 = phonenumber_gaschek_device_3.slice(1)
                // }
                try {
                    const response = await axiosPrivate.post(
                        `${import.meta.env.VITE_APP_ACCOUNTS}update_user/`,
                        {
                            first_name: e.target.first_name.value,
                            last_name: e.target.last_name.value,
                            country_code: e.target.country_code.value,
                            phonenumber: phonenumber,
                            // "phonenumber_gaschek_device_1": phonenumber_gaschek_device_1,
                            // "phonenumber_gaschek_device_2": phonenumber_gaschek_device_2,
                            // "phonenumber_gaschek_device_3": phonenumber_gaschek_device_3,
                            address: e.target.address.value,
                            state: e.target.state.value,
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: access_token.current,
                            },
                        },
                    );
                    if (response.status === 200) {
                        const decrypted_response = JSON.parse(
                            decrypt(response.data),
                        );
                        setUser_State(decrypted_response.data.state);
                        setuserData(decrypted_response.data);
                        setSaveloading(false);
                        close();
                    }
                } catch (error) {
                    if (error.response.status === 400) {
                        setError(error.response.message);
                        setSaveloading(false);
                    }
                }
            }
        } catch (error) {
            // console.log(error)
        }
    };

    return (
        <Modal maxheight={'780px'} maxWidth={'380px'} run_function={close}>
            <DIV>
                <div className="head">Edit Profile</div>
            </DIV>
            <Scroller>
                <DIV>
                    <form onSubmit={save}>
                        <label>Email</label>
                        <input
                            className="form-input"
                            type="email"
                            name="email"
                            defaultValue={userData.email}
                            placeholder="Must be a valid email address"
                            disabled
                        />

                        <label>Firstname</label>
                        <input
                            className="form-input"
                            type="text"
                            name="first_name"
                            defaultValue={userData.first_name}
                            required
                        />

                        <label>Lastname</label>
                        <input
                            className="form-input"
                            type="text"
                            name="last_name"
                            defaultValue={userData.last_name}
                            required
                        />

                        <label>Country code</label>
                        <select
                            className="form-input"
                            name="country_code"
                            required
                            defaultValue={
                                userData.country_code === ''
                                    ? '+234'
                                    : userData.country_code
                            }
                        >
                            {country_codes.map((mapped_state, id) => (
                                <option key={id + 1} value={mapped_state.code}>
                                    {mapped_state.code} {mapped_state.name}
                                </option>
                            ))}
                        </select>

                        <label>Phone number</label>
                        <input
                            className="form-input"
                            minLength="11"
                            type="number"
                            name="phonenumber"
                            defaultValue={userData.phonenumber}
                            placeholder="required"
                            required
                        />

                        <label>Address</label>
                        <textarea
                            className="text-area"
                            type="text"
                            name="address"
                            defaultValue={userData.address}
                            placeholder="Your cylinder will be picked up and delivered to this location"
                            required
                        />
                        <br />
                        <br />

                        <label>State</label>
                        <select
                            className="form-input"
                            name="state"
                            defaultValue={userData.state}
                            required
                        >
                            {states.map((mapped_state) => (
                                <option
                                    defaultValue={
                                        userData.state === mapped_state.state
                                            ? 'selected'
                                            : null
                                    }
                                    key={mapped_state.id}
                                >
                                    {mapped_state.state}
                                </option>
                            ))}
                        </select>

                        {error && <div className="error">{error}</div>}
                        <div className="form-button-div">
                            {saveloading === false ? (
                                <button type="submit" className="form-button">
                                    Save
                                </button>
                            ) : (
                                <button className="form-button" disabled>
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

export default EditProfile;
