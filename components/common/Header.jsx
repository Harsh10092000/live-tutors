'use client'
import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import useJobNotifications from './useJobNotifications';



const Header = () => {
    const { data: session, status } = useSession();
    useJobNotifications((data) => {
        //alert(data.message);
        toast.success(`${data.title}: ${data.message}`);
      });
  return (
        <header className="tu-header">
            <nav className="navbar navbar-expand-xl tu-navbar">
                <div className="container-fluid">
                <strong>
                        <Link className="navbar-brand" href="/"><img src="/images/logo.png" alt="Logo" /></Link>
                </strong>
                    <button className="tu-menu" aria-label="Main Menu" data-bs-target="#navbarSupportedContent" data-bs-toggle="collapse">
                        <i className="icon icon-menu"></i>
                </button>
                    <div className="collapse navbar-collapse tu-themenav" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="menu-item-has-children nav-item">
                                <Link className="nav-link" href="/tutors">
                                Find Tutors                               
                                </Link>
                                {/* <ul className="sub-menu"> 
                                <li>
                                        <Link href="/tutors">All Tutors</Link>
                                </li>
                                <li>
                                        <Link href="/tutors/online">Online Tutors</Link>
                                </li>
                                <li>
                                        <Link href="/tutors/home">Home Tutor</Link>
                                </li>
                            </ul> */}
                        </li>

                            <li className="menu-item-has-children nav-item">
                                <Link className="nav-link" href="/tutor-jobs">
                                Find Tutors Jobs                              
                                </Link>
                                {/* <ul className="sub-menu">
                                <li>
                                        <Link href="/jobs">All Tutors Jobs</Link>
                                </li>
                                <li>
                                        <Link href="/jobs/online">Online Tutors Jobs</Link>
                                </li>
                                <li>
                                        <Link href="/jobs/home">Home Tutor Jobs</Link>
                                </li>
                            </ul> */}
                        </li>

                        <li className="menu-item-has-children nav-item">
                                <Link className="nav-link" href="/assignment-help">
                                Assignment Help                  
                                </Link>
                               
                        </li>

                            {/* <li className="nav-item">
                                <Link className="nav-link" href="/assignments">Assignment Help</Link>
                        </li> */}
                      
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
  )
}

export default Header