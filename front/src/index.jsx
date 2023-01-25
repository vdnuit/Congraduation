import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";
import './index.css';
import { RecoilRoot } from 'recoil';
import App from './App';
import reportWebVitals from './reportWebVitals';

require("dotenv").config({path: "../.env"});

axios.defaults.baseURL = `${process.env.BASEURL}`;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RecoilRoot>
            <App />
    </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
