import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../icons/logo.png';
// import { Splash } from "../App";

const DIV = styled.div`
    margin: auto;
    max-width: 500px;
    width: 90%;
    animation: appear 0.3s;

    .circle {
        background-color: blue;
        height: 20px;
        width: 20px;
        padding: 20px;
        border-radius: 50%;
        margin-bottom: 20px;
        margin-top: 20px;
    }
    .circle2 {
        background: radial-gradient(
            circle at 10% 20%,
            rgb(255, 131, 61) 0%,
            rgb(249, 183, 23) 90%
        );
        height: 20px;
        width: 20px;
        padding: 30px;
        margin-top: 20px;
        border-radius: 50%;
    }
    .container {
        box-shadow: 0px 3px 38px 0px #e0d0b3;
        padding-top: 50px;
        padding-bottom: 100px;
        border-radius: 40px;
        animation: 1.5s color-switch linear alternate infinite;
    }
    @keyframes color-switch {
        0% {
            box-shadow: 0px 30px 90px 0px #e0d0b3;
        }
        30% {
            box-shadow: 0px 30px 90px 0px #e0d0b3;
        }
        60% {
            box-shadow: 0px 30px 90px 0px #b7b7e2;
        }
        100% {
            box-shadow: 0px 30px 90px 0px #b7b7e2;
        }
    }
    .click {
        margin: auto;
        background-color: darkorange;
        padding: 15px;
        border-radius: 25px;
        color: white;
        max-width: 250px;
        text-align: center;
        width: 80%;
        box-shadow: 0px 5px 10px 2px #bdbdbd;
        font-weight: 500;
        cursor: pointer;
        transition: 0.2s;
        margin-bottom: 100px;
        margin-top: 70px;
    }
    .click:hover {
        transform: scale(1.05, 1.05);
    }
    .circle-container {
        display: flex;
        justify-content: right;
        display: -webkit-flex;
        -webkit-justify-content: right;
    }
    .click2 {
        margin: auto;
        background-color: blue;
        padding: 15px;
        border-radius: 25px;
        color: white;
        max-width: 250px;
        text-align: center;
        width: 80%;
        box-shadow: 0px 5px 10px 2px #bdbdbd;
        font-weight: 500;
        cursor: pointer;
        transition: 0.2s;
    }
    .click2:hover {
        transform: scale(1.05, 1.05);
    }
    .logo {
        display: flex;
        justify-content: center;
        width: 100%;
        pointer-events: none;
    }
    .info {
        display: flex;
        justify-content: center;
        max-width: 350px;
        margin: auto;
        margin-top: 100px;
        margin-bottom: 300px;
    }
    .info-p {
        font-family: 'Poppins', sans-serif;
        font-size: 23px;
        transition: 0.3s;

        &:nth-child(1) {
            color: darkorange;
        }
        &:nth-child(2) {
            color: blue;
        }
    }
    .info-p:hover {
        transform: scale(1.05, 1.05);
    }
`;

const Home = () => {
    const navigate = useNavigate();
    // const [loading, setLoading] = useState(true)

    const user = () => {
        navigate('/login');
    };

    const gas_dealer = () => {
        navigate('/gasdealerlogin');
    };
    // const gas_dealer = () => {
    //     localStorage.setItem("type", "dealer")
    //     navigate("/gasdealerlogin")
    // }
    // useEffect(() => {
    //     var type = localStorage.getItem("type")
    //     if (type === null) {
    //         setLoading(false)
    //     }
    //     else if (type === "user") {
    //         navigate("/login")
    //     }
    //     else {
    //         navigate("/gasdealerlogin")
    //     }
    // }, [navigate])

    return (
        <DIV>
            {/* {loading ?
                <Splash />
                :
                <> */}
            <div className="circle" />
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="logo" width="65px" height="65px" />
                </div>
                <div className="click" onClick={user}>
                    Gaschek User
                </div>
                <div className="click2" onClick={gas_dealer}>
                    Gas Dealer
                </div>
            </div>
            <div className="circle-container">
                <div className="circle2" />
            </div>

            <div className="info">
                <div className="info-p">Track your gas cylinder.</div>
                {/* <div className="info-p">Order gas.</div> */}
            </div>
            {/* </>
            } */}
        </DIV>
    );
};
export default Home;
