import { React, useRef } from 'react';
import { PropTypes } from 'prop-types';
import { toBlob } from 'html-to-image';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { leafAtom } from '../Atom';
import TreeNight from '../assets/treenight.png';
import CapLogo from '../assets/CapLogoImg.png';

const Background = styled.div`
    position: fixed;
    z-index: 990;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    max-width: 500px;
    background-color: rgba(0, 0, 0, 0.7);
`;

const Modal = styled.div`
  z-index: 999;
  position: absolute;
  top: 65vh;
  left: 45%;
  transform: translate(-50%, -50%);
  margin: 5% 5%;
  width: 80%;
  height: 100%;
  max-width: 400px;
  text-align: center;
`

const ModalDiv = styled.div`
    width: 100%;
    height: 77%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const TreeBackground = styled.img`
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    width: 100%;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
`;

const Container = styled.div`
    z-index: -1;
    width: 90%;
    height: 90%;
`;

const Box = styled.div`
    background: rgba(255, 255, 255, 0.25);
    border: 0.3px solid #ffffff;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(17.5px);
    border-radius: 10px;
    width: 100%;
    height: 100%;
    text-align: center;
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
        font-size: 13px;
        line-height: 17px;
        color: #000000;
        width: 100%;
    }
`;

const Div = styled.div`
    margin-top: 3rem;
    margin-bottom: 1rem;
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: absolute;
    top: 70%;
    width: 100%;
`;

const Button = styled.button`
    background: #072a60;
    border-radius: 10px;
    font-family: 'Jua';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    width: 20%;
    height: 43px;
    text-align: center;
    border: none;
    color: #ffffff;
    margin: 10px;
`;

const Img = styled.div`
    position: absolute;
    z-index: 50;
    width: 100px;
    height: 50px;
`


function InstaModal({ setModalOpen }) {
    const Leaf = useRecoilValue(leafAtom);
    const closeModal = () => {
        setModalOpen(false);
    };
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
                alert("이미지를 공유할 수 없습니다.");
            }
            await navigator.share(data);
        } catch(err){
            console.error(err);
        }
    }

    return (
        <Background>
            <Modal>
                <ModalDiv ref={imageRef}>
                    <TreeBackground src={TreeNight} alt="밤 배경 은행나무" />
                    <Container>
                        <Box>
                            <Img src={CapLogo} alt="logo"/>
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
                    </Container>
                 </ModalDiv>
                <Buttons>
                    <Button onClick={handleShare}>저장</Button>
                    <Button
                        style={{ backgroundColor: '#C8C8C8', color: '#252525' }}
                        onClick={closeModal}
                    >
                        닫기
                    </Button>
                </Buttons>
            </Modal>
        </Background>
    );
}

InstaModal.propTypes = {
    setModalOpen: PropTypes.func.isRequired
};

export default InstaModal;