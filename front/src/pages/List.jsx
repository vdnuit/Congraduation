/* eslint no-underscore-dangle: 0 */
/* eslint-disable no-unused-vars */

import { React, useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';
import LeafSpinner from '../components/LeafSpinner';
import { countAtom, temporaryTreeAtom, isLoginAtom } from '../Atom';
import Leaf from '../components/Leaf';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
`;

const Count = styled.div`
    position: absolute;
    // width: 100%;
    height: 2.5%;
    left: 16px;
    top: 88px;
    font-family: 'Jua';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #252525;
`;

const Empty = styled.div`
    width: 70%;
    margin-left: 3%;
    margin-top: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Announce = styled.div`
    width: 85%;
    font-family: 'Jua';
    font-style: normal;
    font-weight: 400;
    font-size: 23px;
    line-height: 150.02%;
    /* or 36px */
    text-align: center;
    /* main */
    color: #072a60;
`;

const Div = styled.div`
    width: 80%;
`;

const StyledLink = styled(Link)`
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
        &:hover {
            background: #59749D;
        }
    }
`;

const StyledGrid = styled.div`
    width: 100%;
    max-width: 500px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #f5f5f5;
`;

const Flex = styled.div`
    position: relative;
    top: 120px;
    width: 97.5%;
    /* Firefox */
    height: -moz-calc(100% - 120px);
    /* WebKit */
    height: -webkit-calc(100% - 120px);
    /* Opera */
    height: -o-calc(100% - 120px);
    /* Standard */
    height: calc(100% - 120px);
    // height: 70vh;
    overflow: auto;
    max-width: 500px;
    display: flex;
    justify-content: center;
    -ms-overflow-style: none;
    scrollbar-width: none;

    ::-webkit-scrollbar {
        display: none;
    }
`;

const Grid = styled.div`
    position: absolute;
    z-index: 10;
    width: 94.55%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 7.5%;
    grid-row-gap: 4%;
`;

function UI() {
    const count = useRecoilValue(countAtom);
    const leaves = useRecoilValue(temporaryTreeAtom);
    const clipboard = async () => {
            if (navigator.clipboard) {
            navigator.clipboard
                .writeText(window.location.href)
                .then(() => {
                alert("링크가 복사되었습니다.");
                })
                .catch(() => {
                alert("복사를 다시 시도해주세요.");
                });
            } else {
            if (!document.queryCommandSupported("copy")) {
                alert("복사하기가 지원되지 않는 브라우저입니다.");
            }
        
            const textarea = document.createElement("textarea");
            textarea.value = window.location.href;
            textarea.style.top = 0;
            textarea.style.left = 0;
            textarea.style.position = "fixed";
        
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            alert("링크가 복사되었습니다.");
            }
      };

    if (count === 0) {
        return (
            <Container>
                <Count>받은 쪽지 수 {count}</Count>
                <Empty>
                    <Announce>
                        <div>쪽지를 받을 수 있도록</div>
                        <div>링크를 공유해보세요!</div>
                    </Announce>
                </Empty>
                <Div>
                    <StyledLink onClick={clipboard}>
                        <h2>공유하기</h2>
                    </StyledLink>
                </Div>
            </Container>
        );
    }
    return (
        <StyledGrid>
            <Count>받은 쪽지 수 {count}</Count>
            <Flex>
                <Grid>
                    {leaves.map((leaf) => (
                        <Leaf key={leaf._id} id={leaf._id} icon={leaf.paperImage} />
                    ))}
                </Grid>
            </Flex>
        </StyledGrid>
    );
}

function List() {
    const params = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const Login = useRecoilValue(isLoginAtom);
    const setCount = useSetRecoilState(countAtom);
    const setLeaves = useSetRecoilState(temporaryTreeAtom);
    const getMessage = () => {
        if (Login.userId === params.id) {
            setLoading(true);
            axios
                .get(`/api/v1/messages/${params.id}`)
                .then((response) => {
                    if (response.status === 200) {
                        setLeaves(response.data);
                        setCount(response.data.length);
                    }
                })
                .then(setLoading(false));
        }
        if (Login.userId !== params.id) {
            navigate('/');
        }
    };

    useEffect(() => {
        setTimeout(getMessage, 500);
    }, []);

    return <div>{loading ? <LeafSpinner /> : <UI />}</div>;
}

export default List;
