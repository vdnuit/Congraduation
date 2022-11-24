import { Link } from 'react-router-dom';
import styled from 'styled-components';
import React, { useState } from 'react';
import HamburgerImg from '../assets/hamburger.png';
import ModalSide from './ModalSide';

const Container = styled.div``;
const Logo = styled.h1``;
const Hamburger = styled.img``;

function Header() {
    const [modalOpen, setModalOpen] = useState(false);
    const showModal = () => {
        setModalOpen(true);
    };

    return (
        <Container>
            <Link to={{ pathname: `/` }}>
                <Logo>logo</Logo>
            </Link>
            <Hamburger onClick={showModal} alt="hamburger" src={HamburgerImg} />
            {modalOpen && <ModalSide setModalOpen={setModalOpen} />}{' '}
        </Container>
    );
}

export default Header;
