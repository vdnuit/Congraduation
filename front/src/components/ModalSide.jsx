import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoginAtom, providerAtom, ownerNameAtom } from '../Atom';

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
    display: flex;
    flex-direction: column;
`;
const Button = styled.button`
    border: 0;
    outline: 0;
    text-align: left;
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

    const ownerName = useRecoilValue(ownerNameAtom);
    const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
    const provider = useRecoilValue(providerAtom);
    const closeModal = () => {
        setModalOpen(false);
    };
    const onLogOut = () => {
        axios
            .get('/api/v1/auth/logout', { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {
                    closeModal(false);
                    setIsLogin({ userId: undefined, nick: undefined });
                    alert('로그아웃 되었습니다.');
                    navigate(`/`);
                }
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    alert('토큰이 만료되어 로그아웃 됩니다.');
                    window.location.replace('/');
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
        if (provider === 'kakao') {
            const ninput = prompt('회원 탈퇴를 위해 닉네임을 입력해주세요.');
            if (ninput === ownerName.nick) {
                axios.delete(`/api/v1/users/${isLogin.userId}`).then((res) => {
                    if (res.status === 200) {
                        alert('회원탈퇴를 완료했습니다.');
                        isLogin.userId = undefined;
                        isLogin.nick = undefined;
                        navigate(`/`);
                        closeModal(false);
                        return 0;
                    }
                    return 0;
                });
            } else if (ninput != null) {
                alert('닉네임이 일치하지 않습니다.\n다시 시도해주세요!');
                closeModal(false);
            } else {
                closeModal(false);
            }
        } else if (provider === 'local') {
            const pinput = prompt('회원 탈퇴를 위해 비밀번호를 입력해주세요.');

            if (pinput != null) {
                axios
                    .post('/api/v1/auth/check-password', { password: pinput })
                    .then((response) => {
                        navigate(`/`);
                        if (response.status === 200) {
                            axios.delete(`/api/v1/users/${isLogin.userId}`).then((res) => {
                                if (res.status === 200) {
                                    alert('회원탈퇴를 완료했습니다.');
                                    isLogin.userId = undefined;
                                    isLogin.nick = undefined;

                                    closeModal(false);
                                    return 0;
                                }

                                alert('회원탈퇴에 실패했습니다.\n다시 시도해주세요.');
                                isLogin.userId = undefined;
                                isLogin.nick = undefined;
                                navigate(`/`);

                                closeModal(false);
                                return 0;
                            });
                        }
                    })
                    .catch(() => {
                        alert('비밀번호가 일치하지 않습니다.\n다시 시도해주세요!');

                        closeModal(false);

                        return 0;
                    });
                return 0;
            }
        } else {
            setIsLogin({ userId: undefined, nick: undefined });
            alert('잘못된 접근입니다. 다시 로그인해주세요.');
            navigate(`/login/*`);
        }
        return 0;
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
