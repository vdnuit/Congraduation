/* eslint no-underscore-dangle: 0 */

import { React } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { isLoginAtom, providerAtom } from '../Atom';
import KakaoImg from '../assets/kakao_login_medium_narrow.png';


const Container = styled.div`
    width: 100%;
    max-width: 500px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f5f5f5;
    padding-bottom: 60px;
`;

const Form = styled.form`
    margin-top: 150px;
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

const Span = styled.span`
    width: 14%;
    height: 1em;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
`;

const Error = styled.span`
    width: 20%;
    height: 1em;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 19px;
    color: #ff6c0f;
`;

const Input = styled.input`
    width: 100%;
    height: 16vw;
    max-height: 64px;
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid #c8c8c8;
    border-radius: 10px;
    margin-bottom: 1.2rem;
    margin-top: 0.3rem;
    padding-left: 0.6rem;
`;

const Div = styled.div`
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    h2 {
        background: #072a60;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 100px;
        font-family: 'Jua';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 30px;
        /* identical to box height */

        text-align: center;
        padding: 0.6rem;
        margin: 1rem 3rem;
        color: #ffffff;
        &:hover {
            background: #59749D;
        }
    }
`;

const Kakao = styled.a`
    width: 100%;
    text-align: center;
`;

const Img = styled.img`
    width: 215px;
`;

function LogIn() {
    const setLogin = useSetRecoilState(isLoginAtom);
    const setProvider = useSetRecoilState(providerAtom);
    const navigate = useNavigate();
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const handleLogin = () => {
        axios
            .post(
                '/api/v1/auth/login',
                {
                    id: watch().ID,
                    password: watch().password
                },
                { withCredentials: true }
            )
            .then((response) => {
                if (response.status === 200) {
                    const { accessToken } = response.data;
                    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
                    setLogin({ userId: response.data._id, nick: response.data.nick });
                    setProvider('local');
                    navigate(`/tree/${response.data._id}`);
                } else {
                    alert(response.statusText);
                }
            })
            .catch(() => alert('아이디와 비밀번호를 확인해주세요.'));
    };

    return (
        <Container>
            <Form>
                <div>
                    <Span>아이디</Span>
                    <Error>{errors?.ID?.message}</Error>
                </div>
                <Input {...register('ID', { required: true })} placeholder="아이디를 입력하세요" />

                <div>
                    <Span>비밀번호</Span>
                    <Error>{errors?.password?.message}</Error>
                </div>
                <Input
                    type="password"
                    {...register('password', { required: true })}
                    placeholder="비밀번호를 입력하세요"
                />

                <Div>
                    <StyledLink onClick={handleSubmit(handleLogin)}>
                        <h2>로그인</h2>
                    </StyledLink>
                    <Kakao href={`${process.env.REACT_APP_BASEURL}/api/v1/auth/kakao`}>
                        <Img src={KakaoImg} alt="kakaoImg" />
                    </Kakao>
                </Div>
            </Form>
        </Container>
    );
}
export default LogIn;
