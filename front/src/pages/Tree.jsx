/* eslint no-underscore-dangle: 0 */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import ImageMap from 'image-map';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ownerNameAtom, countAtom, isLoginAtom, temporaryTreeAtom, dateAtom } from '../Atom';
import TreeSpinner from '../components/TreeSpinner';
import TreeNight from '../assets/treenight.png';
import TreeDay from '../assets/treeday.png';
import TreeSunset from '../assets/treesunset.png';
import TreeComponent from '../components/TreeComponent';
import ModalOkay from '../components/ModalOkay';

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
    // position: absolute;
    margin-top: -63px;
    left: 0px;
    z-index: -1;
    width: 100%;
    max-width: 500px;
`;
const Buttons = styled.div`
    // position: absolute;
    margin-top: -190px;
    // bottom: 20px;
    text-align: center;
    width: 100%;
    max-width: 500px;
`;

const Abutton = styled.button`
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
    &:hover {
        background: #59749D;
    }
`;

const WButton = styled.button`
    border: none;
    background: #ffffff;
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
    color: #7c7c7c;
    margin-top: 10px;
    &:hover {
        background: #E7E7E7;
    }
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
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
    font-size: 18px;
    line-height: 25px;
    color: #f7f7f7;
    margin: 20px;
    z-index: 10;
    margin-top: 80px;
`;
const Treezone = styled.map`
    point-events: none;
    height: auto;
