import styled from 'styled-components';

const LOADINGDIV = styled.div`
    margin: auto;
    max-width: 700px;
    width: 90%;
    animation: appear 0.3s;

    .header {
        display: flex;
        padding-top: 55px;
        padding-bottom: 50px;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        margin: auto;
    }
    .company-name {
        background-color: #f4f4f9;
        width: 150px;
        height: 18px;
        border-radius: 10px;
    }
    .location {
        height: 200px;
        border-radius: 20px;
        background-color: #f4f4f9;
    }
    .logout {
        display: flex;
        background-color: #f4f4f9;
        color: white;
        border: none;
        padding-top: 7px;
        padding-bottom: 7px;
        border-radius: 30px;
        cursor: pointer;
        transition: 0.1s;
        width: 68px;
        height: 35px;
        font-weight: 400;
    }
    .orders {
        height: 20px;
        border-radius: 20px;
        margin: auto;
        margin-top: 100px;
        background-color: #f4f4f9;
        max-width: 100px;
        height: 30px;
    }
    .orders-container {
        background-color: #f4f4f9;
        height: 600px;
        border-radius: 20px;
        margin-top: 150px;
    }
`;

const GasDealerLoading = () => {
    return (
        <LOADINGDIV>
            <div className="header">
                <p className="company-name" />
                <div className="logout" />
            </div>
            <div className="location" />

            <p className="orders" />
            <div className="orders-container" />
        </LOADINGDIV>
    );
};

export default GasDealerLoading;
