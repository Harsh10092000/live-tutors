'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import useJobNotifications from './useJobNotifications';

const Header = () => {
    const { data: session, status } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    useJobNotifications((data) => {
        //alert(data.message);
        toast.success(`${data.title}: ${data.message}`);
    });

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <header className="tu-header">
                <nav className="navbar navbar-expand-xl tu-navbar">
                    <div className="container-fluid">
                        {/* Logo Section */}
                        <div className="navbar-brand-wrapper">
                            <Link className="navbar-brand" href="/">
                                <img src="/images/logo.png" alt="LiveTutors" />
                            </Link>
                        </div>
                        
                        {/* Mobile Menu Button */}
                        <button 
                            className="mobile-menu-toggle" 
                            aria-label="Main Menu" 
                            onClick={toggleMobileMenu}
                            type="button"
                        >
                            <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </button>

                        {/* Desktop Navigation */}
                        <div className="collapse navbar-collapse tu-themenav" id="navbarSupportedContent">
                            <ul className="navbar-nav">
                                <li className="menu-item-has-children nav-item">
                                    <Link className="nav-link" href="/tutors">
                                        Find Tutors                               
                                    </Link>
                                </li>

                                <li className="menu-item-has-children nav-item">
                                    <Link className="nav-link" href="/tutor-jobs">
                                        Find Tutors Jobs                              
                                    </Link>
                                </li>

                                <li className="menu-item-has-children nav-item">
                                    <Link className="nav-link" href="/assignment-help">
                                        Assignment Help                  
                                    </Link>
                                </li>
                                <li className=" nav-item">
                                    <Link className="nav-link" href="/wallet">
                                        Wallet                
                                    </Link>
                                </li>
                      
                      
                                <li className="nav-item">
                                    {status === "authenticated" ? (
                                        <Link className="nav-link" href="/logout">
                                            Welcome {session.user.name}
                                            <span className="tu-tag tu-bggreen">Dashboard</span>
                                        </Link>
                                    ) : (
                                        <Link className="nav-link" href="/login">
                                            Account
                                            <span className="tu-tag tu-bggreen">Login</span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>

                        {/* Desktop Profile Menu */}
                        <ul className="nav-item tu-afterlogin">
                            {status === "authenticated" && (
                                <li className="menu-item-has-children">
                                    <a href="javascript:void(0);">
                                        <img src="/images/login.png" alt="profile" />
                                    </a>
                                    <ul className="sub-menu">
                                        <li>
                                            <Link href="/profile/personal">
                                                <i className="icon icon-user"></i>Personal details
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/profile/contact">
                                                <i className="icon icon-phone"></i>Contact details
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/profile/education">
                                                <i className="icon icon-book"></i>Education
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/profile/subjects">
                                                <i className="icon icon-book-open"></i>Subjects I can teach
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/profile/media">
                                                <i className="icon icon-image"></i>Media gallery
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/logout">
                                                <i className="icon icon-log-out"></i>Logout
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
            </header>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="mobile-menu-overlay" 
                    onClick={closeMobileMenu}
                ></div>
            )}

            {/* Mobile Sidebar */}
            <div className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-sidebar-header">
                    <Link className="mobile-logo" href="/" onClick={closeMobileMenu}>
                        <img src="/images/logo_white.png" alt="Logo" />
                    </Link>
                    <button 
                        className="mobile-close-btn" 
                        onClick={closeMobileMenu}
                        aria-label="Close Menu"
                    >
                        <i className="icon icon-close"></i>
                    </button>
                </div>

                <div className="mobile-sidebar-content">
                    <ul className="mobile-nav-list">
                        <li className="mobile-nav-item">
                            <Link 
                                className="mobile-nav-link" 
                                href="/tutors"
                                onClick={closeMobileMenu}
                            >
                                <i className="icon icon-user"></i>
                                Find Tutors
                            </Link>
                        </li>

                        <li className="mobile-nav-item">
                            <Link 
                                className="mobile-nav-link" 
                                href="/tutor-jobs"
                                onClick={closeMobileMenu}
                            >
                                <i className="icon icon-briefcase"></i>
                                Find Tutors Jobs
                            </Link>
                        </li>

                        <li className="mobile-nav-item">
                            <Link 
                                className="mobile-nav-link" 
                                href="/assignment-help"
                                onClick={closeMobileMenu}
                            >
                                <i className="icon icon-book"></i>
                                Assignment Help
                            </Link>
                        </li>

                        {status === "authenticated" ? (
                            <>
                                <li className="mobile-nav-item">
                                    <Link 
                                        className="mobile-nav-link" 
                                        href="/profile/personal"
                                        onClick={closeMobileMenu}
                                    >
                                        <i className="icon icon-user"></i>
                                        Personal details
                                    </Link>
                                </li>
                                <li className="mobile-nav-item">
                                    <Link 
                                        className="mobile-nav-link" 
                                        href="/profile/contact"
                                        onClick={closeMobileMenu}
                                    >
                                        <i className="icon icon-phone"></i>
                                        Contact details
                                    </Link>
                                </li>
                                <li className="mobile-nav-item">
                                    <Link 
                                        className="mobile-nav-link" 
                                        href="/profile/education"
                                        onClick={closeMobileMenu}
                                    >
                                        <i className="icon icon-book"></i>
                                        Education
                                    </Link>
                                </li>
                                <li className="mobile-nav-item">
                                    <Link 
                                        className="mobile-nav-link" 
                                        href="/profile/subjects"
                                        onClick={closeMobileMenu}
                                    >
                                        <i className="icon icon-book-open"></i>
                                        Subjects I can teach
                                    </Link>
                                </li>
                                <li className="mobile-nav-item">
                                    <Link 
                                        className="mobile-nav-link" 
                                        href="/profile/media"
                                        onClick={closeMobileMenu}
                                    >
                                        <i className="icon icon-image"></i>
                                        Media gallery
                                    </Link>
                                </li>
                                <li className="mobile-nav-item">
                                    <Link 
                                        className="mobile-nav-link" 
                                        href="/logout"
                                        onClick={closeMobileMenu}
                                    >
                                        <i className="icon icon-log-out"></i>
                                        Logout
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li className="mobile-nav-item">
                                <Link 
                                    className="mobile-nav-link mobile-login-btn" 
                                    href="/login"
                                    onClick={closeMobileMenu}
                                >
                                    <i className="icon icon-login"></i>
                                    Login / Register
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Header