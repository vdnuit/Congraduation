import { atom } from 'recoil';

export const isLoginAtom = atom({
    key: 'isLogin',
    default: true
});

export const ownerNameAtom = atom({
    key: 'ownerName',
    default: '강서현'
});

export const temporaryTreeAtom = atom({
    key: 'temporaryTree',
    default: [
        {
            message: '졸업 축하해!',
            writer: '박혜린',
            icon: '',
            question: '강서현님이 좋아하는 것은?'
        }
    ]
});
