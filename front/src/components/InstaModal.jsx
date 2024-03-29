/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */

import { React, useRef } from 'react';
import { PropTypes } from 'prop-types';
import * as htmlToImage from 'html-to-image';
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
    padding: 8px 12px 8px 12px;
    margin: 0 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
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
        background: #59749d;
    }
`;

const WButton = styled.button`
    background: #c8c8c8;
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
        background: #e7e7e7;
    }
`;

function InstaModal({ setModalOpen }) {
    const Leaf = useRecoilValue(leafAtom);
    const closeModal = () => {
        setModalOpen(false);
    };

    const handleShare = async () => {
        const UA = navigator.userAgent.toLowerCase();
        if(UA.indexOf('android') > -1){
            htmlToImage.toBlob(document.querySelector('.modal')).then((blob) => {
            const data = {
                title: 'Letter',
                files: [
                    new File([blob], 'letter.png', {
                        type: blob.type
                    })
                ],
            };

            toBlob(document.querySelector('.modal')).then((blob1) => {
                const data1 = {
                    title: 'Letter',
                    files: [
                        new File([blob1], 'letter.png', {
                            type: blob1.type
                        })
                    ],
                };

                if(navigator.canShare && navigator.canShare(data1)){
                    try {
                        navigator.share(data1);
                    } catch (error) {
                        alert('이미지를 공유할 수 없습니다.');
                    }
                } else {
                    alert("이미지 공유를 지원하지 않는 브라우저입니다.");
                }
            })

        })
        }
        if(UA.indexOf('iphone')>-1){
            htmlToImage.toBlob(document.querySelector('.modal')).then((blob1) => {
                const data1 = {
                    title: 'Letter',
                    files: [
                        new File([blob1], 'letter.png', {
                            type: blob1.type
                        })
                    ],
                };
                toBlob(document.querySelector('.modal')).then((blob2) => {
                    const data2 = {
                        title: 'Letter',
                        files: [
                            new File([blob2], 'letter.png', {
                                type: blob2.type
                            })
                        ],
                    };
    
                    toBlob(document.querySelector('.modal')).then((blob3) => {
                        const data3 = {
                            title: 'Letter',
                            files: [
                                new File([blob3], 'letter.png', {
                                    type: blob3.type
                                })
                            ],
                        };
    
                        toBlob(document.querySelector('.modal')).then((blob4) => {
                            const data4 = {
                                title: 'Letter',
                                files: [
                                    new File([blob4], 'letter.png', {
                                        type: blob4.type
                                    })
                                ],
                            };
    
                            toBlob(document.querySelector('.modal')).then((blob5) => {
                                const data5 = {
                                    title: 'Letter',
                                    files: [
                                        new File([blob5], 'letter.png', {
                                            type: blob5.type
                                        })
                                    ],
                                };
    
                                toBlob(document.querySelector('.modal')).then((blob6) => {
                                    const data6 = {
                                        title: 'Letter',
                                        files: [
                                            new File([blob6], 'letter.png', {
                                                type: blob6.type
                                            })
                                        ],
                                    };
    
                                    if(navigator.canShare && navigator.canShare(data6)){
                                        try {
                                             navigator.share(data6);
                                        } catch (error) {
                                            alert('이미지를 공유할 수 없습니다.');
                                        }
                                    } else {
                                        alert("이미지 공유를 지원하지 않는 브라우저입니다.");
                                    }
                                })
                            })
                        })   
                    })
                })
            })
        }
    }
    
    

    return (
        <Background>
            <Modal>
                <ModalDiv className="modal">
                    <TreeBackground src={InstaStory} alt="밤 배경 은행나무" />
                    <Container>
                        <Box>
                            <Div>
                                <GreyBox>
                                    <p
                                        className="element1"
                                        style={{ fontSize: '1.5vh', lineHeight: '1.8vh' }}
                                    >
                                        {Leaf.topic}
                                    </p>
                                </GreyBox>
                            </Div>
                            <GreyBox>
                                <p
                                    className="element2"
                                    style={{
                                        textAlign: 'justify',
                                        fontSize: '1.5vh',
                                        lineHeight: '1.8vh'
                                    }}
                                >
                                    {Leaf.content}
                                </p>
                            </GreyBox>
                            <h4
                                style={{
                                    width: '93%',
                                    fontSize: '2.5vh',
                                    display: 'block',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    textAlign: 'right'
                                }}
                            >
                                From. {Leaf.senderNickName}
                            </h4>
                        </Box>
                    </Container>
                </ModalDiv>
                <Buttons>
                    <Button onClick={handleShare}>저장</Button>
                    <WButton onClick={closeModal}>닫기</WButton>
                </Buttons>
            </Modal>
            )
        </Background>
    );
}

InstaModal.propTypes = {
    setModalOpen: PropTypes.func.isRequired
};

export default InstaModal;
