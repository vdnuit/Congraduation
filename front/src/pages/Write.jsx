/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import axios from 'axios';
import { ownerNameAtom } from '../Atom';
import ColorSelect from '../components/ColorSelect';
import ShuffleImg from '../assets/shuffle.png';

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
    h5 {
        font-family: 'Jua';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #252525;
        margin-left: 10px;
        margin-top: 80px;
        margin-bottom: -5px;
    }
    h2 {
        font-family: 'Jua';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;

        color: #072a60;
        margin-left: 10px;
        margin-top: 15px;
        margin-bottom: -5px;
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
    textarea {
        border: none;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;

        color: #000000;
        width: 100%;
        height: 10rem;
    }
`;
export const Shuffle = styled.div`
    display: flex;
    justify-content: space-between;
    button {
        border: none;
        background-color: #f7f7f7;
        width: 30px;
        height: 30px;
        margin: 10px 10px -10px 0px;
    }
`;

export const StyledButton = styled.button`
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
    padding: 0.6rem;
    margin: 1rem 3rem;
    color: #ffffff;
    margin-bottom: 10vh;

    &:hover {
        background: #59749d;
    }
`;
const Circle = styled.div`
    background: #ffffff;
    padding: 10px;
    margin: 10px;
    border: 1px solid #c8c8c8;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    div {
        vertical-align: middle;
        appearance: none;
        border-radius: 50%;
        /* stroke */

        border: 1px solid #c8c8c8;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
        width: 12vw;
        max-width: 50px;
        height: 12vw;
        max-height: 50px;
    }
