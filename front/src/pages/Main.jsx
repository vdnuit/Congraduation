import { Link } from 'react-router-dom';
import styled from 'styled-components';
import React from 'react';
import TreeNight from '../assets/treenight.png';
import LogoImg from '../assets/logoImg.png';
import CapImg from '../assets/capImg.png';

const Container = styled.div`
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const TreeBackground = styled.img`
    position: absolute;
    top: 0px;
    left: 0px;

    z-index: -1;
    width: 100%;
    height: 100%;
    max-width: 500px;
`;
const Box = styled.div`
    background: rgba(255, 255, 255, 0.25);
    border: 0.3px solid #ffffff;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(17.5px);
    border-radius: 10px;
    margin: 8% 5%;
    width: 90%;
    height: 80vh;
    text-align: center;
`;
const Cap = styled.img`
    margin-top: 10vh;
    margin-bottom: -9vh;
    width: 50%;
`;
const Logo = styled.img`
    width: 95%;
    margin-bottom: 8vh;
`;
export const StyledLink = styled(Link)`
    text-decoration: none;
    h2 {
        background: #072a60;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 100px;
        font-family: 'Jua';
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 30px;
        /* identical to box height */

        text-align: center;
        padding: 0.9rem;
        margin: 1rem 5rem;
        color: #ffffff;
    }
`;

function Main() {
    return (
        <Container>
            <TreeBackground src={TreeNight} alt="밤 배경 은행나무" />
            <Box>
                <Cap src={CapImg} />
                <Logo src={LogoImg} />
                <StyledLink to={{ pathname: `/login/*` }}>
                    <h2>로그인</h2>
                </StyledLink>
                <StyledLink to={{ pathname: `/signup/*` }}>
                    <h2>회원가입</h2>
                </StyledLink>
                <StyledLink to={{ pathname: `/tree/*` }}>
                    <h2>트리로 이동</h2>
                </StyledLink>
            </Box>
        </Container>
    );
}

export default Main;
