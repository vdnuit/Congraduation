import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
    width: 200px;
    height: 100px;
    z-index: 999;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: skyblue;
`;

const Text = styled.p``;
const Button = styled.button``;

function ModalCheck({ setCheckOpen, text }) {
    const closeModal = () => {
        setCheckOpen(false);
    };
    return (
        <Container>
            <Text>{text}</Text>
            <Button onClick={closeModal}>확인</Button>
        </Container>
    );
}

ModalCheck.propTypes = {
    setCheckOpen: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};

export default ModalCheck;
