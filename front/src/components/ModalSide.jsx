import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { isLoginAtom } from '../Atom';
import ModalOkay from './ModalOkay';

const Container = styled.div`
    width: 300px;
    height: 200px;
    z-index: 500;

    position: absolute;
    top: 100%;
    left: 100%;
    transform: translate(-50%, -50%);

    background-color: gray;
`;
const Close = styled.button`
    position: absolute;
    right: 10px;
    top: 10px;
`;
const Button = styled.button``;

function ModalSide({ setModalOpen }) {
    const [okayOpen, setOkayOpen] = useState(false);
    const [okay, setOkay] = useState(false);
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
    const closeModal = () => {
        console.log(okay);
        setModalOpen(false);
    };
    const onLogOut = () => {
        navigate(`/`);
        setModalOpen(false);
        setIsLogin(false);
    };
    const onLogIn = () => {
        navigate(`/login/*`);
        setModalOpen(false);
    };
    const onDelete = () => {
        setOkayOpen(!okayOpen);
    };
    const onCreate = () => {
        navigate(`/signup/*`);
        setModalOpen(false);
    };
    return (
        <Container>
            <Close type="button" onClick={closeModal}>
                X
            </Close>
            {isLogin ? (
                <Button onClick={onLogOut}>Log-out</Button>
            ) : (
                <Button onClick={onLogIn}>Log-in</Button>
            )}
            {isLogin ? (
                <>
                    <Button onClick={onDelete}>Delete Account</Button>
                    {okayOpen && (
                        <ModalOkay
                            setOkayOpen={setOkayOpen}
                            setOkay={setOkay}
                            text="정말로 계정을 삭제하시겠습니까?"
                        />
                    )}
                </>
            ) : (
                <Button onClick={onCreate}>Create Account</Button>
            )}
        </Container>
    );
}

ModalSide.propTypes = {
    setModalOpen: PropTypes.func.isRequired
};

export default ModalSide;
