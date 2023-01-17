/* eslint no-underscore-dangle: 0 */

import { React, useEffect } from 'react';
import styled from 'styled-components';
import { Cookies } from "react-cookie";
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { ownerNameAtom, isLoginAtom } from '../Atom';

const Container = styled.div`
    width: 100%;
    max-width: 500px;
    height: 93vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
`;

const Empty = styled.div`
    width: 70%;
    height: 12.5%;
    margin-left: 3%;
    margin-top: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Announce = styled.div`
    width: 85%;
    font-family: 'Jua';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 150.02%;
    /* or 36px */
    text-align: center;
    /* main */
    color: #072a60;
`;

function Kakao() {
    const setOwnerName = useSetRecoilState(ownerNameAtom);
    const setLogin = useSetRecoilState(isLoginAtom);
    const cookies = new Cookies();
    const setCookie = (name, value, option) => { cookies.set(name, value, { ...option });
    };
    const params = new URL(window.location.href).searchParams;
    const code = params.get("code");
    const KakaoLogin = () => {
        axios
        .get(`http://localhost:8000/api/v1/auth/kakao/callback?code=${code}`)
        .then((response)=>{
            console.log(response);
            if(response.status === 200){
                const ACCESS_TOKEN = response.data.accessToken;
                const PROVIDER = "kakao";
                const REFRESH_TOKEN = response.data.refreshToken;
                const ID = response.data._id;
                const NICK = response.data.nick;
                setCookie('accessToken', ACCESS_TOKEN, { path: "/", sameSite: "strict", });
                setCookie('provider',PROVIDER, { path: "/", sameSite: "strict", });
                setCookie('refreshToken', REFRESH_TOKEN, { path: "/", sameSite: "strict", });
                setCookie('_id', ID, { path: "/", sameSite: "strict", });
                setCookie('nick', NICK, { path: "/", sameSite: "strict", });
                setOwnerName({ _id: ID,  nick: NICK });
                setLogin(true);
                window.location.href = `http://localhost:3000/tree/${ID}`
                
            } else {
                alert(response.statusText);
            }
        })
        .catch(()=>alert("인증 정보가 유효하지 않습니다."))   
    };

    useEffect(() => {
        if(code){
            KakaoLogin()
        };
    },[code])

    
    return (
        <Container>
                <Empty>
                    <Announce>로그인 중입니다...</Announce>
                </Empty>
        </Container>
    );
}

export default Kakao;