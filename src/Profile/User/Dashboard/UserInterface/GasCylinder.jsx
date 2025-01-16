import styled from 'styled-components';
import { gasimages } from '../../../../images/gasimages';

const DIV = styled.div`
    .gas-error {
        color: grey;
        width: 100px;
    }
    img {
        animation: 0.5s appear;
    }
`;

const GasCylinder = ({ cylinderdata }) => {
    const gasLevels = [
        { min: 0, max: 9, image: gasimages.zero },
        { min: 10, max: 19, image: gasimages.ten },
        { min: 20, max: 29, image: gasimages.twenty },
        { min: 30, max: 39, image: gasimages.thirty },
        { min: 40, max: 49, image: gasimages.fourty },
        { min: 50, max: 59, image: gasimages.fifty },
        { min: 60, max: 69, image: gasimages.sixty },
        { min: 70, max: 79, image: gasimages.seventy },
        { min: 80, max: 89, image: gasimages.eighty },
        { min: 90, max: 99, image: gasimages.ninety },
        { min: 100, max: 100, image: gasimages.hundred },
    ];

    const gasLevelImage = gasLevels.find(
        ({ min, max }) =>
            cylinderdata.gas_level >= min && cylinderdata.gas_level <= max,
    );
    return (
        <DIV>
            {gasLevelImage ? (
                <img src={gasLevelImage.image} alt="gas" width="160px" />
            ) : (
                cylinderdata.gas_level > 100 && (
                    <p className="gas-error">
                        This mass is not allocated for this cylinder. Please
                        calibrate your device.
                    </p>
                )
            )}
        </DIV>
    );
};

export default GasCylinder;
