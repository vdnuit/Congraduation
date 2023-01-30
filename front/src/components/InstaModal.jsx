/* eslint-disable no-unused-vars */
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
    margin: 6% 6%;
    width: 40vh;
    height: 70vh;
    max-width: 400px;
    text-align: center;
`;

const ModalDiv = styled.div`
    position: absolute;
    width: 39vh;
    height: 69vh;
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
    top: 15%;
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
    filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25));
    padding: 8px 12px 8px 12px;
    margin: 0 10px;
    border-radius: 5px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
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
        font-size: 14px;
        line-height: 17px;
        color: #000000;
        width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 20;
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
    &:hover {
        background: #59749D;
    }
`;

const WButton = styled.button`
    background: #C8C8C8;
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
    color: #252525;
    margin: 10px;
    &:hover {
        background: #E7E7E7;
    }
`;

function InstaModal({ setModalOpen }) {
    const Leaf = useRecoilValue(leafAtom);
    const closeModal = () => {
        setModalOpen(false);
    };
    const imageRef = useRef(null);

    const handleShare = async () => {
        try {
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
                alert("이미지 공유를 지원하지 않는 브라우저입니다.");
            }
        } catch(e){
            if(e.toString().includes('AbortError')){
                const error =e.toString().includes('AbortError');
            }
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
                                        <p style={{ fontSize: '12px', lineHeight: '15px' }}>
                                            {Leaf.topic}
                                        </p>
                                    </GreyBox>
                                </Div>
                                <GreyBox>
                                    <p
                                        style={{
                                            textAlign: 'justify',
                                            fontSize: '12px',
                                            lineHeight: '15px'
                                        }}
                                    >
                                        {Leaf.content}
                                    </p>
                                </GreyBox>
                                <h4 style={{ width: "60%", fontSize: '2.5vh', display: "block", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", textAlign: "right"}}>From. {Leaf.senderNickName}</h4>
                            </Box>
                        </Container>
                    </ModalDiv>
                    <Buttons>
                        <Button onClick={handleShare}>저장</Button>
                        <WButton
                            onClick={closeModal}
                        >
                            닫기
                        </WButton>
                    </Buttons>
                </Modal>
            )
        </Background>
    )
}

InstaModal.propTypes = {
    setModalOpen: PropTypes.func.isRequired
};

export default InstaModal;
