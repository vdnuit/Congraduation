import styled from 'styled-components';
import React, { useState } from 'react';
import ModalCheck from './ModalCheck';

const Container = styled.div``;
const Text = styled.p``;

function Footer() {
    const [checkOpen, setCheckOpen] = useState(false);
    const showCheck = () => {
        setCheckOpen(true);
    };
    return (
        <Container>
            <Text>Footer</Text>
            <button type="button" onClick={showCheck}>
                checkChecktest
            </button>
            {checkOpen && <ModalCheck setCheckOpen={setCheckOpen} text="모달창 체크입니다." />}{' '}
        </Container>
    );
}

export default Footer;
