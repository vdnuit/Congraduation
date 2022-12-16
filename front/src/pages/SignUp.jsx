import { React } from "react";
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import { StyledLink } from "./Main";

const Container = styled.div`
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #F5F5F5;


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
    font-size: 14px;
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
    margin-top: 15%;
`

const Warn = styled.div`
    height: 19px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #FF6C0F;
    margin-top: 5rem;
    margin-bottom: 3rem;
    `

function SignUp() {
    const { register, handleSubmit, formState:{ errors } } = useForm();
    const onValid = (data) => {
        console.log(data);

    }
    return(
        <Container>
            <Warn>계정은 다시 찾기 어려우니, 아이디와 비밀번호를 기억해주세요!</Warn>
            <Form onSubmit={handleSubmit(onValid)}>
                <div><Span>아이디</Span><Error>{errors?.ID?.message}</Error></div>
                <Input {...register("ID", {required:true, pattern: {value: /^[a-z]+[a-z0-9]{5,19}$/g, message:"아이디는 6자 이상 20자 이하여야 합니다."}})} placeholder="아이디를 입력하세요"/>

                <div><Span>비밀번호</Span><Error>{errors?.password?.message}</Error></div>
                <Input {...register("password", {required:true, pattern: {value: /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/, message:"비밀번호는 8자 이상 20자 이하로, 영문, 숫자, 특수문자를 최소 한 가지씩 포함해야 합니다."}})} placeholder="비밀번호를 입력하세요"/>

                <div><Span>닉네임</Span><Error>{errors?.nickname?.message}</Error></div>
                <Input {...register("nickname", {required:true, minLength: {value:8, message:"닉네임은 1자 이상이어야 합니다."}, validate:(value)=>value.includes("잉") ? "이미 사용중인 닉네임입니다." : true,})} placeholder="닉네임을 입력하세요"/>

                <Div>
                    <StyledLink to={{ pathname: `/login/*`}}>
                        <h2>가입 완료</h2>
                    </StyledLink>
                </Div>
            </Form>
        </Container>
    );
}

export default SignUp;
