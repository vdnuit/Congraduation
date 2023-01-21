import { React } from 'react';
import styled from 'styled-components';
import Spinner from '../assets/Spinner.gif';

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

const Img = styled.img`
    width: 20%;
`;


function LeafSpinner() {
    
    return (
        <Container>
                <Empty>
                    <Img src={Spinner} alt="로딩중" />
                </Empty>
        </Container>
    );
}

export default LeafSpinner;