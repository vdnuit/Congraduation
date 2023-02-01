import { React } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import KakaoImg from '../assets/kakao_login_medium_narrow.png';

const Container = styled.div`
    position: absolute;
    top: 62px;
    left: 0px;
    width: 100%;
    max-width: 500px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f5f5f5;
    padding-bottom: 50px;
`;

const Form = styled.form`
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

const Span = styled.span`
    width: 100%;
    height: 1em;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
`;

const Error = styled.span`
    width: 100%;
    height: auto;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 300;
    font-size: 11px;
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
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Warn = styled.div`
    height: 19px;
    text-align: center;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: #ff6c0f;

    margin: 10% 10%;
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

function SignUp() {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    const navigate = useNavigate();
    const handleRegister = (data) => {
        if(data.password !== data.password1){
            setError(
                "password1",
                {message: " 비밀번호가 다릅니다"},
                {shouldFocus: true}
            );
        }

        if(data.password === data.password1){
            axios
        .post("/api/v1/users/signup", {
            userId: watch().ID,
            password: watch().password,
            nick: watch().nickname
        })
        .then(() => {
            alert("가입이 완료되었습니다.");
            navigate(`/`);
        })
        .catch(()=>alert("중복된 사용자 정보입니다. 다시 한번 확인해주세요.")) 
        }
    }
    
    return (
        <Container>
            <Warn>
                <p>계정은 다시 찾기 어려우니,</p>
                <p>아이디와 비밀번호를 기억해주세요!</p>
            </Warn>
            <Form onSubmit={handleSubmit(handleRegister)}>

                <div>
                    <Span>닉네임</Span>
                    <Error>{errors?.nickname?.message}</Error>
                </div>
                <Input
                    {...register('nickname', {
                        required: true,
                        minLength: { value: 1, message: '닉네임을 작성해주세요.' },
                    })}
                    placeholder="닉네임을 입력하세요"
                />

                <div>
                    <Span>아이디</Span>
                    <Error>{errors?.ID?.message}</Error>
                </div>
                <Input
                    {...register('ID', {
                        required: true,
                        pattern: {
                            value: /^[a-z]+[a-z0-9]{5,19}$/g,
                            message: ' 6-20자의 영문과 숫자'
                        }
                    })}
                    placeholder="아이디를 입력하세요"
                />

                <div>
                    <Span>비밀번호</Span>
                    <Error>{errors?.password?.message}</Error>
                </div>
                <Input type="password"
                    {...register('password', {
                        required: true,
                        pattern: {
                            value: /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
                            message:
                                ' 8-20자의 영문, 숫자, 특수문자'
                        }
                    })}
                    placeholder="비밀번호를 입력하세요"
                />

                <div>
                    <Span>비밀번호 확인</Span>
                    <Error>{errors?.password1?.message}</Error>
                </div>
                <Input type="password" 
                    {...register('password1', {
                        required: true,
                    })}
                    placeholder="비밀번호를 한 번 더 입력하세요"
                />

                <Div>
                    <StyledLink type="button" onClick={handleSubmit(handleRegister)}>
                        <h2>가입 완료</h2>
                    </StyledLink>
                    <Kakao href={`${process.env.REACT_APP_BASEURL}/api/v1/auth/kakao`}>
                        <Img src={KakaoImg} alt="kakaoImg" />
                    </Kakao>
                </Div>
            </Form>
        </Container>
    );
}
export default SignUp;
