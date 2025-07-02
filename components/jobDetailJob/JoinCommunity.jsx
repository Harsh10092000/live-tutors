'use client';
import React from 'react';
import Link from 'next/link';

const JoinCommunity = () => {
  return (
    <div className="tu-Joincommunity">
        <div className="tu-particles">
            <div id="tu-particlev2"></div>
        </div>
        <div className="tu-Joincommunity_content">
            <h4>Trending tutor directory of 2022</h4>
            <p>Its Free, Join today and start spreading knowledge with students out there</p>
        </div>
        <div className="tu-Joincommunity_btn">
            <Link href="/login" className="tu-yellowbtn">Join our community</Link>
        </div>
    </div>
  );
};

export default JoinCommunity; 