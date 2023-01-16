/* eslint no-underscore-dangle: 0 */

import { React, useState, useEffect} from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { temporaryTreeAtom } from '../Atom';

const startX = 26;
const startY = 28;
const WIDTH = 50;
const HEIGHT = 37;

function randomX(){
    return `${(Math.random()*WIDTH)+startX}%`
}

function randomY(){
    return `${(Math.random()*HEIGHT)+startY}%`
}

function BigRandomX(){
    return `${(Math.random()*200)+180}px`
}

function BigRandomY(){
    return `${(Math.random()*345)+140}px`
}

const Img = styled.img`
    position: absolute;
    max-width: 64px;
    max-height: 64px;
    width: 12.8%;
    left: ${props => (props.innerWidth <= 500) ? randomX : BigRandomX};
    top: ${props => (props.innerWidth <= 500) ? randomY : BigRandomY};
`;



function TreeComponent(){
    const leaves = useRecoilValue(temporaryTreeAtom);
    // const icons = ['https://github.com/vdnuit/Congraduation/blob/vdnuit/front/src/assets/icons/icon0.png?raw=true','https://github.com/vdnuit/Congraduation/blob/vdnuit/front/src/assets/icons/icon0.png?raw=true','https://github.com/vdnuit/Congraduation/blob/vdnuit/front/src/assets/icons/icon0.png?raw=true'];
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

    useEffect(() => {
      const resizeListener = () => {
        setInnerWidth(window.innerWidth);
      };
      window.addEventListener("resize", resizeListener);
    });
    
    return (
        <div>
            {leaves.map((leaf)=><Img src={leaf.paperImage} key={leaf._id} innerWidth={innerWidth}/>)}
        </div>
    )
}

export default TreeComponent;
