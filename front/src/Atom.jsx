import { atom } from 'recoil';

export const isLoginAtom = atom({
    key: 'isLogin',
    default: false
});

export const ownerNameAtom = atom({
    key: 'ownerName',
    default: {
        _id: '',
        nick: ''
    }
});

export const temporaryTreeAtom = atom({
    key: 'temporaryTree',
    default: []
});

export const leafAtom = atom({
    key: 'leaf',
    default: []
});

export const countAtom = atom({
    key: 'count',
    default: 0
});

export const dateAtom = atom({
    key: 'date',
    default: Math.ceil((new Date(2022, 11, 15) - new Date()) / (1000 * 60 * 60 * 24))
});
