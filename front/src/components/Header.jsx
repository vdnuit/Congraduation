import { Link } from 'react-router-dom';
import styled from 'styled-components';
import React, { useState } from 'react';
import HamburgerImg from '../assets/hamburger.png';
import ModalSide from './ModalSide';
import CapDecoImg from '../assets/capdeco.png';
import LogoImg from '../assets/logoImg.png';

const Container = styled.div`
    width: 100%;
    background-color: #072a60;
    max-width: 500px;
    height: 62px;
    filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.07));
    display: flex;
    justify-content: space-between;
`;
const Logo = styled.img`
    height: 40px;
    margin-top: 15px;
    margin-left: -12px;
`;
const Hamburger = styled.img`
    width: 20px;
    height: 4px;
    margin-top: 30px;
    margin-right: 25px;
`;
const CapDeco = styled.img`
    position: absolute;
    top: 0px;
    left: 0px;
    pointer-events: none;
    z-index: 3;
    width: 100%;
    height: 80px;
    max-width: 500px;
`;
function Header() {
    const [modalOpen, setModalOpen] = useState(false);
    const showModal = () => {
        setModalOpen(true);
    };

    return (
        <Container>
            <Link to={{ pathname: `/` }}>
                <Logo src={LogoImg} alt="Congraduation" />
            </Link>
            <Hamburger onClick={showModal} alt="hamburger" src={HamburgerImg} />
            {modalOpen && <ModalSide setModalOpen={setModalOpen} />} <CapDeco src={CapDecoImg} />
        </Container>
    );
}

export default Header;
