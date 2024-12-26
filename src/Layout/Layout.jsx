// Layout.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Layout.css'; // Import the CSS file

const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            <Navbar />
            <main className="main-content">
                {children}
            </main>
            <Footer />
            <div className='credit'>
                Copyright Ⓒ 2023 Kahani Khane Ki. All Rights Reserved.
            </div>
        </div>
    );
};

export default Layout;