import styled from 'styled-components';

const DIV = styled.div`
    border: 1px solid red;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    color: red;
    text-align: center;
    font-size: 13px;
    border-radius: 5px;
`;

const FormError = ({ text }) => {
    return <DIV>{text}</DIV>;
};

export default FormError;
