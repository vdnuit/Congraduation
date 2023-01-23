import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useRecoilState } from 'recoil';
import { isLoginAtom } from '../Atom';

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
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
    const closeModal = () => {
        setModalOpen(false);
    };
    const onLogOut = () => {
        axios
            .get('http://localhost:8000/api/v1/auth/logout', { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {
                    closeModal(false);
                    setIsLogin({ userId: undefined, nick: undefined });
                    alert('로그아웃 되었습니다.');
                    navigate(`/`);
                } else {
                    alert(response.statusText);
                }
            });
    };
    const onLogIn = () => {
        navigate(`/login/*`);
        closeModal(false);
    };

    const onCreate = () => {
        navigate(`/signup/*`);
        closeModal(false);
    };
    const onPrompt = () => {
        const pinput = prompt('회원 탈퇴를 위해 비밀번호를 입력해주세요.');
        if (cookies.get('provider') === 'kakao') {
            alert(
                '카카오 로그인 회원탈퇴는 카카오톡>설정>카카오계정>연결된 서비스 관리에서 탈퇴해주세요!'
            );
            isLogin.userId = undefined;
            isLogin.nick = undefined;
            navigate(`/`);
            closeModal(false);
        }
        axios
            .delete(`http://localhost:8000/api/v1/users/${isLogin.userId}`, {
                withCredentials: true,
                password: pinput
            })
            .then((response) => {
                if (response.status === 200) {
                    alert('회원탈퇴를 완료했습니다.');
                    isLogin.userId = undefined;
                    isLogin.nick = undefined;
                    navigate(`/`);

                    closeModal(false);
                }
                alert('회원탈퇴에 실패했습니다.\n다시 시도해주세요!');
                isLogin.userId = undefined;
                isLogin.nick = undefined;
                navigate(`/`);

                closeModal(false);
            });
    };
    return (
        <Container>
            {isLogin.userId ? (
                <Button onClick={onLogOut}>로그아웃</Button>
            ) : (
                <Button onClick={onLogIn}>로그인</Button>
            )}
            {isLogin.userId ? (
                <Button onClick={onPrompt}>계정삭제</Button>
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
