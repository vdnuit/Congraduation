/* eslint no-underscore-dangle: 0 */

import { React, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';
import LeafSpinner from '../components/LeafSpinner';
import { countAtom, temporaryTreeAtom, isLoginAtom } from '../Atom';
import Leaf from '../components/Leaf';
import { StyledLink } from './Main';

const Container = styled.div`
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
`;

const Count = styled.div`
    position: absolute;
    width: 100%;
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
    height: 12.5%;
    margin-left: 3%;
    margin-top: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Announce = styled.div`
    width: 85%;
    font-family: 'Jua';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 150.02%;
    /* or 36px */
    text-align: center;
    /* main */
    color: #072a60;
`;

const Div = styled.div`
    width: 80%;
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
    height: 80vh;
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
    const clip = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('링크가 복사되었습니다.');
    };
    if (count === 0) {
        return (
            <Container>
                <Count>받은 쪽지 수 {count}</Count>
                <Empty>
                    <Announce>쪽지를 받을 수 있도록 링크를 공유해보세요!</Announce>
                </Empty>
                <Div>
                    <StyledLink onClick={clip}>
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
