/* eslint no-underscore-dangle: 0 */

import { createGlobalStyle } from 'styled-components';
import { React, useEffect } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import reset from 'styled-reset';
import { useSetRecoilState, useRecoilValue } from 'recoil';
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
    const ownerName = useRecoilValue(ownerNameAtom);
    const getToken = () => {
        const cookies = new Cookies()
        const refreshToken = cookies.get("refreshToken");
        axios.defaults.headers.common.Authorization = `Bearer ${refreshToken}`;
        axios
        .get("/api/v1/auth/refresh-token")
        .then((response)=>{
            if(response.status===200){
                const { accessToken } = response.data;
                axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
                console.log(response.data)
                axios
                .get(`/api/v1/users/myInfo`)
                .then((res) => {
                    setOwnerName({_id: res.data.userId, nick: res.data.nick });
                    setLogin(true);
                    console.log(res);
                    console.log(ownerName._id)
                })
            }
        })
        .catch((err) => {
            if(err.response && err.response.status === 401){
                setLogin(false);
            }
        })
    }

    console.log(axios.defaults.headers);

    const myInfo = () => {
        axios
        .get(`/api/v1/users/myInfo`)
        .then((response) => {
            console.log(response);
            if(response.status === 200){
                setOwnerName({_id: response.data.userId, nick: response.data.nick });
                setLogin(true);
            }
        })
        .catch((err) => {
            if(err.response && err.response.status === 401){
                console.log("401")
                getToken();
            }
        })
    }

    useEffect(() => {
        console.log("app");
        myInfo();
    }, []);

    
    return (
        <>
            <GlobalStyle />
            <Router />
        </>
    );
}

export default App;
