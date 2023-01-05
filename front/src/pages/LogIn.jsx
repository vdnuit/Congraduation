import { React } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
import { StyledLink } from './Tree';

const Container = styled.div`
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    height: 93vh;
`;

const Form = styled.form`
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
    height: 4rem;
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
`;

function LogIn() {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const handleLogin = () => {
        axios
        .post("http://13.125.183.250:8000/api/v1/auth/login", {
            userId: watch().ID,
            password: watch().password
        })
        .then((response)=>{
            if(response.data.loginSuccess === true){
                alert("로그인 성공");
            } else {
                alert(response.data.message);
            }
        })
        .catch(()=>alert("인증 정보가 유효하지 않습니다."))   
    };

    const KakaoLogin = () => {
        axios
        .get("http://13.125.183.250:8000/api/v1/auth/kakao")
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
                <Input type="password"
                    {...register('password', { required: true })}
                    placeholder="비밀번호를 입력하세요"
                />

                <Div>
                    <StyledLink onClick={handleSubmit(handleLogin)}>
                        <h2>로그인</h2>
                    </StyledLink>
                    <StyledLink onClick={KakaoLogin}>
                        <h3>카카오 로그인</h3>
                    </StyledLink>
                </Div>
            </Form>
        </Container>
    );
}
export default LogIn;
