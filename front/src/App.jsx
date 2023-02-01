/* eslint no-underscore-dangle: 0 */
/* eslint-disable prefer-template */
/* eslint-disable no-restricted-globals */

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
    const checkUser = () => {
        const UA = navigator.userAgent.toLowerCase();
        if(UA.indexOf('android') > -1){
            if(UA.indexOf('instagram') > -1 || UA.indexOf('naver') > -1 || UA.indexOf('everytimeapp') > -1 || UA.indexOf('kakaotalk')){
                if(UA.includes('instagram')){
                    location.href = 'instagram://inappbrowser/close';
                } else if (UA.includes('naver')){
                    location.href = 'naver://inappbrowser/close';
                } else if(UA.includes('everytimeapp')){
                    location.href = 'everytimeapp://inappbrowser/close';
                } if(UA.includes('kakaotalk')){
                    location.href = 'kakaotalk://inappbrowser/close';
                }
                location.href = "intent://" + location.href.replace(/https?:\/\//i, "") + "#Intent;scheme=https;package=com.android.chrome;end";
            }
        }
    }
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
        checkUser();
        }, [])
    

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
