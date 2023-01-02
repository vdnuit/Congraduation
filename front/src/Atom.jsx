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
