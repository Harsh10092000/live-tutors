import React from 'react'
import Image from 'next/image'
import { formatTutoringPreferencesArray } from '../common'
import { websiteURL } from '@/app/utils'
import { convertToSmallWord, formatDate, hiddenPhoneNumber } from '../common'
const ProfileHeader = ({ name, profile_tag_line, profile_pic_url, language_preferences, city, state, gender, tutoring_preferences, travel_distance, min_fee, max_fee, fee_charged_for, slug, created_at, phone }) => {
    return (
        <div className="tu-tutorprofilewrapp">
            <span className="tu-cardtag"></span>
            <div className="tu-profileview">
                {/* <figure>
                    <img src="images/tutordetail/img-01.jpg" alt="image-description" />
                </figure> */}
                {profile_pic_url ? (
                    <figure>
                        <img src={profile_pic_url} alt="profile-pic" />
                    </figure>
                ) : (gender == 'Male') ? (
                    <figure>
                        <img src="/images/tutordetail/img-01.jpg" alt="profile-pic" className='rounded-full' />
                    </figure>
                ) : (
                    <figure>
                        <img src="/images/tutordetail/img-01.jpg" alt="profile-pic" className='rounded-full' />
                    </figure>
                )
                }

                <div className="tu-protutorinfo">
                    <div className="tu-protutordetail">
                        <div className="tu-productorder-content">
                            <figure>
                                <img src="images/tutordetail/img-01.jpg" alt="images" />
                            </figure>
                            <div className="tu-product-title" style={{marginBottom: '0px'}}>
                                <h3>{name} <i className="icon icon-check-circle tu-greenclr" data-tippy-trigger="mouseenter" data-tippy-html="#tu-verifed" data-tippy-interactive="true" data-tippy-placement="top"></i></h3>
                                <h5>{profile_tag_line}</h5>
                                <div className="tu-listinginfo_price" style={{marginBottom: '0px'}}>
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
                                    {JSON.parse(language_preferences).map((language, index) => {
                                        return (
                                            <li key={index}>{language}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tu-detail-sections">
                <div className="tu-detail-item" style={{marginLeft: '19px', marginRight: '19px'}}>
                    <i className="icon icon-map-pin"></i>
                    <div className="tu-detail-content">
                        <h6>Mode of Teaching</h6>
                        <p>{formatTutoringPreferencesArray(tutoring_preferences, travel_distance)}</p>
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
