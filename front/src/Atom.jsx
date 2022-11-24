import { atom } from 'recoil';

export const isTrueAtom = atom({
    key: 'isTrue',
    default: false
});

export const isLoginAtom = atom({
    key: 'isLogin',
    default: true
});
