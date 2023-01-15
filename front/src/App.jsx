/* eslint no-underscore-dangle: 0 */

import { createGlobalStyle } from 'styled-components';
import { React, useEffect } from 'react';
import axios from "axios";
import reset from 'styled-reset';
import { useSetRecoilState } from 'recoil';
import { ownerNameAtom, isLoginAtom } from './Atom';
import Router from './Router';
import { userObjectId } from "./pages/Tree";

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
    const userinfo = () => {
        axios
        .get(`http://localhost:8000/api/v1/users/${userObjectId}`, {withCredentials: true})
        .then((response)=> {
            console.log(response.data);
            if(response.status === 200){
                if(response.data.authorized){
                    setOwnerName({ _id: response.data.userId, nick: response.data.nick });
                    setLogin(true);
                } else if(!response.data.authorized){
                    setOwnerName({ _id: response.data.userId, nick: response.data.nick });
                }
            }
        })
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
