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
    max-width: 290px;
    max-height: 190px;
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
    line-height: 25px;
    width: 100px;
    height: 46px;
    text-align: center;
    border: none;
    color: #ffffff;
    margin: 10px;
`;

function ModalOkay({ setOkayOpen }) {
    const closeModal = () => {
        setOkayOpen(false);
    };
    const onOkay = () => {
        setOkayOpen(false);
    };
    return (
        <Background>
            <Container>
                <div>
                    <Text>
                        인스타스토리에 공유시
                        <br />
                        저장된 이미지를 사용해주세요
                    </Text>
                    <Buttons>
                        <Button
                            onClick={onOkay}
                            style={{
                                borderRadius: '10px',
                                margin: '5px',
                                width: '100px',
                                fontSize: '15px'
                            }}
                        >
                            링크공유
                        </Button>
                        <Button
                            onClick={closeModal}
                            style={{
                                borderRadius: '10px',
                                margin: '5px',
                                width: '100px',
                                fontSize: '15px'
                            }}
                        >
                            이미지 저장
                        </Button>
                    </Buttons>
                </div>
            </Container>
        </Background>
    );
}

ModalOkay.propTypes = {
    setOkayOpen: PropTypes.func.isRequired
};

export default ModalOkay;
