/* eslint no-underscore-dangle: 0 */

import { React, useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import LeafSpinner from '../components/LeafSpinner';
import InstaModal from '../components/InstaModal';
import { leafAtom, ownerNameAtom, isLoginAtom } from '../Atom';
import trash from '../assets/trash.png';

const Container = styled.div`
    width: 100%;
    position: absolute;
    z-index: 10;
    top: 0px;
    left: 0px;
    max-width: 500px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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
        width: 80%;
        margin-left: auto;
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
        display: block;
    }
`;

const GreyBox = styled.div`
    background: #ffffff;
    padding: 10px 15px 10px 15px;
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
        white-space: normal;
        word-break: break-all;
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
    &:hover {
        background: #59749D;
    }
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
`;

const Img = styled.img`
    width: 23%;
    margin-right: 5%;
`;

const Button = styled.button`
    background: #072a60;
    border-color: #072a60;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
    border-radius: 300px;
    color: #ffffff;
    font-family: 'Jua';
    font-style: normal;
    font-size: 14px;
    text-align: center;
    width: 24.1%;
    line-height: 18px;
    padding: 4px 12px;
    gap: 4px;
    &:hover {
        background: #59749D;
    }
`;

function Content() {
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const ownerName = useRecoilValue(ownerNameAtom);
    const Login = useRecoilValue(isLoginAtom);
    const setLeaf = useSetRecoilState(leafAtom);
    const Leaf = useRecoilValue(leafAtom);
    const imageRef = useRef(null);
    const params = useParams();
    const userObjectId = params.userid;
    const messageId = params.messageid;
    const navigate = useNavigate();
    const getMessage = () => {
        if (Login.userId === userObjectId) {
            setLoading(true);
            axios
                .get(`api/v1/messages/${userObjectId}/${messageId}`)
                .then((response) => {
                    setLeaf(response.data);
                })
                .then(setLoading(false));
        }
        if (Login.userId !== userObjectId) {
            navigate('/');
        }
    };

    const deleteMessage = () => {
        axios.delete(`api/v1/messages/${messageId}`).then((response) => {
            if (response.status === 200) {
                alert('삭제되었습니다.');
                navigate(`/list/${userObjectId}`);
            }
        });
    };

    const showModal = () => {
        setModalOpen(true);
    };

    useEffect(() => {
        setTimeout(getMessage, 500);
    }, []);

    return (
        <div>
            {loading ? (
                <LeafSpinner />
            ) : (
                <Container>
                    <div style={{ marginTop: '60px' }} ref={imageRef}>
                        <Div>
                            <GreyBox>
                                <p>{Leaf.topic}</p>
                            </GreyBox>
                        </Div>

                        <h2>
                            <h4 style={{textAlign:'left', margin: '10px 100px 0px 10px'}}>To. {ownerName.nick}</h4>
                            <Button type="button" onClick={deleteMessage}>
                                <Img src={trash} alt="trash" />
                                삭제
                            </Button>
                        </h2>
                        <GreyBox>
                            <p style={{textAlign:'justify'}}>{Leaf.content}</p>
                        </GreyBox>
                        <h4>From. {Leaf.senderNickName}</h4>
                    </div>
                    <ButtonDiv>
                        <StyledButton type="button" onClick={showModal}>
                            스토리 공유하기
                        </StyledButton>
                        {modalOpen && <InstaModal setModalOpen={setModalOpen} />}
                    </ButtonDiv>
                </Container>
            )}
        </div>
    );
}

export default Content;
