/* eslint no-underscore-dangle: 0 */

import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import ImageMap from 'image-map';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ownerNameAtom, countAtom, isLoginAtom, temporaryTreeAtom } from '../Atom';
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
    button {
        border: none;
        background: #072a60;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 100px;
        font-family: 'Jua';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 30px;
        /* identical to box height */
        width: 80%;
        max-width: 405px;
        text-align: center;
        padding: 0.6rem;
        margin: 0 auto;
        color: #ffffff;
        margin-top: 10px;
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

const Treezone = styled.map`
    height: auto;
`;



function Time() {
    const today = new Date();
    const hours = today.getHours();
    if (hours >= 20 || hours <= 5) {
        return <TreeBackground src={TreeNight} alt="밤 배경 은행나무" useMap="#treemap" />;
    }
    if (hours <= 16 && hours >= 9) {
        return <TreeBackground src={TreeDay} alt="낮 배경 은행나무" useMap="#treemap" />;
    }
    return <TreeBackground src={TreeSunset} alt="노을 배경 은행나무" useMap="#treemap" />;
}


function Button() {
    const navigate = useNavigate();
    const userObjectId = useParams().id;
    const Login = useRecoilValue(isLoginAtom);
    const writeNote = () => {
        navigate(`/write/${userObjectId}`);
    };
    const makeAccount = () => {
        navigate('/signup/*');
    };

    const clipboard = (event) => {
        event.preventDefault();
        navigator.clipboard.writeText(window.location.href);
        alert("링크가 복사되었습니다.");
    }

    if (Login) {
        return (
            <Buttons>
                <StyledLink to={{ pathname: `/list/${userObjectId}` }}>
                    <h2>받은 쪽지 목록</h2>
                </StyledLink>
                <StyledLink onClick={clipboard}>
                    <h3>공유하기</h3>
                </StyledLink>
                <Dday>쪽지 오픈 D-7</Dday>
            </Buttons>
        );
    }
    return (
        <Buttons>
            <button type="button" onClick={writeNote}>
                쪽지 남기기
            </button>
            <button
                type="button"
                onClick={makeAccount}
                style={{ backgroundColor: '#ffffff', color: '#7c7c7c' }}
            >
                나도 계정 만들기
            </button>
            <Dday>쪽지 오픈 D-7</Dday>
        </Buttons>
    );
}


function Tree() {
    const userObjectId = useParams().id
    console.log(userObjectId);
    const Login = useRecoilValue(isLoginAtom);
    const ownerName = useRecoilValue(ownerNameAtom);
    const count = useRecoilValue(countAtom);
    const setCount = useSetRecoilState(countAtom);
    const setOwnerName = useSetRecoilState(ownerNameAtom);
    const setLeaves = useSetRecoilState(temporaryTreeAtom);
    const getUser = () => {
        axios
        .get(`http://localhost:8000/api/v1/users/${userObjectId}`, {withCredentials: true})
        .then((response)=> {
            setOwnerName({ _id: response.data.userId, nick: response.data.nick });
            setCount(response.data.message.length);
            setLeaves(response.data.message);
        })
    }

    
    
    useEffect(() => {
        ImageMap('img[usemap]');
    }, []);
    
    useEffect(() => {
        getUser();
    },[]);


    const clickHandler = (title) => {
        if (Login) {
            console.log(title);
        }
    };

    return (
        <Container>
            <Count>
                {ownerName.nick} 님의 나무에 {count}개의 메시지
            </Count>

            <Time />
            {Login ? <Link to={{ pathname: `/list/${ownerName._id} `}}>
                <Treezone name="treemap">
                    <area
                        aria-hidden="true"
                        onClick={() => clickHandler('tree')}
                        shape="poly"
                        alt="tree"
                        coords="855,403,747,409,618,587,524,696,409,982,333,1086,281,1204,231,1412,185,1577,271,1764,301,1905,442,2052,720,2170,705,2373,625,2370,599,2422,643,2482,744,2476,790,2447,858,2437,887,2476,937,2467,964,2443,890,2401,861,2276,853,2092,899,2109,1038,2037,1206,1900,1319,1752,1377,1594,1437,1182,1377,1008,1384,1004,1155,633,1328,673,1319,554,1242,464,1204,370,964,253,838,364"
                    />
                </Treezone>
            </Link> : null}
            <TreeComponent />
            <Button />
        </Container>
    );
}


export default Tree;
