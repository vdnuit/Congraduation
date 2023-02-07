import { atom } from 'recoil';

export const isLoginAtom = atom({
    key: 'isLogin',
    default: {
        userId: '',
        nick: ''
    }
});

export const ownerNameAtom = atom({
    key: 'ownerName',
    default: {
        _id: undefined,
        nick: undefined
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
    default: new Date('2023-02-15')
});

export const providerAtom = atom({
    key: 'provider',
    default: null
});
