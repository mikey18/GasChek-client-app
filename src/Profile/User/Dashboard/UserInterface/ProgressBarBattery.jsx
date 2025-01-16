import { useEffect, useState } from 'react';
import styled from 'styled-components';

const DIV = styled.div`
    position: relative;
    width: 158px;
    height: 158px;

    .outer {
        height: 158px;
        width: 158px;
        border-radius: 50%;
        padding: 14px;
        box-shadow: 0px 5px 15px 0px #d8d8ff;
    }
    .inner {
        height: 128px;
        width: 128px;
        border-radius: 50%;
        box-shadow: inset 0px 4px 19px 2px #d8d8ff;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .number {
        font-weight: 600px;
        color: black;
    }
    circle {
        fill: none;
        stroke: url(#GradientBattery);
        stroke-width: 14px;
        transition: 1s;
        stroke-dasharray: 447;
        stroke-dashoffset: 447;
    }
    svg {
        position: absolute;
        top: 0;
        left: 0;
    }
`;

const ProgressBarBattery = ({ percentage, zero, hundred }) => {
    var dasharray = 445;
    const [val, setVal] = useState(null);

    useEffect(() => {
        var nn = dasharray - dasharray * (percentage / 100);
        setVal(nn);
    }, [dasharray, percentage]);

    return (
        <DIV>
            <div className="outer">
                <div className="inner">
                    <div className="number">{percentage}%</div>
                </div>
            </div>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="158px"
                height="158px"
            >
                <defs>
                    <linearGradient id="GradientBattery">
                        <stop offset="0%" stopColor={zero} />
                        <stop offset="100%" stopColor={hundred} />
                    </linearGradient>
                </defs>
                <circle
                    cx="79"
                    cy="79"
                    r="71"
                    strokeLinecap="round"
                    style={{
                        strokeDasharray: dasharray,
                        strokeDashoffset: val,
                    }}
                />
            </svg>
        </DIV>
    );
};

export default ProgressBarBattery;
