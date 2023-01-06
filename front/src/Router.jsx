import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Write from './pages/Write';
import Tree from './pages/Tree';
import MyTree from './pages/MyTree';
import List from './pages/List';
import Content from './pages/Content';
import Header from './components/Header';
// import Footer from './components/Footer';

function Router() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Header />
            <Routes>
                <Route path="/" element={<Main />} errorElement={<Main />} />
                <Route path="/signup/*" element={<SignUp />} errorElement={<Main />} />
                <Route path="/login/*" element={<LogIn />} errorElement={<Main />} />

                <Route path="/tree/*" element={<Tree />} errorElement={<Main />} />
                <Route path="/write/*" element={<Write />} errorElement={<Main />} />
                <Route path="/mytree/*" element={<MyTree />} errorElement={<Main />} />
                <Route path="/list/*" element={<List />} errorElement={<Main />} />
                <Route path="/content/*" element={<Content />} errorElement={<Main />} />
            </Routes>
            {/* <Footer /> */}
        </BrowserRouter>
    );
}
export default Router;