`;


function Time() {
    const today = new Date();
    const hours = today.getHours();
    const Login = useRecoilValue(isLoginAtom);
    const userObjectId = useParams().id;
    const date = useRecoilValue(dateAtom);
    const dday = Math.round((today - date) / (24 * 60 * 60 * 1000));
    useEffect(() => {
        ImageMap('img[usemap]');
    }, []);

    if (Login.userId === userObjectId && dday >= 0) {
        if (hours >= 20 || hours <= 5) {
            return <TreeBackground src={TreeNight} alt="밤 배경 은행나무" useMap="#treemap" />;
        }
        if (hours <= 16 && hours >= 9) {
            return <TreeBackground src={TreeDay} alt="낮 배경 은행나무" useMap="#treemap" />;
        }
        return <TreeBackground src={TreeSunset} alt="노을 배경 은행나무" useMap="#treemap" />;
    }
    if (Login.userId !== userObjectId || dday < 0) {
        if (hours >= 20 || hours <= 5) {
            return <TreeBackground src={TreeNight} alt="밤 배경 은행나무" />;
        }
        if (hours <= 16 && hours >= 9) {
            return <TreeBackground src={TreeDay} alt="낮 배경 은행나무" />;
        }
        return <TreeBackground src={TreeSunset} alt="노을 배경 은행나무" />;
    }
}

function Button() {
    const date = useRecoilValue(dateAtom);
    const navigate = useNavigate();
    const userObjectId = useParams().id;
    const Login = useRecoilValue(isLoginAtom);
    const writeNote = () => {
        navigate(`/write/${userObjectId}`);
    };
    const makeAccount = () => {
        navigate('/signup/*');
    };
    const [modalOpen, setModalOpen] = useState(false);

    const node = useRef();
    const current = new Date();
    const dday = Math.round((current - date) / (24 * 60 * 60 * 1000));
    useEffect(() => {
        const clickOutside = (e) => {
            if (modalOpen && node.current && !node.current.contains(e.target)) {
                setModalOpen(false);
            }
        };

        document.addEventListener('mousedown', clickOutside);

        return () => {
            document.removeEventListener('mousedown', clickOutside);
        };
    }, [modalOpen]);

    const showModal = () => {
        setModalOpen(true);
    };
    const memoList = () => {
        if (dday >= 0) {
            navigate(`/list/${userObjectId}`);
        } else {
            alert(`쪽지 열람은 ${Math.abs(dday)}일 후에 가능합니다!`);
        }
    };

    if (Login.userId === userObjectId) {
        return (
            <Buttons>
                <Abutton type="button" onClick={memoList}>
                    받은 쪽지 목록
                </Abutton>

                <Abutton type="button" onClick={showModal}>
                    공유하기
                </Abutton>
                {modalOpen ? <ModalOkay setModalOpen={setModalOpen} /> : null}
                <Dday>{dday >= 0 ? `쪽지 오픈 D+${dday}` : `쪽지 오픈 D${dday}`}</Dday>
            </Buttons>
        );
    }
    if (Login.userId && Login.userId !== userObjectId) {
        return (
            <Buttons>
                <Abutton type="button" onClick={writeNote}>
                    쪽지 남기기
                </Abutton>
                <WButton
                    type="button"
                    onClick={() => {
                        navigate(`/tree/${Login.userId}`);
                    }}
                >
                    내 트리로 가기
                </WButton>
                <Dday>{dday >= 0 ? `쪽지 오픈 D+${dday}` : `쪽지 오픈 D${dday}`}</Dday>
            </Buttons>
        );
    }
    if (!Login.userId) {
        return (
            <Buttons>
                <Abutton type="button" onClick={writeNote}>
                    쪽지 남기기
                </Abutton>
                <WButton
                    type="button"
                    onClick={makeAccount}
                >
                    나도 계정 만들기
                </WButton>
                <Dday>{dday >= 0 ? `쪽지 오픈 D+${dday}` : `쪽지 오픈 D${dday}`}</Dday>
            </Buttons>
        );
    }
}

function Tree() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const userObjectId = useParams().id;
    const Login = useRecoilValue(isLoginAtom);
    const ownerName = useRecoilValue(ownerNameAtom);
    const count = useRecoilValue(countAtom);
    const setCount = useSetRecoilState(countAtom);
    const setOwnerName = useSetRecoilState(ownerNameAtom);
    const setLeaves = useSetRecoilState(temporaryTreeAtom);

    const today = new Date();
    const hours = today.getHours();
    const getUser = async () => {
        setLoading(true);
        axios
            .get(`/api/v1/users/${userObjectId}`, { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {
                    setOwnerName({ _id: response.data.userId, nick: response.data.nick });
                    setCount(response.data.message.length);
                    setLeaves(response.data.message);
                    setTimeout(() => setLoading(false), 500);
                }
            })
            .catch((err) => {
                if (err.response && err.response.status === 400) {
                    alert('존재하지 않는 트리입니다.');
                    navigate('/');
                }
            });
    };

    useEffect(() => {
        getUser();
    }, [userObjectId]);


    const clickHandler = (title) => {
        if (Login.userId === userObjectId) {
            console.log("title");
            const name = title;
        }
    };

    return (
        <div>
            {loading ? (
                <TreeSpinner />
            ) : (
                <>
                    <Container className="container">
                        {hours <= 16 && hours >= 9 ? (
                            <Count style={{ color: '#072A60' }}>
                                {ownerName.nick}님의 나무에 {count}개의 쪽지
                            </Count>
                        ) : (
                            <Count>
                                {ownerName.nick}님의 나무에 {count}개의 쪽지
                            </Count>
                        )}
                            <Time />
                            {Login.userId === userObjectId ? (
                                <Link to={{ pathname: `/list/${ownerName._id}` }}>
                                    <Treezone name="treemap">
                                        <area
                                            aria-hidden="true"
                                            onClick={() => clickHandler('tree')}
                                            shape="poly"
                                            alt="tree"
                                            coords="855,403,747,409,618,587,524,696,409,982,333,1086,281,1204,231,1412,185,1577,271,1764,301,1905,442,2052,720,2170,705,2373,625,2370,599,2422,643,2482,744,2476,790,2447,858,2437,887,2476,937,2467,964,2443,890,2401,861,2276,853,2092,899,2109,1038,2037,1206,1900,1319,1752,1377,1594,1437,1182,1377,1008,1384,1004,1155,633,1328,673,1319,554,1242,464,1204,370,964,253,838,364"
                                        />
                                    </Treezone>
                                </Link>
                            ) : null}
                            <TreeComponent />
                    </Container>
                    <Button />
                </>
            )}
        </div>
    );
}

export default Tree;
