import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Write from './pages/Write';
import Tree from './pages/Tree';
import Header from './components/Header';
// import Footer from './components/Footer';

function Router() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/signup/*" element={<SignUp />} />
                <Route path="/login/*" element={<LogIn />} />

                <Route path="/tree/*" element={<Tree />} />
                <Route path="/write/*" element={<Write />} />
            </Routes>
            {/* <Footer /> */}
        </BrowserRouter>
    );
}
export default Router;
