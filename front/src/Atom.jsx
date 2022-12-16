import { atom } from 'recoil';

export const isLoginAtom = atom({
    key: 'isLogin',
    default: false
});

export const ownerNameAtom = atom({
    key: 'ownerName',
    default: '강서현'
});

export const temporaryTreeAtom = atom({
    key: 'temporaryTree',
    default: [
        {
            id:'1',
            message: '졸업 축하해!',
            writer: '박혜린',
            icon: 'https://github.com/vdnuit/Congraduation/blob/vdnuit/front/src/assets/icons/icon0.png?raw=true',
            question: '강서현님이 좋아하는 것은?'
        }
    ]
});

export const countAtom = atom({
    key: 'count',
    default: 1
})

export const dateAtom = atom({
    key: 'date',
    default: Math.ceil((new Date(2022, 11, 15)-new Date())/(1000*60*60*24))
})
