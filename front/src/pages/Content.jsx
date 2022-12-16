import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { ownerNameAtom, temporaryTreeAtom } from '../Atom';

const Container = styled.div`
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #f7f7f7;
    h3 {
        font-family: 'Jua';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #252525;
        margin-left: 10px;
        margin-top: 15px;
        margin-bottom: -5px;
    }
    h2 {
        font-family: 'Jua';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;

        color: #072a60;
        margin-left: 10px;
        margin-top: 5px;
    }

    h4 {
        font-family: 'Jua';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        text-align: right;

        color: #072a60;
        margin-right: 10px;
        margin-top: 5px;
        margin-bottom : 50px;
    }
`;
const GreyBox = styled.div`
    background: #ffffff;
    padding: 10px;
    margin: 10px;
    border: 1px solid #c8c8c8;
    border-radius: 10px;
    p {
        margin: 5px 0px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 19px;
        text-align: center;
        color: #252525;
    }
    input {
        border: none;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;

        color: #000000;
        width: 100%;
    }
    textarea {
        border: none;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;

        color: #000000;
        width: 100%;
        height: 10rem;
    }
`;

const StyledButton = styled.button`
    text-decoration: none;
    border: none;
    background: #072a60;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 100px;
    font-family: 'Jua';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;

    text-align: center;
    padding: 0.6rem;
    margin: 1rem 9rem;
    color: #ffffff;
    margin-bottom: 1vh;
`;

const StyledBtn = styled.button`
    text-decoration: none;
    border: none;
    background: #FFFFFF;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 100px;
    font-family: 'Jua';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;

    text-align: center;
    padding: 0.6rem;
    margin: 1rem 9rem;
    color: #7C7C7C;
    margin-bottom: 1vh;
`;

const Div = styled.div`
    margin-top: 3rem;
    margin-bottom: 1rem;
`

function Content() {
    const ownerName = useRecoilValue(ownerNameAtom);
    const leaves = useRecoilValue(temporaryTreeAtom);

    return (
        <Container>
            <Div>
                <GreyBox>
                    <p>{leaves.question} 안녕</p>
                </GreyBox>
            </Div>

            <h2>To. {ownerName}</h2>
            <GreyBox>
                <textarea>{leaves.message}</textarea>
            </GreyBox>
            <h4>From. {leaves.writrer}</h4>
                <StyledButton type="button">스토리 공유하기</StyledButton>
                <StyledBtn type="button">이미지 다운로드</StyledBtn>
        </Container>
    );
}

export default Content;
