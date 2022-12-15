import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import { useRecoilValue } from 'recoil';
import TreeNight from '../assets/treenight.png';
// import { ownerNameAtom } from '../Atom';
const Container = styled.div`
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const TreeComponent = styled.div``;
const Dday = styled.p`
    font-family: 'Jua';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;

    color: #f7f7f7;
    margin: 20px;

    margin-bottom: 55vh;
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
    h3 {
        background: #ffffff;
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
        margin: 0rem 3rem;
        color: #7c7c7c;
    }
`;

function Tree() {
    // const ownerName = useRecoilValue(ownerNameAtom);
    return (
        <Container>
            <TreeBackground src={TreeNight} alt="밤 배경 은행나무" />
            <Dday>쪽지 오픈 D-7</Dday>
            {/* <p>{ownerName} 님의 나무에 n개의 편지가 달려있습니다.</p> */}
            <TreeComponent />
            <StyledLink to={{ pathname: `/write/*` }}>
                <h2>쪽지 남기기</h2>
            </StyledLink>
            <StyledLink to={{ pathname: `/signup/*` }}>
                <h3>나도 계정 만들기</h3>
            </StyledLink>
        </Container>
    );
}

export default Tree;
