import { Link } from 'react-router-dom';
import styled from 'styled-components';
import React, { useState, useRef, useEffect } from 'react';
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
    position: absolute;
    top: 30px;
    right: 20px;
`;
const CapDeco = styled.img`
    position: absolute;
    top: 0px;
    right: 50px;
    pointer-events: none;
    z-index: 3;
    height: 80px;
    max-width: 500px;
`;
function Header() {
    const [modalOpen, setModalOpen] = useState(false);
    const node = useRef();

    useEffect(() => {
        const clickOutside = (e) => {
            if (modalOpen && node.current && !node.current.contains(e.target)) {
                setModalOpen(false);
            }
        };

        document.addEventListener('mousedown', clickOutside);

        return () => {
            document.removeEventListener('mousedown', clickOutside);
        };
    }, [modalOpen]);
    const showModal = () => {
        setModalOpen(true);
    };

    return (
        <Container>
            <div ref={node}>
                <div
                    className="flex shrink-0 pointer"
                    onClick={() => setModalOpen((pre) => !pre)}
                    aria-hidden="true"
                />

                <Link to={{ pathname: `/` }}>
                    <Logo src={LogoImg} alt="Congraduation" />
                </Link>
                <Hamburger onClick={showModal} alt="hamburger" src={HamburgerImg} />
                {modalOpen ? <ModalSide setModalOpen={setModalOpen} /> : null}
                <CapDeco src={CapDecoImg} />
            </div>
        </Container>
    );
}

export default Header;
