import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { temporaryTreeAtom } from '../Atom';
import Leaf from './Leaf';

const startX = 26;
const startY = 28;
const WIDTH = 50;
const HEIGHT = 37;

function randomX(){
    return (Math.random()*WIDTH)+startX
}

function randomY(){
    return (Math.random()*HEIGHT)+startY
}

const Img = styled.img`
    position: absolute;
    left: ${randomX}%;
    top: ${randomY}%;
`


function TreeComponent(){
    const leaves = useRecoilValue(temporaryTreeAtom);
    // const icons = ['https://github.com/vdnuit/Congraduation/blob/vdnuit/front/src/assets/icons/icon0.png?raw=true','https://github.com/vdnuit/Congraduation/blob/vdnuit/front/src/assets/icons/icon0.png?raw=true','https://github.com/vdnuit/Congraduation/blob/vdnuit/front/src/assets/icons/icon0.png?raw=true'];
    return (
        <div>
            {leaves.map((leaf)=><Img src={leaf.icon}/>)}
        </div>
    )
}

export default TreeComponent;
