import { atom } from 'recoil';

export const isTrueAtom = atom({
    key: 'isTrue',
    default: false
});

export const isLoginAtom = atom({
    key: 'isLogin',
    default: true
});

export const ownerNameAtom = atom({
    key: 'ownerName',
    default: '강서현'
});

export const commentsAtom = atom({
    key: 'comments',
    get: ({ get }) => {
        const ownerName = get(ownerNameAtom);

        return [
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
    }
});
