import styled from 'styled-components';
import logo from '../icons/logo.png';
import { useNavigate } from 'react-router-dom';

const DIV = styled.div`
    text-align: center;
    top: 0;
    background-color: white;

    .company-name {
        padding-top: 25px;
        padding-bottom: 25px;
    }
    .name {
        justify-content: center;
        display: flex;
        font-size: 22px;
        cursor: pointer;
        width: 110px;
        margin: auto;

        .namee {
            font-size: 20px;
            margin-top: 6.2px;
            margin-right: 6px;
            color: black;
        }
    }
    .name::selection {
        background-color: transparent;
    }
`;

const Navbar = () => {
    const navigate = useNavigate();
    const home = () => {
        navigate('/dashboard');
    };

    return (
        <DIV>
            <div className="company-name">
                <div onClick={home} className="name">
                    <img src={logo} alt="logo" width="40px" height="40px" />
                    <p className="namee">GasChek</p>
                </div>
            </div>
        </DIV>
    );
};

export default Navbar;
