import React, { useState, useRef, useEffect } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import { useAuth } from '../config/Context';
import './Styles/Navbar.css';
import { carticon } from '../assets';
import { useRecoilValue } from 'recoil';
import { CartState } from './Shop';
import Cart from './Cart';
import { FaTimes } from 'react-icons/fa';
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/Firebase";

const Navbar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const matchHome = useMatch("/");
    const matchShop = useMatch("/shop/*");
    const matchBlogs = useMatch("/blogs/*");
    const cart = useRecoilValue(CartState);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const auth = getAuth();
    const [displayName, setDisplayName] = useState(null);

    useEffect(() => {
        const fetchDisplayName = async () => {
            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        setDisplayName(userDoc.data().displayName);
                    }
                } catch (error) {
                    console.error("Error fetching display name:", error);
                }
            } else {
                setDisplayName(null);
            }
        };

        fetchDisplayName();
    }, [user]);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleMouseEnter = () => {
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setIsDropdownOpen(false);
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("User signed out");
            setIsDropdownOpen(false);
            navigate('/login');
        } catch (error) {
            console.error("Sign-out error:", error);
            alert("Sign out failed: " + error.message);
        }
    };

    return (
        <header>
            <div className="nav-container">
                <h2 className="logo">
                    <Link to="/" className='site-title'>Kahani Khane Ki</Link>
                </h2>
                <nav className={`site-nav ${isMobileMenuOpen ? 'open' : ''}`}>
                    <ul>
                        <li><Link to="/" className={matchHome ? "active" : ""}>Home</Link></li>
                        <li><Link to="/shop" className={matchShop ? "active" : ""}>Shop</Link></li>
                        <li><Link to="/blogs" className={matchBlogs ? "active" : ""}>Blogs</Link></li>
                        {user ? (
                            <li
                                className="nav-item dropdown"
                                ref={dropdownRef}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button className="dropdown-toggle">
                                    Hi, {displayName || 'User'}
                                </button>
                                <li className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                                    <li><Link to="/Profile" className="dropdown-item">Account Details</Link></li>
                                    <li><Link to="/OrderHistory" className="dropdown-item">Previous Orders</Link></li>
                                    <li><button className="dropdown-item sign-out-btn" onClick={handleSignOut}>Sign Out</button></li>
                                </li>
                            </li>
                        ) : (
                            <li><Link to="/signup" className="account-link">Account</Link></li>
                        )}
                    </ul>
                </nav>
                <div className="menu-toggle" onClick={toggleMobileMenu}>
                    <div className="hamburger"></div>
                </div>
                <div className="cart-container">
                    <button onClick={toggleSidebar} className='cart-btn'>
                        <div className='cart'>
                            <img src={carticon} alt="Cart" width="30px" />
                            <p className='cart-value'>{Object.keys(cart).length}</p>
                        </div>
                    </button>
                    <aside className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar hide-sidebar'}`}>
                        <div className='sidebar-header'>
                            <h1>Cart</h1>
                            <button className='close-btn' onClick={toggleSidebar}><FaTimes /></button>
                        </div>
                        <Cart />
                    </aside>
                </div>
            </div>
        </header>
    );
};

export default Navbar;