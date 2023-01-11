import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const Background = styled.div`
    position: absolute;
    z-index: 990;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 120%;
    max-width: 500px;
    background-color: rgba(0, 0, 0, 0.7);
`;
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

function ModalOkay({ setOkayOpen, setOkay, text }) {
    const closeModal = () => {
        setOkayOpen(false);
    };
    const onOkay = () => {
        setOkay(true);
        setOkayOpen(false);
    };
    return (
        <Background>
            <Container>
                <Text>{text}</Text>
                <Button onClick={onOkay}>확인</Button>
                <Button onClick={closeModal}>취소</Button>
            </Container>
        </Background>
    );
}

ModalOkay.propTypes = {
    setOkayOpen: PropTypes.func.isRequired,
    setOkay: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};

export default ModalOkay;
