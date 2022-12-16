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
