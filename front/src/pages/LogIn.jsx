import { React } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from 'styled-components';
import { StyledLink } from './Tree';
import { isLoginAtom } from '../Atom';

const Container = styled.div`
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #F5F5F5;
    height: 93vh;
`;


const Form = styled.form`
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`

const Span = styled.span`
    width: 14%;
    height: 1em;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
`

const Error = styled.span`
    width: 20%;
    height: 1em;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 19px;
    color: #FF6C0F;
`

const Input = styled.input`
    width: 100%;
    height: 4rem;
    box-sizing: border-box;
    background: #FFFFFF;
    border: 1px solid #C8C8C8;
    border-radius: 10px;
    margin-bottom: 1.2rem;
    margin-top: 0.3rem;
    padding-left: 0.6rem;
`

const Div = styled.div`
    margin-top: 3rem;
`

function LogIn() {
    const { register, handleSubmit, formState:{ errors } } = useForm();
    const setLogIn = useSetRecoilState(isLoginAtom);
    const checkLogin = () => setLogIn(()=>true)
    const onValid = (data) => {
        console.log(data)
    }
    return(
        <Container>
            <Form onSubmit={handleSubmit(onValid)}>
                <div><Span>아이디</Span><Error>{errors?.ID?.message}</Error></div>
                <Input {...register("ID", {required:true})} placeholder="아이디를 입력하세요"/>

                <div><Span>비밀번호</Span><Error>{errors?.password?.message}</Error></div>
                <Input {...register("password", {required:true})} placeholder="비밀번호를 입력하세요"/>

                <Div>
                    <StyledLink to={{ pathname: `/tree/*`}} onClick={checkLogin}>
                        <h2>로그인</h2>
                    </StyledLink>
                    <StyledLink to={{ pathname: `/tree/*`}} onClick={checkLogin}>
                        <h3>카카오 로그인</h3>
                    </StyledLink>
                </Div>
            </Form>
        </Container>
    );
}

export default LogIn;
