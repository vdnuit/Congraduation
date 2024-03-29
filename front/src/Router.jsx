import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Write from './pages/Write';
import Tree from './pages/Tree';
import List from './pages/List';
import Content from './pages/Content';
import Kakao from './pages/Kakao';
import Header from './components/Header';

function Router() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Main />} errorElement={<Main />} />
                <Route path="/signup/*" element={<SignUp />} errorElement={<Main />} />
                <Route path="/login/*" element={<LogIn />} errorElement={<Main />} />
                <Route path="/auth/kakao/callback" element={<Kakao />} />

                <Route path="/tree/:id" element={<Tree />} errorElement={<Main />} />
                <Route path="/write/:id" element={<Write />} errorElement={<Main />} />
                <Route path="/list/:id" element={<List />} errorElement={<Main />} />
                <Route path="/content/:userid/:messageid" element={<Content />} errorElement={<Main />} />
            </Routes>
        </>
    );
}
export default Router;