`;

function Write() {
    const params = useParams();
    const userObjectId = params.id;

    const navigate = useNavigate();
    const sendMessage = (dict) => {
        axios
            .post(`/api/v1/messages/${userObjectId}`, {
                withCredentials: true,

                senderNickName: dict.writer,
                content: dict.message,
                topic: dict.question,
                paperImage: dict.icon
            })
            .then((response) => {
                navigate(`/tree/${userObjectId}`);
            });
    };
    const [icon, setIcon] = useState();

    const [selectOpen, setSelectOpen] = useState(true);
    const { register, watch } = useForm();
    const IconChecked = (current) => {
        setIcon(current);
    };
    const ownerName = useRecoilValue(ownerNameAtom);
    const questions = [
        `${ownerName.nick}님이 좋아하는 것은?`,
        `${ownerName.nick}님과 함께한 가장 즐거웠던 추억은?`,
        `${ownerName.nick}님의 십 년 후 모습은 어떨까요?`,
        `${ownerName.nick}님을 동물에 비유하면?`,
        `${ownerName.nick}님과 같이 먹은 최고의 학식은?`,
        `${ownerName.nick}님의 새내기 시절은 어땠나요?`,
        `${ownerName.nick}님의 베스트 착장은 무엇인가요?`,
        `${ownerName.nick}님과 함께한 최고의/최악의 강의는?`,
        `${ownerName.nick}님에게 전하고 싶은 명언 한 마디!`,
        `${ownerName.nick}님과 함께한 술자리 추억은?`,
        `${ownerName.nick}님의 매력포인트는 무엇인가요?`,
        `${ownerName.nick}님과 함께 간 최고의 대학로 맛집은?`,
        `졸업을 앞둔 ${ownerName.nick}님에게 추천하고 싶은 영화는?`,
        `졸업을 앞둔 ${ownerName.nick}님에게 추천하고 싶은 노래는?`,
        `졸업을 앞둔 ${ownerName.nick}님에게 추천하고 싶은 책은?`,
        `${ownerName.nick}님의 귀여운 주사는?`,
        `${ownerName.nick}님은 공강시간에 무엇을 하나요?`,
        `${ownerName.nick}님과 함께한 일탈이 있나요?`,
        `${ownerName.nick}님이 제일 멋졌던 순간은?`,
        `${ownerName.nick}님은 줌 강의를 어떻게 들었나요?`,
        `다른 사람들은 모르는 ${ownerName.nick}님의 습관은?`,
        `${ownerName.nick}님과 함께 여행 가고싶은 나라는?`,
        `${ownerName.nick}님이 한 가장 웃긴 말실수는?`,
        `${ownerName.nick}님이 가장 잘 부르는 노래는?`,
        `${ownerName.nick}님에게 가장 부러운 점은?`,
        `${ownerName.nick}님과 가장 닮고 싶은 점은?`,
        `${ownerName.nick}님에게 추천하고 싶은 인스타/유튜브 채널은?`,
        `${ownerName.nick}님이 틱토커/유튜버라면 분야는?`,
        `${ownerName.nick}님에게 어울리는 취미는?`,
        `${ownerName.nick}님과 함께하고 싶은 활동이 있다면?`,
        `${ownerName.nick}님에게 가장 어울리는/어울리지 않는 전공은?`,
        `${ownerName.nick}님을 전공과 함께 소개해주세요!`,
        `${ownerName.nick}님과 처음 만난 장소/행사는?`,
        `${ownerName.nick}님과 우연히 만난 장소는? (ex. 경영관 벤치)`,
        `${ownerName.nick}님과 함께하지 못해 아쉬운 활동이 있다면?`,
        `${ownerName.nick}님에게 가장 어울리는 우리 학교 동아리는?`,
        `${ownerName.nick}님과 함께 도전하고 싶은 것이 있다면?`,
        `${ownerName.nick}님에게 가장 전하고 싶었던 말은?`,
        `${ownerName.nick}님이 가장 잘하는/못하는 술게임은 무엇인가요?`,
        `${ownerName.nick}님의 이상형은 무엇인가요?`,
        `${ownerName.nick}님이 아이돌로 데뷔한다면 포지션은?`,
        `${ownerName.nick}님 이름으로 삼행시!`,
        `${ownerName.nick}님이 남자/여자로 태어난다면?`,
        `${ownerName.nick}님이 가장 좋아하는 학교 내 장소는?`,
        `멀리서도 알아볼 수 있는 ${ownerName.nick}님만의 특징은?`,
        `학교생활 중 ${ownerName.nick}님에게 일어난 신기한 일이 있다면?`,
        `${ownerName.nick}님의 헌내기 시절은 어땠나요?`,
        `n년 간의 학교생활 중, ${ownerName.nick}님에게 가장 고마웠던 일은?`,
        `${ownerName.nick}님의 선배미를 볼 수 있는 일화를 알려주세요!`,
        `${ownerName.nick}님과 가장 닮은 연예인/캐릭터는?`,
        `${ownerName.nick}님의 학교생활을 단 한 줄로 요약하자면?`,
        `${ownerName.nick}님의 시간표에 대한 평가는?`,
        `${ownerName.nick}님의 첫인상은?`,
        `${ownerName.nick}님의 의외의 귀여운 점은?`,
        `${ownerName.nick}님에게 가장 잘 어울리는 인생곡은?`,
        `${ownerName.nick}님의 퍼스널 컬러를 예측하자면?`,
        `${ownerName.nick}님의 MBTI는 이것일 것 같다!`,
        `${ownerName.nick}님의 깻잎을 누군가 떼어준다면 내 반응은?`,
        `${ownerName.nick}님과 가장 닮은 연예인은?`
    ];
    function randomNum(min, max) {
        const randNum = Math.floor(Math.random() * (max - min)) + min;
        return randNum;
    }
    const [index, setIndex] = useState(randomNum(0, questions.length));

    const SubmitEvent = () => {
        if (watch().message === '' || watch().writer === '') {
            alert('편지와 작성자 분의 성함을 모두 적어주세요!');
            return 0;
        }
        const dict = {
            ...watch(),
            question: questions[index],
            icon: require(`../assets/icons/icon${icon}.png`)
        };
        sendMessage(dict);
        return 1;
    };
    const showSelect = () => {
        setSelectOpen(true);
    };

    return (
        <Container>
            <h5>쪽지 색</h5>
            <Circle onClick={showSelect}>
                <div
                    style={{
                        backgroundImage: `url("https://github.com/vdnuit/Congraduation/blob/vdnuit/front/src/assets/icons/select${icon}.png?raw=true")`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                    }}
                />
            </Circle>
            {selectOpen ? (
                <ColorSelect IconChecked={IconChecked} setSelectOpen={setSelectOpen} />
            ) : null}
            <Shuffle>
                <h3>랜덤 주제</h3>
                <button
                    type="button"
                    onClick={() => {
                        setIndex(randomNum(0, questions.length));
                    }}
                >
                    <img src={ShuffleImg} alt="셔플버튼" />
                </button>
            </Shuffle>

            <GreyBox>
                <p>{questions[index]}</p>
            </GreyBox>

            <form>
                <h2>TO. {ownerName.nick}</h2>
                <GreyBox>
                    <textarea
                        {...register('message')}
                        placeholder="졸업을 축하하는 말과 함께 질문에 대한 답변과 그 이유를 입력해주세요."
                    />
                </GreyBox>

                <h2>From.</h2>
                <GreyBox>
                    <input
                        {...register('writer')}
                        placeholder="작성자 분의 이름을
                     입력하세요"
                    />
                </GreyBox>
            </form>
            <StyledButton
                type="button"
                onClick={() => {
                    SubmitEvent();
                }}
            >
                작성 완료
            </StyledButton>
        </Container>
    );
}

export default Write;
/* eslint-disable global-require */
