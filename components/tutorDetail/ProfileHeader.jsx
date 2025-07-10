"use client"
import React, { useState } from "react";
import Image from 'next/image'
import { formatTutoringPreferencesArray } from '../common'
import { img_url, websiteURL } from '@/app/utils'
import { convertToSmallWord, formatDate, hiddenPhoneNumber } from '../common'
const ProfileHeader = ({ name, profile_tag_line, profile_pic_url, language_preferences, city, state, gender, tutoring_preferences, travel_distance, min_fee, max_fee, fee_charged_for, slug, created_at, phone, intro_video_url }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    return (
        <div className="tu-tutorprofilewrapp">
            <span className="tu-cardtag"></span>
            <div className="tu-profileview">
                {/* <figure>
                    <img src="images/tutordetail/img-01.jpg" alt="image-description" />
                </figure> */}
                <figure style={{ position: 'relative' }}>
                    {profile_pic_url ? (
                        <img src={img_url + profile_pic_url} alt="profile-pic" />
                    ) : (
                        <img src="/images/tutordetail/img-01.jpg" alt="profile-pic" className='rounded-full' />
                    )}
                    {intro_video_url && (
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '10px',
                                left: '10px',
                                width: '40px',
                                height: '40px',
                                cursor: 'pointer',
                                zIndex: 10,
                            }}
                        >
                            <a
                                href={intro_video_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    position: 'relative',
                                    display: 'block',
                                    width: '100%',
                                    height: '100%',
                                }}
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                            >
                                {/* Tooltip */}
                                {showTooltip && (
                                    <span
                                        style={{
                                            position: "absolute",
                                            bottom: "110%",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            background: "#222",
                                            color: "#fff",
                                            padding: "4px 10px",
                                            borderRadius: "4px",
                                            fontSize: "12px",
                                            whiteSpace: "nowrap",
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                            zIndex: 20,
                                            pointerEvents: "none",
                                        }}
                                    >
                                        Watch Intro Video
                                    </span>
                                )}
                                <span
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '32px',
                                        height: '32px',
                                        backgroundColor: showTooltip ? '#ffe5e5' : '#fff',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: showTooltip
                                            ? '0 4px 16px rgba(255,0,0,0.15)'
                                            : '0 2px 8px rgba(0,0,0,0.10)',
                                        transition: 'all 0.2s cubic-bezier(.4,2,.6,1)',
                                        transform: showTooltip
                                            ? 'translate(-50%, -50%) scale(1.12)'
                                            : 'translate(-50%, -50%) scale(1)',
                                    }}
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        aria-hidden="true"
                                    >
                                        <polygon points="5,3 15,9 5,15" fill="#ff0000" />
                                    </svg>
                                </span>
                            </a>
                        </div>
                    )}
                </figure>

                <div className="tu-protutorinfo">
                    <div className="tu-protutordetail">
                        <div className="tu-productorder-content">
                            <figure>
                                <img src="images/tutordetail/img-01.jpg" alt="images" />
                            </figure>
                            <div className="tu-product-title" style={{ marginBottom: '0px' }}>
                                <h3>{name} <i className="icon icon-check-circle tu-greenclr" data-tippy-trigger="mouseenter" data-tippy-html="#tu-verifed" data-tippy-interactive="true" data-tippy-placement="top"></i></h3>
                                <h5>{profile_tag_line}</h5>
                                <div className="tu-listinginfo_price" style={{ marginBottom: '0px' }}>
                                    {/* <span>Starting from:</span>      */}
                                    <h4>₹{min_fee} - ₹{max_fee}/{fee_charged_for}</h4>
                                </div>
                            </div>

                        </div>
                        <ul className="tu-tutorreview">
                            <li>
                                <span>
                                    <i className="fa fa-calendar tu-greenclr"></i>
                                    {formatDate(created_at)}
                                </span>
                            </li>

                            <li>
                                <span><i className="icon icon-map-pin"><span>{city}, {state}</span></i></span>
                            </li>
                            <li>
                                <span>
                                    <i className="fa fa-phone tu-yeallow"></i>
                                    {hiddenPhoneNumber(phone)}
                                </span>
                            </li>
                        </ul>
                        <div className="tu-detailitem">
                            <h6>Languages I know</h6>
                            <div className="tu-languagelist">
                                <ul className="tu-languages">
                                    {/* {language_preferences.map((language, index) => {
                                        return (
                                            <li key={index}>{language}</li>
                                        )
                                    })} */}
                                    <li>{language_preferences != "[]"? language_preferences : "No language preferences"}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tu-detail-sections">
                <div className="tu-detail-item" style={{ marginLeft: '19px', marginRight: '19px' }}>
                    <i className="icon icon-map-pin"></i>
                    <div className="tu-detail-content">
                        <h6>Mode of Teaching</h6>
                       
                        <p>{tutoring_preferences != "[]" ? formatTutoringPreferencesArray(tutoring_preferences, travel_distance) : "No tutoring preferences"}</p>
                    </div>
                </div>
            </div>
            <div className="tu-actionbts">
                <div className="tu-userurl">
                    <i className="icon icon-globe"></i>
                    <a href={`${websiteURL}/tutors/${convertToSmallWord(slug)}`}>{websiteURL}/tutors/{convertToSmallWord(slug)} <i className="icon icon-copy"></i></a>
                </div>
                <ul className="tu-profilelinksbtn">
                    <li>
                        <a className="tu-linkheart" href="javascript:void(0);"><i className="icon icon-heart"></i><span>Save</span></a>
                    </li>
                    <li><a href="login.html" className="tu-secbtn">Let's talk now</a></li>
                    <li>
                        <a href="tutor-detail.html" className="tu-primbtn">Book a tution</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ProfileHeader
