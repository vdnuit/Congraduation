/* eslint no-underscore-dangle: 0 */

import { createGlobalStyle } from 'styled-components';
import { React, useEffect } from 'react';
import axios from "axios";
import reset from 'styled-reset';
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
    const getToken = () => {
        axios
        .get("/api/v1/auth/refresh-token")
        .then((response)=>{
            if(response.status === 200){
                const { accessToken } = response.data;
                axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
                setOwnerName({_id: response.data._id, nick: response.data.nick });
            }
            else if(response.status===401){
                setLogin(false);
            }
        })
    };

    const myInfo = () => {
        axios
        .get(`/api/v1/users/myInfo`)
        .then((response) => {
            if(response.status === 200){
                setOwnerName({_id: response.data._id, nick: response.data.nick });
                setLogin(true);
            } else if(response.status === 401){
                getToken();
            }
        })
    }

    useEffect(() => {
        myInfo();
    });

    return (
        <>
            <GlobalStyle />
            <Router />
        </>
    );
}

export default App;
