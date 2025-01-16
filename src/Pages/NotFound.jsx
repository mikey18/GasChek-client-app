import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DIV = styled.div`
    margin: 0;
    text-align: center;

    .NotFound {
        margin-top: 200px;
        font-size: 20px;
        color: darkorange;
        margin-bottom: 40px;
    }
    .home {
        margin: auto;
        max-width: 150px;
        border: 1px solid darkorange;
        padding: 10px;
        border-radius: 30px;
        color: darkorange;
        transition: 0.2s;
    }
    .home:hover {
        background-color: darkorange;
        color: white;
    }
`;

const NotFound = () => {
    return (
        <DIV>
            <p className="NotFound">Wrong page</p>

            <Link style={{ textDecoration: 'none' }} to="/">
                <div className="home">Home</div>
            </Link>
        </DIV>
    );
};

export default NotFound;
