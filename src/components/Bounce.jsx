import { useState } from 'react';
import styled from 'styled-components';

const DIV = styled.div`
    .animate {
        animation: sadss;
    }
    @keyframes sadss {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(0.85);
        }
        100% {
            transform: scale(1);
        }
    }
`;

const Bounce = ({ children }) => {
    const [run_animation, setRun_animation] = useState(false);

    var timeout = null;
    var nn = null;
    const animate = () => {
        setRun_animation(true);

        timeout = setTimeout(() => {
            setRun_animation(false);
        }, [200]);

        return () => {
            clearTimeout(timeout);
            clearTimeout(nn);
        };
    };
    return (
        <DIV>
            <div
                onClick={animate}
                className={run_animation ? 'animate' : ''}
                style={{ animationDuration: `${200}ms` }}
            >
                {children}
            </div>
        </DIV>
    );
};

export default Bounce;
