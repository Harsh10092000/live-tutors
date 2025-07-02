'use client';

import React, { useEffect } from 'react'
import Typed from 'typed.js'
import Image from 'next/image'

const Hero = () => {
  useEffect(() => {
    // Initialize Typed.js
    const typed = new Typed(".type", {
      strings: ["A bright future", "Equitable societies", "Self confidence"],
      typeSpeed: 100,
      backSpeed: 100,
      loop: true,
      showCursor: false,
    });

    // Cleanup on unmount
    return () => {
      typed.destroy();
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="tu-banner">
      <div className="container">
        <div className="row align-items-center g-0 gy-5">
          <div className="col-lg-6">
            <div className="tu-banner_title">
              <h1>A good <span>#education</span> is always a base of</h1>
              <span className="tu-bannerinfo type"></span>
              <p>Consectur adipiscing elitsedo eiusmod tempor incididuntem utaborate dolore magna aliqua ad minim veniamque.</p>
              <ul className="tu-banner_list">
                <li>
                  <div className="tu-starthere">
                    <span>Start from here</span>
                    <Image src="/images/knob_line.svg" alt="Decorative line" width={100} height={50} />
                  </div>
                  <a href="signup.html" className="tu-primbtn tu-primbtn-gradient">
                    <span>Start as student</span>
                    <i className="icon icon-chevron-right"></i>
                  </a>
                </li>
                <li>
                  <a href="signup.html" className="tu-secbtn">
                    <span>Join as Instructor</span>
                    <em>It's Free!</em>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 d-none d-lg-block">
            <div className="tu-bannerv1_img">
              <Image src="/images/index/banner/img-02.png" alt="Banner illustration" width={600} height={600} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero