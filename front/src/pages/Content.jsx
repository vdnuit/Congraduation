import React, { useRef } from 'react';
// import { useForm } from 'react-hook-form';

import { toBlob } from 'html-to-image';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { ownerNameAtom, temporaryTreeAtom } from '../Atom';
import trash from '../assets/trash.png';

const Container = styled.div`
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #f7f7f7;
    h3 {
        font-family: 'Jua';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #252525;
        margin-left: 10px;
        margin-top: 15px;
        margin-bottom: -5px;
    }
    h2 {
        font-family: 'Jua';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 30px;
        color: #072a60;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 5px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    h4 {
        font-family: 'Jua';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        text-align: right;
        color: #072a60;
        margin-right: 10px;
        margin-top: 5px;
        margin-bottom: 50px;
    }
`;
const GreyBox = styled.div`
    background: #ffffff;
    padding: 10px;
    margin: 10px;
    border: 1px solid #c8c8c8;
    border-radius: 10px;
    p {
        margin: 5px 0px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 19px;
        text-align: center;
        color: #252525;
    }
    input {
        border: none;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #000000;
        width: 100%;
    }
    p {
        border: none;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #000000;
        width: 100%;
    }
`;

const StyledButton = styled.button`
    text-decoration: none;
    border: none;
    background: #072a60;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 100px;
    font-family: 'Jua';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    color: #ffffff;
    width: 67.5%;
    height: 3.5rem;
`;

const StyledBtn = styled.button`
    text-decoration: none;
    border: none;
    background: #ffffff;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 100px;
    font-family: 'Jua';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    color: #7c7c7c;
    width: 67.5%;
    height: 3.5rem;
`;

const Div = styled.div`
    margin-top: 3rem;
    margin-bottom: 1rem;
`;

const ButtonDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
    height: 7.5rem;
`

const Img = styled.img`
    width: 23%;
    margin-right: 5%;
`;

const Button = styled.button`
    background: #072A60;
    border-color: #072A60;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
    border-radius: 300px;
    color: #FFFFFF;
    font-family: 'Jua';
    font-style: normal;
    font-size: 14px;
    text-align: center;
    width: 24.1%;
    line-height: 18px;
    padding: 4px 12px;
    gap: 4px;
    `
    
function Content() {
    const ownerName = useRecoilValue(ownerNameAtom);
    const leaves = useRecoilValue(temporaryTreeAtom);
    const imageRef = useRef(null);
    const handleShare = async() => {
        const newFile = await toBlob(imageRef.current);
        const data = {
            files: [
                new File([newFile], 'image.png', {
                    type: newFile.type,
                }),
            ],
            title: 'Image',
            text: 'image',
        };

        try {
            if(!navigator.canShare(data)){
                alert("???????????? ????????? ??? ????????????.");
            }
            await navigator.share(data);
        } catch(err){
            console.error(err);
        }
    }

    return (
        <Container>
            <div ref={imageRef}>
                <Div>
                    <GreyBox>
                        <p>{leaves[0].question}</p>
                    </GreyBox>
                </Div>

                <h2>
                    <p>To. {ownerName.nick}</p>
                    <Button type="button"><Img src={trash} alt="trash"/>??????</Button>
                </h2>
                <GreyBox>
                    <p>{leaves[0].message}</p>
                </GreyBox>
                <h4>From. {leaves[0].writer}</h4>
            </div>
            <ButtonDiv>
                <StyledButton type="button" onClick={handleShare}>????????? ????????????</StyledButton>
                <StyledBtn type="button">????????? ????????????</StyledBtn>
            </ButtonDiv>
        </Container>
    );
}

export default Content;
