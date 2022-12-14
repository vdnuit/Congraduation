import { Link } from 'react-router-dom';
import styled from 'styled-components';
import React, { useState } from 'react';
import ModalCheck from './ModalCheck';

// import { useRecoilValue } from 'recoil';
// import { temporaryTreeAtom } from '../Atom';

const Container = styled.div``;
const Text = styled.p``;

function Footer() {
    // const temporaryTree = useRecoilValue(temporaryTreeAtom);
    const [checkOpen, setCheckOpen] = useState(false);
    const showCheck = () => {
        setCheckOpen(true);
    };
    return (
        <Container>
            {/* {console.log(temporaryTree)} */}
            <Text>Footer</Text>
            <button type="button" onClick={showCheck}>
                checkChecktest
            </button>
            <Link to={{ pathname: `/write/*` }}>
                <div>Write</div>
            </Link>
            {checkOpen && <ModalCheck setCheckOpen={setCheckOpen} text="모달창 체크입니다." />}{' '}
        </Container>
    );
}

export default Footer;
