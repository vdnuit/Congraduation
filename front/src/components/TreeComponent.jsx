import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { temporaryTreeAtom } from '../Atom';
import Leaf from './Leaf';

const startX = 130;
const startY = 280;
const WIDTH = 250;
const HEIGHT = 450;

function randomX(){
    return (Math.random()*WIDTH)+startX
}

function randomY(){
    return (Math.random()*HEIGHT)+startY
}

const Img = styled.img`
    position: absolute;
    left: ${randomX}px;
    top: ${randomY}px;
`


function TreeComponent(){
    const leaves = useRecoilValue(temporaryTreeAtom);
    // const icons = ['https://github.com/vdnuit/Congraduation/blob/vdnuit/front/src/assets/icons/icon0.png?raw=true','https://github.com/vdnuit/Congraduation/blob/vdnuit/front/src/assets/icons/icon0.png?raw=true','https://github.com/vdnuit/Congraduation/blob/vdnuit/front/src/assets/icons/icon0.png?raw=true'];
    return (
        <div>
            {leaves.map((leaf)=><Img src={leaf}/>)}
        </div>
    )
}

export default TreeComponent;
