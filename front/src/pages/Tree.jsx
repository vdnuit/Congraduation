import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { ownerNameAtom } from '../Atom';

const TreeComponent = styled.div``;

function Tree() {
    const ownerName = useRecoilValue(ownerNameAtom);
    return (
        <div>
            <p>{ownerName} 님의 나무에 n개의 편지가 달려있습니다.</p>
            <TreeComponent>
                <p>treecomponent</p>
            </TreeComponent>
            <Link to={{ pathname: `/write/*` }}>
                <p>Create Account</p>
            </Link>
        </div>
    );
}

export default Tree;
