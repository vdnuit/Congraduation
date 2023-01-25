/* eslint no-underscore-dangle: 0 */

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { React, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import TreeNight from '../assets/treenight.png';
import LogoImg from '../assets/logoImg.png';
import CapImg from '../assets/capImg.png';
import SnowImg from '../assets/snowbackground.png';
import InstaImg from '../assets/instaImg.png';
import { isLoginAtom } from '../Atom';
import TreeSpinner from '../components/TreeSpinner';

const Container = styled.div`
    z-index: -1;

    position: absolute;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const TreeBackground = styled.img`
    position: absolute;
    top: 62px;
    left: 0px;

    z-index: -1;
    width: 100%;
    max-width: 500px;
`;
const Box = styled.div`
    background: rgba(255, 255, 255, 0.25);
    border: 0.5px solid #ffffff;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(17.5px);
    border-radius: 10px;
    margin: 8% 5%;
    width: 90%;
    height: 180vw;
    max-height: 800px;
    text-align: center;
    margin-top 100px;
`;
const Cap = styled.img`
    margin-top: 10vh;
    margin-bottom: -3vh;
    width: 40%;
`;
const Logo = styled.img`
    width: 95%;
    margin-bottom: 8vh;
`;
const Insta = styled.div`
    margin: 30px;
    img {
        height: 32px;
        width: 32px;
    }
    p {
        font-family: 'Jua';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;

        text-align: center;

        color: #072a60;
    }
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
        font-size: 20px;
        line-height: 30px;
        /* identical to box height */

        text-align: center;
        padding: 0.6rem;
        margin: 1rem 3rem;
        color: #ffffff;
    }
`;
const Snow = styled.img`
    position: absolute;
    top: 62px;
    left: 0px;
    pointer-events: none;
    z-index: 1;
    width: 100%;
    max-width: 500px;
`;

function Button() {
    const Login = useRecoilValue(isLoginAtom);
    if (Login.userId) {
        return (
            <div>
                <Cap src={CapImg} />
                <Logo src={LogoImg} />
                <StyledLink to={{ pathname: `/tree/${Login.userId}` }}>
                    <h2>트리로 이동</h2>
                </StyledLink>
                <Insta>
                    <img src={InstaImg} alt="인스타그램 로고" />
                    <p>@congraduation_skku</p>
                </Insta>
            </div>
        );
    }
    return (
        <div>
            <Cap src={CapImg} />
            <Logo src={LogoImg} />
            <StyledLink to={{ pathname: `/login/*` }}>
                <h2>로그인</h2>
            </StyledLink>
            <StyledLink to={{ pathname: `/signup/*` }}>
                <h2>회원가입</h2>
            </StyledLink>
            <Insta>
                <img src={InstaImg} alt="인스타그램 로고" />
                <p>@congraduation_skku</p>
            </Insta>
        </div>
    );
}

function Main() {
    const [loading, setLoading] = useState(true);
    const changeLoading = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 100);
    };

    useEffect(() => {
        changeLoading();
    }, []);

    return (
        <div>
            {loading ? (
                <TreeSpinner />
            ) : (
                <Container>
                    <TreeBackground src={TreeNight} alt="밤 배경 은행나무" />
                    <Box>
                        <Button />
                    </Box>
                    <Snow src={SnowImg} alt="눈 내리는 배경" />
                </Container>
            )}
        </div>
    );
}

export default Main;
