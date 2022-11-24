import { Link } from 'react-router-dom';
import styled from 'styled-components';
import React from 'react';

const Container = styled.div``;
const Logo = styled.h1``;
const LogIn = styled.h2``;
const SignUp = styled.h2``;

function Main() {
    return (
        <Container>
            <Logo>logo</Logo>
            <Link to={{ pathname: `/login/*` }}>
                <LogIn>log-in</LogIn>
            </Link>
            <Link to={{ pathname: `/signup/*` }}>
                <SignUp>Create Account</SignUp>
            </Link>
        </Container>
    );
}

export default Main;
