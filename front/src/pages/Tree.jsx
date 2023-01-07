import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { ownerNameAtom, countAtom } from '../Atom';
import TreeNight from '../assets/treenight.png';
import TreeDay from '../assets/treeday.png';
import TreeSunset from '../assets/treesunset.png';
import TreeComponent from '../components/TreeComponent';

const Container = styled.div`
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const Dday = styled.p`
    font-family: 'Jua';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    color: #072a60;
    margin: 10px;
    text-align: center;
`;
const TreeBackground = styled.img`
    position: absolute;
    top: 62px;
    left: 0px;

    z-index: -1;
    width: 100%;
    max-width: 500px;
`;
const Buttons = styled.div`
    position: fixed;
    bottom: 20px;
    text-align: center;
    width: 100%;
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
const Count = styled.p`
    font-family: 'Jua';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    color: #f7f7f7;
    margin: 20px;

    margin-top: 80px;
`;
function Time() {
    const today = new Date();
    const hours = today.getHours();
    if (hours >= 20 || hours <= 5) {
        return <TreeBackground src={TreeNight} alt="밤 배경 은행나무" />;
    }
    if (hours <= 16 && hours >= 9) {
        return <TreeBackground src={TreeDay} alt="낮 배경 은행나무" />;
    }
    return <TreeBackground src={TreeSunset} alt="노을 배경 은행나무" />;
}
function Tree() {
    const ownerName = useRecoilValue(ownerNameAtom);
    const count = useRecoilValue(countAtom);

    return (
        <Container>
            <Count>
                {ownerName} 님의 나무에 {count}개의 메시지
            </Count>

            <Time />
            <TreeComponent />
            <Buttons>
                {/* 외부 이용자일 때 */}
                <StyledLink to={{ pathname: `/write/*` }}>
                    <h2>쪽지 남기기</h2>
                </StyledLink>
                <StyledLink to={{ pathname: `/signup/*` }}>
                    <h3>나도 계정 만들기</h3>
                </StyledLink>
                {/* 계정 주인일 때 */}
                <StyledLink to={{ pathname: `/list/*` }}>
                    <h2>받은 쪽지 목록</h2>
                </StyledLink>
                <StyledLink>
                    <h3>공유하기</h3>
                </StyledLink>
                <Dday>쪽지 오픈 D-7</Dday>
            </Buttons>
        </Container>
    );
}

export default Tree;
