'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const TutorCard = ({ tutor }) => {
  const {
    name,
    image,
    isVerified,
    rating,
    reviews,
    location,
    startingPrice,
    description,
    teachingLocations
  } = tutor;

  return (
    <div className="tu-listinginfo">
      <span className="tu-cardtag"></span>
      <div className="tu-listinginfo_wrapper">
        <div className="tu-listinginfo_title">
          <div className="tu-listinginfo-img">
            <figure>
              <Image 
                src={image || "/images/listing/img-01.png"} 
                alt={name}
                width={100}
                height={100}
                className="tu-tutor-img"
              />
            </figure>
            <div className="tu-listing-heading">
              <h5>
                <Link href="/tutor-detail">{name}</Link>
                {isVerified && (
                  <i className="icon icon-check-circle tu-greenclr" data-tippy-trigger="mouseenter" data-tippy-html="#tu-verifed" data-tippy-interactive="true" data-tippy-placement="top"></i>
                )}
              </h5>
              <div className="tu-listing-location">
                <span>
                  {rating} <i className="fa-solid fa-star"></i>
                  <em>({reviews})</em>
                </span>
                <address>
                  <i className="icon icon-map-pin"></i> {location}
                </address>
              </div>
            </div>
          </div>
          <div className="tu-listinginfo_price">
            <span>Starting from:</span>
            <h4>₹{startingPrice}/hr</h4>
          </div>
        </div>
        <div className="tu-listinginfo_description">
          <p>{description}</p>
        </div>
        <div className="tu-listinginfo_service">
          <h6>You can get teaching service direct at</h6>
          <ul className="tu-service-list">
            {teachingLocations.includes('home') && (
              <li>
                <span>
                  <i className="icon icon-home tu-greenclr"></i>
                  My home
                </span>
              </li>
            )}
            {teachingLocations.includes('student') && (
              <li>
                <span>
                  <i className="icon icon-map-pin tu-blueclr"></i>
                  Student's home
                </span>
              </li>
            )}
            {teachingLocations.includes('online') && (
              <li>
                <span>
                  <i className="icon icon-video tu-orangeclr"></i>
                  Online
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="tu-listinginfo_btn">
        <div className="tu-iconheart">
          <i className="icon icon-heart"></i>
          <span>Add to save</span>
        </div>
        <div className="tu-btnarea">
          <Link href="/login" className="tu-secbtn">Let's chat</Link>
          <Link href="/tutor-detail" className="tu-primbtn">View full profile</Link>
        </div>
      </div>
    </div>
  );
};

export default TutorCard; 

