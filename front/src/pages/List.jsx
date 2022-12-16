import { React } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { countAtom,temporaryTreeAtom } from '../Atom';
import Leaf from '../components/Leaf';
import { StyledLink } from './Main';

const Container = styled.div`
    max-width: 500px;
    height: 93.3vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #F5F5F5;
`;

const Count = styled.div`
    position: absolute;
    width: 100px;
    height: 20px;
    left: 30px;
    top: 88px;

    font-family: 'Jua';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;

    color: #252525;
`

const Empty = styled.div`
    position: absolute;
    width: 241px;
    height: 102px;
    left: 129.5px;
    top: 350px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Announce = styled.div`
    width: 200px;
    font-family: 'Jua';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 150.02%;
    /* or 36px */

    text-align: center;

    /* main */

    color: #072A60;
`

const Div = styled.div`
    width: 303px;
`

const Grid = styled.div`
    position: absolute;
    top: 115px;
    display: grid;
    grid-template-rows: repeat(auto-fill, 1fr);
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 18px;
`

function List(){
    const count = useRecoilValue(countAtom);
    const leaves = useRecoilValue(temporaryTreeAtom)
    if(count===0){
        return (
            <Container>
                <Count>받은 쪽지 수 {count}</Count>
                <Empty>
                    <Announce>쪽지를 받을 수 있도록 링크를 공유해보세요!</Announce>
                </Empty>
                <Div>
                    <StyledLink>
                        <h2>공유하기</h2>
                    </StyledLink>
                </Div>
            </Container>
        )
    } return (
        <Container>
            <Count>받은 쪽지 수 {count}</Count>
            <Grid>
                {leaves.map((leaf)=> (<Leaf key={leaf.id} id={leaf.id} icon={leaf.icon}/>))}
            </Grid>
        </Container>
    )
}

export default List;