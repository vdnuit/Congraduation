import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const Background = styled.div`
    position: fixed;
    z-index: 990;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    max-width: 500px;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    flex-direction: column;
`;
const Container = styled.div`
    width: 200px;
    height: 100px;
    z-index: 999;

    margin: 0 auto;
    max-width: 341px;
    max-height: 215px;
    width: 80vw;
    height: 50vw;
    background: #ffffff;
    box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const Text = styled.p`
    font-family: 'Jua';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 30px;
    margin: 0vw 3vw;

    text-align: center;

    color: #000000;
`;
const Buttons = styled.div`
    text-align: center;
`;
const Button = styled.button`
    background: #072a60;
    border-radius: 10px;
    font-family: 'Jua';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    width: 100px;
    height: 46px;
    text-align: center;
    border: none;
    color: #ffffff;
    margin: 10px;
`;

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
                <div>
                    <Text>{text}</Text>
                    <Buttons>
                        <Button onClick={onOkay}>확인</Button>
                        <Button
                            style={{ backgroundColor: '#C8C8C8', color: '#252525' }}
                            onClick={closeModal}
                        >
                            취소
                        </Button>
                    </Buttons>
                </div>
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
