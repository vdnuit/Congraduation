/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { ownerNameAtom } from '../Atom';
import ColorSelect from '../components/ColorSelect';

function Write() {
    const [icon, setIcon] = useState();
    const { register, watch } = useForm();
    const IconChecked = (current) => {
        setIcon(current);
    };
    const ownerName = useRecoilValue(ownerNameAtom);
    useEffect(() => {
        console.log(icon);
    }, [icon]);
    // const [temporaryTree, setTree] = useRecoilValue(temporaryTreeAtom);
    const questions = [
        `${ownerName}님이 좋아하는 것은?`,
        `${ownerName}님과 함께한 가장 즐거웠던 추억은?`,
        `${ownerName}님의 십 년 후 모습은 어떨까요?`,
        `${ownerName}님을 동물에 비유하면?`,
        `${ownerName}님과 같이 먹은 최고의 학식은?`,
        `${ownerName}님의 새내기 시절은 어땠나요?`,
        `${ownerName}님의 베스트 착장은 무엇인가요?`,
        `${ownerName}님과 함께한 최고의/최악의 강의는?`,
        `${ownerName}님에게 전하고 싶은 명언 한 마디!`,
        `${ownerName}님과 함께한 술자리 추억은?`,
        `${ownerName}님의 매력포인트는 무엇인가요?`,
        `${ownerName}님과 함께 간 최고의 대학로 맛집은?`,
        `졸업을 앞둔 ${ownerName}님에게 추천하고 싶은 영화는?`,
        `졸업을 앞둔 ${ownerName}님에게 추천하고 싶은 노래는?`,
        `졸업을 앞둔 ${ownerName}님에게 추천하고 싶은 책은?`,
        `${ownerName}님과 함께하고 싶은 활동이 있다면?`,
        `${ownerName}님에게 가장 어울리는/어울리지 않는 전공은?`,
        `${ownerName}님을 전공과 함께 소개해주세요!`,
        `${ownerName}님과 처음 만난 장소/행사는?`,
        `${ownerName}님과 우연히 만난 장소는? (ex. 경영관 벤치)`,
        `${ownerName}님과 함께하지 못해 아쉬운 활동이 있다면?`,
        `${ownerName}님에게 가장 어울리는 우리 학교 동아리는?`,
        `${ownerName}님과 함께 도전하고 싶은 것이 있다면?`,
        `${ownerName}님에게 가장 전하고 싶었던 말은?`,
        `${ownerName}님이 가장 잘하는/못하는 술게임은 무엇인가요?`,
        `${ownerName}님의 이상형은 무엇인가요?`,
        `학교 생활 중 ${ownerName}님에게 일어난 신기한 일이 있다면?`,
        `${ownerName}님의 헌내기 시절은 어땠나요?`,
        `n년 간의 학교 생활 중, ${ownerName}님에게 가장 고마웠던 일은?`,
        `${ownerName}님의 선배미를 볼 수 있는 일화를 알려주세요!`,
        `${ownerName}님과 가장 닮은 연예인/캐릭터는?`,
        `${ownerName}님의 학교생활을 단 한 줄로 요약하자면?`,
        `${ownerName}님의 시간표에 대한 평가는?`
    ];
    function randomNum(min, max) {
        const randNum = Math.floor(Math.random() * (max - min)) + min;
        return randNum;
    }
    const [index, setIndex] = useState(randomNum(0, questions.length));

    const SubmitEvent = () => {
        const dict = { ...watch(), question: questions[index], icon };

        console.log(dict);
        // setTree(temporaryTree.map((e) => [...e, dict]));
    };

    return (
        <div>
            <h3>쪽지 색</h3>
            <ColorSelect IconChecked={IconChecked} />
            <h3>랜덤 주제</h3>
            <p>{questions[index]}</p>
            <button
                type="button"
                onClick={() => {
                    setIndex(randomNum(0, questions.length));
                }}
            >
                셔플
            </button>
            <form>
                <h2>TO. {ownerName}</h2>
                <input
                    {...register('message')}
                    placeholder="졸업을 축하하는 말과 함께 질문에 대한 답변과 그 이유를 입력해주세요."
                />
                <h2>From.</h2>
                <input {...register('writer')} placeholder="닉네임을 입력하세요" />

                <button
                    type="button"
                    onClick={() => {
                        SubmitEvent();
                    }}
                >
                    작성 완료
                </button>
            </form>
        </div>
    );
}

export default Write;
