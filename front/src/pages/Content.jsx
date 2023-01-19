import { React, useRef, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toBlob } from 'html-to-image';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { leafAtom, ownerNameAtom } from '../Atom';
import trash from '../assets/trash.png';
// import TreeNight from '../assets/treenight.png';

const Container = styled.div`
    width: 100%;
    position: absolute;
    top: 63px;
    left: 0px;
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

/* const ImageContainer = styled.div`
    z-index: -1;

    position: absolute;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Box = styled.div`
    background: rgba(255, 255, 255, 0.25);
    border: 0.3px solid #ffffff;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(17.5px);
    border-radius: 10px;
    margin: 8% 5%;
    width: 90%;
    height: 180vw;
    max-height: 800px;
    text-align: center;
    margin-top 100px;
`;

const TreeBackground = styled.img`
    position: absolute;
    top: 62px;
    left: 0px;

    z-index: -1;
    width: 100%;
    max-width: 500px;
`; */

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
/* function Image() {
    const Leaf = useRecoilValue(leafAtom);
    return (
        <ImageContainer>
            <TreeBackground src={TreeNight} alt="밤 배경 은행나무" />
            <Box>
                <Div>
                    <GreyBox>
                        <p>{Leaf.topic}</p>
                    </GreyBox>
                </Div>
                <GreyBox>
                    <p>{Leaf.content}</p>
                </GreyBox>
                <h4>From. {Leaf.senderNickName}</h4>
            </Box>
        </ImageContainer>
    );
} */
    
function Content() {
    const ownerName = useRecoilValue(ownerNameAtom);
    const setLeaf = useSetRecoilState(leafAtom);
    const Leaf = useRecoilValue(leafAtom);
    const imageRef = useRef(null);
    const params = useParams();
    const userObjectId = params.userid;
    const messageId = params.messageid;
    const getMessage = () => {
        axios
        .get(`api/v1/messages/${userObjectId}/${messageId}`)
        .then((response) => {
            setLeaf(response.data);
        })
    }

    const deleteMessage = () => {
        axios
        .delete(`api/v1/messages/${messageId}`)
        .then((response) => {
            console.log(response.data.message)
        })
    }
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
                alert("이미지를 공유할 수 없습니다.");
            }
            await navigator.share(data);
        } catch(err){
            console.error(err);
        }
    }


    useEffect(() => {
        getMessage()
    }, [])

    return (
        <Container>
            <div ref={imageRef}>
                <Div>
                    <GreyBox>
                        <p>{Leaf.topic}</p>
                    </GreyBox>
                </Div>

                <h2>
                    <p>To. {ownerName.nick}</p>
                    <Button type="button" onClick={deleteMessage}><Img src={trash} alt="trash"/>삭제</Button>
                </h2>
                <GreyBox>
                    <p>{Leaf.content}</p>
                </GreyBox>
                <h4>From. {Leaf.senderNickName}</h4>
            </div>
            <ButtonDiv>
                <StyledButton type="button" onClick={handleShare}>스토리 공유하기</StyledButton>
                <StyledBtn type="button">이미지 다운로드</StyledBtn>
            </ButtonDiv>
        </Container>
    );
}

export default Content;
