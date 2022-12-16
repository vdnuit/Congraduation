import { React } from "react";
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import { StyledLink } from "./Main";

const Container = styled.div`
    max-width: 500px;
    height: 93.3vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #F5F5F5;
`;


const Form = styled.form`
    position: absolute;
    top: 184px;
    width: 343px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`

const Span = styled.span`
    width: 70px;
    height: 19px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
`

const Error = styled.span`
    width: 100px;
    height: 15px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 19px;
    color: FF6C0F;
`

const Input = styled.input`
    width: 343px;
    height: 56px;
    box-sizing: border-box;
    background: #FFFFFF;
    border: 1px solid #C8C8C8;
    border-radius: 10px;
    margin-bottom: 20px;
    margin-top: 5px;
    padding-left: 10px;
`

const Div = styled.div`
    margin-top: 48px;
`

const Warn = styled.div`
    height: 19px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #FF6C0F;
    `

function SignUp() {
    const { register, handleSubmit, formState:{ errors } } = useForm();
    const onValid = (data) => {
        console.log(data);

    }
    return(
        <Container>
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
            <Warn>계정은 다시 찾기 어려우니, 아이디와 비밀번호를 기억해주세요!</Warn>
        </Container>
    );
}

export default SignUp;
