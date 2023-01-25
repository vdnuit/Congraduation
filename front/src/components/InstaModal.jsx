import { React, useRef } from 'react';
import { PropTypes } from 'prop-types';
import { toBlob } from 'html-to-image';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { leafAtom } from '../Atom';
import InstaStory from '../assets/InstaStory.png';

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
    top: 50vh;
    left: 45%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    margin: 5% 5%;
    width: 40vh;
    height: 60vh;
    max-width: 400px;
    text-align: center;
`;

const ModalDiv = styled.div`
    position: absolute;
    top: 1%;
    width: 100%;
    height: 93%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TreeBackground = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    width: 100%;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
`;

const Container = styled.div`
    z-index: -1;
    width: 88%;
    height: 88%;
    position: absolute;
    top: 5%;
`;

const Box = styled.div`
    border-radius: 1vh;
    position: absolute;
    // top: 10%;
    width: 99%;
    height: 95%;
    text-align: center;
`;

const GreyBox = styled.div`
    background: #ffffff;
    padding: 8px;
    margin: 0 10px;
    border: 1px solid #c8c8c8;
    border-radius: 1vh;
    // p {
    //     margin: 5px 0px;
    //     font-family: 'Inter';
    //     font-style: normal;
    //     font-weight: 500;
    //     font-size: 0.7vh;
    //     line-height: 19px;
    //     text-align: center;
    //     color: #252525;
    // }
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
        font-size: 0.7vh;
        line-height: 17px;
        color: #000000;
        width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 10;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        word-break: break-all;
    }
`;

const Div = styled.div`
    // margin-top: 3rem;
    margin-bottom: 0.5vh;
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: absolute;
    top: 87.5%;
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
    width: 30%;
    height: 40px;
    text-align: center;
    border: none;
    color: #ffffff;
    margin: 10px;
`;

function InstaModal({ setModalOpen }) {
    const Leaf = useRecoilValue(leafAtom);
    const closeModal = () => {
        setModalOpen(false);
    };
    const imageRef = useRef(null);

    const handleShare = async () => {
        const newFile = await toBlob(imageRef.current);
        const data = {
            files: [
                new File([newFile], 'image.png', {
                    type: newFile.type
                })
            ],
            title: 'Image',
            text: 'image'
        };

        try {
            if (!navigator.canShare(data)) {
                alert('이미지를 공유할 수 없습니다.');
            }
            await navigator.share(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Background>
            <Modal>
                <ModalDiv ref={imageRef}>
                    <TreeBackground src={InstaStory} alt="밤 배경 은행나무" />
                    <Container>
                        <Box>
                            <Div>
                                <GreyBox>
                                    <p style={{ fontSize: '0.7vh', lineHeight: '2.2vh' }}>
                                        {Leaf.topic}
                                    </p>
                                </GreyBox>
                            </Div>
                            <GreyBox>
                                <p style={{ fontSize: '0.7vh', lineHeight: '2.2vh' }}>
                                    {Leaf.content}
                                </p>
                            </GreyBox>
                            <h4 style={{ fontSize: '2.5vh' }}>From. {Leaf.senderNickName}</h4>
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
