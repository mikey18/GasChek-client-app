import styled from 'styled-components';
import { useRef, useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx';

const MODAL = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${(props) =>
        props.$backgroundColor === undefined
            ? 'rgba(0, 0, 0, 0.6)'
            : props.$backgroundColor};
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    backdrop-filter: ${(props) =>
        props.$blur === undefined ? 'blur(10px)' : props.$blur};
    .m {
        position: relative;
        padding: ${(props) =>
            props.$padding === undefined
                ? '10px 15px 15px 15px'
                : props.$padding};
        border-radius: ${(props) =>
            props.$borderRadius === undefined ? '30px' : props.$borderRadius};
        background-color: white;
        max-height: ${(props) =>
            props.$maxheight === undefined ? '1200px' : props.$maxheight};
        max-width: ${(props) =>
            props.$maxWidth === undefined ? '620px' : props.$maxWidth};
        width: ${(props) =>
            props.$width === undefined ? '90%' : props.$width};
        height: ${(props) =>
            props.$height === undefined ? '90%' : props.$height};
        overflow: hidden;
        animation: modal-slide-in 200ms;
    }
    .m::-webkit-scrollbar {
        display: none;
    }
    @keyframes modal-slide-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    .cancel {
        display: flex;
        justify-content: right;
    }
    .icon {
        width: 30px;
        height: 30px;
        cursor: pointer;
    }
`;

const Modal = ({
    children,
    run_function,
    maxheight,
    maxWidth,
    padding,
    width,
    height,
    borderRadius,
    blur,
    backgroundColor,
}) => {
    const modalRef = useRef();

    useEffect(() => {
        const click = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                run_function();
            }
        };
        document.addEventListener('mousedown', click);
        return () => {
            document.removeEventListener('mousedown', click);
        };
    }, [run_function]);

    return (
        <MODAL
            $maxheight={maxheight}
            $maxWidth={maxWidth}
            $padding={padding}
            $width={width}
            $height={height}
            $borderRadius={borderRadius}
            $blur={blur}
            $backgroundColor={backgroundColor}
        >
            <div className="m modal-in2" ref={modalRef}>
                <div className="cancel" onClick={run_function}>
                    <RxCross2 className="icon" />
                </div>
                {children}
            </div>
        </MODAL>
    );
};

export default Modal;
