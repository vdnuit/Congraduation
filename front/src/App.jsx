/* eslint no-underscore-dangle: 0 */

import { createGlobalStyle } from 'styled-components';
import { React } from 'react';
import reset from 'styled-reset';
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

    return (
        <>
            <GlobalStyle />
            <Router />
        </>
    );
}

export default App;
