import styled from 'styled-components';

const DIV = styled.div`
    .battery-container {
        display: flex;
        align-items: center;

        p {
            color: black;
        }
    }
    .main-battery {
        display: flex;
        align-items: center;
    }
    .battery {
        height: 50px;
        width: 90px;
        border-radius: 14px;
        background-color: #fefeff;
        box-shadow: 0px 1px 15px 2px #b8bef2;
        overflow: hidden;
    }
    .battery-head {
        background-color: grey;
        width: 4px;
        height: 20px;
        border-radius: 10px;
    }
    .indicator {
        height: 100%;
        transition: 0.5s;
        border-radius: 14px;
    }
`;

const Battery = ({ cylinderdata, battery_color }) => {
    return (
        <DIV>
            <div className="battery-container">
                <div className="main-battery-with-label">
                    <p
                        style={{
                            textAlign: 'center',
                            fontSize: '14px',
                            marginBottom: '5px',
                        }}
                    >
                        Battery
                    </p>
                    <div className="main-battery">
                        <div className="battery">
                            <div
                                className="indicator"
                                style={{
                                    width: `${cylinderdata.battery_level}%`,
                                    background: battery_color,
                                }}
                            />
                        </div>
                        <div className="battery-head" />
                    </div>
                </div>
            </div>
        </DIV>
    );
};

export default Battery;
