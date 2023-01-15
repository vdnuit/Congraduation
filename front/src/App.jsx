/* eslint no-underscore-dangle: 0 */

import { createGlobalStyle } from 'styled-components';
import { React, useEffect } from 'react';
import reset from 'styled-reset';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import { ownerNameAtom } from './Atom';
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
    const params = new URL(window.location.href).pathname;
    const userObjectId = params.substring(6);
    const getUser = () => {
        axios
        .get(`http://localhost:8000/api/v1/users/${userObjectId}`, {withCredentials: true})
        .then((response)=> {
            console.log(response);
            if(response.status === 200){
                console.log("app");
                setOwnerName(response.data._id);
            }

        })
    }

    useEffect(() => {
        getUser();
    })

    return (
        <>
            <GlobalStyle />
            <Router />
        </>
    );
}

export default App;
