/* eslint no-underscore-dangle: 0 */

import { createGlobalStyle } from 'styled-components';
import { React, useEffect } from 'react';
import reset from 'styled-reset';
import { Cookies } from "react-cookie";
import { useSetRecoilState } from 'recoil';
import { ownerNameAtom, isLoginAtom } from './Atom';
import Router from './Router';

import InterTTF from './assets/Inter.ttf';
import JuaTTF from './assets/Jua.ttf';

const GlobalStyle = createGlobalStyle`
${reset}
  // font import
  @font-face {
    font-family: 'Jua';
    src: local('Jua'), local('Jua');
    font-style: normal;
    src: url(${JuaTTF}) format('truetype');
}
@font-face {
    font-family: 'Inter';
    src: local('Inter'), local('Inter');
    font-style: normal;
    src: url(${InterTTF}) format('truetype');
}
 `;

function App() {
    const setOwnerName = useSetRecoilState(ownerNameAtom);
    const setLogin = useSetRecoilState(isLoginAtom);
    const cookies = new Cookies();
    const getCookie = (name) => cookies.get(name);
    const id = getCookie("_id");
    const Nick = getCookie("nick");
    const userinfo = () => {
        if(Nick){
            setOwnerName({ _id: id,  nick: Nick });
            setLogin(true);
        } 
    }

    useEffect(() => {
        userinfo();
    })

    return (
        <>
            <GlobalStyle />
            <Router />
        </>
    );
}

export default App;
