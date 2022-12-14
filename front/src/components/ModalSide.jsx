import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isLoginAtom, ownerNameAtom } from '../Atom';
import ModalOkay from './ModalOkay';

const Container = styled.div`
    width: 197px;
    height: 96px;

    background: #ffffff;
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
    z-index: 900;

    position: absolute;
    top: 60px;
    right: 10px;
    padding-top: 10px;
    padding-left: 5px;
`;
const Button = styled.button`
    border: 0;
    outline: 0;
    margin: 8px;
    background-color: white;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;

    color: #252525;
`;

function ModalSide({ setModalOpen }) {
    const [okayOpen, setOkayOpen] = useState(false);
    const [okay, setOkay] = useState(false);
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
    const setOwnerName = useSetRecoilState(ownerNameAtom);
    const closeModal = () => {
        console.log(okay);
        setModalOpen(false);
    };
    const onLogOut = () => {
        axios
        .get("http://localhost:8000/api/v1/auth/logout")
        .then((response)=>{
            if(response.status === 200){
                closeModal(false);
                setOwnerName({ _id: "",  nick: "" });
                setIsLogin(false);
                alert("로그아웃 되었습니다.");
                navigate(`/`);
                console.log(isLogin);
            } else {
                alert(response.statusText);
            }
        })
    };
    const onLogIn = () => {
        navigate(`/login/*`);
        closeModal(false);
    };
    const onDelete = () => {
        setOkayOpen(!okayOpen);
    };
    const onCreate = () => {
        navigate(`/signup/*`);
        closeModal(false);
    };

    return (
        <Container>
            {isLogin ? (
                <Button onClick={onLogOut}>로그아웃</Button>
            ) : (
                <Button onClick={onLogIn}>로그인</Button>
            )}
            {isLogin ? (
                <>
                    <Button onClick={onDelete}>계정삭제</Button>
                    {okayOpen && (
                        <ModalOkay
                            setOkayOpen={setOkayOpen}
                            setOkay={setOkay}
                            text="정말로 계정을 삭제하시겠습니까?"
                        />
                    )}
                </>
            ) : (
                <Button onClick={onCreate}>계정 만들기</Button>
            )}
        </Container>
    );
}

ModalSide.propTypes = {
    setModalOpen: PropTypes.func.isRequired
};

export default ModalSide;
