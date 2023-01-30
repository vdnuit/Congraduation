/* eslint-disable no-unused-vars */

import { React } from 'react';
import { PropTypes } from 'prop-types';
import { toBlob } from 'html-to-image';
import styled from 'styled-components';

const Background = styled.div`
    position: fixed;
    z-index: 990;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    max-width: 500px;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    flex-direction: column;
`;
const Container = styled.div`
    width: 200px;
    height: 100px;
    z-index: 999;

    margin: 0 auto;
    max-width: 280px;
    max-height: 170px;
    width: 80vw;
    height: 50vw;
    background: #ffffff;
    box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const Text = styled.p`
    font-family: 'Jua';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 20px;
    margin: 7px 2vw;
    margin-top: 15px;
    text-align: center;

    color: #000000;
`;
const Buttons = styled.div`
    text-align: center;
`;
const Button = styled.button`
    background: #072a60;
    border-radius: 10px;
    font-family: 'Jua';
    font-style: normal;
    font-weight: 400;
    line-height: 25px;
    width: 100px;
    height: 46px;
    text-align: center;
    border: none;
    color: #ffffff;
    margin: 10px;
    &:hover {
        background: #59749D;
    }
`;

function ModalOkay({ setModalOpen }) {
    const handleShare = async () => {
        try {
            const newFile = await toBlob(document.querySelector('.container'));
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
        }catch(e){
            if(e.toString().includes('AbortError')){
                const error =e.toString().includes('AbortError');
            }
        }
    };

    const closeModal = () => {
        handleShare();
        setModalOpen(false);
    };
    const onOkay = () => {
        setModalOpen(false);
    };

    const clipboard = () => {
        if (navigator.clipboard) {
          navigator.clipboard
            .writeText(window.location.href)
            .then(() => {
              alert("링크가 복사되었습니다.");
            })
            .catch(() => {
              alert("복사를 다시 시도해주세요.");
            });
        } else {
          if (!document.queryCommandSupported("copy")) {
            alert("복사하기가 지원되지 않는 브라우저입니다.");
          }
    
          const textarea = document.createElement("textarea");
          textarea.value = window.location.href;
          textarea.style.top = 0;
          textarea.style.left = 0;
          textarea.style.position = "fixed";
    
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
          alert("링크가 복사되었습니다.");
        }
        onOkay();
      };

    return (
        <Background>
            <Container>
                <div>
                    <Text>
                        인스타스토리에 공유시
                        <br />
                        저장된 이미지를 사용해주세요
                    </Text>
                    <Buttons>
                        <Button
                            onClick={clipboard}
                            style={{
                                borderRadius: '10px',
                                margin: '5px',
                                width: '100px',
                                fontSize: '15px'
                            }}
                        >
                            링크공유
                        </Button>
                        <Button
                            onClick={closeModal}
                            style={{
                                borderRadius: '10px',
                                margin: '5px',
                                width: '100px',
                                fontSize: '15px'
                            }}
                        >
                            이미지 저장
                        </Button>
                    </Buttons>
                </div>
            </Container>
        </Background>
    );
}

ModalOkay.propTypes = {
    setModalOpen: PropTypes.func.isRequired
};

export default ModalOkay;
