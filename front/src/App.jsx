/* eslint no-underscore-dangle: 0 */

import { createGlobalStyle } from 'styled-components';
import { React, useEffect } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import reset from 'styled-reset';
import { useSetRecoilState } from 'recoil';
import { isLoginAtom, providerAtom } from './Atom';
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
    const setLogin = useSetRecoilState(isLoginAtom);
    const setProvider = useSetRecoilState(providerAtom);
    const getToken = () => {
        const cookies = new Cookies();
        const refreshToken = cookies.get("refreshToken");
        axios.defaults.headers.common.Authorization = `Bearer ${refreshToken}`;
        axios
        .get("/api/v1/auth/refresh-token")
        .then((response)=>{
            if(response.status===200){
                const { accessToken } = response.data;
                axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
                axios
                .get(`/api/v1/users/myInfo`)
                .then((res) => {
                    setLogin({userId: res.data.userId, nick: res.data.nick });
                    setProvider(res.data.provider);
                })
            }
        })
        .catch((err) => {
            if(err.response && err.response.status === 401){
                setLogin({userId: undefined, nick: undefined});
            }
        })
    }


    const myInfo = () => {
        axios
        .get(`/api/v1/users/myInfo`)
        .then((response) => {
            if(response.status === 200){
                setLogin({userId: response.data.userId, nick: response.data.nick });
                setProvider(response.data.provider);
            }
        })
        .catch((err) => {
            if(err.response && err.response.status === 401){
                getToken();
            }
        })
    }


        useEffect(() => {
        myInfo();
        }, [])

    
    return (
        <>
            <GlobalStyle />
            <Router />
        </>
    );
}

export default App;
