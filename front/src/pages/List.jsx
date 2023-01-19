/* eslint no-underscore-dangle: 0 */

import { React, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';
import { countAtom, temporaryTreeAtom } from '../Atom';
import Leaf from '../components/Leaf';
import { StyledLink } from './Main';

const Container = styled.div`
    width: 100%;
    max-width: 500px;
    height: 93vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
`;

const Count = styled.div`
    position: absolute;
    width: 25%;
    height: 2.5%;
    left: 30px;
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
    height: 93vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #f5f5f5;
`;

const Grid = styled.div`
    position: absolute;
    width: 100%;
    max-width: 500px;
    top: 120px;
    display: grid;
    grid-template-rows: repeat(auto-fill, 1fr);
    grid-template-columns: repeat(3, 1fr);
    gap: 4%;
    margin: 0 auto;

`;

export const clip = () => {
    navigator.clipboard.writeText(window.location.href);
    console.log("done")
}

function List() {
    const params = useParams();
    const count = useRecoilValue(countAtom);
    const leaves = useRecoilValue(temporaryTreeAtom);
    const setLeaves = useSetRecoilState(temporaryTreeAtom);
    const getMessage = () => {
        axios
        .get(`/api/v1/messages/${params.id}`)
        .then((response) => {
            if(response.status === 200){
                setLeaves(response.data);
            }
        })
    }

    useEffect(() => {
        getMessage()
    },[])

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
            <Grid>
                {leaves.map((leaf) => (
                    <Link to = {{ pathname : `/content/${params.id}/${leaf._id}`}}>
                        <Leaf key={leaf._id} id={leaf._id} icon={leaf.paperImage} />
                    </Link>
                ))}
            </Grid>
        </StyledGrid>
    );
}

export default List;
